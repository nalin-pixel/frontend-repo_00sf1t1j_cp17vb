import React, { useMemo, useState } from 'react';
import { CalendarDays, Clock, PlusCircle } from 'lucide-react';

const TaskPlanner = ({ focusMinutes = 50, learningStyle = 'visual', onChange }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Linear Algebra - Eigenvalues', dueDate: new Date(Date.now() + 86400000).toISOString().slice(0,10), duration: 50 },
    { id: 2, title: 'Chemistry - Reaction Mechanisms', dueDate: new Date(Date.now() + 2*86400000).toISOString().slice(0,10), duration: 40 },
  ]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0,10));

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const duration = Math.min(Math.max(25, focusMinutes), 120); // clamp 25-120
    const updated = [...tasks, { id: Date.now(), title: title.trim(), dueDate, duration }];
    setTasks(updated);
    setTitle('');
    onChange(updated);
  };

  const planSuggestion = useMemo(() => {
    const styleTip = {
      visual: 'Use colors and quick diagrams in your notes.',
      auditory: 'Explain concepts out loud or record brief summaries.',
      kinesthetic: 'Do practice problems and mini-demos.',
      reading: 'Write concise summaries and make flashcards.',
    }[learningStyle] || 'Mix techniques that feel natural to you.';

    return `Try ${Math.round(focusMinutes)}-minute deep-focus blocks. ${styleTip}`;
  }, [focusMinutes, learningStyle]);

  const groupedByDate = useMemo(() => {
    const map = {};
    for (const t of tasks) {
      map[t.dueDate] = map[t.dueDate] || [];
      map[t.dueDate].push(t);
    }
    return map;
  }, [tasks]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Planner</h2>
      </div>

      <p className="text-sm text-slate-600 mb-3">{planSuggestion}</p>

      <form onSubmit={addTask} className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task (e.g., Read Chapter 5)"
          className="flex-1 rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white font-medium hover:bg-indigo-700">
          <PlusCircle className="w-4 h-4" /> Add
        </button>
      </form>

      <div className="space-y-4">
        {Object.keys(groupedByDate).sort().map(date => (
          <div key={date} className="rounded-xl border border-slate-200">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-t-xl">
              <div className="flex items-center gap-2 text-slate-700"><CalendarDays className="w-4 h-4" /> {date}</div>
            </div>
            <ul className="divide-y">
              {groupedByDate[date].map(task => (
                <li key={task.id} className="flex items-center justify-between p-3">
                  <span className="text-slate-800">{task.title}</span>
                  <span className="inline-flex items-center gap-1 text-slate-500 text-sm"><Clock className="w-4 h-4" /> {task.duration}m</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPlanner;
