'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const techStack = [
  { name: 'Amazon Web Services', icon: '/skills-icons/aws.png' },
  { name: 'Docker', icon: '/skills-icons/docker.webp' },
  { name: 'Express', icon: '/skills-icons/express.jpeg' },
  { name: 'Git', icon: '/skills-icons/git.jpeg' },
  { name: 'Grafana', icon: '/skills-icons/grafana.webp' },
  { name: 'JavaScript', icon: '/skills-icons/js.jpeg' },
  { name: 'Apache Kafka', icon: '/skills-icons/kafka.jpeg' },
  { name: 'Kubernetes', icon: '/skills-icons/kubernetes.webp' },
  { name: 'MongoDB', icon: '/skills-icons/mongo.webp' },
  { name: 'Next.js', icon: '/skills-icons/nextjs.png' },
  { name: 'NGINX', icon: '/skills-icons/nginx.png' },
  { name: 'Node.js', icon: '/skills-icons/nodejs.jpeg' },
  { name: 'PostgreSQL', icon: '/skills-icons/pgsql.jpeg' },
  { name: 'Prometheus', icon: '/skills-icons/prometheus.png' },
  { name: 'React', icon: '/skills-icons/react.png' },
  { name: 'Redis', icon: '/skills-icons/redis.png' },
  { name: 'Tailwind CSS', icon: '/skills-icons/tailwind.png' },
  { name: 'TypeScript', icon: '/skills-icons/ts.jpeg' },
]

const useIntersectionObserver = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), 100)
        }
      },
      { 
        threshold,
        rootMargin: '-30px 0px -30px 0px'
      }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => currentRef && observer.unobserve(currentRef)
  }, [threshold, isVisible])

  return [ref, isVisible]
}

const TechIcon = ({ tech, index, isVisible }) => (
  <div 
    className={`group relative flex flex-col items-center transition-all duration-800 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-8 scale-95'
    }`}
    style={{ 
      transitionDelay: isVisible ? `${index * 80 + 600}ms` : '0ms'
    }}
  >
    <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
      <Image
        src={tech.icon}
        alt={`${tech.name} icon`}
        width={48}
        height={48}
        className="w-full h-full object-contain rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
        priority={index < 6}
        onError={(e) => e.target.style.display = 'none'}
      />
    </div>
    <span className="z-50 absolute bottom-[-3rem] bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap transform translate-y-2 group-hover:translate-y-0 shadow-lg">
      {tech.name}
    </span>
  </div>
)

export default function TechStack() {
  const [sectionRef, isVisible] = useIntersectionObserver()
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  // Staggered header animations
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setTitleVisible(true), 150)
      setTimeout(() => setSubtitleVisible(true), 400)
    }
  }, [isVisible])

  return (
    <section id="tech" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Animated title */}
        <h2 
          className={`text-4xl font-bold mb-4 gradient-text transition-all duration-1000 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
        >
          display(skills);
        </h2>
        
        {/* Animated subtitle */}
        <p 
          className={`text-lg text-gray-400 italic mb-12 transition-all duration-1000 ease-out ${
            subtitleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          Mastering diverse technologies to architect scalable solutions that solve real-world problems at scale
        </p>

        {/* Tech icons grid with wave animation */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-10 justify-items-center items-center">
          {techStack.map((tech, index) => (
            <TechIcon 
              key={tech.name} 
              tech={tech} 
              index={index} 
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Animated bottom decoration */}
        <div 
          className={`mt-16 w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full transition-all duration-1200 ease-out ${
            isVisible 
              ? 'opacity-100 scale-x-100' 
              : 'opacity-0 scale-x-0'
          }`}
          style={{ 
            transitionDelay: isVisible ? `${techStack.length * 80 + 800}ms` : '0ms'
          }}
        />
      </div>
    </section>
  )
}