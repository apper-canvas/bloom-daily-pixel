import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { format, isSameDay } from 'date-fns'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { affirmationService } from '@/services/api/affirmationService'
import { savedAffirmationService } from '@/services/api/savedAffirmationService'

const AffirmationCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [affirmations, setAffirmations] = useState([])
  const [savedDates, setSavedDates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSavedDates()
  }, [])

  useEffect(() => {
    if (selectedDate) {
      loadAffirmationsForDate(selectedDate)
    }
  }, [selectedDate])

  const loadSavedDates = async () => {
    try {
      const saved = await savedAffirmationService.getSavedAffirmations()
      const dates = saved.map(item => new Date(item.savedAt))
      setSavedDates(dates)
    } catch (err) {
      console.error('Failed to load saved dates:', err)
    }
  }

  const loadAffirmationsForDate = async (date) => {
    try {
      setLoading(true)
      setError(null)
      
      // Get all affirmations and filter by date if needed
      const allAffirmations = await affirmationService.getAllAffirmations()
      
      // For demo purposes, show random affirmations for each date
      // In a real app, you'd filter by actual date
      const randomAffirmations = allAffirmations
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
      
      setAffirmations(randomAffirmations)
    } catch (err) {
      setError('Failed to load affirmations for this date')
      console.error('Error loading affirmations:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Highlight dates with saved affirmations
      const hasSavedAffirmation = savedDates.some(savedDate => 
        isSameDay(savedDate, date)
      )
      
      if (hasSavedAffirmation) {
        return 'bg-purple-100 text-purple-800 rounded-full'
      }
      
      if (isSameDay(date, selectedDate)) {
        return 'bg-purple-500 text-white rounded-full'
      }
    }
    return null
  }

  const retryLoad = () => {
    loadAffirmationsForDate(selectedDate)
  }

  if (error && !affirmations.length) {
    return (
      <Error 
        message={error}
        onRetry={retryLoad}
      />
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Affirmation Calendar
        </h2>
        
        <div className="mb-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            className="w-full border-none"
            calendarType="gregory"
          />
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span>Selected date</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded-full"></div>
              <span>Has saved affirmations</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Affirmations for {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={retryLoad} variant="outline">
              Try Again
            </Button>
          </div>
        ) : affirmations.length > 0 ? (
          <div className="space-y-4">
            {affirmations.map((affirmation, index) => (
              <div 
                key={affirmation.id || index}
                className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
              >
                <p className="text-gray-800 font-medium mb-2">
                  {affirmation.text}
                </p>
                {affirmation.category && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {affirmation.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No affirmations found for this date.</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default AffirmationCalendar