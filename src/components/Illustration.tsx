import React from 'react'

interface IllustrationProps {
  type: 'group-support' | 'conversation' | 'friendly-interaction' | 'lock-shield' | 'clipboard' | 'stethoscope' | 'headphones' | 'calendar' | 'forum-discussion' | 'profile-portrait' | 'question-asking' | 'doctor-helpful' | 'music-listening' | 'reading-book' | 'plant-decorative' | 'wave-pattern' | 'dot-pattern' | 'symptom-tracker' | 'resource-library' | 'appointment-prep'
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export default function Illustration({ type, className = '', size = 'medium' }: IllustrationProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const illustrations = {
    'group-support': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-dusty-pink text-sm">👥</div>
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-sage text-xs">💬</div>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-dusty-pink text-sm">🤝</div>
          </div>
        </div>
      </div>
    ),
    'conversation': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sage text-lg">👩</div>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-dusty-pink text-sm">💭</div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sage text-lg">👩‍🦰</div>
          </div>
        </div>
      </div>
    ),
    'friendly-interaction': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-dusty-pink text-base">😊</div>
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-sage text-sm">💕</div>
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-dusty-pink text-base">🤗</div>
          </div>
        </div>
      </div>
    ),
    'lock-shield': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage text-2xl">🔒</div>
        </div>
      </div>
    ),
    'clipboard': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dusty-pink text-2xl">📋</div>
        </div>
      </div>
    ),
    'stethoscope': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage text-2xl">👩‍⚕️</div>
        </div>
      </div>
    ),
    'headphones': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dusty-pink text-2xl">🎧</div>
        </div>
      </div>
    ),
    'calendar': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage text-2xl">📅</div>
        </div>
      </div>
    ),
    'forum-discussion': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-dusty-pink text-lg">💬</div>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sage text-sm">👥</div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-dusty-pink text-lg">💭</div>
          </div>
        </div>
      </div>
    ),
    'profile-portrait': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage text-2xl">👤</div>
        </div>
      </div>
    ),
    'question-asking': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-dusty-pink text-lg">❓</div>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sage text-sm">📝</div>
          </div>
        </div>
      </div>
    ),
    'doctor-helpful': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage text-2xl">👨‍⚕️</div>
        </div>
      </div>
    ),
    'music-listening': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dusty-pink text-2xl">🎵</div>
        </div>
      </div>
    ),
    'reading-book': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage text-2xl">📚</div>
        </div>
      </div>
    ),
    'symptom-tracker': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dusty-pink text-2xl">📊</div>
        </div>
      </div>
    ),
    'resource-library': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage text-2xl">📖</div>
        </div>
      </div>
    ),
    'appointment-prep': (
      <div className={`text-center ${className}`}>
        <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-dusty-pink to-sage rounded-full flex items-center justify-center shadow-lg`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-dusty-pink text-lg">📋</div>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sage text-sm">✏️</div>
          </div>
        </div>
      </div>
    ),
    'plant-decorative': (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-sage rounded-full opacity-60"></div>
          <div className="w-6 h-6 bg-sage rounded-full opacity-80"></div>
          <div className="w-4 h-4 bg-sage rounded-full opacity-60"></div>
        </div>
      </div>
    ),
    'wave-pattern': (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-dusty-pink opacity-10 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-sage opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-dusty-pink opacity-5 rounded-full"></div>
      </div>
    ),
    'dot-pattern': (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute top-4 left-4 w-2 h-2 bg-sage opacity-20 rounded-full"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-dusty-pink opacity-30 rounded-full"></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-sage opacity-25 rounded-full"></div>
        <div className="absolute bottom-12 right-4 w-1 h-1 bg-dusty-pink opacity-20 rounded-full"></div>
      </div>
    )
  }
  
  return illustrations[type] || illustrations['group-support']
}

