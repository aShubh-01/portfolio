import { Inter, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains'
})

export default function Home() {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} font-inter bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-slate-200 overflow-x-hidden`}>
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}