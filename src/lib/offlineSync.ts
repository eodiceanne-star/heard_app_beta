// Offline Sync Handler
// Manages online/offline state and processes queued requests

import { apiService } from './api';

export interface SyncStatus {
  isOnline: boolean;
  queueCount: number;
  lastSync: number | null;
  syncInProgress: boolean;
}

class OfflineSyncHandler {
  private syncStatus: SyncStatus = {
    isOnline: true,
    queueCount: 0,
    lastSync: null,
    syncInProgress: false
  };

  private listeners: ((status: SyncStatus) => void)[] = [];

  constructor() {
    this.initializeListeners();
    this.updateOnlineStatus();
  }

  // Initialize online/offline event listeners
  private initializeListeners(): void {
    if (typeof window === 'undefined') return;

    // Listen for online/offline events
    window.addEventListener('online', () => {
      console.log('🌐 Connection restored');
      this.handleOnline();
    });

    window.addEventListener('offline', () => {
      console.log('📱 Connection lost');
      this.handleOffline();
    });

    // Listen for visibility change (app coming back to foreground)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.syncStatus.isOnline) {
        console.log('📱 App became visible, checking for queued requests');
        this.processQueueIfNeeded();
      }
    });

    // Periodic sync check (every 30 seconds when online)
    setInterval(() => {
      if (this.syncStatus.isOnline && !this.syncStatus.syncInProgress) {
        this.processQueueIfNeeded();
      }
    }, 30000);
  }

  // Update online status
  private updateOnlineStatus(): void {
    const isOnline = typeof navigator !== 'undefined' && navigator.onLine;
    this.syncStatus.isOnline = isOnline;
    this.updateQueueCount();
    this.notifyListeners();
  }

  // Handle coming back online
  private async handleOnline(): Promise<void> {
    this.syncStatus.isOnline = true;
    this.notifyListeners();

    // Wait a moment for connection to stabilize
    setTimeout(() => {
      this.processQueueIfNeeded();
    }, 1000);
  }

  // Handle going offline
  private handleOffline(): void {
    this.syncStatus.isOnline = false;
    this.syncStatus.syncInProgress = false;
    this.notifyListeners();
  }

  // Process queue if there are pending requests
  private async processQueueIfNeeded(): Promise<void> {
    const queueStatus = apiService.getQueueStatus();
    
    if (queueStatus.count === 0) {
      return;
    }

    if (this.syncStatus.syncInProgress) {
      console.log('🔄 Sync already in progress, skipping');
      return;
    }

    await this.processQueue();
  }

  // Process all queued requests
  async processQueue(): Promise<void> {
    if (!this.syncStatus.isOnline) {
      console.log('📱 Offline - cannot process queue');
      return;
    }

    this.syncStatus.syncInProgress = true;
    this.notifyListeners();

    try {
      console.log('🔄 Starting sync process...');
      await apiService.processQueue();
      
      this.syncStatus.lastSync = Date.now();
      this.updateQueueCount();
      
      console.log('✅ Sync completed successfully');
    } catch (error) {
      console.error('❌ Error during sync:', error);
    } finally {
      this.syncStatus.syncInProgress = false;
      this.notifyListeners();
    }
  }

  // Update queue count
  private updateQueueCount(): void {
    const queueStatus = apiService.getQueueStatus();
    this.syncStatus.queueCount = queueStatus.count;
  }

  // Notify all listeners of status change
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.syncStatus);
      } catch (error) {
        console.error('Error in sync status listener:', error);
      }
    });
  }

  // Public methods

  // Get current sync status
  getStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  // Subscribe to sync status changes
  subscribe(listener: (status: SyncStatus) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Force a sync (useful for manual sync button)
  async forceSync(): Promise<void> {
    console.log('🔄 Manual sync requested');
    await this.processQueue();
  }

  // Get queue details for debugging
  getQueueDetails() {
    return apiService.getQueueStatus();
  }

  // Clear all queued requests (for testing/debugging)
  clearQueue(): void {
    apiService.clearAllQueuedRequests();
    this.updateQueueCount();
    this.notifyListeners();
  }

  // Check if currently syncing
  isSyncing(): boolean {
    return this.syncStatus.syncInProgress;
  }

  // Check if online
  isOnline(): boolean {
    return this.syncStatus.isOnline;
  }

  // Get formatted last sync time
  getLastSyncTime(): string | null {
    if (!this.syncStatus.lastSync) return null;
    return new Date(this.syncStatus.lastSync).toLocaleString();
  }
}

// Export singleton instance
export const offlineSync = new OfflineSyncHandler();
