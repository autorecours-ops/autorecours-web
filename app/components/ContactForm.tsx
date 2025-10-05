'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface ContactFormProps {
  onSubmit?: (data: any) => void
  onClose: () => void
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '7ffee884-54f4-4746-a605-fb33e1a5211b'
const REDIRECT_URL = 'https://autorecours-web.vercel.app/confirmation'

export default function ContactForm({ onSubmit, onClose }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  function detectCityFromFPS(fpsNumber: string) {
    const prefixes: Record<string, { city: string; portal: string }> = {
      '750': { city: 'Paris', portal: 'tefps.paris.fr' },
      '690': { city: 'Lyon', portal: 'tefpl.lyon.fr' },
      '130': { city: 'Marseille', portal: 'tefps.marseille.fr' },
      '330': { city: 'Bordeaux', portal: 'tefps.bordeaux.fr' },
      '060': { city: 'Nice', portal: 'tefps.nice.fr' },
    }
    const prefix = (fpsNumber || '').substring(0, 3)
    return prefixes[prefix] || { city: 'Ville inconnue', portal: 'tefps.fr' }
  }

  const motifs = [
    'Stationnement interdit non signalé',
    'Panne de la borne de paiement',
    "Erreur sur l'heure de stationnement",
    'Véhicule en panne',
    'Problème de carte bancaire',
    'Autre (à préciser)',
  ]

  const onFormSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      // enrichissement ville/portail détectés
      const fps = String(data.fps || '')
      if (fps && formRef.current) {
        const { city, portal } = detectCityFromFPS(fps)
        ensureHidden(formRef.current, 'ville_detectee', city)
        ensureHidden(formRef.current, 'portail_detecte', portal)
      }

      onSubmit?.(data)
      formRef.current?.submit() // envoi HTML vers Web3Forms
    } finally {
      setIsSubmitting(false)
    }
  }

  function ensureHidden(form: HTMLFormElement, name: string, value: string) {
    let input = form.querySelector(`input[name="${name}"]`) as HTMLInputElement | null
    if (!input) {
      input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      form.appendChild(input)
    }
    input.value = value
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Contester mon FPS</h2>
          <p className="text-navy-600">0 € maintenant, 19 € seulement si on gagne</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* FORM → Web3Forms sans fichiers */}
      <form
        ref={formRef}
        action={WEB3FORMS_ENDPOINT}
        method="POST"
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-6"
      >
        {/* requis Web3Forms */}
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value="Nouvelle contestation FPS - AutoRecours" />
        <input type="hidden" name="from_name" value="AutoRecours" />
        <input type="hidden" name="redirect" value={REDIRECT_URL} />
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Email * (pour la confirmation)
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email obligatoire',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
            })}
            name="email"
            className="form-input"
            placeholder="votre@email.fr"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{String(errors.email.message)}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Téléphone (optionnel, pour suivi SMS)
          </label>
          <input type="tel" {...register('phone')} name="phone" className="form-input" placeholder="06 12 34 56 78" />
        </div>

        {/* Numéro FPS */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Numéro FPS * (sur l&apos;avis de paiement)
          </label>
          <input
            type="text"
            {...register('fps', {
              required: 'Numéro FPS obligatoire',
              pattern: { value: /^[A-Z0-9-]+$/, message: 'Format invalide' },
            })}
            name="fps"
            className="form-input"
            placeholder="FPS-2024-123456"
            onChange={(e) => (e.currentTarget.value = e.currentTarget.value.toUpperCase())}
          />
          {errors.fps && <p className="mt-1 text-sm text-red-600">{String(errors.fps.message)}</p>}
        </div>

        {/* Motif */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Motif de contestation *
          </label>
          <select {...register('motif', { required: 'Motif obligatoire' })} name="motif" className="form-input">
            <option value="">Sélectionnez un motif</option>
            {['Stationnement interdit non signalé','Panne de la borne de paiement',"Erreur sur l'heure de stationnement",'Véhicule en panne','Problème de carte bancaire','Autre (à préciser)']
              .map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>
          {errors.motif && <p className="mt-1 text-sm text-red-600">{String(errors.motif.message)}</p>}
        </div>

        {/* Nouveau : lien des pièces (Drive/Photos/Dropbox) */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Lien vers vos pièces (optionnel)
          </label>
          <input
            type="url"
            {...register('lien_pieces')}
            name="lien_pieces"
            className="form-input"
            placeholder="https://drive.google.com/… ou https://photos.app.goo.gl/…"
          />
          <p className="text-xs text-gray-500 mt-1">
            Vous pouvez coller un lien (Drive, Photos, Dropbox) avec la photo de l’avis et, si possible, la carte grise.
          </p>
        </div>

        {/* RGPD */}
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('rgpdConsent', { required: 'Vous devez accepter les conditions RGPD' })}
              name="rgpdConsent"
              className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-navy-600">
              J&apos;accepte que mes données soient utilisées pour traiter ma contestation FPS. *
            </span>
          </label>
          {errors.rgpdConsent && <p className="text-sm text-red-600">{String(errors.rgpdConsent.message)}</p>}
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <button type="button" onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Annuler
          </button>
          <button type="submit" disabled={isSubmitting}
            className="flex-1 btn-success disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma contestation'}
          </button>
        </div>

        {/* Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Étape suivante</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            Nous vous enverrons un email sous 24–48h. Si vous n’avez pas mis de lien, nous vous le demanderons alors.
          </p>
        </div>
      </form>
    </div>
  )
}