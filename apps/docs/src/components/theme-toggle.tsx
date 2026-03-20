'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Theme"
      data-theme-toggle=""
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
