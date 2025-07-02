import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'md',
  background = 'surface',
  ...props 
}) => {
  const baseClasses = 'rounded-2xl shadow-sm border border-gray-100 transition-all duration-200'
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const backgrounds = {
    surface: 'bg-surface',
    white: 'bg-white',
    gradient: 'bg-gradient-surface'
  }
  
  const hoverClasses = hover ? 'hover:shadow-lg hover:shadow-primary-100/20 hover:-translate-y-1' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${baseClasses} ${backgrounds[background]} ${paddings[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card