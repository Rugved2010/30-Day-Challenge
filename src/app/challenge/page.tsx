// src/app/challenge/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCurrentUser, logout, isAuthenticated } from '@/utils/auth';
import { Flame, LogOut, CheckCircle2, Circle, Trophy, Calendar as CalendarIcon, TrendingUp, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: string;
  completedDays: string[]; // Array of date strings "YYYY-MM-DD"
}

interface Plan {
  userId: string;
  habits: any[];
  startDate: string;
  createdAt: string;
}

export default function ChallengePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);

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

    // Load plan
    const savedPlan = localStorage.getItem(`plan_${currentUser.id}`);
    if (!savedPlan) {
      // No plan created yet, redirect to dashboard
      router.push('/dashboard');
      return;
    }

    const planData = JSON.parse(savedPlan);
    setPlan(planData);

    // Load tracking data
    loadTrackingData(currentUser.id);
    calculateStreak(currentUser.id);
    setLoading(false);
  }, [router]);

  const loadTrackingData = (userId: string) => {
    const savedTracking = localStorage.getItem(`tracking_${userId}`);
    
    if (savedTracking) {
      const trackingData = JSON.parse(savedTracking);
      setHabits(trackingData.habits);
    }
  };

  const saveTrackingData = (userId: string, habitsData: Habit[]) => {
    const trackingData = {
      habits: habitsData,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`tracking_${userId}`, JSON.stringify(trackingData));
  };

  const calculateStreak = (userId: string) => {
    const savedTracking = localStorage.getItem(`tracking_${userId}`);
    if (!savedTracking) {
      setCurrentStreak(0);
      return;
    }

    const trackingData = JSON.parse(savedTracking);
    const habits = trackingData.habits;

    // Calculate streak by checking consecutive days where ALL habits were completed
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const allCompleted = habits.every((h: Habit) => h.completedDays.includes(dateStr));
      
      if (allCompleted && habits.length > 0) {
        streak++;
      } else if (i > 0) {
        // Only break if not checking today (i > 0)
        break;
      }
    }
    
    setCurrentStreak(streak);
  };

  const toggleHabit = (habitId: string, date: string) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDays.includes(date);
        
        const newCompletedDays = isCompleted
          ? habit.completedDays.filter(d => d !== date)
          : [...habit.completedDays, date];
        
        // Trigger confetti when completing a habit for today
        if (!isCompleted && date === new Date().toISOString().split('T')[0]) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        
        return { ...habit, completedDays: newCompletedDays };
      }
      return habit;
    });

    setHabits(updatedHabits);
    saveTrackingData(user?.id, updatedHabits);
    calculateStreak(user?.id);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getDayStatus = (date: string) => {
    const completed = habits.filter(h => h.completedDays.includes(date)).length;
    const total = habits.length;
    
    if (completed === 0) return 'empty';
    if (completed === total) return 'full';
    return 'partial';
  };

  const getCalendarDays = () => {
    if (!plan) return [];
    
    const startDate = new Date(plan.startDate);
    const days = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    
    return days;
  };

  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    const completed = habits.filter(h => h.completedDays.includes(today)).length;
    return { completed, total: habits.length };
  };

  const isHabitCompletedForDate = (habitId: string, date: string) => {
    const habit = habits.find(h => h.id === habitId);
    return habit?.completedDays.includes(date) || false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading your challenge...</div>
      </div>
    );
  }

  const todayProgress = getTodayProgress();
  const progressPercentage = habits.length > 0 ? (todayProgress.completed / todayProgress.total) * 100 : 0;
  const calendarDays = getCalendarDays();
  const daysSinceStart = plan ? Math.floor((new Date().getTime() - new Date(plan.startDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const daysRemaining = Math.max(0, 30 - daysSinceStart);

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
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent block">
                    30-DAY CHALLENGE
                  </span>
                  <span className="text-xs text-gray-500">Day {daysSinceStart + 1} of 30</span>
                </div>
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
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Hey <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">{user?.name}</span>! 💪
            </h1>
            <p className="text-gray-400 text-lg">
              {daysRemaining > 0 
                ? `${daysRemaining} days left. Keep crushing it!`
                : "Challenge complete! You're a legend! 🏆"
              }
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Today's Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-black/80 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-purple-400" size={24} />
                  <h3 className="text-lg font-bold text-gray-300">Today's Progress</h3>
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {todayProgress.completed}/{todayProgress.total}
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm">{Math.round(progressPercentage)}% Complete</p>
              </div>
            </motion.div>

            {/* Current Streak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-black/80 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="text-orange-400" size={24} />
                  <h3 className="text-lg font-bold text-gray-300">Current Streak</h3>
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                  {currentStreak} Days
                </div>
                <p className="text-gray-400 text-sm">
                  {currentStreak > 0 ? "Don't break the chain! 🔥" : "Start your streak today!"}
                </p>
              </div>
            </motion.div>

            {/* Days Remaining */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-black/80 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <CalendarIcon className="text-cyan-400" size={24} />
                  <h3 className="text-lg font-bold text-gray-300">Days Remaining</h3>
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {daysRemaining}
                </div>
                <p className="text-gray-400 text-sm">Out of 30 days total</p>
              </div>
            </motion.div>
          </div>

          {/* Calendar View Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-xl hover:bg-purple-600/30 transition-all"
            >
              <CalendarIcon size={20} />
              {showCalendar ? 'Hide' : 'Show'} Calendar View
            </button>
          </div>

          {/* Calendar Grid */}
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-black/60 border border-purple-500/30 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CalendarIcon className="text-purple-400" />
                30-Day Calendar
              </h2>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {calendarDays.map((date, index) => {
                  const status = getDayStatus(date);
                  const isToday = date === new Date().toISOString().split('T')[0];
                  const isFuture = new Date(date) > new Date();
                  
                  return (
                    <motion.div
                      key={date}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => !isFuture && setSelectedDate(date)}
                      className={`aspect-square rounded-xl p-2 text-center cursor-pointer transition-all ${
                        isFuture
                          ? 'bg-gray-800/50 border border-gray-700 cursor-not-allowed'
                          : status === 'full'
                          ? 'bg-green-600/30 border-2 border-green-500'
                          : status === 'partial'
                          ? 'bg-yellow-600/30 border-2 border-yellow-500'
                          : 'bg-gray-800/50 border border-gray-700 hover:border-purple-500'
                      } ${isToday ? 'ring-2 ring-cyan-500' : ''}`}
                    >
                      <div className="text-xs text-gray-400 mb-1">Day</div>
                      <div className="text-lg font-bold">{index + 1}</div>
                      {isToday && <div className="text-xs text-cyan-400 mt-1">Today</div>}
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600/30 border-2 border-green-500 rounded" />
                  <span className="text-gray-400">All Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-600/30 border-2 border-yellow-500 rounded" />
                  <span className="text-gray-400">Partial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-800/50 border border-gray-700 rounded" />
                  <span className="text-gray-400">Not Started</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Today's Habits */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="text-purple-400" />
              Today's Habits
            </h2>

            {habits.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No habits found. Something went wrong!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {habits.map((habit, index) => {
                  const isCompleted = isHabitCompletedForDate(habit.id, selectedDate);
                  const isToday = selectedDate === new Date().toISOString().split('T')[0];
                  
                  return (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => toggleHabit(habit.id, selectedDate)}
                      className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border-purple-500/50'
                          : 'bg-black/60 border-purple-500/20 hover:border-purple-500/40'
                      }`}
                    >
                      {/* Checkmark indicator */}
                      <div className="absolute top-4 right-4">
                        {isCompleted ? (
                          <CheckCircle2 className="text-green-400" size={24} />
                        ) : (
                          <Circle className="text-gray-600" size={24} />
                        )}
                      </div>

                      {/* Habit content */}
                      <div className="text-5xl mb-4">{habit.emoji}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{habit.name}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{habit.category}</p>
                      
                      {!isToday && (
                        <div className="mt-2 text-xs text-cyan-400">
                          Viewing: {new Date(selectedDate).toLocaleDateString()}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Perfect Day Message */}
          {todayProgress.completed === todayProgress.total && todayProgress.total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  🎉 Perfect Day! All Habits Complete! 🎉
                </h3>
                <p className="text-gray-300">You're absolutely crushing it! Keep this momentum going!</p>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}