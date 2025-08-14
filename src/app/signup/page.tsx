'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import Illustration from '@/components/Illustration'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !displayName) {
      setError('Please fill in all fields')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)
    const result = await signup(email, password, displayName)
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Signup failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Illustration type="group-support" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-playfair font-semibold text-charcoal text-center mb-2">
            Join Us
          </h1>
          <p className="text-lato text-charcoal text-center mb-8">
            Create your account to start your healthcare journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                placeholder="Create a password (min 6 characters)"
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mobile-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal">
              Already have an account?{' '}
              <Link href="/login" className="text-dusty-pink hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 bg-sage bg-opacity-10 rounded-xl">
            <p className="text-sm text-charcoal text-center">
              By creating an account, you agree to our privacy policy and community guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
