'use client'

import { useEffect, useRef, useState } from 'react'

const GeometricShape = ({ index, isCircle = false }) => (
  <div
    className={`absolute ${isCircle 
      ? 'w-2 h-2 bg-blue-400/20 rounded-full animate-bounce' 
      : 'border border-purple-400/30 animate-pulse'
    }`}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      ...(isCircle ? {} : {
        width: `${20 + Math.random() * 40}px`,
        height: `${20 + Math.random() * 40}px`,
        transform: `rotate(${Math.random() * 360}deg)`
      }),
      animationDelay: `${index * (isCircle ? 1.5 : 2)}s`,
      animationDuration: `${(isCircle ? 4 : 3) + Math.random() * 2}s`
    }}
  />
)

const useIntersectionObserver = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Add a small delay to ensure user has time to focus on the section
          setTimeout(() => setIsVisible(true), 150)
        }
      },
      { 
        threshold,
        rootMargin: '-50px 0px -50px 0px' // Start animation when section is more centered
      }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => currentRef && observer.unobserve(currentRef)
  }, [threshold, isVisible])

  return [ref, isVisible]
}

export default function About() {
  const [sectionRef, isVisible] = useIntersectionObserver()
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  // Staggered animation timing
  useEffect(() => {
    if (isVisible) {
      // Title appears first
      setTimeout(() => setTitleVisible(true), 200)
      // Subtitle appears after title animation starts
      setTimeout(() => setSubtitleVisible(true), 600)
    }
  }, [isVisible])

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(8)].map((_, i) => <GeometricShape key={i} index={i} />)}
        {[...Array(6)].map((_, i) => <GeometricShape key={`circle-${i}`} index={i} isCircle />)}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Staggered header animations */}
        <h2 
          className={`text-4xl font-bold text-center mb-4 gradient-text transition-all duration-1000 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          about.me
        </h2>
        
        <p 
          className={`text-center text-lg text-gray-400 italic mb-16 transition-all duration-1000 ease-out ${
            subtitleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
        >
          Bridging the gap between complex system architecture and elegant user experiences through rigorous engineering practices
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile image with longer animation */}
          <div 
            className={`transition-all duration-1200 ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ 
              transitionDelay: isVisible ? '800ms' : '0ms' 
            }}
          >
            <div className="relative w-64 h-64 mx-auto">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 neon-glow flex items-center justify-center text-6xl font-bold">
                SD
              </div>
            </div>
          </div>
          
          {/* Right side - Text content with staggered paragraphs */}
          <div className="space-y-6">
            <p 
              className={`text-lg leading-relaxed transition-all duration-1200 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? '1000ms' : '0ms' 
              }}
            >
              A passionate backend developer who loves crafting robust, scalable solutions.
              With a keen eye for clean code and system architecture, I thrive on solving complex problems
              and building tech that makes a difference.
            </p>
            
            <p 
              className={`text-lg leading-relaxed transition-all duration-1200 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? '1300ms' : '0ms' 
              }}
            >
              When I'm not coding, you'll find me retrospective on my work, exploring new technologies,
              or sharing knowledge with others!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}