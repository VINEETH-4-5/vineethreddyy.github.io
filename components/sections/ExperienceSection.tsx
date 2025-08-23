"use client"

import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Building, Award } from "lucide-react"

type Experience = {
  period: string
  title: string
  company: string
  location: string
  project?: string
  achievements: string[]
  technologies: string[]
  impact?: "High" | "Medium" | "Low"
}

const experiences: Experience[] = [
  {
    period: "2024 – Present",
    title: "Associate Consultant",
    company: "Infosys",
    location: "Bangalore, India",
    project: "Danske Bank",
    achievements: [
      "Led migration to Java 21 and modernized service stack with zero functional regressions.",
      "Introduced service hardening: circuit breakers, timeouts, and graceful fallbacks.",
      "Optimized critical paths and database access patterns for lower latency and higher reliability.",
      "Partnered with QA on test strategy (contract tests, integration flows) to improve release confidence.",
    ],
    technologies: ["Java 21", "Spring Boot", "Microservices", "PostgreSQL", "Docker", "Kubernetes"],
    impact: "High",
  },
  {
    period: "2021 – 2024",
    title: "Java Full‑Stack Developer",
    company: "DBQ",
    location: "Bangalore, India",
    project: "Crypto Trading Automation & Workflow Systems",
    achievements: [
      "Built distributed microservices and resilient APIs powering trading and workflow execution.",
      "Automated operational flows with Camunda BPM (BPMN/DMN) to reduce manual effort and errors.",
      "Designed frontend modules in React + TypeScript to streamline operator workflows.",
      "Improved database schema design and query performance for consistent throughput.",
    ],
    technologies: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Camunda BPM", "Redis"],
    impact: "High",
  },
  {
    period: "2021",
    title: "Intern",
    company: "DBQ",
    location: "Bangalore, India",
    project: "UI Improvements & Foundations",
    achievements: [
      "Learned Java and React fundamentals through hands‑on feature work.",
      "Contributed UI fixes and small enhancements under mentorship.",
      "Participated in code reviews and agile ceremonies; shipped incremental improvements.",
    ],
    technologies: ["Java", "React", "HTML/CSS", "Git"],
    impact: "Medium",
  },
]

const impactClasses: Record<NonNullable<Experience["impact"]>, string> = {
  High: "text-green-500 bg-green-500/15",
  Medium: "text-yellow-500 bg-yellow-500/15",
  Low: "text-blue-500 bg-blue-500/15",
}

export default function ExperienceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Career Journey</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Roles, responsibilities, and impact — from foundations to production leadership.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400/70 to-primary-300/40" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.article
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="relative pl-10 sm:pl-12 md:pl-16"
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-6 md:left-8 top-4 -translate-x-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary-500 ring-4 ring-background shadow-md" />
                </div>

                {/* Card */}
                <div className="glass-effect rounded-2xl p-6 md:p-8">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full">
                      <Calendar size={16} />
                      {exp.period}
                    </span>
                    {exp.impact && (
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${impactClasses[exp.impact]}`}>
                        {exp.impact} Impact
                      </span>
                    )}
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-2xl font-bold mb-2 gradient-text">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mb-5 text-foreground/70">
                    <span className="inline-flex items-center gap-1">
                      <Building size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={16} />
                      {exp.location}
                    </span>
                  </div>

                  {/* Project */}
                  {exp.project && (
                    <div className="mb-5">
                      <span className="text-sm font-medium text-foreground/60">Project:</span>
                      <span className="ml-2 font-semibold">{exp.project}</span>
                    </div>
                  )}

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Award size={18} className="text-primary-500" />
                      Selected Contributions
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.35, delay: idx * 0.12 + i * 0.06 }}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech chips */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t, j) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.25, delay: idx * 0.12 + j * 0.04 }}
                          className="px-3 py-1 bg-primary-500/10 text-primary-500 text-xs font-medium rounded-full"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Compact career footer (concise, factual) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14"
        >
          <div className="glass-effect rounded-2xl p-6 md:p-8 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Years Experience", value: "4+" },
              { label: "Core Focus", value: "Backend" },
              { label: "Frontend", value: "React + TS" },
              { label: "Workflow", value: "Camunda BPM" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-primary-500">{s.value}</p>
                <p className="text-sm text-foreground/70">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}