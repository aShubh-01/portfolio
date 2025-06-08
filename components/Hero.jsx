'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const fullText = "Backend Developer | Tech Generalist | AI-first Engineer"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Start typing animation after hero appears
      setTimeout(() => {
        setIsTyping(true)
      }, 800)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Typing animation effect with delete
  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    let isDeleting = false
    const typingSpeed = 100 // milliseconds per character when typing
    const deletingSpeed = 50 // milliseconds per character when deleting
    const pauseAtEnd = 2000 // pause at end before deleting
    const pauseAtStart = 1000 // pause after deleting before retyping

    const animateText = () => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex))
          currentIndex++
          setTimeout(animateText, typingSpeed)
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            isDeleting = true
            currentIndex = fullText.length
            animateText()
          }, pauseAtEnd)
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setTypedText(fullText.slice(0, currentIndex - 1))
          currentIndex--
          setTimeout(animateText, deletingSpeed)
        } else {
          // Finished deleting, pause then start typing again
          setTimeout(() => {
            isDeleting = false
            currentIndex = 0
            animateText()
          }, pauseAtStart)
        }
      }
    }

    animateText()
  }, [isTyping, fullText])

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900"
    >
    
      {/* Clickable Ripple Effects */}
      <div 
        className="absolute inset-0 cursor-crosshair"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          
          // Create ripple element
          const ripple = document.createElement('div')
          ripple.className = 'absolute w-4 h-4 bg-purple-400/30 rounded-full pointer-events-none'
          ripple.style.left = `${x}px`
          ripple.style.top = `${y}px`
          ripple.style.transform = 'translate(-50%, -50%)'
          ripple.style.animation = 'rippleExpand 1s ease-out forwards'
          
          e.currentTarget.appendChild(ripple)
          
          // Remove after animation
          setTimeout(() => {
            ripple.remove()
          }, 1000)
        }}
      >
      </div>

 {/* Floating Code Blocks */}
{/* Floating Code Blocks */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[
    'npm install magic', 'git push origin main', 'docker build -t awesome', 'kubectl apply -f deploy.yaml',
    'const future = await ai()', 'SELECT * FROM dreams', 'npm run build:prod', 'git commit -m "✨"',
    'pip install success', 'terraform apply', 'systemctl restart nginx', 'yarn add happiness'
  ].map((code, i) => {
    const positions = [
      { left: 10, top: 15 }, { left: 70, top: 20 }, { left: 25, top: 35 },
      { left: 85, top: 40 }, { left: 15, top: 55 }, { left: 60, top: 65 },
      { left: 35, top: 75 }, { left: 80, top: 80 }, { left: 5, top: 85 },
      { left: 45, top: 25 }, { left: 20, top: 70 }, { left: 75, top: 55 }
    ];
    
    return (
      <div
        key={i}
        className="absolute text-purple-400/40 font-mono text-sm bg-purple-900/15 px-3 py-2 rounded border border-purple-400/20 animate-pulse pointer-events-auto cursor-pointer transition-all hover:text-purple-400/90 hover:bg-purple-900/40 hover:scale-125"
        style={{
          left: `${positions[i].left}%`,
          top: `${positions[i].top}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${2 + (i % 3)}s`
        }}
      >
        {code}
      </div>
    )
  })}
</div>

      <div className={`text-center z-10 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text relative z-20">
          Shubham Dhokare
        </h1>
        
        {/* Typing Animation Text */}
        <div className="text-xl md:text-2xl mb-8 text-gray-300 relative z-20 h-8 flex items-center justify-center">
          <span className="font-mono">
            {typedText}
            <span className="animate-pulse ml-1 text-purple-400">|</span>
          </span>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8 relative z-20">
          <a 
            href="https://github.com/aShubh-01" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-purple-400 transition-colors hover-lift"
          >
            <i className="fab fa-github" />
          </a>
          <a 
            href="https://linkedin.com/in/shubhamdhokare" 
            target="https://www.linkedin.com/in/shubham-dhokare-ab4254287/"
            rel="noopener noreferrer"
            className="text-2xl hover:text-purple-400 transition-colors hover-lift"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a 
            href="mailto:shubhamdhokare01@gmail.com" 
            className="text-2xl hover:text-purple-400 transition-colors hover-lift"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>
        <button
          onClick={scrollToAbout}
          className="inline-block px-8 py-3 glass-effect rounded-full hover:bg-purple-600/20 transition-all hover-lift relative z-20"
        >
          Explore My Work
        </button>
      </div>
    </section>
  )
}