'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const WORDS = ['Monorepo', 'Fullstack', 'Starter'];
const CYCLE_DURATION = 900;
const TOTAL_DURATION = 2700;

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Words cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < WORDS.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, []);

  // Counter & Progress Bar
  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: 'var(--bg)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Element 1: "Portfolio" Label */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm uppercase tracking-[0.3em]"
        style={{ color: 'var(--muted)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Portfolio
      </motion.div>

      {/* Element 2: Rotating Words */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic"
            style={{
              color: 'color-mix(in srgb, var(--text) 80%, transparent)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Element 3: Counter */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display tabular-nums"
        style={{ color: 'var(--text)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* Element 4: Progress Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--stroke) 50%, transparent)',
        }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            scaleX: progress / 100,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
