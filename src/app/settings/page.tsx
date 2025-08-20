'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { dataService } from '@/lib/dataService';
import { offlineSync } from '@/lib/offlineSync';
import OfflineStatus from '@/components/OfflineStatus';
import Illustration from '@/components/Illustration';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const data = dataService.exportData() || {};
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `heard-app-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    try {
      if (dataService && typeof dataService.clearAllData === 'function') {
        dataService.clearAllData();
      }
      if (offlineSync && typeof offlineSync.clearQueue === 'function') {
        offlineSync.clearQueue();
      }
      alert('All local data has been cleared.');
      router.push('/');
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('Error clearing data. Please try again.');
    } finally {
      setIsClearing(false);
    }
  };

  const handleManualSync = async () => {
    try {
      if (offlineSync && typeof offlineSync.forceSync === 'function') {
        await offlineSync.forceSync();
        alert('Manual sync completed!');
      } else {
        alert('Sync service not available');
      }
    } catch (error) {
      console.error('Error during manual sync:', error);
      alert('Error during sync. Please try again.');
    }
  };

  const syncStatus = dataService.getSyncStatus() || {};

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="text-center mb-8">
          <Illustration 
            type="profile-portrait" 
            size="large" 
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account and app preferences
          </p>
        </div>

        {/* Offline Status */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Connection Status
          </h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">🌐</span>
              <span className="font-medium text-gray-800">Online</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Connected to server
            </p>
          </div>
        </div>

        {/* Sync Status */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Data Sync Status
          </h2>
          <div className="space-y-3">
            {Object.entries(syncStatus).map(([type, status]) => (
              <div key={type} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-800 capitalize">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({status.total} total)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600">
                    {status.synced} synced
                  </span>
                  {status.pending > 0 && (
                    <span className="text-sm text-orange-600">
                      {status.pending} pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleManualSync}
            className="mt-4 w-full bg-sage text-white py-3 rounded-xl font-medium hover:bg-sage-dark transition-colors"
          >
            Sync Now
          </button>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Data Management
          </h2>
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="w-full bg-dusty-pink text-white py-3 rounded-xl font-medium hover:bg-dusty-pink-dark transition-colors disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : 'Export All Data'}
            </button>
            <button
              onClick={handleClearData}
              disabled={isClearing}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isClearing ? 'Clearing...' : 'Clear All Data'}
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Account
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Display Name</div>
              <div className="font-medium text-gray-800">{user?.displayName || 'Not set'}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-medium text-gray-800">{user?.email || 'Not set'}</div>
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            App Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="text-gray-800">1.0.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Build</span>
              <span className="text-gray-800">2024.1</span>
            </div>
          </div>
        </div>

        {/* Legal & Support */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Legal & Support
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/privacy')}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => router.push('/terms')}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => router.push('/guidelines')}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Community Guidelines
            </button>
            <button
              onClick={() => router.push('/about')}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              About Heard
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
