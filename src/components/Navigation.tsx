'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/tracker', label: 'Tracker', icon: '📋' },
    { href: '/doctors', label: 'Doctors', icon: '👩‍⚕️' },
    { href: '/music', label: 'Music', icon: '🎧' },
    { href: '/prep', label: 'Prep', icon: '📝' },
    { href: '/calendar', label: 'Calendar', icon: '📅' },
    { href: '/about', label: 'About', icon: '👥' },
    { href: '/guidelines', label: 'Guidelines', icon: '📋' },
    { href: '/privacy', label: 'Privacy', icon: '🔒' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
