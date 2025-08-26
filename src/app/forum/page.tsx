'use client'
import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import DecorativeIllustrations from '@/components/DecorativeIllustrations'
import Image from 'next/image'
import forumData from '@/data/forumData.json'
import { getRandomCoolKidsImage, getRandomAvatar } from '@/assets/images/openpeeps'

interface Thread {
  id: string
  title: string
  content: string
  author: {
    id: string
    displayName: string
    avatar: string
    isAnonymous: boolean
  }
  tags: string[]
  comments: Comment[]
  commentCount: number
  timestamp: string
}

interface Comment {
  id: string
  content: string
  author: {
    id: string
    displayName: string
    avatar: string
    isAnonymous: boolean
  }
  timestamp: string
}

export default function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>(forumData.threads)
  const [showNewThreadForm, setShowNewThreadForm] = useState(false)
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    selectedTags: [] as string[]
  })
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
  const [newComment, setNewComment] = useState('')
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportingThread, setReportingThread] = useState<Thread | null>(null)
  
  // Randomized images for this page load
  const [randomBackgroundImage, setRandomBackgroundImage] = useState('')

  // Initialize random images on mount
  useEffect(() => {
    try {
      const image = getRandomCoolKidsImage()
      setRandomBackgroundImage(image || '/assets/images/openpeeps/coolkids/cool-kids-1.png')
    } catch (error) {
      console.log('Error loading random image:', error)
      setRandomBackgroundImage('/assets/images/openpeeps/coolkids/cool-kids-1.png')
    }
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newThread.title.trim() || !newThread.content.trim()) {
      console.log('Please fill in all required fields')
      return
    }

    const thread: Thread = {
      id: Date.now().toString(),
      title: newThread.title,
      content: newThread.content,
      author: {
        id: 'currentUser',
        displayName: isAnonymous ? 'Anonymous' : 'You',
        avatar: isAnonymous ? '👤' : '👩',
        isAnonymous
      },
      tags: newThread.selectedTags,
      comments: [],
      commentCount: 0,
      timestamp: new Date().toISOString()
    }

    setThreads([thread, ...threads])
    setNewThread({ title: '', content: '', selectedTags: [] })
    setShowNewThreadForm(false)
    setIsAnonymous(false)
    console.log('Thread created successfully!')
  }

  const handleAddComment = (threadId: string) => {
    if (!newComment.trim()) {
      console.log('Please enter a comment')
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        id: 'currentUser',
        displayName: isAnonymous ? 'Anonymous' : 'You',
        avatar: isAnonymous ? '👤' : '👩',
        isAnonymous
      },
      timestamp: new Date().toISOString()
    }

    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          comments: [...thread.comments, comment],
          commentCount: thread.comments.length + 1
        }
      }
      return thread
    })

    setThreads(updatedThreads)
    setNewComment('')
    console.log('Comment added successfully!')
  }

  const handleTagToggle = (tag: string) => {
    setNewThread(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }))
  }

  const handleReportThread = (thread: Thread) => {
    setReportingThread(thread)
    setShowReportDialog(true)
    console.log(`Report dialog opened for thread: ${thread.title}`)
  }

  const handleSubmitReport = () => {
    if (reportingThread) {
      console.log(`Report submitted for thread: ${reportingThread.title}`)
      setShowReportDialog(false)
      setReportingThread(null)
    }
  }

  const handleCancelReport = () => {
    setShowReportDialog(false)
    setReportingThread(null)
  }

  const handleToggleAnonymous = () => {
    setIsAnonymous(!isAnonymous)
    console.log(`Anonymous mode ${!isAnonymous ? 'enabled' : 'disabled'}`)
  }

  const handleShareThread = (thread: Thread) => {
    console.log(`Sharing thread: ${thread.title}`)
    // Placeholder for share functionality
  }

  const handleBookmarkThread = (thread: Thread) => {
    console.log(`Bookmarking thread: ${thread.title}`)
    // Placeholder for bookmark functionality
  }

    return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none absolute inset-0 z-0" />
      <Illustration type="dot-pattern" className="pointer-events-none absolute inset-0 z-0" />
      
             {/* Fixed header illustration */}
       <div className="absolute top-4 right-4 w-24 h-24 opacity-30 pointer-events-none z-0">
         <Image
           src="/assets/images/openpeeps/patterns/cool-kids-messages.png"
           alt="Community illustration"
           width={96}
           height={96}
           className="w-full h-full object-contain"
           onError={(e) => {
             const target = e.target as HTMLImageElement
             target.style.display = 'none'
           }}
         />
       </div>
      
      <div className="content-container relative z-10">
        <div className="mb-12">
          <Illustration type="forum-messages" size="large" className="mb-6" />
        </div>
        
        <h1 className="text-5xl font-playfair font-semibold text-charcoal text-center mb-3">Community Forum</h1>
        
        <div className="mb-8 text-center">
          <p className="text-xl text-lato text-charcoal leading-relaxed mb-6">
            Connect with others who understand your journey. Share experiences, ask questions, and find support.
          </p>
          <button 
            onClick={() => setShowNewThreadForm(!showNewThreadForm)}
            className="mobile-button text-lg px-8 py-4"
          >
            {showNewThreadForm ? 'Cancel' : 'Start New Discussion'}
          </button>
        </div>

        {showNewThreadForm && (
          <div className="mobile-card mb-8 relative overflow-hidden">
            {/* Card background pattern */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-dusty-pink to-transparent opacity-10 rounded-full -mr-8 -mt-8"></div>
            
            <h2 className="text-3xl font-playfair font-medium text-charcoal mb-6 relative z-10">New Discussion</h2>
            <form onSubmit={handleCreateThread} className="space-y-6 relative z-10">
              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">Title</label>
                <input
                  type="text"
                  value={newThread.title}
                  onChange={(e) => setNewThread(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  placeholder="What would you like to discuss?"
                  maxLength={100}
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">Content</label>
                <textarea
                  value={newThread.content}
                  onChange={(e) => setNewThread(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base resize-none overflow-y-auto"
                  rows={4}
                  placeholder="Share your thoughts, questions, or experiences..."
                  maxLength={500}
                  style={{ minHeight: '120px', maxHeight: '300px' }}
                />
                <div className="text-sm text-gray-500 mt-2">{newThread.content.length}/500</div>
              </div>

              <div>
                <label className="block text-lg font-medium text-charcoal mb-3">Tags</label>
                <div className="flex flex-wrap gap-3">
                  {forumData.tags.slice(0, 8).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-4 py-2 rounded-full text-base font-medium transition-colors ${
                        newThread.selectedTags.includes(tag)
                          ? 'bg-dusty-pink text-white shadow-md'
                          : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={handleToggleAnonymous}
                  className="rounded w-5 h-5"
                />
                <label htmlFor="anonymous" className="text-base text-charcoal">
                  Post anonymously
                </label>
              </div>

              <button type="submit" className="mobile-button w-full text-lg py-4">
                Post Discussion
              </button>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {threads.map(thread => (
            <div key={thread.id} className="mobile-card relative overflow-hidden">
              {/* Card background pattern */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -ml-6 -mt-6 z-0"></div>
              
                             <div className="flex items-start space-x-4 mb-4 relative z-10">
                 <div className="w-12 h-12 bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center text-charcoal text-xl flex-shrink-0 shadow-md p-1">
                   {thread.author.avatar}
                 </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-semibold text-lg text-charcoal">{thread.author.displayName}</span>
                    <span className="text-sm text-gray-500">{formatDate(thread.timestamp)}</span>
                  </div>
                  <h3 className="text-xl font-medium text-charcoal mb-3">{thread.title}</h3>
                  <p className="text-base text-charcoal leading-relaxed mb-4">{thread.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {thread.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-sage bg-opacity-20 text-sage text-sm rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedThread(selectedThread?.id === thread.id ? null : thread)}
                      className="text-dusty-pink text-base font-medium hover:underline"
                    >
                      {thread.commentCount} comment{thread.commentCount !== 1 ? 's' : ''}
                    </button>
                    <button 
                      onClick={() => handleReportThread(thread)}
                      className="text-gray-500 text-base hover:text-charcoal"
                    >
                      Report
                    </button>
                  </div>

                  {selectedThread?.id === thread.id && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="space-y-4 mb-6">
                                                 {thread.comments.map(comment => (
                                                      <div key={comment.id} className="flex space-x-4">
                             <div className="w-10 h-10 bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center text-charcoal text-lg flex-shrink-0 shadow-md p-1">
                               {comment.author.avatar}
                             </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="font-semibold text-base text-charcoal">{comment.author.displayName}</span>
                                <span className="text-sm text-gray-500">{formatDate(comment.timestamp)}</span>
                              </div>
                              <p className="text-base text-charcoal break-words whitespace-pre-wrap overflow-wrap-anywhere">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-3">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          rows={3}
                          className="flex-1 p-3 border border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-dusty-pink focus:border-transparent resize-none overflow-y-auto"
                          style={{ minHeight: '60px', maxHeight: '120px' }}
                        />
                        <button 
                          onClick={() => handleAddComment(thread.id)}
                          className="px-6 py-3 bg-dusty-pink text-white rounded-xl text-base font-medium hover:bg-opacity-90 shadow-md self-end"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showReportDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4">Report Content</h3>
              <p className="text-base text-charcoal mb-8 leading-relaxed">
                Are you sure you want to report "{reportingThread?.title}"? This will help us maintain a safe and supportive community.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleCancelReport}
                  className="flex-1 px-6 py-3 border border-gray-300 text-charcoal rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReport}
                  className="flex-1 px-6 py-3 bg-dusty-pink text-white rounded-2xl font-medium hover:bg-opacity-90 transition-colors"
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 p-8 bg-gradient-to-br from-sage to-dusty-pink bg-opacity-10 rounded-3xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 z-0">
            <Illustration type="plant-decorative" size="small" />
          </div>
          
          <h3 className="text-2xl font-playfair font-medium text-charcoal mb-4 relative z-10">Community Guidelines</h3>
          <p className="text-base text-charcoal leading-relaxed relative z-10">
            This is a safe space for support and shared experiences. Please be kind, respectful, and remember that we cannot provide medical advice. Share your experiences to help others, but always consult healthcare professionals for medical decisions.
          </p>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
