'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

interface MusicTrack {
  id: string
  title: string
  artist: string
  url: string
  isCustom: boolean
}

export default function MusicPage() {
  const [customTracks, setCustomTracks] = useState<MusicTrack[]>([])
  const [newTrack, setNewTrack] = useState({ title: '', artist: '', url: '' })

  const samplePlaylist: MusicTrack[] = [
    {
      id: '1',
      title: 'Weightless',
      artist: 'Marconi Union',
      url: 'https://open.spotify.com/track/2I237KhVzhQ5v4g38k8WBp',
      isCustom: false
    },
    {
      id: '2',
      title: 'Claire de Lune',
      artist: 'Debussy',
      url: 'https://open.spotify.com/track/2J6P4QsUKDTcBnuamM7I0O',
      isCustom: false
    },
    {
      id: '3',
      title: 'River Flows in You',
      artist: 'Yiruma',
      url: 'https://open.spotify.com/track/7ySqfzTt108k8bgjwFc8iT',
      isCustom: false
    },
    {
      id: '4',
      title: 'Gymnopédie No.1',
      artist: 'Erik Satie',
      url: 'https://open.spotify.com/track/6i0anC2i4t7aE9OaxWjpLZ',
      isCustom: false
    }
  ]

  // Load custom tracks from localStorage
  useEffect(() => {
    const savedTracks = localStorage.getItem('customMusicTracks')
    if (savedTracks) {
      setCustomTracks(JSON.parse(savedTracks))
    }
  }, [])

  // Save custom tracks to localStorage
  useEffect(() => {
    localStorage.setItem('customMusicTracks', JSON.stringify(customTracks))
  }, [customTracks])

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTrack.title && newTrack.artist && newTrack.url) {
      const track: MusicTrack = {
        id: Date.now().toString(),
        ...newTrack,
        isCustom: true
      }
      setCustomTracks([...customTracks, track])
      setNewTrack({ title: '', artist: '', url: '' })
    }
  }

  const handleRemoveTrack = (id: string) => {
    setCustomTracks(customTracks.filter(track => track.id !== id))
  }

  const allTracks = [...samplePlaylist, ...customTracks]

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="headphones" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Calming Music
        </h1>

        {/* Add Custom Track */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4">
            Add Your Own Track
          </h2>
          <form onSubmit={handleAddTrack} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Song Title
              </label>
              <input
                type="text"
                value={newTrack.title}
                onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                placeholder="Enter song title"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Artist
              </label>
              <input
                type="text"
                value={newTrack.artist}
                onChange={(e) => setNewTrack({ ...newTrack, artist: e.target.value })}
                placeholder="Enter artist name"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Music Link
              </label>
              <input
                type="url"
                value={newTrack.url}
                onChange={(e) => setNewTrack({ ...newTrack, url: e.target.value })}
                placeholder="Spotify, YouTube, or other music link"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-dusty-pink text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              Add Track
            </button>
          </form>
        </div>

        {/* Playlist */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair font-medium text-charcoal">
            Calming Playlist
          </h2>
          
          {allTracks.map((track) => (
            <div key={track.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-charcoal">{track.title}</h3>
                  <p className="text-sm text-gray-600">{track.artist}</p>
                  {track.isCustom && (
                    <span className="inline-block bg-sage bg-opacity-20 text-sage text-xs px-2 py-1 rounded-full mt-1">
                      Your Track
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dusty-pink text-white px-3 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-colors duration-200"
                  >
                    🎵 Listen
                  </a>
                  {track.isCustom && (
                    <button
                      onClick={() => handleRemoveTrack(track.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Relaxation Tips */}
        <div className="mt-8 p-6 bg-sage bg-opacity-10 rounded-2xl">
          <h3 className="text-lg font-playfair font-medium text-charcoal mb-3">
            💡 Relaxation Tips
          </h3>
          <ul className="text-sm text-charcoal space-y-2">
            <li>• Find a quiet space and close your eyes</li>
            <li>• Take slow, deep breaths while listening</li>
            <li>• Let your mind wander without judgment</li>
            <li>• Try listening for 10-15 minutes daily</li>
          </ul>
        </div>
      </div>
      
      <Navigation />
    </div>
  )
}
