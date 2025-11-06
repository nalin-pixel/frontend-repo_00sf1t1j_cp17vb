import React from 'react';
import { Brain, Calendar, CheckCircle2, BookOpen } from 'lucide-react';

const SummaryHeader = ({ learningStyle, habits, tasks }) => {
  const completedHabits = habits.filter(h => h.doneToday).length;
  const totalHabits = habits.length;
  const pendingTasks = tasks.filter(t => new Date(t.dueDate) >= new Date()).length;
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date()).length;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 text-white p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/15 p-3 rounded-xl backdrop-blur">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Revision Optimizer</h1>
            <p className="text-white/90 text-sm">Personalized plan based on your habits and learning style</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-white/90 text-sm"><Brain className="w-4 h-4" /> Style</div>
            <div className="text-lg font-medium capitalize">{learningStyle || 'unset'}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-white/90 text-sm"><CheckCircle2 className="w-4 h-4" /> Habits</div>
            <div className="text-lg font-medium">{completedHabits}/{totalHabits}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-white/90 text-sm"><Calendar className="w-4 h-4" /> Upcoming</div>
            <div className="text-lg font-medium">{pendingTasks}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-white/90 text-sm"><BookOpen className="w-4 h-4" /> Overdue</div>
            <div className="text-lg font-medium">{overdueTasks}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryHeader;
