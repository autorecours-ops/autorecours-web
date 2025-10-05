'use client'

import { motion } from 'framer-motion'

interface StickyCTAProps {
  onClick: () => void
}

export default function StickyCTA({ onClick }: StickyCTAProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
    >
      <button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white font-semibold py-4 px-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg">Démarrer ma contestation</span>
          <span className="text-sm opacity-90">- Gratuit</span>
        </div>
      </button>
    </motion.div>
  )
}