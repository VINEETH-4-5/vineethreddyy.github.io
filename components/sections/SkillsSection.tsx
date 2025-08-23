"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =========================
   Types
========================= */
type Skill = {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate" | "Beginner";
  description: string;
};

type SkillCategory = {
  name: string;
  color: string; // Tailwind gradient token, e.g., "from-blue-500 to-cyan-500"
  icon: string;  // emoji or glyph
  skills: Skill[];
};

/* =========================
   Data
========================= */
const skillCategories: SkillCategory[] = [
  {
    name: "Backend",
    color: "from-blue-500 to-cyan-500",
    icon: "⚙️",
    skills: [
      { name: "Java", level: "Expert", description: "Core Java, Java 8+ features, Collections, Streams API" },
      { name: "Spring Boot", level: "Expert", description: "REST APIs, Dependency Injection, Spring Security" },
      { name: "Microservices", level: "Advanced", description: "Service discovery, API Gateway, Circuit breakers" },
      { name: "Resilience4j", level: "Advanced", description: "Fault tolerance, retry mechanisms, bulkhead pattern" },
      { name: "Eureka", level: "Advanced", description: "Service registry, load balancing, health checks" },
      { name: "API Gateway", level: "Advanced", description: "Zuul, routing, filtering, rate limiting" },
    ],
  },
  {
    name: "Databases",
    color: "from-green-500 to-emerald-500",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: "Expert", description: "Schema design, query optimization, transactions, indexing" },
      { name: "MySQL", level: "Advanced", description: "Database administration, performance tuning, replication" },
    ],
  },
  {
    name: "Frontend",
    color: "from-purple-500 to-pink-500",
    icon: "🎨",
    skills: [
      { name: "React", level: "Advanced", description: "Hooks, Context API, Component lifecycle, Performance optimization" },
      { name: "TypeScript", level: "Advanced", description: "Type safety, Interfaces, Generics, Advanced types" },
      { name: "Redux Toolkit", level: "Intermediate", description: "State management, RTK Query, DevTools" },
      { name: "HTML/CSS", level: "Advanced", description: "Semantic HTML, CSS Grid, Flexbox, Responsive design" },
    ],
  },
  {
    name: "Workflow Automation",
    color: "from-orange-500 to-red-500",
    icon: "🔄",
    skills: [{ name: "Camunda BPM", level: "Advanced", description: "BPMN workflows, DMN decision tables, Process automation" }],
  },
  {
    name: "Tools & Practices",
    color: "from-gray-500 to-slate-500",
    icon: "🛠️",
    skills: [
      { name: "Git", level: "Advanced", description: "Version control, branching strategies, CI/CD integration" },
      { name: "Maven", level: "Advanced", description: "Build automation, dependency management, plugins" },
      { name: "JIRA", level: "Advanced", description: "Project management, Agile methodologies, Issue tracking" },
      { name: "Postman", level: "Advanced", description: "API testing, Collections, Automated testing" },
      { name: "Agile", level: "Advanced", description: "Scrum, Sprint planning, Retrospectives, User stories" },
    ],
  },
];

/* =========================
   Active-dot gradient mapping
========================= */
const gradientHexMap: Record<string, { from: string; to: string }> = {
  "from-blue-500 to-cyan-500": { from: "#3B82F6", to: "#06B6D4" },
  "from-green-500 to-emerald-500": { from: "#22C55E", to: "#10B981" },
  "from-purple-500 to-pink-500": { from: "#A855F7", to: "#EC4899" },
  "from-orange-500 to-red-500": { from: "#F97316", to: "#EF4444" },
  "from-gray-500 to-slate-500": { from: "#6B7280", to: "#64748B" },
};

const activeDotStyleFor = (categoryColor: string): React.CSSProperties => {
  const g = gradientHexMap[categoryColor];
  if (!g) return {};
  return {
    background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
    boxShadow: `0 0 12px ${g.to}66`,
  };
};

