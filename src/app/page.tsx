'use client'
import React from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <div className="mb-8">
          <Illustration type="group-support" />
        </div>
        
        <h1 className="text-4xl font-playfair font-semibold text-charcoal text-center mb-6">Welcome to Heard</h1>
        
        <div className="space-y-6 text-lato text-charcoal leading-relaxed">
          <p>If you've ever been told "it's all in your head" or felt brushed aside by a rushed appointment, you're not alone. Heard was built for women and marginalized patients navigating chronic illness, misdiagnosis, and the frustration of medical gaslighting.</p>
          <p>Here, you can track your symptoms, connect with others who've been through the same struggles, and find scripts and resources to help you speak confidently at appointments. Heard is your safe space to feel validated, supported, and empowered — no matter where you are in your healthcare journey.</p>
        </div>
        
        <div className="mt-8 space-y-4 max-w-sm mx-auto">
          <Link href="/login" className="block">
                         <button className="w-full px-8 py-4 bg-gradient-to-r from-dusty-pink to-dusty-pink text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Sign In
            </button>
          </Link>
          <Link href="/signup" className="block">
            <button className="w-full px-8 py-4 border-2 border-dusty-pink text-dusty-pink rounded-xl font-semibold hover:bg-dusty-pink hover:text-white transition-all duration-300 transform hover:scale-105">
              Create Account
            </button>
          </Link>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
