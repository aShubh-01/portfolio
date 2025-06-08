'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    duration: '2025, March - Present',
    title: 'Software Developer Intern',
    company: "DeepThought CultureTech Ventures Pvt Ltd , India",
    isCurrent: true,
    responsibilities: [
      'Developed and maintained full-stack web applications using Node.js, MongoDB, and Next.js',
      'Built internal tools and automations to optimize team workflows and reduce manual effort',
      "Building an AI-powered SaaS model that will take candidates through an simulation of the company & streamline the company's recruitment process",
      'Assisted new recruits by mentoring, resolving technical issues, and improving onboarding efficiency.'
    ]
  }
]

const education = [
  {
    duration: '2022 - 2025',
    level: 'Bachelor of Software Development',
    school: 'Sangamner College, Sangamner'
  },
  {
    duration: '2022',
    level: 'Higher Secondary Education',
    school: 'B.G.P Sahyadri College, Sangamner'
  },
  {
    duration: '2020',
    level: 'Secondary Education',
    school: 'St.Lawrence High School, Thane'
  }
]

export default function Experience() {
  const [visibleCards, setVisibleCards] = useState([])
  const [activeTab, setActiveTab] = useState('experience')
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setVisibleCards(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = sectionRef.current?.querySelectorAll('.experience-item')
    cards?.forEach(card => observer.observe(card))

    return () => {
      cards?.forEach(card => observer.unobserve(card))
    }
  }, [activeTab])

  const currentData = activeTab === 'experience' ? experiences : education

  return (
    <section id="experience" className="py-20 px-6 bg-black/20 relative overflow-hidden" ref={sectionRef}>
      {/* Network Background Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={`network-${i}`}>
            {/* Network Nodes */}
            <div
              className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${20 + (i * 11) % 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + (i % 3)}s`
              }}
            />
            {/* Connection Lines */}
            {i < 8 && (
              <div
                className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${21 + (i * 11) % 60}%`,
                  width: `${30 + (i * 5) % 40}px`,
                  transform: `rotate(${(i * 23) % 180}deg)`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${3 + (i % 2)}s`
                }}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
          experience + education
        </h2>
        <p className="text-center text-lg text-gray-400 italic mb-12">
          Discovered a passion for coding during college, which sparked a commitment to cultivating technical skills and transforming organizational challenges into technology-driven solutions through leadership and zero-to-one innovations.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-900/50 rounded-full p-1 backdrop-blur-sm border border-purple-400/20">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'experience'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'education'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Education
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-blue-400 to-purple-400 opacity-30"></div>
          
          <div className="space-y-12">
            {currentData.map((item, index) => (
              <div
                key={`${activeTab}-${index}`}
                data-index={index}
                className={`experience-item relative transition-all duration-600 ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  {/* Timeline Dot - Diamond Shape */}
                  <div className="relative z-10 w-4 h-4 mt-1 flex-shrink-0">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 transform rotate-45 shadow-lg">
                      <div className="absolute inset-0.5 bg-slate-900 transform -rotate-45 scale-75 translate-x-0.5 translate-y-0.5"></div>
                      <div className="absolute inset-1 bg-gradient-to-r from-purple-400 to-blue-400 transform -rotate-45 scale-50 translate-x-1 translate-y-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2 md:mb-0 ${
                        activeTab === 'experience' && item.isCurrent 
                          ? 'text-purple-300 bg-purple-400/20 border border-purple-400/30' 
                          : 'text-teal-300 bg-teal-500/20 border border-teal-400/30'
                      }`}>
                        {item.duration}
                      </span>
                    </div>
                    
                    {activeTab === 'experience' ? (
                      <>
                        <h3 className="text-2xl font-bold text-teal-400 mb-1">
                          {item.title}
                        </h3>
                        <h4 className="text-lg text-gray-300 italic mb-4">
                          {item.company}
                        </h4>
                        <ul className="space-y-3 text-gray-300 leading-relaxed">
                          {item.responsibilities.map((responsibility, respIndex) => (
                            <li key={respIndex} className="flex items-start space-x-3">
                              <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-teal-400 mb-1">
                          {item.level}
                        </h3>
                        <h4 className="text-lg text-gray-300 italic mb-2">
                          {item.school}
                        </h4>
                        {item.specialization && (
                          <div className="flex items-center space-x-3">
                            <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                            <span className="text-gray-300">{item.specialization}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}