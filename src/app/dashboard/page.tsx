// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser, logout, isAuthenticated } from '@/utils/auth';
import { Flame, LogOut, Plus, X, Calendar, Sparkles, ArrowRight, Edit2, Check } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  
  // New habit form
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitEmoji, setNewHabitEmoji] = useState('✨');
  const [newHabitCategory, setNewHabitCategory] = useState('custom');

  // Check authentication and load data
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);

    // Check if user already has a plan
    const existingPlan = localStorage.getItem(`plan_${currentUser.id}`);
    if (existingPlan) {
      // User already created a plan, redirect to challenge page
      router.push('/challenge');
      return;
    }

    // Load or initialize habits
    loadHabits(currentUser.id);
    setLoading(false);
  }, [router]);

  const loadHabits = (userId: string) => {
    const savedHabits = localStorage.getItem(`setup_habits_${userId}`);
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Initialize with default habits
      const defaultHabits: Habit[] = [
        { id: '1', name: 'Daily Workout', emoji: '💪', category: 'fitness' },
        { id: '2', name: 'No Junk Food', emoji: '🥗', category: 'nutrition' },
        { id: '3', name: 'No Alcohol', emoji: '🚫', category: 'wellness' },
        { id: '4', name: 'No Smoking', emoji: '🚭', category: 'wellness' },
        { id: '5', name: 'Learn 1hr/day', emoji: '📚', category: 'growth' },
        { id: '6', name: 'Deep Work 2hrs', emoji: '⚡', category: 'productivity' },
        { id: '7', name: 'Read Before Bed', emoji: '📖', category: 'growth' },
        { id: '8', name: 'Fixed Sleep Schedule', emoji: '😴', category: 'wellness' },
      ];
      setHabits(defaultHabits);
      saveHabits(userId, defaultHabits);
    }
  };

  const saveHabits = (userId: string, habitsToSave: Habit[]) => {
    localStorage.setItem(`setup_habits_${userId}`, JSON.stringify(habitsToSave));
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      emoji: newHabitEmoji,
      category: newHabitCategory
    };

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabits(user?.id, updatedHabits);

    // Reset form
    setNewHabitName('');
    setNewHabitEmoji('✨');
    setNewHabitCategory('custom');
    setShowAddModal(false);
  };

  const deleteHabit = (habitId: string) => {
    const updatedHabits = habits.filter(h => h.id !== habitId);
    setHabits(updatedHabits);
    saveHabits(user?.id, updatedHabits);
  };

  const startEditing = (habit: Habit) => {
    setEditingId(habit.id);
    setEditingName(habit.name);
  };

  const saveEdit = (habitId: string) => {
    if (!editingName.trim()) {
      setEditingId(null);
      return;
    }

    const updatedHabits = habits.map(h => 
      h.id === habitId ? { ...h, name: editingName.trim() } : h
    );
    setHabits(updatedHabits);
    saveHabits(user?.id, updatedHabits);
    setEditingId(null);
  };

  const createPlan = () => {
    if (!startDate) {
      alert('Please select a start date!');
      return;
    }

    if (habits.length === 0) {
      alert('Please add at least one habit!');
      return;
    }

    // Save the plan
    const plan = {
      userId: user?.id,
      habits: habits,
      startDate: startDate,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(`plan_${user?.id}`, JSON.stringify(plan));

    // Initialize habit tracking data
    const trackingData = {
      habits: habits.map(h => ({ ...h, completedDays: [] })),
      streak: 0,
      lastCheckIn: null
    };
    localStorage.setItem(`tracking_${user?.id}`, JSON.stringify(trackingData));

    // Redirect to challenge page
    router.push('/challenge');
  };

  const popularEmojis = ['💪', '🥗', '📚', '⚡', '🧘‍♂️', '💧', '🏃', '🎯', '🔥', '✨', '🌟', '💎'];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Flame className="text-orange-500" size={32} />
                <span className="text-xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  30-DAY CHALLENGE
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Let's Build Your Challenge
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Customize your habits, pick your start date, and we'll create your personalized 30-day transformation plan.
            </p>
          </motion.div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-purple-400 font-semibold">Choose Habits</span>
            </div>
            <div className="w-12 h-0.5 bg-purple-500/30" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-purple-400 font-semibold">Pick Start Date</span>
            </div>
            <div className="w-12 h-0.5 bg-purple-500/30" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center text-sm font-bold">3</div>
              <span className="text-gray-500 font-semibold">Start Challenge</span>
            </div>
          </div>

          {/* Habits Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-purple-400" />
                Your Habits ({habits.length})
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus size={20} />
                Add Custom Habit
              </motion.button>
            </div>

            {habits.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No habits yet. Add your first habit to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative bg-black/60 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all group"
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30"
                    >
                      <X size={16} className="text-red-400" />
                    </button>

                    {/* Habit content */}
                    <div className="text-5xl mb-4">{habit.emoji}</div>
                    
                    {editingId === habit.id ? (
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(habit.id)}
                          className="flex-1 bg-white/5 border border-purple-500/30 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-purple-500"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(habit.id)}
                          className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30"
                        >
                          <Check size={16} className="text-green-400" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white flex-1">{habit.name}</h3>
                        <button
                          onClick={() => startEditing(habit)}
                          className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/5 rounded-lg"
                        >
                          <Edit2 size={16} className="text-gray-400" />
                        </button>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{habit.category}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Start Date Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-cyan-400" size={32} />
                <h2 className="text-2xl font-bold">When do you want to start?</h2>
              </div>
              <div className="max-w-md">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                <p className="text-gray-400 text-sm mt-3">
                  Your 30-day challenge will run from {startDate || '[select date]'} to {
                    startDate 
                      ? new Date(new Date(startDate).getTime() + 29 * 24 * 60 * 60 * 1000).toLocaleDateString()
                      : '[end date]'
                  }
                </p>
              </div>
            </div>
          </motion.div>

          {/* Create Plan Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createPlan}
              disabled={!startDate || habits.length === 0}
              className="px-12 py-5 bg-gradient-to-r from-orange-500 via-purple-600 to-cyan-500 rounded-full text-xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
            >
              Create My Plan
              <ArrowRight size={24} />
            </motion.button>
            {(!startDate || habits.length === 0) && (
              <p className="text-gray-500 text-sm mt-4">
                {!startDate && 'Please select a start date. '}
                {habits.length === 0 && 'Please add at least one habit.'}
              </p>
            )}
          </motion.div>
        </main>
      </div>

      {/* Add Habit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border-2 border-purple-500/50 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                  Add Custom Habit
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Habit Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Habit Name
                  </label>
                  <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="e.g., Drink 8 glasses of water"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    autoFocus
                  />
                </div>

                {/* Emoji Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Choose Emoji
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {popularEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setNewHabitEmoji(emoji)}
                        className={`text-3xl p-3 rounded-xl border-2 transition-all ${
                          newHabitEmoji === emoji
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-purple-500/20 hover:border-purple-500/40'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newHabitCategory}
                    onChange={(e) => setNewHabitCategory(e.target.value)}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="custom">Custom</option>
                    <option value="fitness">Fitness</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="wellness">Wellness</option>
                    <option value="growth">Personal Growth</option>
                    <option value="productivity">Productivity</option>
                  </select>
                </div>

                {/* Add Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addHabit}
                  disabled={!newHabitName.trim()}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Habit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}