'use client'
import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import DecorativeIllustrations from '@/components/DecorativeIllustrations'

interface Appointment {
  id: string
  title: string
  date: string
  time: string
  doctor: string
  location: string
  notes: string
}

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    doctor: '',
    location: '',
    notes: ''
  })

  // Load appointments from localStorage
  React.useEffect(() => {
    const savedAppointments = localStorage.getItem('calendarAppointments')
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  // Save appointments to localStorage
  React.useEffect(() => {
    localStorage.setItem('calendarAppointments', JSON.stringify(appointments))
  }, [appointments])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData
    }
    setAppointments([...appointments, newAppointment])
    setFormData({
      title: '',
      date: '',
      time: '',
      doctor: '',
      location: '',
      notes: ''
    })
    setShowAddForm(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id))
  }

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime()
  )

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      <DecorativeIllustrations />

      <div className="content-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Calendar content */}
          <div className="flex-1">
            <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">
              Calendar
            </h1>
            <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
              Keep track of your appointments and healthcare visits
            </p>

            {/* Add Appointment Button */}
            <div className="mb-8">
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full mobile-button"
              >
                + Add New Appointment
              </button>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {sortedAppointments.length === 0 ? (
                <div className="mobile-card text-center py-12">
                  <p className="text-gray-600 mb-4">No appointments scheduled yet</p>
                  <p className="text-sm text-gray-500">Add your first appointment to get started</p>
                </div>
              ) : (
                sortedAppointments.map((appointment) => (
                  <div key={appointment.id} className="mobile-card relative overflow-hidden">
                    {/* Card background pattern */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-6 -mt-6"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-playfair font-medium text-charcoal">
                          {appointment.title}
                        </h3>
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Date:</span>
                          <p className="text-charcoal">{appointment.date}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Time:</span>
                          <p className="text-charcoal">{appointment.time}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Doctor:</span>
                          <p className="text-charcoal">{appointment.doctor}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Location:</span>
                          <p className="text-charcoal">{appointment.location}</p>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-3">
                          <span className="font-medium text-gray-600 text-sm">Notes:</span>
                          <p className="text-charcoal text-sm mt-1">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right side - Calendar illustration */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <Illustration type="calendar" size="large" className="mb-6" />
              
              <div className="mobile-card relative overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>

                <h3 className="text-xl font-playfair font-medium text-charcoal mb-4 relative z-10">
                  Planning Tips
                </h3>
                <ul className="space-y-2 text-sm text-charcoal relative z-10">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                    <span>Write down your questions before appointments</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                    <span>Bring a list of current medications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                    <span>Note any new symptoms or changes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                    <span>Plan to arrive 10-15 minutes early</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Add Appointment Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-6">
                Add New Appointment
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor/Provider
                  </label>
                  <input
                    type="text"
                    value={formData.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sage focus:border-transparent"
                    rows={3}
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-charcoal rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-sage text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Add Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Navigation />
    </div>
  )
}
