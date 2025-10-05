import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoRecours - Contestation FPS Gratuite | 0€ Maintenant, 19€ Seulement Si On Gagne',
  description: 'Contestation gratuite de votre FPS (avis de paiement). Payez 19€ uniquement si nous gagnons votre dossier. Processus simple en 3 étapes.',
  keywords: 'FPS, contestation FPS, avis paiement, recours FPS, gratuit, success fee',
  openGraph: {
    title: 'AutoRecours - Contestation FPS Gratuite',
    description: '0€ maintenant, payez seulement si on gagne votre contestation FPS',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoRecours - Contestation FPS Gratuite',
    description: 'Service gratuit de contestation FPS - Payez 19€ uniquement en cas de succès',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}