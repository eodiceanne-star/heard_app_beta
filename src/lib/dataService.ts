// Data Service - Offline-First Data Management
// Handles all data operations with local storage and backend sync

import { apiService } from './api';

// Data types
export interface SymptomEntry {
  id: string;
  userId: string;
  date: string;
  mood: string;
  dietNotes: string;
  painLevel: number;
  painLocation: string;
  notes: string;
  createdAt: string;
  synced: boolean;
}

export interface Appointment {
  id: string;
  userId: string;
  title: string;
  date: string;
  time: string;
  notes: string;
  reminder: boolean;
  createdAt: string;
  synced: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  contact?: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  acceptingPatients: boolean;
  createdAt: string;
  synced: boolean;
}

export interface Review {
  id: string;
  doctorId: string;
  userId: string;
  userDisplayName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  tags: string[];
  createdAt: string;
  synced: boolean;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    avatar: string;
    isAnonymous: boolean;
  };
  tags: string[];
  comments: ForumComment[];
  commentCount: number;
  timestamp: string;
  synced: boolean;
}

export interface ForumComment {
  id: string;
  threadId: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    avatar: string;
    isAnonymous: boolean;
  };
  timestamp: string;
  synced: boolean;
}

export interface MusicTrack {
  id: string;
  userId: string;
  title: string;
  artist: string;
  url: string;
  createdAt: string;
  synced: boolean;
}

export interface CustomQuestion {
  id: string;
  userId: string;
  question: string;
  createdAt: string;
  synced: boolean;
}

class DataService {
  private storageKeys = {
    symptoms: 'symptomEntries',
    appointments: 'calendarAppointments',
    doctors: 'heardUserDoctors',
    reviews: 'doctorReviews',
    forum: 'forumThreads',
    music: 'heardCustomMusic',
    questions: 'heardCustomQuestions',
    profile: 'heardProfile'
  };

  // Generic CRUD operations with offline-first approach

  private async saveToLocal<T>(key: string, data: T[]): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getFromLocal<T>(key: string): T[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return [];
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Create new item (offline-first)
  async create<T extends { id: string; synced: boolean }>(
    key: string,
    endpoint: string,
    item: Omit<T, 'id' | 'synced'>
  ): Promise<T> {
    const newItem: T = {
      ...item,
      id: this.generateId(),
      synced: false
    } as T;

    // Save to local storage immediately
    const items = this.getFromLocal<T>(key);
    items.unshift(newItem);
    await this.saveToLocal(key, items);

    // Queue for backend sync
    await apiService.create(endpoint, newItem);

    return newItem;
  }

  // Update existing item (offline-first)
  async update<T extends { id: string; synced: boolean }>(
    key: string,
    endpoint: string,
    id: string,
    updates: Partial<T>
  ): Promise<T | null> {
    const items = this.getFromLocal<T>(key);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;

    const updatedItem: T = {
      ...items[index],
      ...updates,
      synced: false
    };

    items[index] = updatedItem;
    await this.saveToLocal(key, items);

    // Queue for backend sync
    await apiService.update(`${endpoint}/${id}`, updatedItem);

    return updatedItem;
  }

  // Delete item (offline-first)
  async delete<T extends { id: string }>(
    key: string,
    endpoint: string,
    id: string
  ): Promise<boolean> {
    const items = this.getFromLocal<T>(key);
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;

    await this.saveToLocal(key, filteredItems);

    // Queue for backend sync
    await apiService.delete(`${endpoint}/${id}`);

    return true;
  }

  // Get all items from local storage
  getAll<T>(key: string): T[] {
    return this.getFromLocal<T>(key);
  }

  // Get single item by ID
  getById<T extends { id: string }>(key: string, id: string): T | null {
    const items = this.getFromLocal<T>(key);
    return items.find(item => item.id === id) || null;
  }

  // Specific data operations

  // Symptom Entries
  async createSymptomEntry(entry: Omit<SymptomEntry, 'id' | 'synced'>): Promise<SymptomEntry> {
    return this.create(this.storageKeys.symptoms, '/symptoms', entry);
  }

  async updateSymptomEntry(id: string, updates: Partial<SymptomEntry>): Promise<SymptomEntry | null> {
    return this.update(this.storageKeys.symptoms, '/symptoms', id, updates);
  }

  async deleteSymptomEntry(id: string): Promise<boolean> {
    return this.delete(this.storageKeys.symptoms, '/symptoms', id);
  }

  getSymptomEntries(): SymptomEntry[] {
    return this.getAll<SymptomEntry>(this.storageKeys.symptoms);
  }

  // Appointments
  async createAppointment(appointment: Omit<Appointment, 'id' | 'synced'>): Promise<Appointment> {
    return this.create(this.storageKeys.appointments, '/appointments', appointment);
  }

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    return this.update(this.storageKeys.appointments, '/appointments', id, updates);
  }

  async deleteAppointment(id: string): Promise<boolean> {
    return this.delete(this.storageKeys.appointments, '/appointments', id);
  }

