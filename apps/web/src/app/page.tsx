'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from '@/components/hero';
import LoadingScreen from '@/components/loading-screen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
          width: '100%',
        }}
      >
        <Hero />
      </div>
    </main>
  );
}
