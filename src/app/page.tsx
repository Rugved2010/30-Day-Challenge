// src/app/page.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Flame, Trophy, Zap, Target, Calendar, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const timelineSteps = [
    { day: "Day 1", title: "The Decision", desc: "Pick your habits" },
    { day: "Day 1-7", title: "Breaking Through", desc: "The hardest week. Stay strong." },
    { day: "Day 14", title: "Momentum Builds", desc: "You start feeling unstoppable" },
    { day: "Day 30+", title: "New You", desc: "Confidence. Discipline. Power." }
  ];

  const stats = [
    { number: "10,000+", label: "Challengers", icon: Target },
    { number: "76%", label: "Success Rate", icon: Trophy },
    { number: "30", label: "Days to Transform", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 border-b border-purple-500/20">
          <nav className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Flame className="text-orange-500" size={32} />
              <span className="text-2xl font-bold font-display bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                30-DAY CHALLENGE
              </span>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 rounded-full border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 transition-all font-bold"
            >
              Sign In
            </motion.button>
          </nav>
        </header>

        {/* Hero Section - BOLD & DIRECT */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Big Impact Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-8"
            >
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/50 backdrop-blur-sm">
                <span className="text-orange-400 font-bold flex items-center gap-2">
                  <Zap className="text-yellow-400" size={20} />
                  TRANSFORM IN 30 DAYS, NOT YEARS
                </span>
              </div>
            </motion.div>

            {/* Main Headline - Aggressive & Direct */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none">
              <span className="block font-heading bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                STOP WAITING.
              </span>
              <span className="block text-white mt-2">
                START NOW.
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto font-medium">
              Track daily habits. Build unstoppable momentum.
              <br />
              <span className="text-purple-400">Become the person you always wanted to be.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full text-xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all inline-flex items-center gap-3"
              >
                START YOUR CHALLENGE
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 rounded-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all font-bold"
              >
                HOW IT WORKS
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-black/80 border border-purple-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
                  <stat.icon className="mx-auto mb-4 text-purple-400" size={40} />
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-bold text-lg">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* What to Expect - Timeline */}
        <section className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center mb-4"
          >
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              YOUR TRANSFORMATION
            </span>
          </motion.h2>
          <p className="text-center text-gray-400 text-xl mb-16">The journey from Day 1 to unstoppable</p>

          <div className="max-w-4xl mx-auto space-y-8">
            {timelineSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Connecting Line */}
                {i < timelineSteps.length - 1 && (
                  <div className="absolute left-8 top-20 w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent" />
                )}
                
                <div className="flex gap-6 items-start group cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/50">
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 rounded-2xl p-6 group-hover:border-purple-500/60 transition-all backdrop-blur-sm">
                    <div className="text-cyan-400 font-bold text-sm mb-1">{step.day}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Habits Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-purple-900/50 to-black border-2 border-purple-500/50 rounded-3xl p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    HABITS THAT CHANGE EVERYTHING
                  </span>
                </h2>
                <p className="text-gray-400 text-lg">The core challenges that rebuild you from the ground up</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { emoji: "💪", text: "Workout" },
                  { emoji: "🥗", text: "No Junk Food" },
                  { emoji: "🚫", text: "No Alcohol" },
                  { emoji: "🚭", text: "No Smoking" },
                  { emoji: "📚", text: "New Skill 1hr/day" },
                  { emoji: "⚡", text: "Deep Work 2hrs" },
                  { emoji: "📖", text: "Read Before Bed" },
                  { emoji: "😴", text: "Fixed Sleep" },
                  { emoji: "🧘‍♂️", text: "Meditation" },
                  { emoji: "💧", text: "3L water daily" },
                  { emoji: "📝", text: "Daily Journaling" }
                ].map((habit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="bg-black/60 border border-purple-500/30 rounded-xl p-4 text-center hover:border-purple-500/60 transition-all cursor-pointer backdrop-blur-sm"
                  >
                    <div className="text-4xl mb-2">{habit.emoji}</div>
                    <div className="text-sm font-bold text-gray-300">{habit.text}</div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-cyan-400 font-bold text-lg mb-6">+ Add your own habits</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-bold text-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all"
                >
                  BEGIN YOUR TRANSFORMATION
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              EVERY DAY YOU WAIT
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                IS ANOTHER DAY LOST.
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands who've already taken control. Your future self is waiting.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-orange-500 via-purple-600 to-cyan-500 rounded-full text-2xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all"
            >
              START NOW →
            </motion.button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-500/20 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500 mb-2">100% Free • No BS • Just Results</p>
            <p className="text-gray-600 text-sm">Built for people who are done making excuses</p>
          </div>
        </footer>
      </div>
    </div>
  );
}