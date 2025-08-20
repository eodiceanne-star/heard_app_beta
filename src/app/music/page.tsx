'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import Image from 'next/image'
import { getRandomCoolKidsImage } from '@/assets/images/openpeeps'

interface MusicTrack {
  id: string
  title: string
  artist: string
  url: string
}

export default function MusicPage() {
  const [customTracks, setCustomTracks] = useState<MusicTrack[]>([])
  const [hiddenRecommendedTracks, setHiddenRecommendedTracks] = useState<string[]>([])
  const [newTrack, setNewTrack] = useState({ title: '', artist: '', url: '' })
  
  // Randomized images for this page load
  const [randomBackgroundImage, setRandomBackgroundImage] = useState('')

  // Initialize random images on mount
  useEffect(() => {
    try {
      const image = getRandomCoolKidsImage()
      setRandomBackgroundImage(image || '/assets/images/openpeeps/coolkids/cool-kids-1.png')
    } catch (error) {
      console.log('Error loading random image:', error)
      setRandomBackgroundImage('/assets/images/openpeeps/coolkids/cool-kids-1.png')
    }
  }, [])

  const samplePlaylist: MusicTrack[] = [
    {
      id: '1',
      title: 'Weightless',
      artist: 'Marconi Union',
      url: 'https://www.youtube.com/watch?v=UfcAVejslrU'
    },
    {
      id: '2',
      title: 'Claire de Lune',
      artist: 'Debussy',
      url: 'https://www.youtube.com/watch?v=CvFH_6DNRCY'
    },
    {
      id: '3',
      title: 'River Flows in You',
      artist: 'Yiruma',
      url: 'https://www.youtube.com/watch?v=7maJOI3QMu0'
    },
    {
      id: '4',
      title: 'Gymnopédie No. 1',
      artist: 'Erik Satie',
      url: 'https://www.youtube.com/watch?v=S-Xm7s9eGxU'
    }
  ]

  useEffect(() => {
    const saved = localStorage.getItem('heardCustomMusic')
    if (saved) {
      setCustomTracks(JSON.parse(saved))
    }
    
    const savedHidden = localStorage.getItem('heardHiddenRecommendedTracks')
    if (savedHidden) {
      setHiddenRecommendedTracks(JSON.parse(savedHidden))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('heardCustomMusic', JSON.stringify(customTracks))
  }, [customTracks])

  useEffect(() => {
    localStorage.setItem('heardHiddenRecommendedTracks', JSON.stringify(hiddenRecommendedTracks))
  }, [hiddenRecommendedTracks])

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTrack.title.trim() || !newTrack.artist.trim() || !newTrack.url.trim()) {
      console.log('Please fill in all required fields')
      return
    }

    const track: MusicTrack = {
      id: Date.now().toString(),
      title: newTrack.title,
      artist: newTrack.artist,
      url: newTrack.url
    }

    setCustomTracks([track, ...customTracks])
    setNewTrack({ title: '', artist: '', url: '' })
    console.log('Track added successfully!')
  }

  const handleRemoveTrack = (id: string) => {
    // Check if it's a recommended track
    const isRecommendedTrack = samplePlaylist.some(track => track.id === id)
    
    if (isRecommendedTrack) {
      // For recommended tracks, add to hidden list
      setHiddenRecommendedTracks(prev => [...prev, id])
      console.log('Recommended track hidden')
    } else {
      // For custom tracks, remove from localStorage
      const updatedCustomTracks = customTracks.filter(track => track.id !== id)
      setCustomTracks(updatedCustomTracks)
      console.log('Custom track removed successfully!')
    }
  }

  const handlePlayTrack = (track: MusicTrack) => {
    console.log(`Playing track: ${track.title} by ${track.artist}`)
    // Placeholder for play functionality
  }

  const handleShareTrack = (track: MusicTrack) => {
    console.log(`Sharing track: ${track.title} by ${track.artist}`)
    // Placeholder for share functionality
  }

  const handleClearAllTracks = () => {
    setCustomTracks([])
    console.log('All custom tracks cleared')
  }

  const visibleRecommendedTracks = samplePlaylist.filter(track => !hiddenRecommendedTracks.includes(track.id))
  const allTracks = [...visibleRecommendedTracks, ...customTracks]

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      {/* Random Cool Kids illustration */}
      {randomBackgroundImage && (
        <div className="fixed bottom-8 right-8 w-32 h-32 opacity-60 pointer-events-none z-0">
          <Image
            src={randomBackgroundImage}
            alt="Cool kids illustration"
            width={128}
            height={128}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      )}
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="music-listening" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Calming Music</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Relaxing playlists to help you find peace and reduce stress
        </p>
        
        {/* Action Buttons */}
        <div className="mb-8 text-center space-y-4">
          {customTracks.length > 0 && (
            <button
              onClick={handleClearAllTracks}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 transition-colors"
            >
              Clear All Custom Tracks
            </button>
          )}
          {hiddenRecommendedTracks.length > 0 && (
            <button
              onClick={() => setHiddenRecommendedTracks([])}
              className="px-6 py-3 bg-sage text-white rounded-2xl font-medium hover:bg-sage-dark transition-colors"
            >
              Restore Recommended Tracks
            </button>
          )}
        </div>
        
        <div className="mobile-card mb-8 relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
          <h2 className="text-3xl font-playfair font-medium text-charcoal mb-6 relative z-10">Add Your Own Track</h2>
          <form onSubmit={handleAddTrack} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">Title</label>
                <input
                  type="text"
                  value={newTrack.title}
                  onChange={(e) => setNewTrack(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  placeholder="Song title"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">Artist</label>
                <input
                  type="text"
                  value={newTrack.artist}
                  onChange={(e) => setNewTrack(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  placeholder="Artist name"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-charcoal mb-3">URL</label>
              <input
                type="url"
                value={newTrack.url}
                onChange={(e) => setNewTrack(prev => ({ ...prev, url: e.target.value }))}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                placeholder="YouTube, Spotify, or other music link"
              />
            </div>
            <button type="submit" className="mobile-button w-full text-lg py-4">
              Add Track
            </button>
          </form>
        </div>
        
        <div className="space-y-6">
          {allTracks.map((track, index) => (
            <div key={track.id} className="mobile-card relative overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Card background pattern */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-dusty-pink to-sage rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                    🎵
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-playfair font-medium text-charcoal mb-1">{track.title}</h3>
                    <p className="text-lg text-sage font-medium">{track.artist}</p>
                    {visibleRecommendedTracks.some(recTrack => recTrack.id === track.id) && (
                      <span className="inline-block mt-2 px-3 py-1 bg-sage bg-opacity-20 text-sage text-sm rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                </div>
                
                                 <div className="flex items-center space-x-2">
                                     <button
                     onClick={() => handlePlayTrack(track)}
                     className="px-3 py-2 bg-dusty-pink text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors shadow-md text-sm"
                   >
                     Play
                   </button>
                   <button
                     onClick={() => handleShareTrack(track)}
                     className="px-3 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm"
                   >
                     Share
                   </button>
                                     <button
                     onClick={() => handleRemoveTrack(track.id)}
                     className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors shadow-sm text-xs"
                     title="Delete track"
                   >
                     ✕
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
          
          <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Relaxation Tips</h3>
          <div className="space-y-3 text-base text-charcoal leading-relaxed relative z-10">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>Find a quiet space and close your eyes while listening</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>Practice deep breathing - inhale for 4 counts, exhale for 6</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>Let your mind wander without judgment</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>Try listening for at least 10-15 minutes for best results</p>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
