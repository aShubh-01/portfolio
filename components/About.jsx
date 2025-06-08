'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Geometric Background Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-purple-400/30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
        {/* Floating circles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
          about.me
        </h2>
        <p className="text-center text-lg text-gray-400 italic mb-16">
          Bridging the gap between complex system architecture and elegant user experiences through rigorous engineering practices
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`fade-in-left ${isVisible ? 'visible' : ''}`}>
            <div className="relative w-64 h-64 mx-auto">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 neon-glow flex items-center justify-center text-6xl font-bold">
                SD
              </div>
            </div>
          </div>
          <div className={`fade-in-right ${isVisible ? 'visible' : ''}`}>
            <p className="text-lg mb-6 leading-relaxed">
              A passionate backend developer who loves crafting robust, scalable solutions.
              With a keen eye for clean code and system architecture, I thrive on solving complex problems
              and building tech that makes a difference.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              When I'm not coding, you'll find me retrospective on my work, exploring new technologies,
              or sharing knowledge with others!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}