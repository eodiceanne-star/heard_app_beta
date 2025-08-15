'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { coolKidsImages } from '@/assets/images/openpeeps'

interface DecorativeIllustrationsProps {
  className?: string
  pageType?: 'dashboard' | 'calendar' | 'tracker' | 'forum' | 'doctors' | 'profile' | 'resources' | 'music' | 'prep' | 'settings'
}

export default function DecorativeIllustrations({ className = '', pageType = 'dashboard' }: DecorativeIllustrationsProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  useEffect(() => {
    // Get all available cool kids images
    const imageEntries = Object.entries(coolKidsImages)
    
    // Filter out non-cool-kids images (keep only the actual character illustrations)
    const coolKidsOnly = imageEntries.filter(([key, path]) => 
      path.includes('/coolkids/') && 
      !path.includes('/plants/') && 
      !path.includes('/patterns/')
    )
    
    // Randomly select 2-3 images for variety
    const numImages = Math.random() > 0.3 ? 3 : 2
    const shuffled = coolKidsOnly.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, numImages).map(([_, path]) => path)
    
    setSelectedImages(selected)
  }, [pageType]) // Re-run when page type changes

  if (selectedImages.length === 0) return null

  // Define strategic positions for each page type
  const getPositionsForPage = (pageType: string) => {
    const basePositions = [
      'top-4 right-4',
      'top-8 left-4', 
      'bottom-8 right-6',
      'bottom-4 left-6',
      'top-1/4 right-8',
      'bottom-1/4 left-8',
      'top-1/3 left-4',
      'bottom-1/3 right-4'
    ]

    // Page-specific position adjustments
    switch (pageType) {
      case 'dashboard':
        return [
          'top-6 right-6',
          'bottom-6 left-6', 
          'top-1/3 left-6'
        ]
      case 'calendar':
        return [
          'top-4 left-4',
          'bottom-4 right-4',
          'top-1/2 right-6'
        ]
      case 'tracker':
        return [
          'top-6 left-6',
          'bottom-6 right-6',
          'top-1/4 right-4'
        ]
      case 'forum':
        return [
          'top-4 right-4',
          'bottom-4 left-4',
          'top-1/3 left-4'
        ]
      case 'doctors':
        return [
          'top-6 left-6',
          'bottom-6 right-6',
          'top-1/2 left-6'
        ]
      case 'profile':
        return [
          'top-4 right-4',
          'bottom-4 left-4',
          'top-1/3 right-6'
        ]
      case 'resources':
        return [
          'top-6 right-6',
          'bottom-6 left-6',
          'top-1/4 left-6'
        ]
      default:
        return basePositions
    }
  }

  const positions = getPositionsForPage(pageType)

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {selectedImages.map((imagePath, index) => {
        const position = positions[index % positions.length]
        
        // Vary sizes for visual interest
        const sizes = ['w-16 h-16', 'w-20 h-20', 'w-18 h-18']
        const size = sizes[index % sizes.length]
        
        // Vary opacity slightly for depth
        const opacities = ['opacity-75', 'opacity-80', 'opacity-85']
        const opacity = opacities[index % opacities.length]
        
        return (
          <div
            key={`${imagePath}-${index}-${pageType}`}
            className={`absolute ${position} ${size} ${opacity} transition-all duration-1000 ease-in-out`}
            style={{
              animationDelay: `${index * 0.3}s`,
              animation: 'fadeInFloat 2s ease-out forwards'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center shadow-lg overflow-hidden p-1">
              <Image
                src={imagePath}
                alt="Decorative illustration"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority={index === 0} // Preload first image
              />
            </div>
          </div>
        )
      })}
      
      <style jsx>{`
        @keyframes fadeInFloat {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          100% {
            opacity: 0.75;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
