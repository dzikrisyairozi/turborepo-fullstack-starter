/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Monorepo Fullstack Starter — Hero Component
 *
 * @author  Dzikri Syairozi <dzikrisyairozi@gmail.com>
 * @see     https://github.com/dzikrisyairozi/monorepo-fullstack-starter
 * @license MIT
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@repo/ui/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Scene from '@/components/scene';
import { useTranslation } from '@repo/i18n';
import { WebLanguageSwitcher } from '@/i18n/client';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function Hero() {
  const { t } = useTranslation('web');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene />

      {/* Language Switcher — fixed top-right */}
      <div className="absolute top-6 right-6 z-20">
        <WebLanguageSwitcher />
      </div>

      <div className="container px-4 md:px-6 z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center space-y-8 text-center"
        >
          <motion.div variants={item} className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
              {t('hero.title')}
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="rounded-full h-12 px-8 bg-white text-black hover:bg-zinc-200"
            >
              <Link
                href="https://github.com/dzikrisyairozi/monorepo-fullstack-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                {t('hero.getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-8 border-white/20 hover:bg-white/10 flex items-center justify-center"
            >
              <Link
                href="https://docs-starter.dzikrisyairozi.com/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('hero.viewDocs')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Footer Trace */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center z-10"
      >
        <p className="text-xs text-zinc-500 font-medium tracking-widest uppercase">
          {t('footer.craftedBy')}{' '}
          <a
            href="https://github.com/dzikrisyairozi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Dzikri Syairozi
          </a>
        </p>
      </motion.div>
    </section>
  );
}
