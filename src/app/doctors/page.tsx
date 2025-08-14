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
  reviews: Array<{
    rating: number
    text: string
    qualifiers: string[]
  }>
  acceptingPatients: boolean
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsData)
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctorsData)
  const [searchZip, setSearchZip] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [minRating, setMinRating] = useState(0)

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)))

  useEffect(() => {
    let filtered = doctors

    if (searchZip) {
      filtered = filtered.filter(d => d.zipCode.includes(searchZip))
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(d => d.specialty === selectedSpecialty)
    }

    if (minRating > 0) {
      filtered = filtered.filter(d => d.rating >= minRating)
    }

    setFilteredDoctors(filtered)
  }, [doctors, searchZip, selectedSpecialty, minRating])

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-lg">
            {star <= rating ? '⭐' : '☆'}
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-2">({rating})</span>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="stethoscope" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Find a Doctor
        </h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4">
            Search & Filters
          </h2>
          
          <div className="space-y-4">
            {/* ZIP Code Search */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={searchZip}
                onChange={(e) => setSearchZip(e.target.value)}
                placeholder="Enter ZIP code"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-playfair font-medium text-charcoal">
              Doctors
            </h2>
            <span className="text-sm text-gray-600">
              {filteredDoctors.length} found
            </span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-charcoal">No doctors found matching your criteria.</p>
              <p className="text-sm text-gray-600 mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-playfair font-medium text-charcoal">
                      {doctor.name}
                    </h3>
                    <p className="text-sage font-medium">{doctor.specialty}</p>
                    <p className="text-gray-600">{doctor.location}</p>
                  </div>
                  <div className="text-right">
                    {renderStars(doctor.rating)}
                    <div className="mt-2">
                      {doctor.acceptingPatients ? (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Accepting Patients
                        </span>
                      ) : (
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Not Accepting
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-3">
                  {doctor.reviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between items-start mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-charcoal mb-2">{review.text}</p>
                      <div className="flex flex-wrap gap-1">
                        {review.qualifiers.map((qualifier, qIndex) => (
                          <span
                            key={qIndex}
                            className="inline-block bg-dusty-pink bg-opacity-20 text-dusty-pink text-xs px-2 py-1 rounded-full"
                          >
                            {qualifier}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Navigation />
    </div>
  )
}
