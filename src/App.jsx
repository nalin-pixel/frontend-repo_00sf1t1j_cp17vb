import React, { useMemo, useState } from 'react';
import SummaryHeader from './components/SummaryHeader';
import LearningStyleForm from './components/LearningStyleForm';
import HabitTracker from './components/HabitTracker';
import TaskPlanner from './components/TaskPlanner';

function App() {
  const [prefs, setPrefs] = useState({ learningStyle: 'visual', focusLevel: 50, prefersLongSessions: false });
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);

  const timerMinutes = useMemo(() => {
    const base = prefs.focusLevel || 50;
    return prefs.prefersLongSessions ? Math.min(base + 10, 120) : base;
  }, [prefs]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <SummaryHeader learningStyle={prefs.learningStyle} habits={habits} tasks={tasks} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <TaskPlanner
              focusMinutes={timerMinutes}
              learningStyle={prefs.learningStyle}
              onChange={setTasks}
            />
            <HabitTracker onChange={setHabits} />
          </div>
          <div className="space-y-6">
            <LearningStyleForm onUpdate={setPrefs} />
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">How this works</h2>
              <p className="text-sm text-slate-600">Update your preferences, check off daily habits, and add tasks with due dates. The planner adapts durations to your focus endurance and gives tips matched to your learning style.</p>
            </div>
          </div>
        </div>

        <footer className="text-center text-slate-500 text-sm pt-6">
          Built for your highest results — optimize, plan, and focus.
        </footer>
      </div>
    </div>
  );
}

export default App;
