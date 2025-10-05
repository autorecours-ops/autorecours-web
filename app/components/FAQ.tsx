'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const faqItems = [
  {
    question: 'Combien coûte le service AutoRecours ?',
    answer: 'Le service est totalement gratuit tant que nous n\'avons pas gagné votre contestation. Vous ne payez que 19€ uniquement si nous réussissons à faire annuler votre FPS. Aucun paiement initial requis.'
  },
  {
    question: 'Quels types de FPS pouvez-vous contester ?',
    answer: 'Nous pouvons contester tous types d\'avis de paiement FPS : stationnement, zones à faibles émissions, infractions de circulation. Chaque dossier est analysé individuellement pour maximiser vos chances de succès.'
  },
  {
    question: 'Comment se passe l\'envoi de la contestation ?',
    answer: 'Nous préparons et envoyons votre contestation en lettre recommandée avec accusé de réception. Vous recevez une copie de l\'envoi par email et pouvez suivre l\'avancement de votre dossier en ligne.'
  },
  {
    question: 'Quelle est votre réussite ?',
    answer: 'Nous avons un taux de réussite de 95% sur les dossiers que nous traitons. Notre équipe d\'experts analyse chaque cas pour identifier les meilleures chances de succès selon la réglementation en vigueur.'
  },
  {
    question: 'Est-ce que mes données sont sécurisées ?',
    answer: 'Oui, absolument. Nous sommes conformes au RGPD et utilisons un chiffrement SSL pour toutes les données. Vos informations ne sont utilisées que pour votre contestation et sont automatiquement supprimées après 3 ans.'
  },
  {
    question: 'Que se passe-t-il si la contestation échoue ?',
    answer: 'Si malgré nos efforts la contestation n\'aboutit pas, vous ne payez rien. Notre modèle "success fee" signifie que vous ne réglez les 19€ que dans le cas où votre FPS est annulé ou réduit.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-navy-600">
            Tout ce que vous devez savoir sur AutoRecours
          </p>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-navy-900 pr-4">
                  {item.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUpIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-navy-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-navy-600 mb-6">
            Vous avez une autre question ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@autorecours.fr"
              className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}