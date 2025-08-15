'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const navItems = [
    { href: '/dashboard', label: 'Home', icon: '🏠' },
    { href: '/tracker', label: 'Tracker', icon: '📋' },
    { href: '/calendar', label: 'Calendar', icon: '📅' },
    { href: '/forum', label: 'Forum', icon: '💬' },
    { href: '/doctors', label: 'Doctors', icon: '👩‍⚕️' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
