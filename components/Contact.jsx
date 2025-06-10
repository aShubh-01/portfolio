'use client'

import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (threshold = 0.3) => {
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [titleVisible, setTitleVisible] = useState(false)
  const [leftContentVisible, setLeftContentVisible] = useState(false)
  const [rightContentVisible, setRightContentVisible] = useState(false)
  const [formFieldsVisible, setFormFieldsVisible] = useState([])
  
  const [sectionRef, isVisible] = useIntersectionObserver()

  // Staggered animations
  useEffect(() => {
    if (isVisible) {
      // Title appears first
      setTimeout(() => setTitleVisible(true), 200)
      
      // Left and right content appear together
      setTimeout(() => {
        setLeftContentVisible(true)
        setRightContentVisible(true)
      }, 600)
      
      // Form fields appear with stagger
      setTimeout(() => {
        [0, 1, 2, 3].forEach((index) => {
          setTimeout(() => {
            setFormFieldsVisible(prev => [...prev, index])
          }, index * 100)
        })
      }, 1000)
    }
  }, [isVisible])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('Sending...')

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('Message Sent! ✓')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('')
        setIsSubmitting(false)
      }, 2000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 px-6 bg-black/20 relative overflow-hidden" ref={sectionRef}>
      {/* Data Flow Background */}
      <div className="absolute inset-0 overflow-hidden opacity-8 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
            style={{
              left: `${5 + (i * 6) % 90}%`,
              top: '100%',
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              animation: `dataFlow ${8 + Math.random() * 4}s linear infinite ${i * 1.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes dataFlow {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Animated title */}
        <h2 
          className={`text-4xl font-bold text-center mb-16 gradient-text transition-all duration-1000 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          lets_connect()!
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            className={`transition-all duration-1200 ease-out ${
              leftContentVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Let's Build Something Awesome Together
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Have a project in mind or just want to chat about something interesting? I'm always excited to connect
              with folks  and explore new opportunities.
            </p>
            
            {/* Contact info with staggered animation */}
            <div className="space-y-4">
              <div 
                className={`flex items-center space-x-3 transition-all duration-800 ease-out ${
                  leftContentVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
                style={{ 
                  transitionDelay: leftContentVisible ? '300ms' : '0ms' 
                }}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="hover:text-purple-300 transition-colors duration-300">
                  shubhamdhokare01@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div 
            className={`transition-all duration-1200 ease-out ${
              rightContentVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div 
                className={`transition-all duration-800 ease-out ${
                  formFieldsVisible.includes(0) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400 hover:border-white/20"
                />
              </div>
              
              {/* Email Field */}
              <div 
                className={`transition-all duration-800 ease-out ${
                  formFieldsVisible.includes(1) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400 hover:border-white/20"
                />
              </div>
              
              {/* Message Field */}
              <div 
                className={`transition-all duration-800 ease-out ${
                  formFieldsVisible.includes(2) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none text-white placeholder-gray-400 hover:border-white/20"
                />
              </div>
              
              {/* Submit Button */}
              <div 
                className={`transition-all duration-800 ease-out ${
                  formFieldsVisible.includes(3) 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-6 scale-95'
                }`}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                >
                  {submitStatus || 'Connect!'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Animated bottom decoration */}
        <div 
          className={`mt-16 w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full transition-all duration-1200 ease-out ${
            formFieldsVisible.length === 4 
              ? 'opacity-100 scale-x-100' 
              : 'opacity-0 scale-x-0'
          }`}
          style={{ 
            transitionDelay: formFieldsVisible.length === 4 ? '400ms' : '0ms'
          }}
        />
      </div>
    </section>
  )
}