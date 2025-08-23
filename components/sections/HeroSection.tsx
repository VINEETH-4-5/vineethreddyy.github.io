"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ChevronDown, Mail } from 'lucide-react'

const roles = [
  'Backend Engineer',
  'Full Stack Developer',
  'Workflow Automator',
  'Problem Solver',
]

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleHireMe = () => {
    const subject = encodeURIComponent('Hiring Inquiry - VINEETH REDDY YADANAPARTHI')
    const body = encodeURIComponent(`Hi Vineeth,

I came across your portfolio and I'm interested in discussing potential opportunities.

Best regards,
[Your Name]`)
    window.open(`mailto:yadanaparthivineethreddy@gmail.com?subject=${subject}&body=${body}`)
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="gradient-text">Building Resilient,</span>
            <br />
            <span className="text-foreground">Scalable, and</span>
            <br />
            <span className="gradient-text">High-Performance</span>
            <br />
            <span className="text-foreground">Systems</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-foreground/70 font-medium px-4"
          >
            Java • Spring Boot • React • PostgreSQL • Microservices
          </motion.p>

          {/* Animated Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-primary-500 font-semibold min-h-[2rem]"
          >
            <TypeAnimation
              sequence={[...roles.flatMap((role) => [role, 2000])]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          </motion.div>

          {/* Primary CTA only (no resume here) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHireMe}
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Mail size={20} />
              Hire Me
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full glass-effect hover:bg-primary-500/10 transition-colors duration-200"
            >
              <ChevronDown size={24} className="text-primary-500" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Code Elements (subtle) */}
      <motion.div
        className="absolute top-20 right-10 hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 font-mono text-sm text-green-400">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <pre className="text-xs">
{`@RestController
public class UserController {
  @GetMapping("/api/users")
  public ResponseEntity<List<User>> getUsers() {
    // VINEETH's Implementation
  }
}`}
          </pre>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 hidden lg:block"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 font-mono text-sm text-orange-400">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <pre className="text-xs">
{`const UserComponent = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // VINEETH's Frontend Logic
  }, []);
  return <div>Users</div>;
};`}
          </pre>
        </div>
      </motion.div>
    </section>
  )
}
