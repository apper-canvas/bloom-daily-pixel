import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import SaveButton from '@/components/molecules/SaveButton'
import Empty from '@/components/ui/Empty'

const FavoritesGrid = ({ favorites, onRemoveFavorite }) => {
  if (!favorites.length) {
    return <Empty />
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {favorites.map((favorite) => (
        <motion.div
          key={favorite.affirmationId}
          variants={itemVariants}
          layout
        >
          <Card className="relative group h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1 space-y-4">
                <p className="font-display text-lg leading-relaxed text-gray-700">
                  "{favorite.text}"
                </p>
                {favorite.author && (
                  <p className="text-sm text-gray-500 font-medium">
                    — {favorite.author}
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  Saved {new Date(favorite.savedAt).toLocaleDateString()}
                </span>
                <SaveButton 
                  isSaved={true}
                  onClick={() => onRemoveFavorite(favorite.affirmationId)}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FavoritesGrid