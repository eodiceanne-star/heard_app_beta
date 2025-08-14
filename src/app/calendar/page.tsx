'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

interface Appointment {
  id: string
  title: string
  date: string
  time: string
  notes: string
  reminders: boolean
}

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    notes: '',
    reminders: true
  })
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Load appointments from localStorage
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments')
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  // Save appointments to localStorage
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }, [appointments])

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAppointment.title && newAppointment.date) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        ...newAppointment
      }
      setAppointments([...appointments, appointment])
      setNewAppointment({
        title: '',
        date: '',
        time: '',
        notes: '',
        reminders: true
      })
    }
  }

  const handleRemoveAppointment = (id: string) => {
    setAppointments(appointments.filter(app => app.id !== id))
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getAppointmentsForDate = (date: number) => {
    const dateString = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return appointments.filter(app => app.date === dateString)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)

  const renderCalendar = () => {
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 bg-gray-50"></div>)
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getAppointmentsForDate(day)
      days.push(
        <div key={day} className="h-20 border border-gray-200 p-1">
          <div className="text-sm font-medium text-charcoal mb-1">{day}</div>
          {dayAppointments.map(app => (
            <div key={app.id} className="text-xs bg-dusty-pink text-white p-1 rounded mb-1 truncate">
              {app.title}
            </div>
          ))}
        </div>
      )
    }
    
    return days
  }

  const upcomingAppointments = appointments
    .filter(app => new Date(app.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Illustration */}
        <div className="mb-8">
          <Illustration type="calendar" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">
          Appointments Calendar
        </h1>

        {/* Add Appointment Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-playfair font-medium text-charcoal mb-4">
            Add Appointment
          </h2>
          <form onSubmit={handleAddAppointment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Title
              </label>
              <input
                type="text"
                value={newAppointment.title}
                onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                placeholder="Doctor's name or appointment type"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Notes
              </label>
              <textarea
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                placeholder="Any notes or reminders"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="reminders"
                checked={newAppointment.reminders}
                onChange={(e) => setNewAppointment({ ...newAppointment, reminders: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="reminders" className="text-sm text-charcoal">
                Enable reminders
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-dusty-pink text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              Add Appointment
            </button>
          </form>
        </div>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              if (selectedMonth === 0) {
                setSelectedMonth(11)
                setSelectedYear(selectedYear - 1)
              } else {
                setSelectedMonth(selectedMonth - 1)
              }
            }}
            className="text-dusty-pink hover:text-opacity-80 transition-colors duration-200"
          >
            ← Previous
          </button>
          <h3 className="text-xl font-playfair font-medium text-charcoal">
            {monthNames[selectedMonth]} {selectedYear}
          </h3>
          <button
            onClick={() => {
              if (selectedMonth === 11) {
                setSelectedMonth(0)
                setSelectedYear(selectedYear + 1)
              } else {
                setSelectedMonth(selectedMonth + 1)
              }
            }}
            className="text-dusty-pink hover:text-opacity-80 transition-colors duration-200"
          >
            Next →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-playfair font-medium text-charcoal">
              Upcoming Appointments
            </h2>
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-charcoal">{appointment.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.date).toLocaleDateString()}
                      {appointment.time && ` at ${appointment.time}`}
                    </p>
                    {appointment.notes && (
                      <p className="text-sm text-charcoal mt-2">{appointment.notes}</p>
                    )}
                    {appointment.reminders && (
                      <span className="inline-block bg-sage bg-opacity-20 text-sage text-xs px-2 py-1 rounded-full mt-2">
                        🔔 Reminders On
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveAppointment(appointment.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 ml-2"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Navigation />
    </div>
  )
}
