import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import SaveButton from '@/components/molecules/SaveButton'
import GradientOrb from '@/components/atoms/GradientOrb'

const AffirmationCard = ({ affirmation, isSaved, onSave, className = '' }) => {
  if (!affirmation) return null

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`relative ${className}`}
    >
      <GradientOrb 
        size="lg" 
        position="center" 
        opacity={0.03} 
        animate={true}
      />
      
      <Card 
        padding="xl" 
        background="white" 
        hover={false}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <div className="space-y-8">
          <motion.h1 
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-relaxed text-gray-800 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            "{affirmation.text}"
          </motion.h1>
          
          {affirmation.author && (
            <motion.p 
              className="text-lg text-gray-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              — {affirmation.author}
            </motion.p>
          )}
          
          <motion.div
            className="flex justify-center pt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <SaveButton 
              isSaved={isSaved}
              onClick={() => onSave(affirmation)}
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default AffirmationCard