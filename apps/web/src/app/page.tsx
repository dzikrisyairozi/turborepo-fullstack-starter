'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 px-4 py-16 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Logo" width={128} height={128} />
            {/* <Zap className="h-12 w-12 text-primary" /> */}
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Next.js + shadcn/ui Starter Kit
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A beautiful, modern starter template with Next.js 15, Tailwind CSS,
            TypeScript, and shadcn/ui components.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/sandbox">
            <Button size="lg" className="h-11">
              Explore Components
            </Button>
          </Link>
          <Link
            href="https://github.com/shadcn/ui"
            target="_blank"
            rel="noopener"
          >
            <Button variant="outline" size="lg" className="h-11">
              View Documentation
            </Button>
          </Link>
          <div className="absolute right-4 top-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>40+ Components</CardTitle>
              <CardDescription>
                Pre-built components that you can copy and paste into your apps.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Style with Ease</CardTitle>
              <CardDescription>
                Beautifully designed components that you can customize with
                Tailwind CSS.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>TypeScript Ready</CardTitle>
              <CardDescription>
                Built with TypeScript. Full type safety and autocompletion
                support.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <footer className="absolute bottom-2 text-gray-700">
        © {new Date().getFullYear()} By{' '}
        <a href="https://dzikrisyairozi.com" className="underline">
          Dzikri Syairozi
        </a>
      </footer>
    </div>
  );
}
