'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import Image from 'next/image'

interface ResourceLink {
  title: string
  url: string
  description: string
}

export default function ResourcesPage() {
  const externalResources: ResourceLink[] = [
    {
      title: 'Black Women\'s Health Imperative',
      url: 'https://bwhi.org/',
      description: 'Advocacy and resources focused on Black women\'s health and wellness.'
    },
    {
      title: 'Society for Women\'s Health Research',
      url: 'https://swhr.org/',
      description: 'Research and education to improve women\'s health outcomes.'
    },
    {
      title: 'Office on Women\'s Health',
      url: 'https://www.womenshealth.gov/',
      description: 'Federal health resources for women and girls.'
    },
    {
      title: 'Patient Advocate Foundation',
      url: 'https://www.patientadvocate.org/',
      description: 'Free services for navigating healthcare and insurance.'
    }
  ]

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      {/* Decorative illustrations */}
      <div className="fixed top-1/4 left-8 w-24 h-24 opacity-50 pointer-events-none z-0">
        <Image
          src="/assets/images/openpeeps/plants/cool-kids-plant.png"
          alt="Plant illustration"
          width={96}
          height={96}
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="fixed bottom-1/3 right-8 w-20 h-20 opacity-40 pointer-events-none z-0">
        <Image
          src="/assets/images/openpeeps/plants/cool-kids-watering-plants.png"
          alt="Watering plants illustration"
          width={80}
          height={80}
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="reading-book" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Resource Library</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Knowledge, tools, and support to help you navigate your healthcare journey with confidence
        </p>
        
        {/* Patient Advocacy Tips Section */}
        <div className="mobile-card mb-8 relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
          <h2 className="text-3xl font-playfair font-medium text-charcoal mb-6 relative z-10">Patient Advocacy Tips</h2>
          
          <div className="space-y-8 relative z-10">
            {/* How to Prepare for a Doctor's Appointment */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">How to Prepare for a Doctor's Appointment</h3>
              <p className="text-base text-charcoal leading-relaxed">
                Bring a list of your top concerns. Write down your symptoms, when they started, and how they impact your daily life. Having notes in hand helps you feel confident and ensures nothing important gets missed.
              </p>
            </div>
            
            {/* Questions to Ask When You Feel Dismissed */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Questions to Ask When You Feel Dismissed</h3>
              <ul className="space-y-3 text-base text-charcoal leading-relaxed">
                <li className="flex items-start">
                  <span className="text-sage font-bold mr-3">•</span>
                  "Can you explain why you don't think this symptom is concerning?"
                </li>
                <li className="flex items-start">
                  <span className="text-sage font-bold mr-3">•</span>
                  "What are the next steps if this doesn't improve?"
                </li>
                <li className="flex items-start">
                  <span className="text-sage font-bold mr-3">•</span>
                  "Can we document this in my chart so I have a record?"
                </li>
              </ul>
              <p className="text-base text-charcoal leading-relaxed mt-4">
                These respectful but firm questions help keep the conversation open while protecting your voice.
              </p>
            </div>
            
            {/* Bringing a Support Person */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Bringing a Support Person</h3>
              <p className="text-base text-charcoal leading-relaxed">
                Sometimes it helps to bring a trusted friend or family member. They can take notes, remind you of what you wanted to ask, and help you feel supported.
              </p>
            </div>
          </div>
        </div>
        
        {/* Medical Gaslighting Education Section */}
        <div className="mobile-card mb-8 relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-8 -mt-8"></div>
          
          <h2 className="text-3xl font-playfair font-medium text-charcoal mb-6 relative z-10">Medical Gaslighting Education</h2>
          
          <div className="space-y-8 relative z-10">
            {/* Recognizing Signs of Medical Gaslighting */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Recognizing Signs of Medical Gaslighting</h3>
              <p className="text-base text-charcoal leading-relaxed">
                You may be experiencing medical gaslighting if your symptoms are minimized, blamed on stress, or dismissed without tests. Statements like <em>"It's all in your head"</em> or <em>"You're too young for this"</em> are red flags.
              </p>
            </div>
            
            {/* Steps to Take if You Feel Misunderstood */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Steps to Take if You Feel Misunderstood</h3>
              <ul className="space-y-3 text-base text-charcoal leading-relaxed">
                <li className="flex items-start">
                  <span className="text-sage font-bold mr-3">•</span>
                  Ask for your concerns to be documented in your medical chart.
                </li>
                <li className="flex items-start">
                  <span className="text-sage font-bold mr-3">•</span>
                  Request a second opinion or referral to a specialist.
                </li>
                <li className="flex items-start">
                  <span className="text-sage font-bold mr-3">•</span>
                  Keep a health journal (symptoms, mood, pain, triggers) to bring objective notes to your appointment.
                </li>
              </ul>
            </div>
            
            {/* Your Experience is Valid */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Your Experience is Valid</h3>
              <p className="text-base text-charcoal leading-relaxed">
                No matter how small someone else may think your symptom is, you know your body best. Trust yourself.
              </p>
            </div>
          </div>
        </div>
        
        {/* Empowerment & Confidence-Building Section */}
        <div className="mobile-card mb-8 relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-sage to-transparent opacity-10 rounded-full -mr-8 -mb-8"></div>
          
          <h2 className="text-3xl font-playfair font-medium text-charcoal mb-6 relative z-10">Empowerment & Confidence-Building</h2>
          
          <div className="space-y-8 relative z-10">
            {/* Keeping a Health Journal */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Keeping a Health Journal</h3>
              <p className="text-base text-charcoal leading-relaxed">
                Tracking your daily symptoms, mood, diet, and energy helps you notice patterns. This makes your story stronger and harder to dismiss in medical visits.
              </p>
            </div>
            
            {/* How to Speak Confidently About Symptoms */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">How to Speak Confidently About Symptoms</h3>
              <p className="text-base text-charcoal leading-relaxed">
                Use clear, specific language. Instead of saying, <em>"I don't feel well,"</em> try, <em>"I've had sharp abdominal pain for the past 3 days, especially after meals."</em> Precise details help doctors take you seriously.
              </p>
            </div>
            
            {/* You Deserve to Be Heard */}
            <div className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">You Deserve to Be Heard</h3>
              <p className="text-base text-charcoal leading-relaxed">
                Healthcare is a partnership. If a provider does not listen, you have the right to seek another opinion.
              </p>
            </div>
          </div>
        </div>
        
        {/* External Resources & Links Section */}
        <div className="mobile-card mb-8 relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -ml-8 -mt-8"></div>
          
          <h2 className="text-3xl font-playfair font-medium text-charcoal mb-6 relative z-10">External Resources & Links</h2>
          
          <div className="space-y-4 relative z-10">
            {externalResources.map((resource, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-cream to-dusty-pink bg-opacity-20 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-transparent hover:border-dusty-pink"
                onClick={() => handleExternalLink(resource.url)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-playfair font-medium text-charcoal mb-2 hover:text-dusty-pink transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-base text-charcoal leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-sage to-dusty-pink rounded-full flex items-center justify-center text-white text-lg shadow-md">
                      🔗
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Knowledge is Power Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4">
            <Illustration type="plant-decorative" size="small" />
          </div>
          
          <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Knowledge is Power</h3>
          <p className="text-base text-charcoal leading-relaxed relative z-10">
            Remember that you are your own best advocate. The more informed you are about your health and rights, the better equipped you'll be to navigate the healthcare system and ensure your voice is heard.
          </p>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
