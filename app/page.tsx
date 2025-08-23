import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import Navigation from '@/components/Navigation'
import ThemeToggle from '@/components/ThemeToggle'
import FloatingParticles from '@/components/FloatingParticles'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-white to-blue-50/5 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/5 relative overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
        </Suspense>
      </div>
    </main>
  )
}
