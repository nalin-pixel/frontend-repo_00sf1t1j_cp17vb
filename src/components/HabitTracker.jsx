import React, { useState } from 'react';
import { Check, Plus, RefreshCcw } from 'lucide-react';

const defaultHabits = [
  { id: 1, name: 'Morning review (15m)', doneToday: false },
  { id: 2, name: 'Active recall (flashcards)', doneToday: false },
  { id: 3, name: 'Exercise or walk (10m)', doneToday: false },
];

const HabitTracker = ({ onChange }) => {
  const [habits, setHabits] = useState(defaultHabits);
  const [newHabit, setNewHabit] = useState('');

  const toggleHabit = (id) => {
    const updated = habits.map(h => h.id === id ? { ...h, doneToday: !h.doneToday } : h);
    setHabits(updated);
    onChange(updated);
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    const updated = [...habits, { id: Date.now(), name: newHabit.trim(), doneToday: false }];
    setHabits(updated);
    setNewHabit('');
    onChange(updated);
  };

  const resetToday = () => {
    const updated = habits.map(h => ({ ...h, doneToday: false }));
    setHabits(updated);
    onChange(updated);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Daily habits</h2>
        <button onClick={resetToday} className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
          <RefreshCcw className="w-4 h-4" /> Reset today
        </button>
      </div>

      <ul className="space-y-2">
        {habits.map(habit => (
          <li key={habit.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-6 h-6 rounded-md border flex items-center justify-center ${habit.doneToday ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent'}`}
                aria-label={habit.doneToday ? 'Mark as not done' : 'Mark as done'}
              >
                <Check className="w-4 h-4" />
              </button>
              <span className={`text-slate-800 ${habit.doneToday ? 'line-through text-slate-400' : ''}`}>{habit.name}</span>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={addHabit} className="mt-4 flex gap-2">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit"
          className="flex-1 rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white font-medium hover:bg-indigo-700">
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>
    </div>
  );
};

export default HabitTracker;
