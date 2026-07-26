import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function PracticeTimer({ durationSeconds = 300, label = 'Practice' }) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const audioCtxRef = useRef(null);

  // Created lazily on the Start click (a user gesture) so browser autoplay
  // policies don't block it when the chime plays later, unattended.
  const playChime = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 528;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 1.5);
    } catch {
      // Audio unavailable — the visual "time's up" state still shows.
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return undefined;
    const id = setInterval(() => {
      setRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (remaining === 0 && isRunning) {
      setIsRunning(false);
      setIsComplete(true);
      playChime();
    }
  }, [remaining, isRunning, playChime]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setIsComplete(false);
    setRemaining(durationSeconds);
  }

  const untouched = remaining === durationSeconds && !isRunning && !isComplete;

  return (
    <div className={styles.wrapper} role="timer" aria-label={`${label} timer`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.time} aria-live="polite">
        {formatTime(remaining)}
      </div>

      {isComplete && (
        <p className={styles.completeMessage}>Time's up. Take a moment before moving on.</p>
      )}

      <div className={styles.controls}>
        {isRunning ? (
          <button className={styles.pauseBtn} onClick={handlePause} aria-label="Pause timer">
            Pause
          </button>
        ) : (
          <button
            className={styles.startBtn}
            onClick={handleStart}
            disabled={isComplete}
            aria-label={untouched ? 'Start timer' : 'Resume timer'}
          >
            {untouched ? 'Start' : 'Resume'}
          </button>
        )}
        <button
          className={styles.resetBtn}
          onClick={handleReset}
          disabled={untouched}
          aria-label="Reset timer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
