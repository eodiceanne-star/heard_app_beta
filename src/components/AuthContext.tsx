'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  displayName: string
  avatar: string
  isAnonymous: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check for saved user data on app start
    if (typeof window !== 'undefined') {
      try {
        const savedUser = localStorage.getItem('heardUser')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Mock authentication - in real app, this would call Firebase
      if (email && password) {
        const mockUser: User = {
          id: 'user-' + Date.now(),
          email,
          displayName: email.split('@')[0],
          avatar: '👩',
          isAnonymous: false
        }
        setUser(mockUser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('heardUser', JSON.stringify(mockUser))
        }
        return { success: true }
      } else {
        return { success: false, error: 'Please enter both email and password' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      // Mock signup - in real app, this would call Firebase
      if (email && password && displayName) {
        if (password.length < 6) {
          return { success: false, error: 'Password must be at least 6 characters' }
        }
        
        const mockUser: User = {
          id: 'user-' + Date.now(),
          email,
          displayName,
          avatar: '👩',
          isAnonymous: false
        }
        setUser(mockUser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('heardUser', JSON.stringify(mockUser))
        }
        return { success: true }
      } else {
        return { success: false, error: 'Please fill in all fields' }
      }
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('heardUser')
    }
  }

  // Don't render children until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dusty-pink"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
