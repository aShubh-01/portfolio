'use client'

import { useEffect, useState } from 'react'

const SocialLink = ({ href, icon, target = "_blank" }) => (
  <a 
    href={href} 
    target={target}
    rel={target === "_blank" ? "noopener noreferrer" : undefined}
    className="text-xl sm:text-2xl hover:text-purple-400 transition-colors hover-lift"
  >
    <i className={icon} />
  </a>
)

const FloatingCode = ({ code, position, index, screenSize }) => {
  // Adjust code visibility and content based on screen size
  const getResponsiveCode = () => {
    if (screenSize === 'mobile') {
      // Shorter codes for mobile
      const mobileCodes = {
        'npm install magic': 'npm i magic',
        'git push origin main': 'git push',
        'docker build -t awesome': 'docker build',
        'kubectl apply -f deploy.yaml': 'kubectl apply',
        'const future = await ai()': 'await ai()',
        'SELECT * FROM dreams': 'SELECT *',
        'npm run build:prod': 'npm build',
        'git commit -m "✨"': 'git commit',
        'pip install success': 'pip install',
        'terraform apply': 'terraform',
        'systemctl restart nginx': 'systemctl',
        'yarn add happiness': 'yarn add'
      }
      return mobileCodes[code] || code
    }
    return code
  }

  return (
    <div
      className={`absolute text-purple-400/40 font-mono bg-purple-900/15 px-2 py-1 sm:px-3 sm:py-2 rounded border border-purple-400/20 animate-pulse pointer-events-auto cursor-pointer transition-all hover:text-purple-400/90 hover:bg-purple-900/40 hover:scale-125 ${
        screenSize === 'mobile' ? 'text-xs' : screenSize === 'tablet' ? 'text-sm' : 'text-sm'
      }`}
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        animationDelay: `${index * 0.5}s`,
        animationDuration: `${2 + (index % 3)}s`
      }}
    >
      {getResponsiveCode()}
    </div>
  )
}

const useTypingAnimation = (text, isActive) => {
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    if (!isActive) return
    
    let index = 0
    let isDeleting = false
    
    const animate = () => {
      if (!isDeleting) {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index++))
          setTimeout(animate, 100)
        } else {
          setTimeout(() => { isDeleting = true; animate() }, 2000)
        }
      } else {
        if (index > 0) {
          setDisplayText(text.slice(0, --index))
          setTimeout(animate, 50)
        } else {
          setTimeout(() => { isDeleting = false; animate() }, 1000)
        }
      }
    }
    
    animate()
  }, [text, isActive])
  
  return displayText
}

const createRipple = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const ripple = document.createElement('div')
  
  Object.assign(ripple.style, {
    position: 'absolute',
    left: `${e.clientX - rect.left}px`,
    top: `${e.clientY - rect.top}px`,
    transform: 'translate(-50%, -50%)',
    width: '16px',
    height: '16px',
    background: 'rgba(196, 181, 253, 0.3)',
    borderRadius: '50%',
    pointerEvents: 'none',
    animation: 'rippleExpand 1s ease-out forwards'
  })
  
  e.currentTarget.appendChild(ripple)
  setTimeout(() => ripple.remove(), 1000)
}

