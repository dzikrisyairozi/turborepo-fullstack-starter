import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          🚀 Monorepo Full-Stack Starter
        </h1>
        <p className="text-lg text-muted-foreground">
          A modern, production-ready monorepo with{' '}
          <strong className="text-foreground">Next.js</strong>,{' '}
          <strong className="text-foreground">Rust API</strong>, and{' '}
          <strong className="text-foreground">shadcn/ui</strong> — everything
          you need to ship fast.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/docs"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Read the Docs
          </Link>
          <a
            href="https://github.com/dzikrisyairozi/monorepo-fullstack-starter"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            GitHub →
          </a>
        </div>
      </div>
    </main>
  );
}
