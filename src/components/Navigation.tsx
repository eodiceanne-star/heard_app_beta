'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()
  const navItems = [
    { 
      href: '/dashboard', 
      label: 'Home', 
      icon: '/assets/images/navigation/cool-kids-plant.png',
      fallback: '🏠'
    },
    { 
      href: '/tracker', 
      label: 'Tracker', 
      icon: '/assets/images/navigation/cool-kids-research.png',
      fallback: '📋'
    },
    { 
      href: '/calendar', 
      label: 'Calendar', 
      icon: '/assets/images/navigation/fresh-folk-calendar.png',
      fallback: '📅'
    },
    { 
      href: '/forum', 
      label: 'Forum', 
      icon: '/assets/images/navigation/cool-kids-messages.png',
      fallback: '💬'
    },
    { 
      href: '/doctors', 
      label: 'Doctors', 
      icon: '/assets/images/navigation/amigos-search .png',
      fallback: '👩‍⚕️'
    },
    { 
      href: '/settings', 
      label: 'Settings', 
      icon: '/assets/images/navigation/croods-settings.png',
      fallback: '⚙️'
    },
  ]

  return (
    <nav className="nav-container">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="w-8 h-8 mb-1 flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="text-xl">${item.fallback}</span>`
                    }
                  }}
                />
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
