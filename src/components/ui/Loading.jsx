import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import GradientOrb from '@/components/atoms/GradientOrb'

const Loading = () => {
  const pulseVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="relative">
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
          {/* Title skeleton */}
          <div className="space-y-4">
            <motion.div 
              variants={pulseVariants}
              animate="animate"
              className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto w-3/4 shimmer"
            />
            <motion.div 
              variants={pulseVariants}
              animate="animate"
              className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto w-2/3 shimmer"
              style={{ animationDelay: '0.2s' }}
            />
            <motion.div 
              variants={pulseVariants}
              animate="animate"
              className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto w-1/2 shimmer"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
          
          {/* Author skeleton */}
          <motion.div 
            variants={pulseVariants}
            animate="animate"
            className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md mx-auto w-40 shimmer"
            style={{ animationDelay: '0.6s' }}
          />
          
          {/* Save button skeleton */}
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="flex justify-center pt-4"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer" />
          </motion.div>
        </div>
      </Card>
    </div>
  )
}

export default Loading