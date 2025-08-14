'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import doctorsData from '@/data/doctors.json'

interface Doctor {
  id: number
  name: string
  specialty: string
  location: string
  zipCode: string
  rating: number
  reviews: {
    rating: number
    text: string
    qualifiers: string[]
  }[]
  acceptingPatients: boolean
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsData)
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctorsData)
  const [searchZip, setSearchZip] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [minRating, setMinRating] = useState(0)

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

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ⭐
        </span>
      )
    }
    return stars
  }

  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)))

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="doctor-helpful" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Find a Doctor</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Discover supportive healthcare professionals who listen and care
        </p>
        
        <div className="mobile-card mb-8 relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
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
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="mobile-card relative overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Card background pattern */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-playfair font-medium text-charcoal mb-2">{doctor.name}</h3>
                    <p className="text-lg text-sage font-medium mb-2">{doctor.specialty}</p>
                    <p className="text-base text-gray-600 mb-3">{doctor.location}</p>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex space-x-1">
                        {renderStars(doctor.rating)}
                      </div>
                      <span className="text-base text-charcoal font-medium">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">({doctor.reviews.length} reviews)</span>
                    </div>
                    
                    {doctor.reviews.length > 0 && (
                      <div className="mb-4">
                        <p className="text-base text-charcoal leading-relaxed mb-3">
                          "{doctor.reviews[0].text}"
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {doctor.reviews[0].qualifiers.map((qualifier, index) => (
                            <span key={index} className="px-3 py-1 bg-dusty-pink bg-opacity-20 text-dusty-pink text-sm rounded-full font-medium">
                              {qualifier}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                      👩‍⚕️
                    </div>
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
                  
                  <button className="px-6 py-3 bg-dusty-pink text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors shadow-md">
                    View Profile
                  </button>
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
              Try adjusting your search criteria to find more healthcare professionals in your area.
            </p>
          </div>
        )}
        
        <div className="mt-12 p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
          {/* Background decorative elements */}
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