  getAppointments(): Appointment[] {
    return this.getAll<Appointment>(this.storageKeys.appointments);
  }

  // Doctors
  async createDoctor(doctor: Omit<Doctor, 'id' | 'synced'>): Promise<Doctor> {
    return this.create(this.storageKeys.doctors, '/doctors', doctor);
  }

  async updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor | null> {
    return this.update(this.storageKeys.doctors, '/doctors', id, updates);
  }

  async deleteDoctor(id: string): Promise<boolean> {
    return this.delete(this.storageKeys.doctors, '/doctors', id);
  }

  getDoctors(): Doctor[] {
    return this.getAll<Doctor>(this.storageKeys.doctors);
  }

  // Reviews
  async createReview(review: Omit<Review, 'id' | 'synced'>): Promise<Review> {
    return this.create(this.storageKeys.reviews, '/reviews', review);
  }

  async updateReview(id: string, updates: Partial<Review>): Promise<Review | null> {
    return this.update(this.storageKeys.reviews, '/reviews', id, updates);
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.delete(this.storageKeys.reviews, '/reviews', id);
  }

  getReviews(): Review[] {
    return this.getAll<Review>(this.storageKeys.reviews);
  }

  // Forum Threads
  async createThread(thread: Omit<ForumThread, 'id' | 'synced'>): Promise<ForumThread> {
    return this.create(this.storageKeys.forum, '/forum/threads', thread);
  }

  async updateThread(id: string, updates: Partial<ForumThread>): Promise<ForumThread | null> {
    return this.update(this.storageKeys.forum, '/forum/threads', id, updates);
  }

  async deleteThread(id: string): Promise<boolean> {
    return this.delete(this.storageKeys.forum, '/forum/threads', id);
  }

  getThreads(): ForumThread[] {
    return this.getAll<ForumThread>(this.storageKeys.forum);
  }

  // Music Tracks
  async createMusicTrack(track: Omit<MusicTrack, 'id' | 'synced'>): Promise<MusicTrack> {
    return this.create(this.storageKeys.music, '/music', track);
  }

  async updateMusicTrack(id: string, updates: Partial<MusicTrack>): Promise<MusicTrack | null> {
    return this.update(this.storageKeys.music, '/music', id, updates);
  }

  async deleteMusicTrack(id: string): Promise<boolean> {
    return this.delete(this.storageKeys.music, '/music', id);
  }

  getMusicTracks(): MusicTrack[] {
    return this.getAll<MusicTrack>(this.storageKeys.music);
  }

  // Custom Questions
  async createCustomQuestion(question: Omit<CustomQuestion, 'id' | 'synced'>): Promise<CustomQuestion> {
    return this.create(this.storageKeys.questions, '/questions', question);
  }

  async updateCustomQuestion(id: string, updates: Partial<CustomQuestion>): Promise<CustomQuestion | null> {
    return this.update(this.storageKeys.questions, '/questions', id, updates);
  }

  async deleteCustomQuestion(id: string): Promise<boolean> {
    return this.delete(this.storageKeys.questions, '/questions', id);
  }

  getCustomQuestions(): CustomQuestion[] {
    return this.getAll<CustomQuestion>(this.storageKeys.questions);
  }

  // Profile
  async updateProfile(profile: any): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKeys.profile, JSON.stringify(profile));
    
    // Queue for backend sync
    await apiService.update('/profile', profile);
  }

  getProfile(): any {
    if (typeof window === 'undefined') return null;
    try {
      const profile = localStorage.getItem(this.storageKeys.profile);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error reading profile from localStorage:', error);
      return null;
    }
  }

  // Utility methods

  // Clear all local data (for testing/debugging)
  clearAllData(): void {
    Object.values(this.storageKeys).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('🗑️ All local data cleared');
  }

  // Get sync status for all data types
  getSyncStatus(): Record<string, { total: number; synced: number; pending: number }> {
    const status: Record<string, { total: number; synced: number; pending: number }> = {};
    
    Object.entries(this.storageKeys).forEach(([type, key]) => {
      const items = this.getFromLocal<any[]>(key);
      const total = items.length;
      const synced = items.filter((item: any) => item.synced === true).length;
      const pending = total - synced;
      
      status[type] = { total, synced, pending };
    });
    
    return status;
  }

  // Export all data (for backup)
  exportData(): Record<string, any[]> {
    const exportData: Record<string, any[]> = {};
    
    Object.entries(this.storageKeys).forEach(([type, key]) => {
      exportData[type] = this.getFromLocal(key);
    });
    
    return exportData;
  }

  // Import data (for restore)
  importData(data: Record<string, any[]>): void {
    Object.entries(data).forEach(([type, items]) => {
      const key = this.storageKeys[type as keyof typeof this.storageKeys];
      if (key) {
        this.saveToLocal(key, items);
      }
    });
    console.log('📥 Data imported successfully');
  }
}

// Export singleton instance
export const dataService = new DataService();
