'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver' // Assuming you'll create this shared hook

const techStack = [
  { name: 'Docker', icon: '/skills-icons/docker.webp' },
  { name: 'Express', icon: '/skills-icons/express.jpeg' },
  { name: 'Git', icon: '/skills-icons/git.jpeg' },
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
  { name: 'Amazon Web Services', icon: '/skills-icons/aws.png' }
]

const TechIcon = ({ tech, index }) => (
  <div 
    className="group relative flex flex-col items-center"
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
      <Image
        src={tech.icon}
        alt={`${tech.name} icon`}
        width={48}
        height={48}
        className="w-full h-full object-contain rounded-lg"
        priority={index < 6}
        onError={(e) => e.target.style.display = 'none'}
      />
    </div>
    <span className="z-50 absolute bottom-[-3rem] bg-gray-800 text-white text-s rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {tech.name}
    </span>
  </div>
)

export default function TechStack() {
  const [sectionRef, isVisible] = useIntersectionObserver()

  return (
    <section id="tech" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4 gradient-text">display(skills);</h2>
        <p className="text-lg text-gray-400 italic mb-12">
          Mastering diverse technologies to architect scalable solutions that solve real-world problems at scale
        </p>
        <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-10 justify-items-center items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {techStack.map((tech, index) => (
            <TechIcon key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}