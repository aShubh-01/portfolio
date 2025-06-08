'use client'

import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
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
            className="absolute w-0.5 h-8 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-bounce"
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
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          lets_connect()!
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`fade-in-left ${isVisible ? 'visible' : ''}`}>
            <h3 className="text-2xl font-semibold mb-4">
              Let's Build Something Awesome Together
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Have a project in mind or just want to chat about tech? I'm always excited to connect
              with fellow developers and explore new opportunities.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-purple-400" />
                <span>shubhamdhokare01@gmail.com</span>
              </div>
            </div>
          </div>

          <div className={`fade-in-right ${isVisible ? 'visible' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none transition-colors resize-none text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all hover-lift disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitStatus || 'Connect!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}