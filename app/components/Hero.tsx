'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon, ShieldCheckIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'

interface HeroProps {
  onStart: () => void
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800 mb-4">
                Service 100% gratuit
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6 leading-tight">
              Contestez votre 
              <span className="gradient-text"> FPS</span> 
              <br />gratuitement
            </h1>
            
            <p className="text-xl text-navy-600 mb-8 leading-relaxed">
              0 € maintenant, 19 € seulement si on gagne votre contestation FPS. 
              Processus simple en 3 étapes. Garantie succès ou remboursé.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-success-600" />
                <span className="text-navy-700">Aucun paiement initial</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-6 h-6 text-success-600" />
                <span className="text-navy-700">RGPD conforme & sécurisé</span>
              </div>
              <div className="flex items-center space-x-3">
                <DocumentCheckIcon className="w-6 h-6 text-success-600" />
                <span className="text-navy-700">Envoi recommandé inclus</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="btn-primary text-lg px-8 py-4"
            >
              Démarrer ma contestation
            </motion.button>
          </motion.div>
          
          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">!</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-800">Avis de Paiement FPS</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Montant:</span>
                    <span className="font-semibold text-red-600">135,00 €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">15/09/2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Référence:</span>
                    <span className="font-semibold">FPS-2024-123456</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <span className="text-success-600 font-semibold">Économisez 135€</span>
                    <p className="text-xs text-gray-500 mt-1">avec AutoRecours</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary-100 to-success-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-gradient-to-br from-success-100 to-primary-100 rounded-full opacity-30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}