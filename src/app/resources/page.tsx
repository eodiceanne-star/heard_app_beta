'use client'
import React from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import DecorativeIllustrations from '@/components/DecorativeIllustrations'

interface Resource {
  id: string
  title: string
  description: string
  category: string
  url: string
  isExternal: boolean
}

export default function ResourcesPage() {
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Medical Gaslighting',
      description: 'Learn to recognize when your symptoms are being dismissed and how to advocate for yourself.',
      category: 'Education',
      url: '#',
      isExternal: false
    },
    {
      id: '2',
      title: 'Preparing for Doctor Appointments',
      description: 'Tips and strategies to make the most of your limited time with healthcare providers.',
      category: 'Advocacy',
      url: '#',
      isExternal: false
    },
    {
      id: '3',
      title: 'Symptom Tracking Guide',
      description: 'How to effectively document your symptoms to help doctors understand your experience.',
      category: 'Tools',
      url: '#',
      isExternal: false
    },
    {
      id: '4',
      title: 'Finding Supportive Healthcare Providers',
      description: 'Strategies for identifying doctors who listen and take women\'s health concerns seriously.',
      category: 'Advocacy',
      url: '#',
      isExternal: false
    },
    {
      id: '5',
      title: 'Mental Health and Chronic Illness',
      description: 'Understanding the connection between physical symptoms and mental health.',
      category: 'Education',
      url: '#',
      isExternal: false
    },
    {
      id: '6',
      title: 'Building Your Healthcare Team',
      description: 'How to assemble a supportive network of healthcare professionals.',
      category: 'Advocacy',
      url: '#',
      isExternal: false
    }
  ]

  const categories = ['All', 'Education', 'Advocacy', 'Tools']

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      <DecorativeIllustrations />
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="reading-book" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Resource Library</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Educational content and tools to help you navigate your healthcare journey
        </p>
        
        <div className="mobile-card mb-8 relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
          <h2 className="text-3xl font-playfair font-medium text-charcoal mb-6 relative z-10">Featured Resources</h2>
          <p className="text-base text-charcoal leading-relaxed relative z-10">
            Explore our collection of articles, guides, and tools designed to empower you in your healthcare journey.
          </p>
        </div>
        
        <div className="space-y-6">
          {resources.map((resource, index) => (
            <div key={resource.id} className="mobile-card relative overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Card background pattern */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>
              
              <div className="flex items-start space-x-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-sage to-dusty-pink rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                  📖
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-playfair font-medium text-charcoal">{resource.title}</h3>
                    <span className="px-3 py-1 bg-sage bg-opacity-20 text-sage text-sm rounded-full font-medium">
                      {resource.category}
                    </span>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed mb-4">{resource.description}</p>
                  <button className="px-6 py-3 bg-dusty-pink text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors shadow-md">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4">
            <Illustration type="plant-decorative" size="small" />
          </div>
          
          <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Knowledge is Power</h3>
          <p className="text-base text-charcoal leading-relaxed relative z-10">
            Educating yourself about your health and learning to advocate effectively can make a significant difference in your healthcare experience. Remember, you are the expert on your own body.
          </p>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
