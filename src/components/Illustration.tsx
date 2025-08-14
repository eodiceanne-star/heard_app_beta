import React from 'react'

interface IllustrationProps {
  type: 'group-support' | 'conversation' | 'friendly-interaction' | 'lock-shield' | 'clipboard' | 'stethoscope' | 'headphones' | 'calendar'
  className?: string
}

export default function Illustration({ type, className = '' }: IllustrationProps) {
  const illustrations = {
    'group-support': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="relative">
          {/* Group support illustration - people in a circle supporting each other */}
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-16 h-16 bg-dusty-pink rounded-full flex items-center justify-center text-white text-2xl">👩</div>
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center text-white text-2xl">👩‍🦰</div>
            <div className="w-16 h-16 bg-dusty-pink rounded-full flex items-center justify-center text-white text-2xl">👩‍🦳</div>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center text-white text-2xl">👩‍🦱</div>
            <div className="w-16 h-16 bg-dusty-pink rounded-full flex items-center justify-center text-white text-2xl">👩‍🦲</div>
          </div>
          {/* Connection lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-dusty-pink border-dashed rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    ),
    'conversation': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="flex justify-center items-center space-x-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-dusty-pink rounded-full flex items-center justify-center text-white text-3xl mb-2">👩</div>
            <div className="w-3 h-3 bg-dusty-pink rounded-full mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center text-white text-3xl mb-2">👩‍🦰</div>
            <div className="w-3 h-3 bg-sage rounded-full mx-auto"></div>
          </div>
        </div>
        {/* Speech bubbles */}
        <div className="flex justify-between items-start mt-4 px-4">
          <div className="bg-white rounded-2xl p-3 shadow-sm max-w-24">
            <div className="text-xs text-charcoal">"I understand..."</div>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-sm max-w-24">
            <div className="text-xs text-charcoal">"Thank you..."</div>
          </div>
        </div>
      </div>
    ),
    'friendly-interaction': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="flex justify-center items-center space-x-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-dusty-pink rounded-full flex items-center justify-center text-white text-2xl mb-2">👩</div>
            <div className="text-xs text-charcoal">Support</div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white text-sm">❤️</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center text-white text-2xl mb-2">👩‍🦰</div>
            <div className="text-xs text-charcoal">Care</div>
          </div>
        </div>
      </div>
    ),
    'lock-shield': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center text-white text-4xl">🔒</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-dusty-pink rounded-full flex items-center justify-center text-white text-sm">🛡️</div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-sm text-charcoal font-medium">Your Privacy Matters</div>
        </div>
      </div>
    ),
    'clipboard': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-dusty-pink rounded-full flex items-center justify-center text-white text-4xl">📋</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white text-sm">✏️</div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-sm text-charcoal font-medium">Track Your Symptoms</div>
        </div>
      </div>
    ),
    'stethoscope': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center text-white text-4xl">👩‍⚕️</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-dusty-pink rounded-full flex items-center justify-center text-white text-sm">🩺</div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-sm text-charcoal font-medium">Find Your Doctor</div>
        </div>
      </div>
    ),
    'headphones': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-dusty-pink rounded-full flex items-center justify-center text-white text-4xl">🎧</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white text-sm">🎵</div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-sm text-charcoal font-medium">Calming Music</div>
        </div>
      </div>
    ),
    'calendar': (
      <div className={`w-full max-w-xs mx-auto ${className}`}>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center text-white text-4xl">📅</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-dusty-pink rounded-full flex items-center justify-center text-white text-sm">📝</div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-sm text-charcoal font-medium">Appointments</div>
        </div>
      </div>
    ),
  }

  return illustrations[type] || illustrations['group-support']
}
