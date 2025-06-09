'use client'

import { useEffect, useState } from 'react'

const NavButton = ({ section, children }) => (
  <button 
    onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
    className="hover:text-purple-400 transition-colors"
  >
    {children}
  </button>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['home', 'about', 'experience', 'projects', 'contact']

  return (
    <>
      <nav className={`navbar fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(15,15,35,0.95)]' : 'bg-[rgba(15,15,35,0.8)]'
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold gradient-text font-jetbrains">
            ashubh.dev
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <NavButton key={item} section={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavButton>
            ))}
          </div>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  )
}