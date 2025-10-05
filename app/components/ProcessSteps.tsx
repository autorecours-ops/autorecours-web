'use client'

import { motion } from 'framer-motion'
import { CameraIcon, ChatBubbleLeftRightIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

const steps = [
  {
    icon: CameraIcon,
    title: '1. Photo de l\'avis',
    description: 'Prenez une photo claire de votre FPS ou téléchargez le fichier PDF',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: '2. Expliquer la situation',
    description: 'Décrivez brièvement pourquoi vous contestez cet avis de paiement',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: CheckBadgeIcon,
    title: '3. On s\'occupe de tout',
    description: 'Nous préparons et envoyons votre contestation en recommandé',
    color: 'from-green-500 to-green-600'
  }
]

export default function ProcessSteps() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Simple et rapide en 3 étapes
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Notre processus est conçu pour être le plus simple possible. 
            Vous n'avez rien à payer tant que nous n'avons pas gagné votre dossier.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-navy-600 leading-relaxed">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent -z-10"></div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">95%</div>
            <p className="text-navy-600">Taux de succès</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">24h</div>
            <p className="text-navy-600">Traitement rapide</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">5000+</div>
            <p className="text-navy-600">Dossiers gagnés</p>
          </div>
        </div>
      </div>
    </section>
  )
}