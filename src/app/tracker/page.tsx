'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import DecorativeIllustrations from '@/components/DecorativeIllustrations'

interface SymptomEntry {
  id: string
  date: string
  mood: string
  diet: string
  painLevel: number
  painLocation: string
  notes: string
}

export default function TrackerPage() {
  const [entries, setEntries] = useState<SymptomEntry[]>([])
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: '',
    diet: '',
    painLevel: 5,
    painLocation: '',
    notes: ''
  })

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('symptomEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('symptomEntries', JSON.stringify(entries))
  }, [entries])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: SymptomEntry = {
      id: Date.now().toString(),
      ...formData
    }
    setEntries([newEntry, ...entries])
    setFormData({
      date: new Date().toISOString().split('T')[0],
      mood: '',
      diet: '',
      painLevel: 5,
      painLocation: '',
      notes: ''
    })
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const exportToPDF = () => {
    // Simple text export for now - can be enhanced with proper PDF generation
    const content = entries.map(entry => 
      `Date: ${entry.date}
Mood: ${entry.mood}
Diet: ${entry.diet}
Pain Level: ${entry.painLevel}/10
Pain Location: ${entry.painLocation}
Notes: ${entry.notes}
---`
    ).join('\n\n')
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'symptom-tracker-export.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const moodOptions = ['Great', 'Good', 'Okay', 'Not great', 'Terrible']

  return (
    <div className="page-container relative">
      <DecorativeIllustrations pageType="tracker" />
      <div className="content-container relative z-10">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="symptom-notebook" size="large" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Symptom Tracker
        </h1>

        {/* Add Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4">
              Add New Entry
            </h2>
            
            {/* Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>

            {/* Mood */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                How are you feeling today?
              </label>
              <select
                value={formData.mood}
                onChange={(e) => handleInputChange('mood', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              >
                <option value="">Select your mood</option>
                {moodOptions.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>

            {/* Diet */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Diet Notes
              </label>
              <textarea
                value={formData.diet}
                onChange={(e) => handleInputChange('diet', e.target.value)}
                placeholder="What did you eat today? Any food reactions?"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Pain Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Pain Level (0-10)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => handleInputChange('painLevel', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-charcoal min-w-[2rem]">
                  {formData.painLevel}
                </span>
              </div>
            </div>

            {/* Pain Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Pain Location
              </label>
              <input
                type="text"
                value={formData.painLocation}
                onChange={(e) => handleInputChange('painLocation', e.target.value)}
                placeholder="Where does it hurt?"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any other symptoms or observations?"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-dusty-pink text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              Save Entry
            </button>
          </div>
        </form>

        {/* Export Button */}
        {entries.length > 0 && (
          <div className="mb-6">
            <button
              onClick={exportToPDF}
              className="w-full bg-sage text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              Export to File
            </button>
          </div>
        )}

        {/* Entries List */}
        {entries.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-playfair font-medium text-charcoal">
              Recent Entries
            </h2>
            {entries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-charcoal">{entry.date}</span>
                  <span className="text-sm text-gray-500">Pain: {entry.painLevel}/10</span>
                </div>
                {entry.mood && (
                  <p className="text-sm text-charcoal mb-1">Mood: {entry.mood}</p>
                )}
                {entry.painLocation && (
                  <p className="text-sm text-charcoal mb-1">Location: {entry.painLocation}</p>
                )}
                {entry.notes && (
                  <p className="text-sm text-charcoal">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Navigation />
    </div>
  )
}
