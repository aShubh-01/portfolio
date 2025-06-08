'use client'

import { useEffect, useState } from 'react'

const SocialLink = ({ href, icon, target = "_blank" }) => (
  <a 
    href={href} 
    target={target}
    rel={target === "_blank" ? "noopener noreferrer" : undefined}
    className="text-2xl hover:text-purple-400 transition-colors hover-lift"
  >
    <i className={icon} />
  </a>
)

const FloatingCode = ({ code, position, index }) => (
  <div
    className="absolute text-purple-400/40 font-mono text-sm bg-purple-900/15 px-3 py-2 rounded border border-purple-400/20 animate-pulse pointer-events-auto cursor-pointer transition-all hover:text-purple-400/90 hover:bg-purple-900/40 hover:scale-125"
    style={{
      left: `${position.left}%`,
      top: `${position.top}%`,
      animationDelay: `${index * 0.5}s`,
      animationDuration: `${2 + (index % 3)}s`
    }}
  >
    {code}
  </div>
)

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

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  const typedText = useTypingAnimation("Backend Developer | Tech Generalist | AI-first Engineer", isTyping)
  
  const codeBlocks = [
    'npm install magic', 'git push origin main', 'docker build -t awesome', 'kubectl apply -f deploy.yaml',
    'const future = await ai()', 'SELECT * FROM dreams', 'npm run build:prod', 'git commit -m "✨"',
    'pip install success', 'terraform apply', 'systemctl restart nginx', 'yarn add happiness'
  ]
  
  const positions = [
    { left: 10, top: 15 }, { left: 70, top: 20 }, { left: 25, top: 35 },
    { left: 85, top: 40 }, { left: 15, top: 55 }, { left: 60, top: 65 },
    { left: 35, top: 75 }, { left: 80, top: 80 }, { left: 5, top: 85 },
    { left: 45, top: 25 }, { left: 20, top: 70 }, { left: 75, top: 55 }
  ]
  
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
      <div className="absolute inset-0 cursor-crosshair" onClick={createRipple} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeBlocks.map((code, i) => (
          <FloatingCode key={i} code={code} position={positions[i]} index={i} />
        ))}
      </div>

      <div className={`text-center z-10 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text relative z-20">
          Shubham Dhokare
        </h1>
        
        <div className="text-xl md:text-2xl mb-8 text-gray-300 relative z-20 h-8 flex items-center justify-center">
          <span className="font-mono">
            {typedText}
            <span className="animate-pulse ml-1 text-purple-400">|</span>
          </span>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8 relative z-20">
          {socialLinks.map((link, i) => (
            <SocialLink key={i} {...link} />
          ))}
        </div>
        
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="inline-block px-8 py-3 glass-effect rounded-full hover:bg-purple-600/20 transition-all hover-lift relative z-20"
        >
          Explore My Work
        </button>
      </div>
    </section>
  )
}