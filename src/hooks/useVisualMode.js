import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // track history

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => (replace ? [...prev.slice(0,prev.length - 1), newMode] : [...prev, newMode]));
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return { mode: history[history.length - 1], transition, back };
}


