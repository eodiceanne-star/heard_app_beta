'use client'
import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Illustration from '@/components/Illustration'
import DecorativeIllustrations from '@/components/DecorativeIllustrations'
import forumData from '@/data/forumData.json'

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
    if (!newThread.title.trim() || !newThread.content.trim()) return

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
  }

  const handleAddComment = (threadId: string) => {
    if (!newComment.trim()) return

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

    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, comments: [...thread.comments, comment], commentCount: thread.commentCount + 1 }
        : thread
    ))
    setNewComment('')
  }

  const toggleTag = (tag: string) => {
    setNewThread(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }))
  }

  const handleReport = (thread: Thread) => {
    setReportingThread(thread)
    setShowReportDialog(true)
  }

  const confirmReport = () => {
    // Mock report functionality - in real app, this would send to backend
    alert(`Thank you for your report. We've received your concern about "${reportingThread?.title}". Our team will review it shortly.`)
    setShowReportDialog(false)
    setReportingThread(null)
  }

  return (
    <div className="page-container relative">
      {/* Background decorative elements */}
      <Illustration type="wave-pattern" className="pointer-events-none" />
      <Illustration type="dot-pattern" className="pointer-events-none" />
      <DecorativeIllustrations />
      
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
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent text-base"
                  rows={4}
                  placeholder="Share your thoughts, questions, or experiences..."
                  maxLength={500}
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
                      onClick={() => toggleTag(tag)}
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
                  onChange={(e) => setIsAnonymous(e.target.checked)}
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
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-sage to-transparent opacity-10 rounded-full -ml-6 -mt-6"></div>
              
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
                      onClick={() => handleReport(thread)}
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
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="font-semibold text-base text-charcoal">{comment.author.displayName}</span>
                                <span className="text-sm text-gray-500">{formatDate(comment.timestamp)}</span>
                              </div>
                              <p className="text-base text-charcoal">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 p-3 border border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                        />
                        <button 
                          onClick={() => handleAddComment(thread.id)}
                          className="px-6 py-3 bg-dusty-pink text-white rounded-xl text-base font-medium hover:bg-opacity-90 shadow-md"
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
                  onClick={() => setShowReportDialog(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-charcoal rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReport}
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
          <div className="absolute top-4 right-4">
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
