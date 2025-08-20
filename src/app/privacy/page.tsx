'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function PrivacyPolicyPage() {
  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="lock-shield" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Privacy Policy</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Your privacy and data security are our top priorities
        </p>
        
        <div className="mobile-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
          <div className="space-y-8 relative z-10">
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Information We Collect</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p><strong>Personal Information:</strong> When you create an account, we collect your email address, display name, and optional profile information.</p>
                <p><strong>Health Data:</strong> Symptom tracking data, doctor reviews, and forum posts are stored locally on your device and optionally synced to our secure servers.</p>
                <p><strong>Usage Data:</strong> We collect anonymous usage statistics to improve our service and user experience.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">How We Use Your Information</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p><strong>Service Provision:</strong> To provide and maintain our healthcare support platform.</p>
                <p><strong>Community Features:</strong> To enable forum discussions and doctor reviews while respecting your privacy preferences.</p>
                <p><strong>Improvement:</strong> To analyze usage patterns and improve our services.</p>
                <p><strong>Communication:</strong> To send important updates about our service (with your consent).</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Data Security</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>We implement industry-standard security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Secure HTTPS connections</li>
                  <li>Regular security audits</li>
                  <li>Limited access to personal data by authorized personnel only</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">HIPAA Compliance</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>While Heard is not a covered entity under HIPAA, we follow HIPAA-like standards for data protection:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Secure data transmission and storage</li>
                  <li>User consent for data sharing</li>
                  <li>Right to access and delete personal data</li>
                  <li>Breach notification procedures</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Your Rights</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of non-essential communications</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Contact Us</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p><strong>Email:</strong> youareheardapp@gmail.com</p>
                  <p><strong>Address:</strong> [Your Business Address]</p>
                  <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
