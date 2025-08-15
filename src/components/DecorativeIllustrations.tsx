'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { coolKidsImages } from '@/assets/images/openpeeps'

interface DecorativeIllustrationsProps {
  className?: string
}

export default function DecorativeIllustrations({ className = '' }: DecorativeIllustrationsProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  useEffect(() => {
    // Get all available cool kids images
    const imageEntries = Object.entries(coolKidsImages)
    
    // Randomly select 1-2 images
    const numImages = Math.random() > 0.5 ? 1 : 2
    const shuffled = imageEntries.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, numImages).map(([_, path]) => path)
    
    setSelectedImages(selected)
  }, [])

  if (selectedImages.length === 0) return null

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {selectedImages.map((imagePath, index) => {
        // Define different positions for variety
        const positions = [
          'top-4 right-4',
          'top-8 left-4',
          'bottom-8 right-6',
          'bottom-4 left-6',
          'top-1/4 right-8',
          'bottom-1/4 left-8'
        ]
        
        const position = positions[index % positions.length]
        const size = Math.random() > 0.5 ? 'w-16 h-16' : 'w-20 h-20'
        
        return (
          <div
            key={`${imagePath}-${index}`}
            className={`absolute ${position} ${size} opacity-80 transition-all duration-1000 ease-in-out`}
            style={{
              animationDelay: `${index * 0.5}s`,
              animation: 'fadeInFloat 2s ease-out forwards'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              <Image
                src={imagePath}
                alt="Decorative illustration"
                width={64}
                height={64}
                className="w-full h-full object-contain object-center"
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
            opacity: 0.8;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
