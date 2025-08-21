import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { AuthProvider } from '@/components/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Heard - Your Health Companion',
  description: 'A supportive app for tracking symptoms, finding doctors, and managing your health journey.',
  keywords: 'health, symptoms, doctor finder, medical, wellness, patient advocacy',
  authors: [{ name: 'Heard Team' }],
  creator: 'Heard',
  publisher: 'Heard',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://heard-app-beta.onrender.com'),
  openGraph: {
    title: 'Heard - Your Health Companion',
    description: 'A supportive app for tracking symptoms, finding doctors, and managing your health journey.',
    url: 'https://heard-app-beta.onrender.com',
    siteName: 'Heard',
    images: [
      {
        url: '/icons/heard-app-icon.svg',
        width: 512,
        height: 512,
        alt: 'Heard App Icon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heard - Your Health Companion',
    description: 'A supportive app for tracking symptoms, finding doctors, and managing your health journey.',
    images: ['/icons/heard-app-icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F5F5DC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-cream">
            {/* Main Content */}
            <div className="pt-4 pb-20">
              {children}
            </div>
            
            {/* Navigation */}
            <Navigation />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
