'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav 
      className={`navbar fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(15,15,35,0.95)]' : 'bg-[rgba(15,15,35,0.8)]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold gradient-text font-jetbrains">
          ashubh.dev
        </div>
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="hover:text-purple-400 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="hover:text-purple-400 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('experience')}
            className="hover:text-purple-400 transition-colors"
          >
            Experience
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="hover:text-purple-400 transition-colors"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="hover:text-purple-400 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}