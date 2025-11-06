import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const options = [
  { value: 'visual', label: 'Visual (diagrams, color-coding, mind maps)' },
  { value: 'auditory', label: 'Auditory (lectures, podcasts, teaching others)' },
  { value: 'kinesthetic', label: 'Kinesthetic (hands-on, practice problems, demos)' },
  { value: 'reading', label: 'Reading/Writing (notes, summaries, flashcards)' },
];

const LearningStyleForm = ({ onUpdate }) => {
  const [style, setStyle] = useState('visual');
  const [focus, setFocus] = useState(50);
  const [longSessions, setLongSessions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ learningStyle: style, focusLevel: Number(focus), prefersLongSessions: longSessions });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Your learning preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Primary style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Focus endurance (minutes)</label>
          <input
            type="range"
            min={15}
            max={120}
            step={5}
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="w-full"
          />
          <div className="text-sm text-slate-600">~ {focus} minutes</div>
        </div>

        <div className="flex items-center gap-2">
          <input id="long" type="checkbox" className="rounded border-slate-300" checked={longSessions} onChange={(e) => setLongSessions(e.target.checked)} />
          <label htmlFor="long" className="text-sm text-slate-700">I enjoy longer, fewer sessions</label>
        </div>

        <button type="submit" className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition">
          Save preferences
        </button>
      </form>
    </div>
  );
};

export default LearningStyleForm;
