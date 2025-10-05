'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-navy-900 mb-4"
          >
            Dossier enregistré ✅
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-navy-600 mb-8"
          >
            Votre contestation FPS a été enregistrée avec succès
          </motion.p>
          
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-blue-50 rounded-xl p-6">
              <EnvelopeIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-navy-900 mb-2">Email de confirmation</h3>
              <p className="text-sm text-navy-600">
                Vous recevrez un email de confirmation sous 24-48h avec les détails de votre dossier
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6">
              <ClockIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-navy-900 mb-2">Traitement rapide</h3>
              <p className="text-sm text-navy-600">
                Notre équipe analyse votre dossier sous 48h et prépare votre contestation
              </p>
            </div>
          </motion.div>
          
          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Prochaines étapes</h3>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-navy-700">Analyse de votre dossier par nos experts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-navy-700">Préparation de la contestation personnalisée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-navy-700">Envoi en recommandé avec suivi</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span className="text-navy-700">Notification du résultat par email</span>
              </div>
            </div>
          </motion.div>
          
          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
          >
            <h4 className="font-semibold text-green-800 mb-2">🎉 Bonne nouvelle !</h4>
            <p className="text-green-700">
              Vous ne paierez que 19€ si nous gagnons votre contestation. 
              Sinon, c'est totalement gratuit. Aucun risque pour vous !
            </p>
          </motion.div>
          
          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Retour à l'accueil
            </Link>
            <a
              href="mailto:support@autorecours.fr"
              className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              Nous contacter
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}