import Link from 'next/link';

const content = {
  en: {
    title: '🚀 Monorepo Full-Stack Starter',
    subtitle: 'A modern, production-ready monorepo with',
    nextjs: 'Next.js',
    rustApi: 'Rust API',
    shadcn: 'shadcn/ui',
    everythingYouNeed: '— everything you need to ship fast.',
    readDocs: 'Read the Docs',
    github: 'GitHub →',
  },
  id: {
    title: '🚀 Monorepo Full-Stack Starter',
    subtitle: 'Monorepo modern siap produksi dengan',
    nextjs: 'Next.js',
    rustApi: 'Rust API',
    shadcn: 'shadcn/ui',
    everythingYouNeed: '— semua yang Anda butuhkan untuk rilis cepat.',
    readDocs: 'Baca Dokumentasi',
    github: 'GitHub →',
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = content[lang as keyof typeof content] || content.en;

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t.subtitle} <strong className="text-foreground">{t.nextjs}</strong>,{' '}
          <strong className="text-foreground">{t.rustApi}</strong>, dan{' '}
          <strong className="text-foreground">{t.shadcn}</strong>{' '}
          {t.everythingYouNeed}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/docs"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {t.readDocs}
          </Link>
          <a
            href="https://github.com/dzikrisyairozi/monorepo-fullstack-starter"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t.github}
          </a>
        </div>
      </div>
    </main>
  );
}
