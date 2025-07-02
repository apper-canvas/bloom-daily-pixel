import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import NavigationTabs from '@/components/molecules/NavigationTabs'
import AffirmationCard from '@/components/organisms/AffirmationCard'
import FavoritesGrid from '@/components/organisms/FavoritesGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { affirmationService } from '@/services/api/affirmationService'
import { savedAffirmationService } from '@/services/api/savedAffirmationService'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('today')
  const [todayAffirmation, setTodayAffirmation] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [savedAffirmationIds, setSavedAffirmationIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTodayAffirmation()
    loadFavorites()
  }, [])

  const loadTodayAffirmation = async () => {
    try {
      setLoading(true)
      setError('')
      const affirmation = await affirmationService.getTodayAffirmation()
      setTodayAffirmation(affirmation)
    } catch (err) {
      setError('Failed to load today\'s affirmation. Please try again.')
      console.error('Error loading today\'s affirmation:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadFavorites = async () => {
    try {
      const savedAffirmations = await savedAffirmationService.getAll()
      const affirmationIds = savedAffirmations.map(sa => sa.affirmationId)
      const favoriteAffirmations = []
      
      for (const savedAffirmation of savedAffirmations) {
        const affirmation = await affirmationService.getById(savedAffirmation.affirmationId)
        if (affirmation) {
          favoriteAffirmations.push({
            ...affirmation,
            savedAt: savedAffirmation.savedAt
          })
        }
      }
      
      setFavorites(favoriteAffirmations)
      setSavedAffirmationIds(affirmationIds)
    } catch (err) {
      console.error('Error loading favorites:', err)
    }
  }

  const handleSaveAffirmation = async (affirmation) => {
    try {
      const isCurrentlySaved = savedAffirmationIds.includes(affirmation.Id)
      
      if (isCurrentlySaved) {
        await savedAffirmationService.delete(affirmation.Id)
        setSavedAffirmationIds(prev => prev.filter(id => id !== affirmation.Id))
        setFavorites(prev => prev.filter(fav => fav.Id !== affirmation.Id))
        toast.success('Affirmation removed from favorites')
      } else {
        const savedAffirmation = {
          affirmationId: affirmation.Id,
          savedAt: new Date().toISOString()
        }
        await savedAffirmationService.create(savedAffirmation)
        setSavedAffirmationIds(prev => [...prev, affirmation.Id])
        setFavorites(prev => [...prev, { ...affirmation, savedAt: savedAffirmation.savedAt }])
        toast.success('Affirmation saved to favorites!')
      }
    } catch (err) {
      toast.error('Failed to save affirmation. Please try again.')
      console.error('Error saving affirmation:', err)
    }
  }

  const handleRemoveFavorite = async (affirmationId) => {
    try {
      await savedAffirmationService.delete(affirmationId)
      setSavedAffirmationIds(prev => prev.filter(id => id !== affirmationId))
      setFavorites(prev => prev.filter(fav => fav.Id !== affirmationId))
      toast.success('Affirmation removed from favorites')
    } catch (err) {
      toast.error('Failed to remove affirmation. Please try again.')
      console.error('Error removing favorite:', err)
    }
  }

  const retryLoad = () => {
    loadTodayAffirmation()
  }

  if (loading && activeTab === 'today') {
    return <Loading />
  }

  if (error && activeTab === 'today') {
    return <Error message={error} onRetry={retryLoad} />
  }

  return (
    <div className="space-y-8">
      <NavigationTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {activeTab === 'today' && todayAffirmation && (
        <AffirmationCard
          affirmation={todayAffirmation}
          isSaved={savedAffirmationIds.includes(todayAffirmation.Id)}
          onSave={handleSaveAffirmation}
        />
      )}

      {activeTab === 'favorites' && (
        <FavoritesGrid
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  )
}

export default HomePage