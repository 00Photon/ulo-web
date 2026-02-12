'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Building2,
  Home,
  Landmark,
  Menu,
  Users,
  Wrench,
  Lightbulb,
  User,
  X,
  Calculator,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function HomeNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/buy', label: 'Buy', icon: Home },
    { href: '/sell', label: 'Sell', icon: Landmark },
    { href: '/rent', label: 'Rent', icon: Building2 },
    { href: '/shortlet', label: 'Shortlet', icon: Building2 },
    { href: '/agents', label: 'Agents', icon: Users },
    { href: '/services', label: 'Services', icon: Wrench },
    { href: '/insights', label: 'Insights', icon: Lightbulb },
    { href: '/advertise', label: 'Advertise', icon: Lightbulb },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ]

  return (
    <nav className="sticky top-0 z-50">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-gray-100/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">
            ULO
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200"
            >
              <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Actions + Hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <User className="w-5 h-5" />
          </Link>

          <Link href="/list-property">
            <Button
              size="sm"
              className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              List Property
            </Button>
          </Link>

          <button
            className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-gray-900">ULO</span>
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 py-4 px-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t space-y-3">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                href="/list-property"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => setIsOpen(false)}
              >
                List Property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

