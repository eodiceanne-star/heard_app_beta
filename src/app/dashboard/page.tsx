'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Illustration from '@/components/Illustration';
import DecorativeIllustrations from '@/components/DecorativeIllustrations';

// Affirmations for daily reminders
const affirmations = [
  "You are your own best advocate. Trust your instincts.",
  "Your symptoms are valid, and you deserve to be heard.",
  "It's okay to ask for a second opinion. Your health matters.",
  "You are strong, capable, and worthy of proper medical care.",
  "Your experience is unique and important. Don't let anyone dismiss it.",
  "You have the right to ask questions and expect clear answers.",
  "Your body knows what it needs. Listen to it.",
  "You are not alone in this journey. Support is available.",
  "Every step you take toward better health is progress.",
  "You deserve compassionate, thorough medical care.",
  "Your voice matters in your healthcare decisions.",
  "It's brave to seek help and advocate for yourself.",
  "You are more than your symptoms. You are a whole person.",
  "Trust yourself. You know your body better than anyone.",
  "Your health journey is valid, no matter how long it takes.",
  "You have the power to make informed decisions about your care.",
  "Your feelings about your health are important and real.",
  "You deserve doctors who listen and take you seriously.",
  "Every question you ask brings you closer to answers.",
  "You are resilient, and you will find the care you need.",
  "Your symptoms are not 'all in your head' - they're real.",
  "You have the right to seek multiple opinions.",
  "Your health concerns deserve attention and investigation.",
  "You are worthy of thorough, respectful medical care.",
  "Don't give up. The right answers are out there.",
  "Your persistence in seeking help is a strength.",
  "You are not being difficult - you're being thorough.",
  "Your health journey is unique and important.",
  "You have the right to expect better from healthcare providers."
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [todayAffirmation, setTodayAffirmation] = useState('');

  useEffect(() => {
    // Generate today's affirmation based on day of year
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const affirmationIndex = dayOfYear % affirmations.length;
    setTodayAffirmation(affirmations[affirmationIndex]);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const dashboardItems = [
    {
      title: 'Symptom Tracker',
      description: 'Track daily symptoms, mood, and health patterns',
      icon: 'symptom-notebook',
      path: '/tracker',
      color: 'bg-dusty-pink'
    },
    {
      title: 'Community Forum',
      description: 'Connect with others and share experiences',
      icon: 'people-talking',
      path: '/forum',
      color: 'bg-sage'
    },
    {
      title: 'Find Doctors',
      description: 'Discover and review healthcare providers',
      icon: 'doctor-stethoscope',
      path: '/doctors',
      color: 'bg-dusty-pink'
    },
    {
      title: 'Doctor Visit Prep',
      description: 'Prepare questions and advocate for yourself',
      icon: 'appointment-prep',
      path: '/prep',
      color: 'bg-sage'
    },
    {
      title: 'Calming Music',
      description: 'Relax with soothing playlists and tracks',
      icon: 'music-listening',
      path: '/music',
      color: 'bg-dusty-pink'
    },
    {
      title: 'Resource Library',
      description: 'Educational content and advocacy resources',
      icon: 'reading-book',
      path: '/resources',
      color: 'bg-sage'
    }
  ];

  if (!user) {
    return (
      <div className="page-container">
        <div className="content-container text-center">
          <h1 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
            Please log in to access your dashboard
          </h1>
          <button
            onClick={() => router.push('/login')}
            className="bg-dusty-pink text-white px-6 py-3 rounded-xl font-medium hover:bg-dusty-pink-dark transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <DecorativeIllustrations />
      
      <div className="content-container">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
              Welcome back, {user.displayName}!
            </h1>
            <p className="text-gray-600">
              How can we support your health journey today?
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-dusty-pink text-white px-4 py-2 rounded-lg font-medium hover:bg-dusty-pink-dark transition-colors shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Today's Reminder */}
        <div className="bg-gradient-to-r from-dusty-pink to-sage rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-start space-x-4">
            <div className="text-2xl">💝</div>
            <div>
              <h2 className="text-xl font-playfair font-semibold mb-2">
                Today's Reminder
              </h2>
              <p className="text-white/90 leading-relaxed">
                {todayAffirmation}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/tracker')}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow text-left"
            >
              <div className="text-2xl mb-2">📝</div>
              <div className="font-medium text-gray-800">Add Symptom Entry</div>
              <div className="text-sm text-gray-500">Track today's symptoms</div>
            </button>
            <button
              onClick={() => router.push('/calendar')}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow text-left"
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium text-gray-800">View Calendar</div>
              <div className="text-sm text-gray-500">Check appointments</div>
            </button>
          </div>
        </div>

        {/* Main Features Grid */}
        <div>
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Your Health Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform`}>
                    <Illustration type={item.icon as any} size="small" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair font-semibold text-gray-800 mb-2 group-hover:text-dusty-pink transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
