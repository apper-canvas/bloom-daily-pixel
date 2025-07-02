import React from 'react'
import { motion } from 'framer-motion'

const GradientOrb = ({ 
  size = 'md', 
  position = 'center', 
  opacity = 0.1, 
  animate = true,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  }

  const positions = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  }

  const orbVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      variants={animate ? orbVariants : {}}
      animate={animate ? "animate" : ""}
      className={`absolute ${sizes[size]} ${positions[position]} ${className}`}
      style={{ opacity }}
    >
      <div className="w-full h-full bg-gradient-orb rounded-full blur-3xl" />
    </motion.div>
  )
}

export default GradientOrb