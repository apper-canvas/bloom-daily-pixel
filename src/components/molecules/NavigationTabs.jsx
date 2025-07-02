import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: 'Sun' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' }
  ]

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-surface rounded-full p-1 shadow-sm border border-gray-200">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-primary rounded-full shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex items-center space-x-2">
                <ApperIcon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavigationTabs