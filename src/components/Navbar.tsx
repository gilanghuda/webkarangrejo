'use client'

import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'profil', label: 'Profil' },
    { id: 'wisata', label: 'Wisata' },
    { id: 'berita', label: 'Berita' },
    { id: 'kontak', label: 'Kontak' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C270C] backdrop-blur-sm h-[123px] opacity-70">
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/logo-desa.png" // Ganti dengan path logo yang sesuai
                alt="Logo Desa Karangrejo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold leading-tight font-sans">Desa Karangrejo</h1>
              <p className="text-lg font-medium opacity-90 font-sans">Kabupaten Blitar</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white text-lg font-medium hover:text-green-200 transition-colors duration-300 px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-10 font-sans"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white text-2xl font-sans">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar