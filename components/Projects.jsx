'use client'

import { useEffect, useRef, useState } from 'react'

const dummyProjects = [
  {
    title: 'Querious',
    description: 'A dynamic survey app that lets users create and manage surveys effortlessly. It provides statistical insights to help users analyze responses and maintain full control over their survey data.',
    tags: ['Node.js', 'PostgreSQL', 'React.js'],
    githubUrl: 'https://github.com/aShubh-01/Survey-App',
    liveUrl: 'https://survey-app-gilt.vercel.app/'
  },
  {
    title: 'Slate',
    description: 'A full-stack blog application featuring essential CRUD and bookmarking capabilities. It offers a clean, user-friendly interface for creating, editing, and saving posts seamlessly.',
    tags: ['React', 'Hono', 'PostgreSQL'],
    githubUrl: 'https://github.com/aShubh-01/Slate-Blog-App',
    liveUrl: 'https://blog-app-five-ecru.vercel.app/'
  },
  {
    title: 'DockStore',
    description: 'A personal object storage solution designed for fast and efficient storage of documents and files. Built for project needs, it ensures quick read and write speeds with reliable data management.',
    tags: ['Next.js', 'MongoDB', 'Docker'],
    githubUrl: 'https://github.com/aShubh-01/DockStore',
    liveUrl: ''
  }
]

const useIntersectionObserver = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => setIsVisible(true), 150)
        }
      },
      { 
        threshold,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => currentRef && observer.unobserve(currentRef)
  }, [threshold, isVisible])

  return [ref, isVisible]
}

export default function Projects() {
  const [loading, setLoading] = useState(true)
  const [contributions, setContributions] = useState([])
  const [contributionStats, setContributionStats] = useState({
    total: 0,
    currentStreak: 0,
    longestStreak: 0
  })
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [projectsVisible, setProjectsVisible] = useState([])
  const [githubTitleVisible, setGithubTitleVisible] = useState(false)
  const [githubContentVisible, setGithubContentVisible] = useState(false)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null })
  const [bottomLineVisible, setBottomLineVisible] = useState(false)
  
  const [sectionRef, isVisible] = useIntersectionObserver()

  // Staggered header animations
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setTitleVisible(true), 200)
      setTimeout(() => setSubtitleVisible(true), 600)
      
      // Stagger project cards
      dummyProjects.forEach((_, index) => {
        setTimeout(() => {
          setProjectsVisible(prev => [...prev, index])
        }, 1000 + index * 150)
      })
      
      // GitHub section appears after projects
      setTimeout(() => setGithubTitleVisible(true), 1000 + dummyProjects.length * 150 + 400)
      setTimeout(() => setGithubContentVisible(true), 1000 + dummyProjects.length * 150 + 800)
      
      // Bottom line appears after all animations complete
      setTimeout(() => setBottomLineVisible(true), 3200)
    }
  }, [isVisible])

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const contributionResponse = await fetch('https://github-contributions-api.jogruber.de/v4/aShubh-01')
        const contributionData = await contributionResponse.json()

        if (contributionData.contributions) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const startDate = new Date(today)
          startDate.setDate(today.getDate() - 371) // Changed from 365 to 371

          const validContributions = contributionData.contributions.filter(c => {
            const date = new Date(c.date)
            date.setHours(0, 0, 0, 0)
            return date >= startDate && date < today
          })

          const sortedContributions = validContributions.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )

          const last371Contributions = sortedContributions.slice(-371) // Changed from -365 to -371
          const total = validContributions.reduce((sum, day) => sum + day.count, 0)

          setContributions(last371Contributions) // Changed from last365Contributions

          const currentStreak = calculateCurrentStreak(contributionData.contributions)
          const longestStreak = calculateLongestStreak(contributionData.contributions)

          setContributionStats({
            total,
            currentStreak,
            longestStreak
          })
        }
      } catch (error) {
        console.log('GitHub API error:', error)
        setContributions([])
      } finally {
        setLoading(false)
      }
    }

    if (githubContentVisible) {
      loadGitHubData()
    }
  }, [githubContentVisible])

  const calculateCurrentStreak = (contributions) => {
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = contributions.length - 1; i >= 0; i--) {
      const contributionDate = new Date(contributions[i].date)
      contributionDate.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor((today - contributionDate) / (1000 * 60 * 60 * 24))

      if (daysDiff === streak && contributions[i].count > 0) {
        streak++
      } else if (contributions[i].count === 0 && daysDiff <= streak) {
        continue
      } else {
        break
      }
    }

    return streak
  }

  const calculateLongestStreak = (contributions) => {
    let maxStreak = 0
    let currentStreak = 0

    contributions.forEach(day => {
      if (day.count > 0) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    })

    return maxStreak
  }

  const getContributionColor = (count) => {
    if (count === 0) return 'bg-gray-800/40 border-gray-600/40'
    if (count <= 2) return 'bg-purple-600/30 border-purple-500/40'
    if (count <= 4) return 'bg-purple-500/50 border-purple-400/60'
    if (count <= 8) return 'bg-purple-400/70 border-purple-300/70'
    return 'bg-purple-300/90 border-purple-200/80'
  }

  const generateContributionCalendar = () => {
    if (contributions.length === 0) {
      return (
        <div className="text-center text-gray-400 py-12 text-lg">
          Loading Contributions...
        </div>
      )
    }

    const weeks = []
    const totalWeeks = 53 // Changed from 52 to 53
    const calendarData = []

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 371) // Changed from 365 to 371

    for (let i = 0; i < 371; i++) { // Changed from 365 to 371
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      const dateString = currentDate.toISOString().split('T')[0]
      const contribution = contributions.find(c => c.date === dateString)

      calendarData.push({
        date: dateString,
        count: contribution ? contribution.count : 0
      })
    }

    for (let week = 0; week < totalWeeks; week++) {
      const weekData = []

      for (let day = 0; day < 7; day++) {
        const dataIndex = week * 7 + day

        if (dataIndex < calendarData.length) {
          const dayData = calendarData[dataIndex]
          const date = new Date(dayData.date)
          const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          })
          
          weekData.push(
            <div
              key={`${week}-${day}`}
              className={`w-3 h-3 rounded-sm border ${getContributionColor(dayData.count)} hover:scale-110 transition-all duration-200 cursor-pointer relative`}
              onMouseEnter={(e) => {
                const rect = e.target.getBoundingClientRect()
                setTooltip({
                  visible: true,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                  data: {
                    count: dayData.count,
                    date: formattedDate
                  }
                })
              }}
              onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, data: null })}
            />
          )
        } else {
          weekData.push(
            <div
              key={`${week}-${day}-empty`}
              className="w-3 h-3"
            />
          )
        }
      }

      weeks.push(
        <div key={`week-${week}`} className="flex flex-col gap-1.5">
          {weekData}
        </div>
      )
    }

    return (
      <div className="flex gap-1.5 overflow-visible relative"> {/* Changed overflow-hidden to overflow-visible and added relative */}
        {weeks}
      </div>
    )
  }

  const generateMonthLabels = () => {
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 371) // Changed from 365 to 371

    const monthPositions = []
    let currentMonth = -1

    for (let i = 0; i < 371; i++) { // Changed from 365 to 371
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      if (currentDate.getMonth() !== currentMonth) {
        currentMonth = currentDate.getMonth()
        const weekIndex = Math.floor(i / 7)

        if (weekIndex < 53) { // Changed from 52 to 53
          monthPositions.push({
            month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
            position: weekIndex
          })
        }
      }
    }

    return (
      <div className="relative h-6 mb-3 w-full">
        {monthPositions.map((month, index) => (
          <div
            key={index}
            className="absolute text-sm text-gray-400 font-medium"
            style={{
              left: `${(index / (monthPositions.length + 1)) * 100}%`,
              transform: 'none'
            }}
          >
            {month.month}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Global Tooltip */}
      {tooltip.visible && tooltip.data && (
        <div
          className="fixed bg-gray-900 text-white text-xs rounded-md px-3 py-2 border border-gray-600 shadow-2xl pointer-events-none whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            zIndex: 99999
          }}
        >
          <div className="font-medium">
            {tooltip.data.count} contribution{tooltip.data.count !== 1 ? 's' : ''}
          </div>
          <div className="text-gray-300 text-xs">
            {tooltip.data.date}
          </div>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {/* Project Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        {/* Vertical Grid Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-purple-400 animate-pulse"
            style={{
              left: `${(i + 1) * 12.5}%`,
              height: '100%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
        {/* Horizontal Grid Lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-blue-400 animate-pulse"
            style={{
              top: `${(i + 1) * 16.67}%`,
              width: '100%',
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i % 2)}s`
            }}
          />
        ))}
        {/* Intersection Dots */}
        {[...Array(24)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-purple-300 rounded-full animate-ping"
            style={{
              left: `${((i % 8) + 1) * 12.5}%`,
              top: `${(Math.floor(i / 8) + 1) * 16.67}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated headers */}
        <h2 
          className={`text-4xl font-bold text-center mb-4 gradient-text transition-all duration-1000 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          .projects
        </h2>
        
        <p 
          className={`text-center text-lg text-gray-400 italic mb-16 transition-all duration-1000 ease-out ${
            subtitleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
        >
          Crafting robust, performance-driven applications that demonstrate technical depth and innovative problem-solving
        </p>

        {/* Projects Grid with staggered animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {dummyProjects.map((project, index) => (
            <div
              key={index}
              className={`project-card p-6 rounded-lg hover-lift transition-all duration-800 ease-out ${
                projectsVisible.includes(index)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
            >
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-purple-600/20 rounded transition-all duration-300 hover:bg-purple-600/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 hover:border-purple-400/50 rounded-lg transition-all duration-300 text-purple-300 hover:text-purple-200 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Contributions Section */}
        <div>
          <h3 
            className={`text-4xl font-bold text-center mb-4 gradient-text transition-all duration-1000 ease-out ${
              githubTitleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            git fetch contributions
          </h3>
          
          <div 
            className={`transition-all duration-1200 ease-out ${
              githubContentVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <br />
            {loading ? (
              <div className="text-center text-gray-400 py-12 text-lg">
                Loading GitHub contributions...
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                {/* Month Labels */}
                <div className="ml-[110px] mb-4">
                  {generateMonthLabels()}
                </div>

                {/* Contribution Calendar */}
                <div className="mb-8 flex justify-center">
                  <div className="inline-block p-6 bg-gray-900/30 rounded-lg border border-gray-700/30 relative overflow-visible">
                    {generateContributionCalendar()}
                  </div>
                </div>

                {/* Color Legend */}
                <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-12">
                  <span>Less</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-800/40 border border-gray-600/40"></div>
                    <div className="w-3 h-3 rounded-sm bg-purple-600/30 border border-purple-500/40"></div>
                    <div className="w-3 h-3 rounded-sm bg-purple-500/50 border border-purple-400/60"></div>
                    <div className="w-3 h-3 rounded-sm bg-purple-400/70 border border-purple-300/70"></div>
                    <div className="w-3 h-3 rounded-sm bg-purple-300/90 border border-purple-200/80"></div>
                  </div>
                  <span>More</span>
                </div>

                {/* Statistics */}
                <div className="grid md:grid-cols-3 gap-12 text-center">
                  <div className="p-6 bg-gray-900/20 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300">
                    <div className="text-4xl font-bold text-purple-400 mb-3">
                      {contributionStats.total} <span className="text-xl text-gray-400">total</span>
                    </div>
                    <div className="text-gray-300">
                      Contributions in the last 365 Days
                    </div>
                  </div>

                  <div className="p-6 bg-gray-900/20 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300">
                    <div className="text-4xl font-bold text-purple-400 mb-3">
                      {contributionStats.longestStreak} <span className="text-xl text-gray-400">days</span>
                    </div>
                    <div className="text-gray-300">
                      Longest streak
                    </div>
                  </div>

                  <div className="p-6 bg-gray-900/20 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300">
                    <div className="text-4xl font-bold text-purple-400 mb-3">
                      {contributionStats.currentStreak} <span className="text-xl text-gray-400">days</span>
                    </div>
                    <div className="text-gray-300">
                      Current streak
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animated bottom decoration */}
        <div 
          className={`mt-16 w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full transition-all duration-1200 ease-out ${
            bottomLineVisible 
              ? 'opacity-100 scale-x-100' 
              : 'opacity-0 scale-x-0'
          }`}
        />
      </div>
    </section>
  )
}