import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const format = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

const StudySessionTimer = ({ defaultMinutes = 50 }) => {
  const [seconds, setSeconds] = useState(defaultMinutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => Math.max(0, s - 1));
      }, 1000);
    }
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds === 0 && running) {
      setRunning(false);
      // simple sound alert using Web Audio
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 880;
        o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0.001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        o.start();
        setTimeout(() => { g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); o.stop(ctx.currentTime + 0.35); }, 300);
      } catch {}
    }
  }, [seconds, running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setSeconds(defaultMinutes * 60); };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Focus timer</h2>
      </div>

      <div className="text-5xl font-mono text-center mb-4 tracking-tight">{format(seconds)}</div>

      <div className="flex items-center justify-center gap-3">
        {!running ? (
          <button onClick={start} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700">
            <Play className="w-4 h-4" /> Start
          </button>
        ) : (
          <button onClick={pause} className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white font-medium hover:bg-slate-900">
            <Pause className="w-4 h-4" /> Pause
          </button>
        )}
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-slate-700 font-medium hover:bg-slate-200">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      <p className="text-xs text-center text-slate-500 mt-3">Tip: Pair with noise-cancelling music and do one task at a time.</p>
    </div>
  );
};

export default StudySessionTimer;
