import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthContext'

export const metadata: Metadata = {
  title: 'Heard - Women\'s Healthcare Support Platform',
  description: 'A safe space for women and marginalized patients navigating chronic illness, misdiagnosis, and medical gaslighting.',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#E6B7B0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Heard'
  },
  openGraph: {
    title: 'Heard - Healthcare Support Platform',
    description: 'A women\'s healthcare support platform',
    type: 'website',
    url: 'https://heard-app.com'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Heard" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      </head>
      <body className="font-lato">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
