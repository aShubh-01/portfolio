'use client'

import { useEffect, useRef, useState } from 'react'

const data = {
  experience: [{
    duration: '2025, March - Present',
    title: 'Software Developer Intern',
    company: "DeepThought CultureTech Ventures Pvt Ltd , Hyderabad, India",
    isCurrent: true,
    responsibilities: [
      'Developed and maintained full-stack web applications using Node.js, MongoDB, and Next.js.',
      'Engineered AI Workflows that led teams to go from operational to systems thinking, increasing efficiency.',
      'Built internal tools and automations to optimize team workflows and reduce manual effort.',
      "Building an AI-powered SaaS that will streamline our recruitment & onboarding process.",
      'Assisted new recruits by mentoring, resolving technical issues, and improving onboarding efficiency.'
    ]
  }],
  education: [
    { duration: '2022 - 2025', level: 'Bachelor of Software Development', school: 'Sangamner College, Sangamner' },
    { duration: '2022', level: 'Higher Secondary Education', school: 'B.G.P Sahyadri College, Sangamner' },
    { duration: '2020', level: 'Secondary Education', school: 'St.Lawrence High School, Thane' }
  ]
}

const NetworkNode = ({ i }) => (
  <div key={`network-${i}`}>
    <div
      className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
      style={{
        left: `${10 + (i * 7) % 80}%`,
        top: `${20 + (i * 11) % 60}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${2 + (i % 3)}s`
      }}
    />
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
)

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ease-out relative overflow-hidden ${
      active 
        ? 'bg-purple-600 text-white shadow-lg' 
        : 'text-gray-400 hover:text-white hover:bg-purple-600/20'
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 animate-pulse" />
    )}
    <span className="relative z-10">{children}</span>
  </button>
)

const TimelineItem = ({ item, index, activeTab, isVisible }) => (
  <div
    data-index={index}
    className={`experience-item relative transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
    }`}
    style={{ transitionDelay: `${index * 150}ms` }}
  >
    <div className="flex items-start space-x-4">
      <div className="relative z-10 w-4 h-4 mt-1 flex-shrink-0">
        <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 transform rotate-45 shadow-lg">
          <div className="absolute inset-0.5 bg-slate-900 transform -rotate-45 scale-75 translate-x-0.5 translate-y-0.5" />
          <div className="absolute inset-1 bg-gradient-to-r from-purple-400 to-blue-400 transform -rotate-45 scale-50 translate-x-1 translate-y-1" />
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
            <h3 className="text-2xl font-bold text-teal-400 mb-1">{item.title}</h3>
            <h4 className="text-lg text-gray-300 italic mb-4">{item.company}</h4>
            <ul className="space-y-3 text-gray-300 leading-relaxed">
              {item.responsibilities.map((responsibility, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-teal-400 mb-1">{item.level}</h3>
            <h4 className="text-lg text-gray-300 italic mb-2">{item.school}</h4>
            {item.specialization && (
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                <span className="text-gray-300">{item.specialization}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
)

const useIntersectionObserver = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), 200)
        }
      },
      { 
        threshold,
        rootMargin: '-20px 0px -20px 0px'
      }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => currentRef && observer.unobserve(currentRef)
  }, [threshold, isVisible])

  return [ref, isVisible]
}

