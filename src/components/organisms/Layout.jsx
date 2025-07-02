import React from 'react'
import { motion } from 'framer-motion'
import GradientOrb from '@/components/atoms/GradientOrb'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-50/30 relative overflow-hidden">
      {/* Background gradient orbs */}
      <GradientOrb 
        size="xl" 
        position="top-left" 
        opacity={0.05} 
        animate={true}
      />
      <GradientOrb 
        size="lg" 
        position="top-right" 
        opacity={0.04} 
        animate={true}
      />
      <GradientOrb 
        size="md" 
        position="bottom-left" 
        opacity={0.03} 
        animate={true}
      />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 py-8 px-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-700 bg-clip-text text-transparent">
          Bloom Daily
        </h1>
        <p className="mt-2 text-lg text-gray-600 font-medium">
          Nurture your mind with daily affirmations
        </p>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout