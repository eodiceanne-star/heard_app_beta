import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Heard - Women\'s Healthcare Support Platform',
  description: 'A safe space for women and marginalized patients navigating chronic illness, misdiagnosis, and medical gaslighting.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-lato">
        {children}
      </body>
    </html>
  )
}
