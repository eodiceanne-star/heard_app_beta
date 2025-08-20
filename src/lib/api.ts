// API Service Module for Offline-First Architecture
// Handles all backend communication with offline queue support

export interface ApiRequest {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  endpoint: string;
  payload: any;
  timestamp: number;
  retryCount: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private baseUrl: string;
  private maxRetries: number = 3;
  private queueKey: string = 'queuedRequests';

  constructor() {
    // Use environment variable or default to Render backend
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://heard-app-beta.onrender.com/api';
  }

  // Check if we're online
  private isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  // Generate unique request ID
  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Add request to offline queue
  private addToQueue(request: Omit<ApiRequest, 'id' | 'timestamp' | 'retryCount'>): void {
    if (typeof window === 'undefined') return;

    const queue = this.getQueue();
    const queuedRequest: ApiRequest = {
      ...request,
      id: this.generateRequestId(),
      timestamp: Date.now(),
      retryCount: 0
    };

    queue.push(queuedRequest);
    localStorage.setItem(this.queueKey, JSON.stringify(queue));
  }

  // Get current queue from localStorage
  private getQueue(): ApiRequest[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const queue = localStorage.getItem(this.queueKey);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Error reading queue from localStorage:', error);
      return [];
    }
  }

  // Clear queue from localStorage
  private clearQueue(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.queueKey);
  }

  // Process a single queued request
  private async processQueuedRequest(request: ApiRequest): Promise<boolean> {
    try {
      const response = await this.makeRequest(request.endpoint, request.payload, request.type);
      
      if (response.success) {
        console.log(`✅ Queued request processed: ${request.type} ${request.endpoint}`);
        return true;
      } else {
        console.warn(`⚠️ Queued request failed: ${request.type} ${request.endpoint}`, response.error);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error processing queued request: ${request.type} ${request.endpoint}`, error);
      return false;
    }
  }

  // Process all queued requests
  async processQueue(): Promise<void> {
    if (!this.isOnline()) {
      console.log('📱 Offline - skipping queue processing');
      return;
    }

    const queue = this.getQueue();
    if (queue.length === 0) {
      console.log('📋 No queued requests to process');
      return;
    }

    console.log(`🔄 Processing ${queue.length} queued requests...`);

    const successfulRequests: string[] = [];
    const failedRequests: ApiRequest[] = [];

    for (const request of queue) {
      const success = await this.processQueuedRequest(request);
      
      if (success) {
        successfulRequests.push(request.id);
      } else {
        // Increment retry count
        request.retryCount++;
        
        // Remove from queue if max retries exceeded
        if (request.retryCount >= this.maxRetries) {
          console.error(`❌ Max retries exceeded for request: ${request.type} ${request.endpoint}`);
        } else {
          failedRequests.push(request);
        }
      }
    }

    // Update queue with failed requests (for retry)
    if (failedRequests.length > 0) {
      localStorage.setItem(this.queueKey, JSON.stringify(failedRequests));
      console.log(`⚠️ ${failedRequests.length} requests failed and will be retried`);
    } else {
      this.clearQueue();
      console.log('✅ All queued requests processed successfully');
    }
  }

  // Make HTTP request to backend
  private async makeRequest(endpoint: string, payload: any, method: string): Promise<ApiResponse> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const options: RequestInit = {
        method: method === 'CREATE' ? 'POST' : method === 'UPDATE' ? 'PUT' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'DELETE' ? JSON.stringify(payload) : undefined,
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Request failed' };
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Network error' };
    }
  }

  // Public API methods - these handle offline/online logic

  async create(endpoint: string, payload: any): Promise<ApiResponse> {
    const request = {
      type: 'CREATE' as const,
      endpoint,
      payload
    };

    // Always add to queue for offline support
    this.addToQueue(request);

    // If online, try to process immediately
    if (this.isOnline()) {
      const response = await this.makeRequest(endpoint, payload, 'CREATE');
      if (response.success) {
        // Remove from queue if successful
        const queue = this.getQueue();
        const updatedQueue = queue.filter(req => 
          !(req.type === 'CREATE' && req.endpoint === endpoint && 
            JSON.stringify(req.payload) === JSON.stringify(payload))
        );
        localStorage.setItem(this.queueKey, JSON.stringify(updatedQueue));
      }
      return response;
    }

    // Return success for offline operations (data saved locally)
    return { success: true, data: { id: this.generateRequestId(), ...payload } };
  }

  async update(endpoint: string, payload: any): Promise<ApiResponse> {
    const request = {
      type: 'UPDATE' as const,
      endpoint,
      payload
    };

    this.addToQueue(request);

    if (this.isOnline()) {
      const response = await this.makeRequest(endpoint, payload, 'UPDATE');
      if (response.success) {
        const queue = this.getQueue();
        const updatedQueue = queue.filter(req => 
          !(req.type === 'UPDATE' && req.endpoint === endpoint && 
            JSON.stringify(req.payload) === JSON.stringify(payload))
        );
        localStorage.setItem(this.queueKey, JSON.stringify(updatedQueue));
      }
      return response;
    }

    return { success: true, data: payload };
  }

  async delete(endpoint: string): Promise<ApiResponse> {
    const request = {
      type: 'DELETE' as const,
      endpoint,
      payload: {}
    };

    this.addToQueue(request);

    if (this.isOnline()) {
      const response = await this.makeRequest(endpoint, {}, 'DELETE');
      if (response.success) {
        const queue = this.getQueue();
        const updatedQueue = queue.filter(req => 
          !(req.type === 'DELETE' && req.endpoint === endpoint)
        );
        localStorage.setItem(this.queueKey, JSON.stringify(updatedQueue));
      }
      return response;
    }

    return { success: true };
  }

  // Get queue status for debugging
  getQueueStatus(): { count: number; requests: ApiRequest[] } {
    const queue = this.getQueue();
    return {
      count: queue.length,
      requests: queue
    };
  }

  // Clear all queued requests (for testing/debugging)
  clearAllQueuedRequests(): void {
    this.clearQueue();
    console.log('🗑️ All queued requests cleared');
  }
}

// Export singleton instance
export const apiService = new ApiService();
