'use client';

import React, { useState, useEffect } from 'react';
import { dataService, SymptomEntry } from '@/lib/dataService';
import { useAuth } from '@/components/AuthContext';
import Illustration from '@/components/Illustration';
import DecorativeIllustrations from '@/components/DecorativeIllustrations';
import Navigation from '@/components/Navigation';

export default function TrackerPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: '',
    dietNotes: '',
    painLevel: 5,
    painLocation: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load entries from data service on component mount
  useEffect(() => {
    if (user) {
      const savedEntries = dataService.getSymptomEntries();
      setEntries(savedEntries);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      const newEntry = await dataService.createSymptomEntry({
        userId: user.id,
        date: formData.date,
        mood: formData.mood,
        dietNotes: formData.dietNotes,
        painLevel: formData.painLevel,
        painLocation: formData.painLocation,
        notes: formData.notes,
        createdAt: new Date().toISOString()
      });

      // Update local state
      setEntries(prev => [newEntry, ...prev]);

      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        mood: '',
        dietNotes: '',
        painLevel: 5,
        painLocation: '',
        notes: ''
      });

      console.log('✅ Symptom entry saved successfully!');
    } catch (error) {
      console.error('❌ Error saving symptom entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExport = () => {
    if (entries.length === 0) {
      alert('No entries to export');
      return;
    }

    const csvContent = [
      'Date,Mood,Diet Notes,Pain Level,Pain Location,Notes',
      ...entries.map(entry => 
        `"${entry.date}","${entry.mood}","${entry.dietNotes}","${entry.painLevel}","${entry.painLocation}","${entry.notes}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symptom-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    try {
      await dataService.deleteSymptomEntry(id);
      setEntries(prev => prev.filter(entry => entry.id !== id));
      console.log('✅ Entry deleted successfully!');
    } catch (error) {
      console.error('❌ Error deleting entry:', error);
    }
  };

  return (
    <div className="page-container">
      <DecorativeIllustrations />
      
      <div className="content-container">
        <div className="text-center mb-8">
          <Illustration 
            type="symptom-notebook" 
            size="large" 
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
            Symptom Tracker
          </h1>
          <p className="text-gray-600">
            Track your daily symptoms and health patterns
          </p>
        </div>

        {/* Add Entry Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-dusty-pink p-6 mb-8">
          <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
            Add New Entry
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood
                </label>
                <select
                  value={formData.mood}
                  onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                  required
                >
                  <option value="">Select mood</option>
                  <option value="Great">Great</option>
                  <option value="Good">Good</option>
                  <option value="Okay">Okay</option>
                  <option value="Poor">Poor</option>
                  <option value="Terrible">Terrible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diet Notes
              </label>
              <textarea
                value={formData.dietNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, dietNotes: e.target.value }))}
                placeholder="What did you eat today? Any food reactions?"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pain Level (0-10)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, painLevel: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-800 min-w-[2rem]">
                  {formData.painLevel}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pain Location
              </label>
              <input
                type="text"
                value={formData.painLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, painLocation: e.target.value }))}
                placeholder="Where is the pain located?"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any other symptoms, observations, or notes..."
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-dusty-pink focus:border-transparent"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mobile-button bg-dusty-pink text-black py-4 rounded-2xl font-semibold hover:bg-dusty-pink-dark transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Entry'}
            </button>
          </form>
        </div>

        {/* Entries List */}
        <div className="bg-white rounded-2xl shadow-sm border border-dusty-pink p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-playfair font-semibold text-gray-800">
              Recent Entries ({entries.length})
            </h2>
            {entries.length > 0 && (
                          <button
              onClick={handleExport}
              className="bg-dusty-pink text-black px-4 py-2 rounded-xl font-medium hover:bg-dusty-pink-dark transition-colors"
            >
              Export CSV
            </button>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No entries yet. Add your first symptom entry above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="border border-dusty-pink rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{entry.date}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {entry.mood}
                      </span>
                      {!entry.synced && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                          Pending sync
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Pain Level:</span> {entry.painLevel}/10
                    </div>
                    {entry.painLocation && (
                      <div>
                        <span className="font-medium text-gray-700">Location:</span> {entry.painLocation}
                      </div>
                    )}
                  </div>
                  
                  {entry.dietNotes && (
                    <div className="mt-2">
                      <span className="font-medium text-gray-700">Diet:</span> <span className="tracker-content">{entry.dietNotes}</span>
                    </div>
                  )}
                  
                  {entry.notes && (
                    <div className="mt-2">
                      <span className="font-medium text-gray-700">Notes:</span> <span className="tracker-content">{entry.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
}
