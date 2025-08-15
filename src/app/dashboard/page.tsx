'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const featureCards = [
    {
      title: 'Symptom Tracker',
      description: 'Track your symptoms, mood, and daily health patterns',
      icon: '📋',
      href: '/tracker',
      color: 'bg-dusty-pink',
      illustration: 'symptom-tracker'
    },
    {
      title: 'Community Forum',
      description: 'Connect with others who understand your journey',
      icon: '💬',
      href: '/forum',
      color: 'bg-sage',
      illustration: 'forum-discussion'
    },
    {
      title: 'Find Doctors',
      description: 'Discover supportive healthcare professionals',
      icon: '👩‍⚕️',
      href: '/doctors',
      color: 'bg-dusty-pink',
      illustration: 'doctor-helpful'
    },
    {
      title: 'Doctor Visit Prep',
      description: 'Prepare questions and advocate for yourself',
      icon: '📝',
      href: '/prep',
      color: 'bg-sage',
      illustration: 'appointment-prep'
    },
    {
      title: 'Calming Music',
      description: 'Relaxing playlists for stress relief',
      icon: '🎧',
      href: '/music',
      color: 'bg-dusty-pink',
      illustration: 'music-listening'
    },
    {
      title: 'Resource Library',
      description: 'Helpful articles and educational content',
      icon: '📚',
      href: '/resources',
      color: 'bg-sage',
      illustration: 'resource-library'
    }
  ]

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      <div className="content-container relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="mb-8">
              <Illustration type="home-plant" size="large" className="mb-6" />
            </div>
            
            <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">
              Welcome{user ? `, ${user.displayName}` : ''}
            </h1>
            <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
              Your healthcare support platform is ready to help you on your journey
            </p>
          </div>
          
          {/* Quick logout button */}
          <button
            onClick={handleLogout}
            className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center text-gray-600 text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            title="Sign Out"
          >
            🚪
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12">
          {featureCards.map((card, index) => (
            <Link key={index} href={card.href}>
              <div className="mobile-card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 relative overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-10 -mt-10"></div>
                
                <div className="flex items-center space-x-6 relative z-10">
                  <div className="flex-shrink-0">
                    <Illustration type={card.illustration as any} size="large" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-playfair font-medium text-charcoal mb-2">{card.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                  <div className="text-gray-400 text-2xl">›</div>
                </div>
                
                {/* Decorative accent */}
                <div className="absolute bottom-4 left-4">
                  <Illustration type="plant-decorative" size="small" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-8">
          <div className="mobile-card relative overflow-hidden">
            {/* Card background pattern */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-8 -mt-8"></div>
            
            <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <Link href="/tracker">
                <button className="w-full p-4 bg-dusty-pink bg-opacity-10 text-dusty-pink rounded-2xl text-base font-medium hover:bg-opacity-20 transition-colors border border-dusty-pink border-opacity-20">
                  Add Symptom Entry
                </button>
              </Link>
              <Link href="/forum">
                <button className="w-full p-4 bg-sage bg-opacity-10 text-sage rounded-2xl text-base font-medium hover:bg-opacity-20 transition-colors border border-sage border-opacity-20">
                  Start Discussion
                </button>
              </Link>
              <Link href="/prep">
                <button className="w-full p-4 bg-dusty-pink bg-opacity-10 text-dusty-pink rounded-2xl text-base font-medium hover:bg-opacity-20 transition-colors border border-dusty-pink border-opacity-20">
                  Prepare Questions
                </button>
              </Link>
              <Link href="/music">
                <button className="w-full p-4 bg-sage bg-opacity-10 text-sage rounded-2xl text-base font-medium hover:bg-opacity-20 transition-colors border border-sage border-opacity-20">
                  Listen to Music
                </button>
              </Link>
            </div>
          </div>

          <div className="mobile-card relative overflow-hidden">
            {/* Card background pattern */}
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-sage to-transparent opacity-10 rounded-full -mr-6 -mb-6"></div>
            
            <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Today's Reminder</h2>
            <p className="text-base text-charcoal leading-relaxed relative z-10">
              Remember: You know your body best. Trust your instincts and don't hesitate to advocate for yourself during medical appointments.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-4 right-4">
              <Illustration type="plant-decorative" size="small" />
            </div>
            
            <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">You're Not Alone</h3>
            <p className="text-base text-charcoal leading-relaxed relative z-10">
              Every woman's healthcare journey is unique, but you don't have to navigate it alone. Connect with our community, track your symptoms, and find the support you deserve.
            </p>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
