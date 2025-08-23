"use client"

import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, MapPin, Linkedin, Send, Clock } from "lucide-react"

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleHireMe = () => {
    const subject = encodeURIComponent("Hiring Inquiry - VINEETH REDDY YADANAPARTHI")
    const body = encodeURIComponent(`Hi Vineeth,

I came across your portfolio and I'd like to discuss potential opportunities.

Best regards,
[Your Name]
[Company]
[Role]`)
    window.open(`mailto:yadanaparthivineethreddy@gmail.com?subject=${subject}&body=${body}`)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "yadanaparthivineethreddy@gmail.com",
      action: "Send Email",
      href: "mailto:yadanaparthivineethreddy@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 7036546590",
      action: "Call Now",
      href: "tel:+917036546590",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/vineeth-reddy-y",
      action: "Open Profile",
      href: "https://linkedin.com/in/vineeth-reddy-y",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bangalore, India",
      action: "—",
      href: undefined,
      color: "from-purple-500 to-pink-500",
    },
  ] as const

  return (
    <section id="contact" className="py-20 relative">
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
            <span className="gradient-text">Let’s Connect</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Open to impactful backend/full‑stack roles. Reach out — I respond quickly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact methods + Availability */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text">Contact Information</h3>
              <div className="space-y-4">
                {contactMethods.map((m, idx) => {
                  const Wrapper: any = m.href ? motion.a : motion.div
                  return (
                    <Wrapper
                      key={m.title}
                      href={m.href}
                      target={m.title === "LinkedIn" ? "_blank" : undefined}
                      rel={m.title === "LinkedIn" ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.2 + idx * 0.08 }}
                      whileHover={m.href ? { scale: 1.02 } : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-500/10 transition-colors duration-200 group"
                    >
                      <div className={`p-3 bg-gradient-to-r ${m.color} rounded-lg group-hover:scale-110 transition-transform`}>
                        <m.icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60 font-medium">{m.title}</p>
                        <p className="text-foreground font-medium">{m.value}</p>
                      </div>
                      {m.action !== "—" && (
                        <span className="text-sm text-primary-500 font-medium">{m.action}</span>
                      )}
                    </Wrapper>
                  )
                })}
              </div>
            </div>

            {/* Availability & Response */}
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text">Availability</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="font-semibold text-green-500">Actively Exploring Roles</p>
                    <p className="text-sm text-foreground/70">Backend / Full‑Stack • Java, Spring Boot, Microservices</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                  <Clock size={18} className="text-primary-500" />
                  <div>
                    <p className="font-semibold text-primary-500">Typical Response Time</p>
                    <p className="text-sm text-foreground/70">Email replies within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Recruiter panel (single CTA, no Calendly, no resume) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text">For Recruiters</h3>

              <div className="space-y-6">
                {/* Quick facts */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { k: "Location", v: "Bangalore, India" },
                    { k: "Experience", v: "4+ years" },
                    { k: "Core Stack", v: "Java • Spring Boot" },
                    { k: "Databases", v: "PostgreSQL • MySQL" },
                  ].map((item) => (
                    <div
                      key={item.k}
                      className="p-4 rounded-xl bg-primary-500/5 border border-white/10 text-sm"
                    >
                      <p className="text-foreground/60">{item.k}</p>
                      <p className="font-semibold">{item.v}</p>
                    </div>
                  ))}
                </div>

                {/* Single primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleHireMe}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Send size={20} />
                  Send Hiring Inquiry
                </motion.button>

                {/* Secondary info (no scheduling links, no resume) */}
                <div className="text-sm text-foreground/70">
                  Prefer LinkedIn? Message me at{" "}
                  <a
                    href="https://linkedin.com/in/vineeth-reddy-y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 underline-offset-4 hover:underline font-medium"
                  >
                    linkedin.com/in/vineeth-reddy-y
                  </a>
                  .
                </div>
              </div>
            </div>

            {/* Final reassurance card */}
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h4 className="text-lg font-semibold mb-3 gradient-text">What you can expect</h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2" />
                  Clean, production‑grade code with strong testing habits.
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2" />
                  Systems that prioritize resilience, observability, and performance.
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2" />
                  Clear communication and reliable delivery.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA (keeps the single email CTA theme) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ready to talk?</h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              I’m excited to bring my expertise in Java, Spring Boot, and microservices to your team.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHireMe}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-full transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl mx-auto"
            >
              <Mail size={20} />
              Start the Conversation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
