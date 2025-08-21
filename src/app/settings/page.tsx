'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedUser = localStorage.getItem('heardUser');
        const savedProfile = localStorage.getItem('heardProfile');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setUser({
            displayName: profile.displayName || 'Not set',
            email: 'Not set'
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('heardUser');
        localStorage.removeItem('heardProfile');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    setUser(null);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dusty-pink mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account and app preferences
          </p>
        </div>

        {/* Connection Status */}
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
              className="w-full bg-dusty-pink text-gray-900 py-3 rounded-xl font-medium hover:bg-dusty-pink-dark transition-colors"
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
