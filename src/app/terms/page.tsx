'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'

export default function TermsOfServicePage() {
  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="lock-shield" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Terms of Service</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Please read these terms carefully before using Heard
        </p>
        
        <div className="mobile-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
          <div className="space-y-8 relative z-10">
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Acceptance of Terms</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>By accessing and using the Heard mobile application ("App"), you accept and agree to be bound by the terms and provision of this agreement.</p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Description of Service</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>Heard is a healthcare support platform that provides:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Doctor finder and review system</li>
                  <li>Community forum for support and discussion</li>
                  <li>Symptom tracking and health monitoring</li>
                  <li>Educational resources and advocacy tools</li>
                  <li>Appointment preparation assistance</li>
                </ul>
                <p><strong>Important:</strong> Heard is not a medical service and does not provide medical advice, diagnosis, or treatment.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">User Responsibilities</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>As a user of Heard, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Respect the privacy and rights of other users</li>
                  <li>Not share medical advice or make medical claims</li>
                  <li>Report inappropriate content or behavior</li>
                  <li>Use the service for lawful purposes only</li>
                  <li>Maintain the security of your account</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Medical Disclaimer</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p><strong>No Medical Advice:</strong> The information provided through Heard is for educational and support purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
                <p><strong>Emergency Situations:</strong> If you are experiencing a medical emergency, call 911 or your local emergency services immediately.</p>
                <p><strong>Consult Healthcare Providers:</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Community Guidelines</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>When participating in our community forum:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be kind, respectful, and supportive</li>
                  <li>Share experiences, not medical advice</li>
                  <li>Respect diverse perspectives and backgrounds</li>
                  <li>Do not engage in harassment or discrimination</li>
                  <li>Report harmful or inappropriate content</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Intellectual Property</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>The App and its original content, features, and functionality are owned by Heard and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                <p>You retain ownership of content you create, but grant us a license to use it for service provision.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>In no event shall Heard, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Changes to Terms</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</p>
                <p>Your continued use of the App after any changes constitutes acceptance of the new Terms.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-playfair font-medium text-charcoal mb-4">Contact Information</h2>
              <div className="space-y-4 text-base text-charcoal leading-relaxed">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
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
