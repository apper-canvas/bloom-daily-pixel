import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SaveButton = ({ isSaved, onClick, disabled = false }) => {
  const heartVariants = {
    saved: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.3, ease: "easeOut" }
    },
    unsaved: {
      scale: 1
    }
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isSaved
          ? 'bg-gradient-to-r from-accent-400 to-accent-500 text-white shadow-lg focus:ring-accent-300'
          : 'bg-white text-gray-400 hover:text-accent-500 hover:bg-accent-50 shadow-md border border-gray-200 focus:ring-accent-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        variants={heartVariants}
        animate={isSaved ? "saved" : "unsaved"}
      >
        <ApperIcon 
          name={isSaved ? "Heart" : "Heart"} 
          size={20} 
          fill={isSaved ? "currentColor" : "none"}
        />
      </motion.div>
    </motion.button>
  )
}

export default SaveButton