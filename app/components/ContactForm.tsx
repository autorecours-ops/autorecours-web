'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { XMarkIcon, PaperClipIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useDropzone } from 'react-dropzone'

interface ContactFormProps {
  onSubmit?: (data: any) => void
  onClose: () => void
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '7ffee884-54f4-4746-a605-fb33e1a5211b'
const REDIRECT_URL = 'https://autorecours-web.vercel.app/confirmation'

export default function ContactForm({ onSubmit, onClose }: ContactFormProps) {
  const [files, setFiles] = useState<{ fps?: File; carteGrise?: File }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm()

  const fpsFile = watch('file_avis')
  const carteGriseFile = watch('file_carte')

  const { getRootProps: getFpsRootProps, getInputProps: getFpsInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heic'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setFiles((prev) => ({ ...prev, fps: file }))
        // on utilise le même name que celui attendu par Web3Forms
        setValue('file_avis', file)
      }
    },
  })

  const { getRootProps: getCarteRootProps, getInputProps: getCarteInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heic'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setFiles((prev) => ({ ...prev, carteGrise: file }))
        setValue('file_carte', file)
      }
    },
  })

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

  // Soumission : on laisse RHF valider, puis on soumet le <form> en POST vers Web3Forms
  const onFormSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      // enrichissement (facultatif) : ville/portail détectés depuis le n° FPS
      if (data.fps) {
        const cityData = detectCityFromFPS(String(data.fps))
        // On passe ces infos à Web3Forms via des champs cachés
        if (formRef.current) {
          ensureHidden(formRef.current, 'ville_detectee', cityData.city)
          ensureHidden(formRef.current, 'portail_detecte', cityData.portal)
        }
      }

      // Callback interne éventuel
      onSubmit?.(data)

      // Submit HTML vers Web3Forms (avec redirect auto)
      formRef.current?.submit()
    } finally {
      setIsSubmitting(false)
    }
  }

  // utilitaire : crée/maj un input hidden dans le form
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
          <p className="text-navy-600">0€ maintenant, payez seulement si on gagne</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* IMPORTANT : action Web3Forms + multipart + hidden keys */}
      <form
        ref={formRef}
        action={WEB3FORMS_ENDPOINT}
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-6"
      >
        {/* Web3Forms required */}
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value="Nouvelle contestation FPS - AutoRecours" />
        <input type="hidden" name="from_name" value="AutoRecours" />
        <input type="hidden" name="redirect" value={REDIRECT_URL} />
        {/* anti-bot (optionnel) */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">Email * (pour recevoir la confirmation)</label>
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
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">Téléphone (optionnel, pour suivi SMS)</label>
          <input type="tel" {...register('phone')} name="phone" className="form-input" placeholder="06 12 34 56 78" />
        </div>

        {/* Numéro FPS */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">Numéro FPS * (sur l&apos;avis de paiement)</label>
          <input
            type="text"
            {...register('fps', {
              required: 'Numéro FPS obligatoire',
              pattern: { value: /^[A-Z0-9-]+$/, message: 'Format invalide (lettres, chiffres et tirets uniquement)' },
            })}
            name="fps"
            className="form-input"
            placeholder="FPS-2024-123456"
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.toUpperCase()
            }}
          />
          {errors.fps && <p className="mt-1 text-sm text-red-600">{errors.fps.message as string}</p>}
        </div>

        {/* Motif */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">Motif de contestation *</label>
          <select {...register('motif', { required: 'Motif obligatoire' })} name="motif" className="form-input">
            <option value="">Sélectionnez un motif</option>
            {motifs.map((motif, index) => (
              <option key={index} value={motif}>
                {motif}
              </option>
            ))}
          </select>
          {errors.motif && <p className="mt-1 text-sm text-red-600">{errors.motif.message as string}</p>}
        </div>

        {/* Upload FPS */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Photo ou scan de l&apos;avis FPS * (PDF, JPG, PNG - max 10Mo)
          </label>
          <div
            {...getFpsRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              files.fps ? 'border-success-300 bg-success-50' : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
            }`}
          >
            {/* IMPORTANT : le name doit être "file_avis" pour Web3Forms */}
            <input {...getFpsInputProps({ name: 'file_avis' })} />
            {files.fps ? (
              <div className="flex items-center justify-center space-x-2 text-success-700">
                <CheckCircleIcon className="w-5 h-5" />
                <span>{files.fps.name}</span>
              </div>
            ) : (
              <div>
                <PaperClipIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Cliquez ou glissez le fichier ici</p>
              </div>
            )}
          </div>
          {!fpsFile && errors.file_avis && <p className="mt-1 text-sm text-red-600">Fichier FPS obligatoire</p>}
        </div>

        {/* Upload Carte Grise */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Carte grise (optionnel - pour appui à la contestation)
          </label>
          <div
            {...getCarteRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              files.carteGrise ? 'border-success-300 bg-success-50' : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
            }`}
          >
            {/* IMPORTANT : le name doit être "file_carte" */}
            <input {...getCarteInputProps({ name: 'file_carte' })} />
            {files.carteGrise ? (
              <div className="flex items-center justify-center space-x-2 text-success-700">
                <CheckCircleIcon className="w-5 h-5" />
                <span>{files.carteGrise.name}</span>
              </div>
            ) : (
              <div>
                <PaperClipIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Cliquez ou glissez le fichier ici</p>
              </div>
            )}
          </div>
        </div>

        {/* RGPD Consent */}
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('rgpdConsent', { required: 'Vous devez accepter les conditions RGPD' })}
              name="rgpdConsent"
              className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-navy-600">
              J&apos;accepte que mes données personnelles soient utilisées pour traiter ma contestation FPS. Conformément au RGPD,
              vos données seront conservées pendant 3 ans maximum. *
            </span>
          </label>
          {errors.rgpdConsent && <p className="text-sm text-red-600">{errors.rgpdConsent.message as string}</p>}
        </div>

        {/* Submit */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 btn-success disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma contestation'}
          </button>
        </div>

        {/* Sécurité */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-800">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Sécurisé et conforme RGPD</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">Vos données sont chiffrées et ne seront utilisées que pour votre contestation.</p>
        </div>
      </form>
    </div>
  )
}