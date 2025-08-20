'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import Image from 'next/image'
import doctorsData from '@/data/doctors.json'
import { getRandomCoolKidsImage, getRandomAvatar } from '@/assets/images/openpeeps'

interface Doctor {
  id: string
  name: string
  specialty: string
  location: string
  city: string
  state: string
  zipCode: string
  contact?: string
  rating: number
  reviewCount: number
  reviews: Review[]
  acceptingPatients: boolean
  createdAt: Date
}

interface Review {
  id: string
  doctorId: string
  userId: string
  userDisplayName: string
  userAvatar?: string
  rating: number
  text: string
  tags: string[]
  createdAt: Date
}

interface NewDoctor {
  name: string
  specialty: string
  city: string
  state: string
  zipCode: string
  contact: string
}

interface NewReview {
  rating: number
  text: string
  tags: string[]
}

const SPECIALTY_OPTIONS = [
  'Primary Care',
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Gynecology',
  'Neurology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Rheumatology',
  'Urology',
  'Other'
]

const REVIEW_TAGS = [
  'Felt listened to',
  'Did not feel rushed',
  'Explained things clearly',
  'Dismissive',
  'Took concerns seriously',
  'Good bedside manner',
  'Knowledgeable',
  'Rushed appointment',
  'Did not explain clearly',
  'Unprofessional'
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [searchZip, setSearchZip] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [newDoctor, setNewDoctor] = useState<NewDoctor>({
    name: '',
    specialty: '',
    city: '',
    state: '',
    zipCode: '',
    contact: ''
  })
  const [newReview, setNewReview] = useState<NewReview>({
    rating: 5,
    text: '',
    tags: []
  })
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Randomized images for this page load
  const [randomDoctorAvatar, setRandomDoctorAvatar] = useState('')
  const [randomBackgroundImage, setRandomBackgroundImage] = useState('')

  // Set client flag on mount and initialize random images
  useEffect(() => {
    setIsClient(true)
    try {
      const avatar = getRandomCoolKidsImage()
      const background = getRandomCoolKidsImage()
      setRandomDoctorAvatar(avatar || '/assets/images/openpeeps/coolkids/cool-kids-1.png')
      setRandomBackgroundImage(background || '/assets/images/openpeeps/coolkids/cool-kids-1.png')
    } catch (error) {
      console.log('Error loading random images:', error)
      setRandomDoctorAvatar('/assets/images/openpeeps/coolkids/cool-kids-1.png')
      setRandomBackgroundImage('/assets/images/openpeeps/coolkids/cool-kids-1.png')
    }
  }, [])

  // Load initial data and user profile
  useEffect(() => {
    if (!isClient) return

    // Load pre-seeded doctors data and convert to new format
    const seededDoctors: Doctor[] = doctorsData.map((doc: any) => {
      // Parse location into city and state
      const locationParts = doc.location.split(', ')
      const city = locationParts[0] || ''
      const state = locationParts[1] || ''
      
      // Convert old review format to new format
      const reviews = (doc.reviews || []).map((review: any) => ({
        id: Math.random().toString(),
        doctorId: doc.id.toString(),
        userId: 'anonymous',
        userDisplayName: 'Anonymous',
        userAvatar: undefined,
        rating: review.rating,
        text: review.text,
        tags: review.qualifiers || [],
        createdAt: new Date()
      }))
      
      return {
        id: doc.id.toString(),
        name: doc.name,
        specialty: doc.specialty,
        location: doc.location,
        city,
        state,
        zipCode: doc.zipCode,
        contact: undefined,
        rating: doc.rating,
        reviewCount: reviews.length,
        reviews,
        acceptingPatients: doc.acceptingPatients,
        createdAt: new Date()
      }
    })
    
    // Load user-added doctors from localStorage (simulating Firestore)
    const userDoctors = JSON.parse(localStorage.getItem('heardUserDoctors') || '[]')
    const allDoctors = [...seededDoctors, ...userDoctors]
    setDoctors(allDoctors)
    setFilteredDoctors(allDoctors)

    // Load user profile
    const profile = JSON.parse(localStorage.getItem('heardProfile') || 'null')
    setUserProfile(profile)
  }, [isClient])

  // Filter doctors based on search criteria
  useEffect(() => {
    let filtered = doctors

    if (searchZip) {
      filtered = filtered.filter(doctor => 
        doctor.zipCode.includes(searchZip)
      )
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => 
        doctor.specialty === selectedSpecialty
      )
    }

    if (minRating > 0) {
      filtered = filtered.filter(doctor => 
        doctor.rating >= minRating
      )
    }

    setFilteredDoctors(filtered)
  }, [doctors, searchZip, selectedSpecialty, minRating])

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDoctor.name.trim() || !newDoctor.specialty.trim() || !newDoctor.city.trim() || !newDoctor.state.trim()) {
      console.log('Please fill in all required fields')
      return
    }

    const doctor: Doctor = {
      id: Date.now().toString(),
      name: newDoctor.name,
      specialty: newDoctor.specialty,
      location: `${newDoctor.city}, ${newDoctor.state}`,
      city: newDoctor.city,
      state: newDoctor.state,
      zipCode: newDoctor.zipCode,
      contact: newDoctor.contact,
      rating: 0,
      reviewCount: 0,
      reviews: [],
      acceptingPatients: true,
      createdAt: new Date()
    }

    const updatedDoctors = [doctor, ...doctors]
    setDoctors(updatedDoctors)
    
    // Save to localStorage (simulating Firestore)
    const userDoctors = updatedDoctors.filter(d => !doctorsData.find(seed => seed.id.toString() === d.id))
    localStorage.setItem('heardUserDoctors', JSON.stringify(userDoctors))
    
    setNewDoctor({
      name: '',
      specialty: '',
      city: '',
      state: '',
      zipCode: '',
      contact: ''
    })
    setShowAddDoctorForm(false)
    console.log('Doctor added successfully!')
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDoctor || !userProfile || !newReview.text.trim()) {
      console.log('Please fill in all required fields')
      return
    }

    const review: Review = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      userId: userProfile.id || 'anonymous',
      userDisplayName: userProfile.displayName || 'Anonymous',
      userAvatar: userProfile.avatar,
      rating: newReview.rating,
      text: newReview.text,
      tags: newReview.tags,
      createdAt: new Date()
    }

    const updatedDoctors = doctors.map(doctor => {
      if (doctor.id === selectedDoctor.id) {
        const updatedReviews = [review, ...doctor.reviews]
        const avgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
        return {
          ...doctor,
          reviews: updatedReviews,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: updatedReviews.length
        }
      }
      return doctor
    })

    setDoctors(updatedDoctors)
    setSelectedDoctor(updatedDoctors.find(d => d.id === selectedDoctor.id) || null)
    
    // Save to localStorage
    const userDoctors = updatedDoctors.filter(d => !doctorsData.find(seed => seed.id.toString() === d.id))
    localStorage.setItem('heardUserDoctors', JSON.stringify(userDoctors))
    
    setNewReview({
      rating: 5,
      text: '',
      tags: []
    })
    setShowReviewForm(false)
    console.log('Review submitted successfully!')
  }

  const handleTagToggle = (tag: string) => {
    setNewReview(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleClearFilters = () => {
    setSearchZip('')
    setSelectedSpecialty('')
    setMinRating(0)
    console.log('Filters cleared')
  }

  const handleReportDoctor = (doctorId: string) => {
    console.log(`Report submitted for doctor ${doctorId}`)
    // Placeholder for report functionality
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => interactive && onRatingChange?.(i)}
          className={`${interactive ? 'cursor-pointer' : ''} ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          disabled={!interactive}
        >
          ⭐
        </button>
      )
    }
    return stars
  }

  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)))

  // Show loading state until client-side data is loaded
  if (!isClient) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dusty-pink"></div>
              </div>
              <p className="text-charcoal">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedDoctor) {
    return (
      <div className="page-container relative">
        {/* Background decorative elements */}
        <Illustration type="wave-pattern" className="pointer-events-none" />
        <Illustration type="dot-pattern" className="pointer-events-none" />
        
        {/* Random Cool Kids illustration */}
        {randomBackgroundImage && (
          <div className="fixed bottom-8 left-8 w-32 h-32 opacity-60 pointer-events-none z-0">
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
          {/* Back button */}
          <button
            onClick={() => setSelectedDoctor(null)}
            className="mb-6 flex items-center text-dusty-pink hover:text-opacity-80 transition-colors"
          >
            ← Back to Doctor Directory
          </button>

          {/* Doctor Profile */}
          <div className="mobile-card mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
            
            <div className="relative z-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center shadow-lg overflow-hidden p-3">
                    <Image
                      src={randomDoctorAvatar}
                      alt="Doctor avatar"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-playfair font-semibold text-charcoal mb-2 truncate">{selectedDoctor.name}</h1>
                  <p className="text-lg text-sage font-medium mb-2 truncate">{selectedDoctor.specialty}</p>
                  <p className="text-base text-gray-600 mb-3 truncate">{selectedDoctor.location}</p>
                  
                                       <div className="flex items-center space-x-2 mb-3 p-2">
                       <div className="flex space-x-1">
                         {renderStars(selectedDoctor.rating)}
                       </div>
                       <span className="text-base text-charcoal font-medium">{selectedDoctor.rating}</span>
                       <span className="text-sm text-gray-500">({selectedDoctor.reviewCount})</span>
                     </div>
                  
                  {selectedDoctor.contact && (
                    <p className="text-sm text-gray-600 truncate">Contact: {selectedDoctor.contact}</p>
                  )}
                </div>
              </div>
             
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedDoctor.acceptingPatients 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {selectedDoctor.acceptingPatients ? 'Accepting Patients' : 'Not Accepting Patients'}
                </span>
                
                <div className="flex space-x-2">
                  {userProfile && (
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-6 py-3 bg-dusty-pink text-white rounded-2xl font-medium hover:bg-dusty-pink-dark transition-colors shadow-md"
                    >
                      {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                    </button>
                  )}
                  <button
                    onClick={() => handleReportDoctor(selectedDoctor.id)}
                    className="px-4 py-3 bg-gray-200 text-gray-800 rounded-2xl font-medium hover:bg-gray-300 transition-colors shadow-md"
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          {showReviewForm && userProfile && (
            <div className="mobile-card mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-8 -mt-8"></div>
              
              <h2 className="text-2xl font-playfair font-medium text-charcoal mb-6 relative z-10">Write a Review</h2>
              <form onSubmit={handleAddReview} className="space-y-6 relative z-10">
                                 <div>
                   <label className="block text-lg font-medium text-charcoal mb-3">Rating</label>
                   <div className="flex space-x-1 mb-2 p-2 bg-gray-50 rounded-lg">
                     {renderStars(newReview.rating, true, (rating) => setNewReview(prev => ({ ...prev, rating })))}
                   </div>
                   <p className="text-sm text-gray-500">Click stars to rate</p>
                 </div>
                
                <div>
                  <label className="block text-lg font-medium text-charcoal mb-3">Review</label>
                  <textarea
                    value={newReview.text}
                    onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                    rows={4}
                    placeholder="Share your experience with this doctor..."
                    required
                  />
                </div>
                
                                  <div>
                    <label className="block text-lg font-medium text-charcoal mb-3">Tags (select all that apply)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {REVIEW_TAGS.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                            newReview.tags.includes(tag)
                              ? 'bg-dusty-pink text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                
                <button type="submit" className="w-full bg-dusty-pink text-white py-3 rounded-2xl font-medium hover:bg-dusty-pink-dark transition-colors shadow-md">
                  Submit Review
                </button>
              </form>
            </div>
          )}

          {/* Reviews */}
          <div className="mobile-card relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-sage to-transparent opacity-10 rounded-full -mr-8 -mb-8"></div>
            
            <h2 className="text-2xl font-playfair font-medium text-charcoal mb-6 relative z-10">Recent Reviews</h2>
            
            <div className="space-y-6 relative z-10">
              {selectedDoctor.reviews.length > 0 ? (
                selectedDoctor.reviews.slice(0, 5).map(review => (
                  <div key={review.id} className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center shadow-md overflow-hidden p-1">
                          <Image
                            src={review.userAvatar || getRandomAvatar()}
                            alt="User avatar"
                            width={64}
                            height={64}
                            className="w-full h-full object-contain object-center"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{review.userDisplayName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                                             <div className="flex space-x-1 p-1">
                         {renderStars(review.rating)}
                       </div>
                    </div>
                    
                    <p className="text-base text-charcoal leading-relaxed mb-4">{review.text}</p>
                    
                    {review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {review.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-dusty-pink bg-opacity-20 text-dusty-pink text-sm rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this doctor!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Navigation />
      </div>
    )
  }

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      {/* Random Cool Kids illustration */}
      {randomBackgroundImage && (
        <div className="fixed bottom-8 left-8 w-32 h-32 opacity-60 pointer-events-none z-0">
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
          <Illustration type="doctor-wheels" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Find a Doctor</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Discover supportive healthcare professionals who listen and care
        </p>
        
        {/* Add Doctor Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddDoctorForm(!showAddDoctorForm)}
            className="w-full mobile-button"
          >
            {showAddDoctorForm ? 'Cancel' : '+ Add Doctor to Directory'}
          </button>
        </div>

        {/* Add Doctor Form */}
        {showAddDoctorForm && (
          <div className="mobile-card mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-8 -mt-8"></div>
            
            <h2 className="text-2xl font-playfair font-medium text-charcoal mb-6 relative z-10">Add New Doctor</h2>
            <form onSubmit={handleAddDoctor} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-medium text-charcoal mb-3">Doctor Name</label>
                  <input
                    type="text"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                    placeholder="Enter doctor's name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-charcoal mb-3">Specialty</label>
                  <select
                    value={newDoctor.specialty}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                    required
                  >
                    <option value="">Select specialty</option>
                    {SPECIALTY_OPTIONS.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-charcoal mb-3">City</label>
                  <input
                    type="text"
                    value={newDoctor.city}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                    placeholder="Enter city"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-charcoal mb-3">State</label>
                  <input
                    type="text"
                    value={newDoctor.state}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                    placeholder="Enter state"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-charcoal mb-3">ZIP Code</label>
                  <input
                    type="text"
                    value={newDoctor.zipCode}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                    placeholder="Enter ZIP code"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-charcoal mb-3">Contact (Optional)</label>
                  <input
                    type="text"
                    value={newDoctor.contact}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                    placeholder="Phone number or email"
                  />
                </div>
              </div>
              
              <button type="submit" className="w-full mobile-button">
                Add Doctor
              </button>
            </form>
          </div>
        )}
        
        {/* Filter & Search */}
        <div className="mobile-card mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-2xl font-playfair font-medium text-charcoal">Filter & Search</h2>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">ZIP Code</label>
                <input
                  type="text"
                  value={searchZip}
                  onChange={(e) => setSearchZip(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  placeholder="Enter ZIP code"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">Minimum Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                >
                  <option value={0}>Any Rating</option>
                  <option value={1}>1+ Stars</option>
                  <option value={2}>2+ Stars</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor List */}
        <div className="space-y-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="mobile-card relative overflow-hidden hover:shadow-xl transition-all duration-300 p-6">
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>
              
              <div className="relative z-10">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center shadow-lg overflow-hidden p-2">
                      <Image
                        src={randomDoctorAvatar}
                        alt="Doctor avatar"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-playfair font-medium text-charcoal mb-1 truncate">{doctor.name}</h3>
                    <p className="text-base text-sage font-medium mb-1 truncate">{doctor.specialty}</p>
                    <p className="text-sm text-gray-600 mb-2 truncate">{doctor.location}</p>
                    
                                         <div className="flex items-center space-x-2 mb-3 p-1">
                       <div className="flex space-x-1">
                         {renderStars(doctor.rating)}
                       </div>
                       <span className="text-sm text-charcoal font-medium">{doctor.rating}</span>
                       <span className="text-xs text-gray-500">({doctor.reviewCount})</span>
                     </div>
                    
                    {doctor.reviews.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-charcoal leading-relaxed mb-2 line-clamp-2">
                          "{doctor.reviews[0].text}"
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.reviews[0].tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-dusty-pink bg-opacity-20 text-dusty-pink text-xs rounded-full font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
               
                <div className="flex items-center justify-between">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    doctor.acceptingPatients 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {doctor.acceptingPatients ? 'Accepting Patients' : 'Not Accepting Patients'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="px-6 py-3 bg-dusty-pink text-white rounded-2xl font-medium hover:bg-dusty-pink-dark transition-colors shadow-md"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleReportDoctor(doctor.id)}
                      className="px-4 py-3 bg-gray-200 text-gray-800 rounded-2xl font-medium hover:bg-gray-300 transition-colors shadow-md"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-lg">
              🔍
            </div>
            <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">No doctors found</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Try adjusting your search criteria or add a new doctor to the directory.
            </p>
          </div>
        )}
        
        <div className="mt-12 p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Illustration type="plant-decorative" size="small" />
          </div>
          
          <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Finding the Right Doctor</h3>
          <p className="text-base text-charcoal leading-relaxed relative z-10">
            Remember that finding a healthcare provider who listens and takes your concerns seriously is crucial. Don't hesitate to schedule consultations with multiple doctors to find the right fit for your healthcare journey.
          </p>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