export default function Experience() {
  const [visibleCards, setVisibleCards] = useState([])
  const [activeTab, setActiveTab] = useState('experience')
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [tabsVisible, setTabsVisible] = useState(false)
  const [contentKey, setContentKey] = useState('experience-0') // Force re-render on tab change
  const [bottomLineVisible, setBottomLineVisible] = useState(false)
  const [cvButtonVisible, setCvButtonVisible] = useState(false)
  const [timelineVisible, setTimelineVisible] = useState(false)
  const [sectionRef, isVisible] = useIntersectionObserver()

  // Staggered header animations
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setTitleVisible(true), 200)
      setTimeout(() => setSubtitleVisible(true), 500)
      setTimeout(() => setTabsVisible(true), 800)
      
      // CV button appears before bottom line
      setTimeout(() => setCvButtonVisible(true), 2500)
      // Bottom line appears after all animations complete
      setTimeout(() => setBottomLineVisible(true), 2900)
    }
  }, [isVisible])

  // Timeline animation trigger - when content appears
  useEffect(() => {
    if (visibleCards.length > 0) {
      // Timeline starts animating once first content item appears
      setTimeout(() => setTimelineVisible(true), 300)
    }
  }, [visibleCards.length])

  // Simple, smooth tab switching
  const handleTabSwitch = (newTab) => {
    if (newTab === activeTab) return
    
    // Reset visibility for smooth entrance
    setVisibleCards([])
    setTimelineVisible(false) // Immediately hide timeline
    setActiveTab(newTab)
    setContentKey(`${newTab}-${Date.now()}`) // Force component re-render
    
    // Stagger the new content appearance
    setTimeout(() => {
      const newData = data[newTab]
      newData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index])
        }, index * 120)
      })
    }, 100)
  }

  // Initial content animation
  useEffect(() => {
    if (tabsVisible && visibleCards.length === 0) {
      setTimeout(() => {
        const currentData = data[activeTab]
        currentData.forEach((_, index) => {
          setTimeout(() => {
            setVisibleCards(prev => [...prev, index])
          }, index * 150 + 300)
        })
      }, 200)
    }
  }, [tabsVisible, activeTab])

  const currentData = data[activeTab]

  return (
    <section id="experience" className="py-20 px-6 bg-black/20 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(12)].map((_, i) => <NetworkNode key={i} i={i} />)}
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Clean header animations */}
        <h2 
          className={`text-4xl font-bold text-center mb-4 gradient-text transition-all duration-800 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
        >
          experience + education
        </h2>
        
        <p 
          className={`text-center text-lg text-gray-400 italic mb-12 transition-all duration-800 ease-out ${
            subtitleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          discovered a zeal for coding during college, which sparked a commitment to cultivating technical skills and transforming organizational challenges into technology-driven systems through leadership and zero-to-one innovations.
        </p>

        {/* Simple, elegant tab switcher */}
        <div 
          className={`flex justify-center mb-16 transition-all duration-800 ease-out ${
            tabsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-slate-900/50 rounded-full p-1 backdrop-blur-sm border border-purple-400/20">
            <TabButton 
              active={activeTab === 'experience'} 
              onClick={() => handleTabSwitch('experience')}
            >
              Experience
            </TabButton>
            <TabButton 
              active={activeTab === 'education'} 
              onClick={() => handleTabSwitch('education')}
            >
              Education
            </TabButton>
          </div>
        </div>

        {/* Animated timeline */}
        <div className="relative">
          <div 
            className={`absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-blue-400 to-purple-400 transition-all duration-1200 ease-out ${
              timelineVisible ? 'opacity-30 scale-y-100' : 'opacity-0 scale-y-0'
            }`}
            style={{
              transformOrigin: 'bottom' // Draw from bottom to top
            }}
            key={`timeline-${contentKey}`}
          />
          
          <div className="space-y-12" key={contentKey}>
            {currentData.map((item, index) => (
              <TimelineItem 
                key={`${activeTab}-${index}`}
                item={item} 
                index={index} 
                activeTab={activeTab}
                isVisible={visibleCards.includes(index)}
              />
            ))}
          </div>
        </div>

        {/* CV Download Button */}
        <div 
          className={`mt-16 flex justify-center transition-all duration-1000 ease-out ${
            cvButtonVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <a
            href="/cv/Shubham_Dhokare_CV.pdf" // Adjust path based on your repo structure
            download="Shubham_Dhokare_CV.pdf"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          >
            <svg 
              className="w-5 h-5 group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            Download my CV
          </a>
        </div>

        {/* Animated bottom decoration */}
        <div 
          className={`mt-8 w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full transition-all duration-1200 ease-out ${
            bottomLineVisible 
              ? 'opacity-100 scale-x-100' 
              : 'opacity-0 scale-x-0'
          }`}
        />
      </div>

      {/* Styles */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  )
}