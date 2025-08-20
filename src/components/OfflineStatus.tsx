'use client';

import React, { useState, useEffect } from 'react';
import { offlineSync, SyncStatus } from '../lib/offlineSync';

interface OfflineStatusProps {
  className?: string;
  showDetails?: boolean;
}

export default function OfflineStatus({ className = '', showDetails = false }: OfflineStatusProps) {
  const [status, setStatus] = useState<SyncStatus>(offlineSync.getStatus());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Subscribe to sync status changes
    const unsubscribe = offlineSync.subscribe((newStatus) => {
      setStatus(newStatus);
    });

    return unsubscribe;
  }, []);

  const handleManualSync = async () => {
    await offlineSync.forceSync();
  };

  const getStatusColor = () => {
    if (status.syncInProgress) return 'text-blue-600';
    if (status.isOnline) return 'text-green-600';
    return 'text-red-600';
  };

  const getStatusIcon = () => {
    if (status.syncInProgress) return '🔄';
    if (status.isOnline) return '🌐';
    return '📱';
  };

  const getStatusText = () => {
    if (status.syncInProgress) return 'Syncing...';
    if (status.isOnline) return 'Online';
    return 'Offline';
  };

  if (!showDetails) {
    return (
      <div className={`flex items-center space-x-2 text-sm ${className}`}>
        <span className={getStatusColor()}>
          {getStatusIcon()} {getStatusText()}
        </span>
        {status.queueCount > 0 && (
          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            {status.queueCount} pending
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
      {/* Status Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`text-lg ${getStatusColor()}`}>
            {getStatusIcon()}
          </span>
          <div>
            <h3 className="font-medium text-gray-900">{getStatusText()}</h3>
            <p className="text-sm text-gray-500">
              {status.isOnline ? 'Connected to server' : 'Working offline'}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {/* Queue Status */}
      {status.queueCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-800">
                {status.queueCount} pending sync
              </p>
              <p className="text-xs text-orange-600">
                Changes will sync when connection is restored
              </p>
            </div>
            {status.isOnline && !status.syncInProgress && (
              <button
                onClick={handleManualSync}
                className="bg-orange-500 text-white text-xs px-3 py-1 rounded-md hover:bg-orange-600 transition-colors"
              >
                Sync Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Connection:</span>
            <span className={getStatusColor()}>
              {status.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pending requests:</span>
            <span className="font-medium">{status.queueCount}</span>
          </div>
          
          {status.lastSync && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last sync:</span>
              <span className="text-gray-900">
                {new Date(status.lastSync).toLocaleTimeString()}
              </span>
            </div>
          )}
          
          {status.syncInProgress && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="text-blue-600">Syncing...</span>
            </div>
          )}

          {/* Debug Info */}
          <div className="mt-4 pt-3 border-t">
            <button
              onClick={() => {
                const details = offlineSync.getQueueDetails();
                console.log('Queue Details:', details);
                alert(`Queue details logged to console. Count: ${details.count}`);
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              View queue details (console)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
