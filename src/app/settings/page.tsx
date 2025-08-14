'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleDeleteAccount = () => {
    // Mock account deletion - in real app, this would call Firebase
    alert('Account deletion feature will be available in the full version.')
    setShowDeleteConfirm(false)
  }

  const settingsItems = [
    {
      title: 'My Profile',
      description: 'Edit your profile information and preferences',
      icon: '👤',
      href: '/profile',
      color: 'bg-sage'
    },
    {
      title: 'Privacy Policy',
      description: 'Learn about how we protect your data',
      icon: '🔒',
      href: '/privacy',
      color: 'bg-dusty-pink'
    },
    {
      title: 'About Us',
      description: 'Learn more about Heard and our mission',
      icon: '👥',
      href: '/about',
      color: 'bg-sage'
    },
    {
      title: 'Community Guidelines',
      description: 'Our community rules and expectations',
      icon: '📋',
      href: '/guidelines',
      color: 'bg-dusty-pink'
    }
  ]

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />

      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="profile-portrait" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Settings</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Manage your account and preferences
        </p>
        
        {user && (
          <div className="mobile-card mb-8 relative overflow-hidden">
            {/* Card background pattern */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>

            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                {user.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-playfair font-medium text-charcoal">{user.displayName}</h2>
                <p className="text-base text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6 mb-8">
          {settingsItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="mobile-card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 relative overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>

                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-playfair font-medium text-charcoal">{item.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="text-gray-400 text-2xl">›</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-6">
          <button
            onClick={handleLogout}
            className="w-full mobile-card hover:shadow-xl transition-all duration-300 cursor-pointer text-left transform hover:scale-105 relative overflow-hidden"
          >
            {/* Card background pattern */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gray-200 to-transparent opacity-10 rounded-full -mr-6 -mt-6"></div>

            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center text-gray-600 text-2xl shadow-lg">
                🚪
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-playfair font-medium text-charcoal">Sign Out</h3>
                <p className="text-base text-gray-600 leading-relaxed">Sign out of your account</p>
              </div>
              <div className="text-gray-400 text-2xl">›</div>
            </div>
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full mobile-card hover:shadow-xl transition-all duration-300 cursor-pointer text-left transform hover:scale-105 relative overflow-hidden"
          >
            {/* Card background pattern */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-red-100 to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>

            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center text-red-600 text-2xl shadow-lg">
                🗑️
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-playfair font-medium text-red-600">Delete Account</h3>
                <p className="text-base text-gray-600 leading-relaxed">Permanently delete your account and data</p>
              </div>
              <div className="text-gray-400 text-2xl">›</div>
            </div>
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Delete Account?</h3>
              <p className="text-base text-charcoal mb-6 leading-relaxed">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-charcoal rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4">
            <Illustration type="plant-decorative" size="small" />
          </div>

          <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">About Your Data</h3>
          <p className="text-base text-charcoal leading-relaxed relative z-10">
            Your data is stored locally on your device for privacy and security. When you sign out, your data remains on your device but is no longer accessible through the app.
          </p>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