/* =========================
   Component
========================= */
export default function SkillsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPointerInside, setIsPointerInside] = useState(false); // single source of truth for hover/focus presence

  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentCategory = skillCategories[currentCategoryIndex];

  // Ensure we never see two detail cards: wait-for-exit and clear on category change
  useEffect(() => {
    // clear selection when switching category to avoid cross-category flicker
    setSelectedSkill(null);
  }, [currentCategoryIndex]);

  // debounced clearing to allow moving pointer from tile into the detail card area
  const safeClearSelection = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (!isPointerInside) setSelectedSkill(null);
    }, 90);
  };

  // Swipe
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) setCurrentCategoryIndex((p) => (p + 1) % skillCategories.length);
    if (distance < -minSwipeDistance) setCurrentCategoryIndex((p) => (p - 1 + skillCategories.length) % skillCategories.length);
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative">
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
            <span className="gradient-text">Skills &amp; Expertise</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            A modern, interactive view of my core strengths and technical depth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Skills Panel with Large Detail Card area (below header) */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentCategoryIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-effect rounded-2xl p-6 md:p-8 relative overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseEnter={() => setIsPointerInside(true)}
              onMouseLeave={() => { setIsPointerInside(false); safeClearSelection(); }}
            >
              {/* Category Header + Dots */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${currentCategory.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {currentCategory.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold gradient-text">{currentCategory.name}</h3>
                    <p className="text-sm text-foreground/60">{currentCategory.skills.length} skills</p>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex gap-2">
                  {skillCategories.map((cat, index) => {
                    const isActive = index === currentCategoryIndex;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setCurrentCategoryIndex(index)}
                        aria-label={`Go to ${cat.name}`}
                        className={`w-3 h-3 rounded-full transition-all duration-200 border
                          ${isActive ? "scale-125 border-transparent" : "bg-foreground/20 hover:bg-foreground/40 border-transparent"}`}
                        style={isActive ? activeDotStyleFor(cat.color) : undefined}
                      />
                    );
                  })}
                </div>
              </div>

              {/* LARGE DETAIL CARD AREA (below header, single presence, wait-for-exit) */}
              <AnimatePresence mode="wait" initial={false}>
                {selectedSkill && (
                  <motion.div
                    key={selectedSkill.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    onMouseEnter={() => setIsPointerInside(true)}
                    onMouseLeave={() => { setIsPointerInside(false); safeClearSelection(); }}
                    className="mb-6 rounded-2xl border border-white/10 bg-background/60 backdrop-blur px-5 py-5 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${currentCategory.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-lg font-semibold">{selectedSkill.name}</h4>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-500 text-xs font-medium">
                            {selectedSkill.level}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
                          {selectedSkill.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentCategory.skills.map((skill, idx) => (
                  <motion.button
                    type="button"
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.04 }}
                    onMouseEnter={() => {
                      if (selectedSkill?.name !== skill.name) setSelectedSkill(skill);
                      setIsPointerInside(true);
                    }}
                    onMouseLeave={() => {
                      setIsPointerInside(false);
                      safeClearSelection();
                    }}
                    onFocus={() => { setSelectedSkill(skill); setIsPointerInside(true); }}
                    onBlur={() => { setIsPointerInside(false); safeClearSelection(); }}
                    className={`p-4 rounded-xl bg-gradient-to-r ${currentCategory.color} cursor-pointer transition-all duration-200 border-2 border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/40`}
                  >
                    <div className="text-center">
                      <h5 className="text-white font-bold text-sm mb-1">{skill.name}</h5>
                      <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                        {skill.level}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentCategoryIndex((p) => (p - 1 + skillCategories.length) % skillCategories.length)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-500 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft size={20} />
                  <span className="hidden sm:inline">Previous</span>
                </motion.button>

                <div className="text-center">
                  <span className="text-sm text-foreground/60">
                    {currentCategoryIndex + 1} of {skillCategories.length}
                  </span>
                  <p className="text-xs text-foreground/40 mt-1 hidden sm:block">Swipe or use buttons to navigate</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentCategoryIndex((p) => (p + 1) % skillCategories.length)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-500 rounded-lg transition-colors duration-200"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Skill Summary (minimal) */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 gradient-text">Skill Summary</h3>
              <div className="space-y-3">
                {skillCategories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    onClick={() => setCurrentCategoryIndex(index)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                      index === currentCategoryIndex
                        ? "bg-primary-500/20 border border-primary-500/30"
                        : "hover:bg-primary-500/10"
                    }`}
                  >
                    <div className={`w-4 h-4 bg-gradient-to-r ${category.color} rounded-full`} />
                    <span className="text-foreground font-medium">{category.name}</span>
                    <span className="ml-auto text-sm text-foreground/50">{category.skills.length} skills</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
