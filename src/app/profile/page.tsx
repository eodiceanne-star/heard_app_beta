'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import { avatarOptions, getAvatarById } from '@/assets/images/openpeeps'

interface Profile {
  displayName: string
  age: string
  bio: string
  avatar: string
  profileImage: string | null
  isAnonymous: boolean
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    displayName: '',
    age: '',
    bio: '',
    avatar: '👩',
    profileImage: null,
    isAnonymous: false
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState<Profile>(profile)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem('heardProfile')
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile(parsed)
      setTempProfile(parsed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('heardProfile', JSON.stringify(profile))
  }, [profile])

  const handleSave = async () => {
    // Validate required fields
    if (!tempProfile.displayName.trim()) {
      alert('Please enter a display name')
      return
    }
    
    setIsSaving(true)
    
    try {
      // Simulate save delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Save the profile
      setProfile(tempProfile)
      setIsEditing(false)
      
      // Show success feedback
      const saveButton = document.querySelector('[data-save-button]') as HTMLButtonElement
      if (saveButton) {
        const originalText = saveButton.textContent
        saveButton.textContent = 'Saved! ✓'
        saveButton.disabled = true
        saveButton.className = 'flex-1 px-8 py-4 bg-green-500 text-white rounded-2xl font-medium transition-colors'
        
        setTimeout(() => {
          saveButton.textContent = originalText
          saveButton.disabled = false
          saveButton.className = 'flex-1 mobile-button text-lg py-4'
        }, 2000)
      }
    } catch (error) {
      alert('Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setTempProfile(profile)
    setIsEditing(false)
  }

  const handleAvatarChange = (newAvatar: string) => {
    setTempProfile(prev => ({ ...prev, avatar: newAvatar }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setTempProfile(prev => ({ ...prev, profileImage: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // Mock camera functionality - in real app, this would use device camera
    alert('Camera functionality will be available in the full version with device permissions.')
  }

  const removeProfileImage = () => {
    setTempProfile(prev => ({ ...prev, profileImage: null }))
  }



  // Avatar selection is now handled by Open Peeps images

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="profile-portrait" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">My Profile</h1>
        <p className="text-xl text-lato text-charcoal text-center mb-12 leading-relaxed">
          Your personal space to share as much or as little as you're comfortable with
        </p>
        
        <div className="mobile-card relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="relative mx-auto w-32 h-32 mb-6">
              {isEditing ? (
                tempProfile.profileImage ? (
                  <img
                    src={tempProfile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-sage shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <Image
                      src={getAvatarById(tempProfile.avatar)}
                      alt="Profile avatar"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                )
              ) : (
                profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-sage shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <Image
                      src={getAvatarById(profile.avatar)}
                      alt="Profile avatar"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                )
              )}
            </div>

            {isEditing && (
              <div className="mb-6">
                <label className="block text-lg font-medium text-charcoal mb-4">Profile Picture</label>
                <div className="flex justify-center space-x-3 mb-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-dusty-pink text-white rounded-xl text-base font-medium hover:bg-opacity-90 transition-colors shadow-md"
                  >
                    📁 Gallery
                  </button>
                  <button
                    onClick={handleCameraCapture}
                    className="px-4 py-2 bg-sage text-white rounded-xl text-base font-medium hover:bg-opacity-90 transition-colors shadow-md"
                  >
                    📷 Camera
                  </button>
                  {tempProfile.profileImage && (
                    <button
                      onClick={removeProfileImage}
                      className="px-4 py-2 bg-gray-300 text-charcoal rounded-xl text-base font-medium hover:bg-gray-400 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <label className="block text-lg font-medium text-charcoal mb-4">Or Choose Open Peeps Avatar</label>
                <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
                  {avatarOptions.map(avatar => (
                    <button
                      key={avatar.id}
                      onClick={() => handleAvatarChange(avatar.id)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden ${
                        tempProfile.avatar === avatar.id
                          ? 'ring-4 ring-dusty-pink shadow-lg scale-110'
                          : 'ring-2 ring-gray-200 hover:ring-dusty-pink hover:scale-105'
                      }`}
                    >
                      <Image
                        src={avatar.src}
                        alt={avatar.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain object-center"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-lg font-medium text-charcoal mb-3">
                Display Name <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.displayName}
                  onChange={(e) => setTempProfile(prev => ({ ...prev, displayName: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  placeholder="Enter your display name"
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-2xl text-charcoal text-base">
                  {profile.displayName || 'Not set'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-charcoal mb-3">Age (Optional)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={tempProfile.age}
                  onChange={(e) => setTempProfile(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-2xl text-charcoal text-base">
                  {profile.age || 'Not set'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-charcoal mb-3">Bio</label>
              {isEditing ? (
                <textarea
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  rows={4}
                  placeholder="Tell us a bit about yourself..."
                  maxLength={200}
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-2xl text-charcoal text-base">
                  {profile.bio || 'No bio yet'}
                </div>
              )}
              {isEditing && (
                <div className="text-sm text-gray-500 mt-2">{tempProfile.bio.length}/200</div>
              )}
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="anonymous"
                checked={isEditing ? tempProfile.isAnonymous : profile.isAnonymous}
                onChange={(e) => setTempProfile(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                disabled={!isEditing}
                className="rounded w-5 h-5"
              />
              <label htmlFor="anonymous" className="text-base text-charcoal font-medium">
                Anonymous Mode
              </label>
            </div>

            {profile.isAnonymous && (
              <div className="p-4 bg-dusty-pink bg-opacity-10 rounded-2xl">
                <p className="text-base text-charcoal leading-relaxed">
                  When anonymous mode is enabled, your display name will appear as "Anonymous" in the community forum and other public areas.
                </p>
              </div>
            )}
          </div>

                     <div className="mt-8 flex space-x-4 relative z-10">
             {isEditing ? (
               <>
                 <button 
                   onClick={handleSave}
                   data-save-button
                   className={`flex-1 text-lg py-4 rounded-2xl font-medium transition-colors ${
                     isSaving 
                       ? 'bg-gray-400 text-white cursor-not-allowed' 
                       : !tempProfile.displayName.trim()
                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       : 'mobile-button'
                   }`}
                   disabled={isSaving || !tempProfile.displayName.trim()}
                 >
                   {isSaving ? 'Saving...' : 'Save Changes'}
                 </button>
                 <button 
                   onClick={handleCancel}
                   className="flex-1 px-8 py-4 border-2 border-gray-300 text-charcoal rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                 >
                   Cancel
                 </button>
               </>
             ) : (
               <button 
                 onClick={() => setIsEditing(true)}
                 className="w-full mobile-button text-lg py-4"
               >
                 Edit Profile
               </button>
             )}
           </div>
           

        </div>

        <div className="mt-8 mobile-card relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tl from-dusty-pink to-transparent opacity-10 rounded-full -ml-6 -mb-6"></div>
          
          <h2 className="text-2xl font-playfair font-medium text-charcoal mb-6 relative z-10">Privacy & Safety</h2>
          <div className="space-y-4 text-base text-charcoal relative z-10">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>Your profile information is stored locally on your device</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>Profile pictures are stored securely and never shared</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>Anonymous mode helps protect your privacy in community discussions</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
              <p>You can change your settings at any time</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4">
            <Illustration type="plant-decorative" size="small" />
          </div>
          
          <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Your Journey</h3>
          <p className="text-base text-charcoal leading-relaxed relative z-10">
            Your profile is a reflection of your unique healthcare journey. Share as much or as little as you're comfortable with. Remember, you're not alone in this journey.
          </p>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
