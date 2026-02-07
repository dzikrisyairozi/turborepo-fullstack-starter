"use client";

import { motion } from "framer-motion";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, Box, Layers, Zap } from "lucide-react";
import Scene from "@/components/scene";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene />
      
      <div className="container px-4 md:px-6 z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center space-y-8 text-center"
        >
          <motion.div variants={item} className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
              Build Faster with Turbo
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Premium starter kit powered by Next.js, Framer Motion, and Three.js. 
              Designed for performance, built for scale.
            </p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full h-12 px-8 bg-white text-black hover:bg-zinc-200">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 border-white/20 hover:bg-white/10">
              View Documentation
            </Button>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10 w-full max-w-4xl">
            <div className="flex flex-col items-center space-y-2 text-zinc-400">
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">Lightning Fast</h3>
              <p className="text-sm text-center">Powered by Turborepo</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-zinc-400">
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">UI Components</h3>
              <p className="text-sm text-center">Shared across apps</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-zinc-400 col-span-2 md:col-span-1">
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                <Box className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">3D Ready</h3>
              <p className="text-sm text-center">React Three Fiber built-in</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
