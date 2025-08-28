'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import Illustration from '@/components/Illustration'
import Navigation from '@/components/Navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Login failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-sage flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Illustration type="group-support" />
        </div>
        
                 <div className="bg-white rounded-2xl shadow-sm border border-dusty-pink p-8">
          <h1 className="text-3xl font-playfair font-semibold text-charcoal text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-lato text-charcoal text-center mb-8">
            Sign in to continue your healthcare journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

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
                placeholder="Enter your password"
                required
              />
            </div>

                         <button
               type="submit"
               disabled={isLoading}
               className="w-full mobile-button text-black disabled:opacity-50 disabled:cursor-not-allowed"
             >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal">
              Don't have an account?{' '}
              <Link href="/signup" className="text-dusty-pink hover:underline font-medium">
                Join Us
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 bg-sage bg-opacity-10 rounded-xl">
            <p className="text-sm text-charcoal text-center">
              Your privacy and security are important to us. All data is stored locally on your device.
            </p>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
