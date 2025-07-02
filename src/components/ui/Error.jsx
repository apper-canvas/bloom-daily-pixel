import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-md mx-auto"
    >
      <Card padding="xl" background="white" hover={false} className="text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-display text-xl font-semibold text-gray-800">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600">
              {message}
            </p>
          </div>
          
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              icon="RefreshCw"
              className="w-full"
            >
              Try Again
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default Error