const useResponsiveScreen = () => {
  const [screenSize, setScreenSize] = useState('desktop')
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize('mobile')
      } else if (width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  
  return screenSize
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const screenSize = useResponsiveScreen()
  
  const typedText = useTypingAnimation("Backend Developer | Systems Architect | AI-first Engineer", isTyping)
  
  const codeBlocks = [
    'npm install magic', 'git push origin main', 'docker build -t awesome', 'kubectl apply -f deploy.yaml',
    'const future = await ai()', 'SELECT * FROM dreams', 'npm run build:prod', 'git commit -m "✨"',
    'pip install success', 'terraform apply', 'systemctl restart nginx', 'yarn add happiness'
  ]
  
  // Responsive positions - fewer code blocks on smaller screens
  const getResponsivePositions = () => {
    if (screenSize === 'mobile') {
      return [
        { left: 5, top: 10 }, { left: 75, top: 15 }, { left: 20, top: 25 },
        { left: 85, top: 35 }, { left: 10, top: 45 }, { left: 60, top: 55 },
        { left: 30, top: 65 }, { left: 80, top: 75 }, { left: 15, top: 85 }
      ]
    } else if (screenSize === 'tablet') {
      return [
        { left: 8, top: 12 }, { left: 72, top: 18 }, { left: 22, top: 28 },
        { left: 85, top: 38 }, { left: 12, top: 48 }, { left: 65, top: 58 },
        { left: 32, top: 68 }, { left: 82, top: 78 }, { left: 18, top: 88 },
        { left: 45, top: 22 }, { left: 5, top: 72 }
      ]
    } else {
      return [
        { left: 10, top: 15 }, { left: 70, top: 20 }, { left: 25, top: 35 },
        { left: 85, top: 40 }, { left: 15, top: 55 }, { left: 60, top: 65 },
        { left: 35, top: 75 }, { left: 80, top: 80 }, { left: 5, top: 85 },
        { left: 45, top: 25 }, { left: 20, top: 70 }, { left: 75, top: 55 }
      ]
    }
  }
  
  const positions = getResponsivePositions()
  
  // Limit code blocks based on screen size
  const getVisibleCodeBlocks = () => {
    if (screenSize === 'mobile') {
      return codeBlocks.slice(0, 9) // Show 9 blocks on mobile
    } else if (screenSize === 'tablet') {
      return codeBlocks.slice(0, 11) // Show 11 blocks on tablet
    }
    return codeBlocks // Show all 12 blocks on desktop
  }
  
  const visibleCodeBlocks = getVisibleCodeBlocks()
  
  const socialLinks = [
    { href: "https://github.com/aShubh-01", icon: "fab fa-github" },
    { href: "https://www.linkedin.com/in/shubham-dhokare-ab4254287/", icon: "fab fa-linkedin" },
    { href: "mailto:shubhamdhokare01@gmail.com", icon: "fas fa-envelope", target: "_self" }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setTimeout(() => setIsTyping(true), 800)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Responsive gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      
      {/* Interactive ripple area */}
      <div className="absolute inset-0 cursor-crosshair" onClick={createRipple} />
      
      {/* Floating code blocks with responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {visibleCodeBlocks.map((code, i) => (
          <FloatingCode 
            key={i} 
            code={code} 
            position={positions[i]} 
            index={i}
            screenSize={screenSize}
          />
        ))}
      </div>

      {/* Main content with responsive typography */}
      <div className={`text-center z-10 px-4 sm:px-6 transition-all duration-1000 max-w-4xl mx-auto ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text relative z-20 leading-tight">
          Shubham Dhokare
        </h1>
        
        {/* Responsive typing animation container */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-300 relative z-20 min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center px-4">
          <span className="font-mono text-center break-words">
            {typedText}
            <span className="animate-pulse ml-1 text-purple-400">|</span>
          </span>
        </div>
        
        {/* Responsive social links */}
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8 relative z-20">
          {socialLinks.map((link, i) => (
            <SocialLink key={i} {...link} />
          ))}
        </div>
        
        {/* Responsive CTA button */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="inline-block px-6 sm:px-8 py-2 sm:py-3 glass-effect rounded-full hover:bg-purple-600/20 transition-all hover-lift relative z-20 text-sm sm:text-base"
        >
          Explore My Work
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes rippleExpand {
          to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        
        /* Responsive adjustments for very small screens */
        @media (max-width: 480px) {
          .floating-code {
            font-size: 0.6rem;
            padding: 0.25rem 0.5rem;
          }
        }
        
        /* Ensure text doesn't overflow on small screens */
        @media (max-width: 640px) {
          .font-mono {
            word-break: break-word;
            hyphens: auto;
          }
        }
      `}</style>
    </section>
  )
}