// src/app/page.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Award, Calendar } from 'lucide-react';

export default function LandingPage() {
  const benefits = [
    {
      icon: Target,
      title: "Build Lasting Habits",
      description: "Transform your daily routine with consistent, tracked habits that stick."
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "Visualize your journey with streaks, calendars, and completion rings."
    },
    {
      icon: Award,
      title: "Stay Motivated",
      description: "Celebrate wins with confetti animations and milestone achievements."
    },
    {
      icon: Calendar,
      title: "30-Day Challenge",
      description: "Commit to 30 days of growth across fitness, learning, and wellness."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            30-Day Challenge
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            Sign In
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Transform Yourself
            <br />
            in 30 Days!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build healthy habits, track your progress, and become the best version of yourself.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            Begin Your Challenge
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </motion.button>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "30", label: "Days" },
            { number: "8", label: "Core Habits" },
            { number: "100%", label: "Free" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
        >
          Why Take the Challenge?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Habits Preview */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            8 Core Habits to Master
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "🏃 Daily Workout",
              "🥗 No Junk Food",
              "🚫 No Alcohol",
              "🚭 No Smoking",
              "📚 1 Hour Learning",
              "💼 2 Hours Focused Work",
              "📖 Reading Before Bed",
              "😴 Fixed Sleep Schedule"
            ].map((habit, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base"
              >
                {habit}
              </motion.span>
            ))}
          </div>
          <p className="text-lg opacity-90 mb-8">
            Plus the ability to add your own custom habits!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-600">
        <p className="mb-2">Built with ❤️ to help you become your best self</p>
        <p className="text-sm">100% Free • No Ads • Open Source</p>
      </footer>
    </div>
  );
}