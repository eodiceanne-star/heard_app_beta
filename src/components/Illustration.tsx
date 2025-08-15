'use client'
import React from 'react'
import Image from 'next/image'
import { getImageByType } from '@/assets/images/openpeeps'

interface IllustrationProps {
  type: 'group-support' | 'conversation' | 'friendly-interaction' | 'lock-shield' | 'clipboard' | 'stethoscope' | 'headphones' | 'calendar' | 'forum-discussion' | 'profile-portrait' | 'question-asking' | 'doctor-helpful' | 'music-listening' | 'reading-book' | 'plant-decorative' | 'wave-pattern' | 'dot-pattern' | 'symptom-tracker' | 'resource-library' | 'appointment-prep' | 'home-plant' | 'forum-messages' | 'doctor-wheels' | 'symptom-notebook' | 'profile-default'
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export default function Illustration({ type, className = '', size = 'medium' }: IllustrationProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const sizePixels = {
    small: 64,
    medium: 96,
    large: 128
  }

  // Get the image path for the type
  const imagePath = getImageByType(type)
  
  // For background patterns, use CSS-based patterns
  if (type === 'wave-pattern' || type === 'dot-pattern') {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {type === 'wave-pattern' && (
          <>
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-dusty-pink opacity-10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-sage opacity-10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-dusty-pink opacity-5 rounded-full"></div>
          </>
        )}
        {type === 'dot-pattern' && (
          <>
            <div className="absolute top-4 left-4 w-2 h-2 bg-sage opacity-20 rounded-full"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-dusty-pink opacity-30 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-sage opacity-25 rounded-full"></div>
            <div className="absolute bottom-12 right-4 w-1 h-1 bg-dusty-pink opacity-20 rounded-full"></div>
          </>
        )}
      </div>
    )
  }

  // For plant decorative, use simple CSS circles
  if (type === 'plant-decorative') {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-sage rounded-full opacity-60"></div>
          <div className="w-6 h-6 bg-sage rounded-full opacity-80"></div>
          <div className="w-4 h-4 bg-sage rounded-full opacity-60"></div>
        </div>
      </div>
    )
  }

  // For actual images, use Next.js Image component
  return (
    <div className={`text-center ${className}`}>
      <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center shadow-lg overflow-hidden`}>
        <Image
          src={imagePath}
          alt={`${type} illustration`}
          width={sizePixels[size]}
          height={sizePixels[size]}
          className="w-full h-full object-contain object-center"
          priority={size === 'large'}
          onError={(e) => {
            // Fallback to emoji if image fails to load
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-charcoal text-2xl">🌱</div>'
            }
          }}
        />
      </div>
    </div>
  )
}

