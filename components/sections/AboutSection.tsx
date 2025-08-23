"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, MapPin, Linkedin, Download, ExternalLink } from "lucide-react"

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Single source of truth: Resume download lives ONLY here
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/vineeth_resume.pdf"
    link.download = "VINEETH_REDDY_YADANAPARTHI_Resume.pdf"
    link.click()
  }

  const contact = [
    {
      icon: Mail,
      label: "Email",
      value: "yadanaparthivineethreddy@gmail.com",
      href: "mailto:yadanaparthivineethreddy@gmail.com",
      external: false,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7036546590",
      href: "tel:+917036546590",
      external: false,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bangalore, India",
      href: undefined,
      external: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/vineeth-reddy-y",
      href: "https://linkedin.com/in/vineeth-reddy-y",
      external: true,
    },
  ] as const

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Backend‑focused full‑stack developer building resilient, scalable systems for banking & fintech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Profile + Summary + Resume */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Profile Photo (real jpg) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="relative group">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary-500/20 shadow-2xl group-hover:border-primary-500/40 transition-all duration-300">
                  <Image
                    src="/vineeth-profile.jpg"
                    alt="Vineeth Reddy Yadanaparthi"
                    width={448}
                    height={448}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Summary */}
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text">
                VINEETH REDDY YADANAPARTHI
              </h3>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Backend‑focused full‑stack developer with{" "}
                  <strong className="text-primary-500">4+ years</strong> in Java, Spring Boot, Microservices, and
                  PostgreSQL. I design resilient enterprise architectures, automate workflows with Camunda BPM, and
                  build modern UIs with React + TypeScript.
                </p>
                <p>
                  Proven improvements in{" "}
                  <strong className="text-primary-500">scalability, performance, and reliability</strong> for banking and
                  fintech platforms—handling high‑volume transactions with strong data integrity and observability.
                </p>
                <p>
                  Strengths: <strong className="text-primary-500">microservices</strong>, database optimization, API
                  design, workflow automation—delivered with clean code, thoughtful DX, and production‑grade rigor.
                </p>
              </div>
            </div>

            {/* The ONLY Resume button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadResume}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              aria-label="Download resume"
            >
              <Download size={20} />
              Download ATS‑Optimized Resume
              <ExternalLink size={16} />
            </motion.button>
          </motion.div>

          {/* Right: Contact + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact */}
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text">Contact</h3>
              <div className="space-y-4">
                {contact.map((item, index) => {
                  const Wrapper: any = item.href ? motion.a : motion.div
                  return (
                    <Wrapper
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.3 + index * 0.08 }}
                      whileHover={item.href ? { scale: 1.02 } : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-500/10 transition-colors duration-200 group"
                    >
                      <div className="p-3 bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 transition-colors duration-200">
                        <item.icon size={20} className="text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60 font-medium">{item.label}</p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                      {item.external && (
                        <ExternalLink
                          size={16}
                          className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      )}
                    </Wrapper>
                  )
                })}
              </div>
            </div>

            {/* Highlights */}
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text">Key Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Experience", value: "4+ Years", icon: "⏰" },
                  { label: "Projects", value: "20+", icon: "🚀" },
                  { label: "Technologies", value: "15+", icon: "🛠️" },
                  { label: "Industries", value: "Banking, Fintech", icon: "🏦" },
                ].map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    className="text-center p-4 rounded-xl bg-primary-500/5 hover:bg-primary-500/10 transition-colors duration-200 group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">{h.icon}</div>
                    <p className="text-2xl font-bold text-primary-500">{h.value}</p>
                    <p className="text-sm text-foreground/70">{h.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
