'use client';

import { Button } from '@repo/ui/button';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/providers/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-6 w-6"
      >
        <motion.div
          initial={false}
          animate={theme === 'light' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="h-6 w-6" />
        </motion.div>
        <motion.div
          initial={false}
          animate={theme === 'dark' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="h-6 w-6" />
        </motion.div>
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
