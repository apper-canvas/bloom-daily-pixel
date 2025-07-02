import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Empty = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-lg mx-auto"
    >
      <Card padding="xl" background="gradient" hover={false} className="text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center"
            >
              <ApperIcon name="Heart" size={40} className="text-primary-500" />
            </motion.div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-display text-2xl font-semibold text-gray-800">
              No favorites yet
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Start building your collection of meaningful affirmations! When you find one that resonates with you, tap the heart to save it here.
            </p>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-primary-600 font-medium">
              💜 Your saved affirmations will appear here
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default Empty