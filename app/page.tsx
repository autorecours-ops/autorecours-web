'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Hero from './components/Hero'
import ProcessSteps from './components/ProcessSteps'
import ContactForm from './components/ContactForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({})

  const handleFormSubmit = async (data: any) => {
    try {
      // Simulation d'envoi des données
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Dossier enregistré ✅ Vous recevrez un email sous 24-48h', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      
      setShowForm(false)
      setFormData(data)
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.')
    }
  }

  // Fonction pour rediriger vers la page de confirmation
  const handleFormSuccess = (data: any) => {
    setFormData(data)
    // Rediriger vers la page de confirmation
    window.location.href = '/confirmation'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ToastContainer />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-success-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-navy-800">AutoRecours</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#process" className="text-navy-600 hover:text-primary-600 transition-colors">Comment ça marche</a>
              <a href="#faq" className="text-navy-600 hover:text-primary-600 transition-colors">FAQ</a>
              <button 
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Démarrer - Gratuit
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero onStart={() => setShowForm(true)} />
      </motion.div>

      {/* Process Steps */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="process"
      >
        <ProcessSteps />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="faq"
      >
        <FAQ />
      </motion.div>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA for Mobile */}
      <StickyCTA onClick={() => setShowForm(true)} />

      {/* Contact Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ContactForm onSubmit={handleFormSuccess} onClose={() => setShowForm(false)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}