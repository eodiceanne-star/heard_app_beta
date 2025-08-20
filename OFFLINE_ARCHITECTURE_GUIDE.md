# 🔄 Offline-First Architecture Guide

## Overview

The Heard app has been refactored to support a robust offline-first architecture. This ensures that users can continue using the app even when they're offline, with automatic synchronization when connectivity is restored.

## 🏗️ Architecture Components

### 1. **API Service (`src/lib/api.ts`)**
- **Purpose**: Handles all backend communication with offline queue support
- **Key Features**:
  - Automatic request queuing when offline
  - Retry logic with configurable max attempts
  - Request deduplication
  - Background sync processing

### 2. **Offline Sync Handler (`src/lib/offlineSync.ts`)**
- **Purpose**: Manages online/offline state and queue processing
- **Key Features**:
  - Real-time connection monitoring
  - Automatic sync on reconnection
  - Periodic sync checks (every 30 seconds)
  - Manual sync capability
  - Event-driven architecture

### 3. **Data Service (`src/lib/dataService.ts`)**
- **Purpose**: Centralized data management with offline-first approach
- **Key Features**:
  - Local storage operations
  - Automatic sync queuing
  - Data export/import functionality
  - Sync status tracking
  - Type-safe data operations

### 4. **Offline Status Component (`src/components/OfflineStatus.tsx`)**
- **Purpose**: Visual feedback for connection and sync status
- **Key Features**:
  - Real-time status display
  - Queue count indicators
  - Manual sync button
  - Detailed sync information

## 🔄 How It Works

### **Online Operations**
1. User performs an action (create, update, delete)
2. Data is immediately saved to local storage
3. Request is queued for backend sync
4. If online, sync happens immediately
5. If successful, request is removed from queue

### **Offline Operations**
1. User performs an action
2. Data is immediately saved to local storage
3. Request is queued in localStorage
4. UI shows "Pending sync" indicator
5. App continues to work normally

### **Reconnection Sync**
1. App detects network restoration
2. Automatically processes queued requests
3. Updates sync status in real-time
4. Handles failed requests with retry logic
5. Clears successful requests from queue

## 📱 User Experience

### **Visual Indicators**
- **🌐 Online**: Green indicator, no pending items
- **📱 Offline**: Red indicator, shows pending count
- **🔄 Syncing**: Blue indicator with progress
- **Pending Items**: Orange badge showing count

### **Seamless Operation**
- App works identically online and offline
- No blocking or waiting for network
- Immediate feedback for all actions
- Automatic background synchronization

## 🛠️ Implementation Details

### **Environment Variables**
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-url.onrender.com/api

# Offline Configuration
NEXT_PUBLIC_OFFLINE_ENABLED=true
NEXT_PUBLIC_SYNC_INTERVAL=30000
NEXT_PUBLIC_MAX_RETRIES=3
```

### **Data Flow**
```
User Action → Local Storage → Queue → Backend Sync → Update Status
     ↓              ↓           ↓          ↓            ↓
  Immediate    Persistent   Offline    Automatic   Visual Feedback
   Response     Storage     Support     Retry       to User
```

### **Queue Management**
- **Storage**: localStorage under `queuedRequests` key
- **Format**: Array of request objects with metadata
- **Retry Logic**: Configurable max attempts (default: 3)
- **Deduplication**: Prevents duplicate requests
- **Cleanup**: Automatic removal of successful requests

## 🔧 Configuration Options

### **Sync Intervals**
- **Reconnection**: Immediate (1 second delay for stability)
- **Periodic**: Every 30 seconds when online
- **Manual**: User-triggered via settings

### **Retry Strategy**
- **Max Attempts**: 3 per request
- **Backoff**: None (immediate retry)
- **Failure Handling**: Logged and preserved for manual review

### **Storage Limits**
- **Queue Size**: Unlimited (limited by localStorage capacity)
- **Data Retention**: Until successful sync
- **Cleanup**: Automatic after successful sync

## 📊 Monitoring & Debugging

### **Console Logging**
- Connection status changes
- Queue processing events
- Sync success/failure details
- Error handling information

### **Status Tracking**
- Real-time connection status
- Queue count and details
- Last sync timestamp
- Sync progress indicators

### **Debug Tools**
- Manual sync trigger
- Queue inspection
- Data export/import
- Clear all data option

## 🚀 Benefits

### **For Users**
- **Uninterrupted Experience**: App works offline
- **Data Safety**: No data loss during connectivity issues
- **Immediate Feedback**: Actions are saved instantly
- **Transparent Sync**: Clear status indicators

### **For Developers**
- **Modular Architecture**: Clean separation of concerns
- **Type Safety**: Full TypeScript support
- **Extensible Design**: Easy to add new data types
- **Testing Friendly**: Mockable components

### **For Business**
- **Reliability**: Works in poor network conditions
- **User Retention**: No frustration from connectivity issues
- **Data Integrity**: Robust sync mechanisms
- **Scalability**: Ready for backend integration

## 🔮 Future Enhancements

### **Planned Features**
- **Conflict Resolution**: Handle data conflicts
- **Selective Sync**: Choose what to sync
- **Background Sync**: Service worker integration
- **Push Notifications**: Sync status updates

### **Backend Integration**
- **Firebase Firestore**: Real-time database
- **Authentication**: User management
- **Cloud Functions**: Server-side processing
- **Analytics**: Usage tracking

## 📝 Usage Examples

### **Creating Data**
```typescript
// Automatically handles offline/online state
const newEntry = await dataService.createSymptomEntry({
  userId: user.id,
  date: '2024-01-15',
  mood: 'Good',
  painLevel: 3,
  // ... other fields
});
```

### **Checking Sync Status**
```typescript
const status = offlineSync.getStatus();
console.log(`Online: ${status.isOnline}, Pending: ${status.queueCount}`);
```

### **Manual Sync**
```typescript
await offlineSync.forceSync();
```

## 🎯 Best Practices

### **For Users**
- Check sync status in settings
- Export data regularly for backup
- Use manual sync if needed
- Report sync issues

### **For Developers**
- Always use dataService for CRUD operations
- Handle async operations properly
- Test offline scenarios
- Monitor sync performance

This offline-first architecture ensures that the Heard app provides a reliable, user-friendly experience regardless of network conditions, while maintaining data integrity and providing clear feedback about sync status.
