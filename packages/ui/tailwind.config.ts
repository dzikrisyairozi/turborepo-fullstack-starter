import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config/tailwind.config';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  darkMode: ['class'],
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  presets: [sharedConfig],
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};

export default config;
