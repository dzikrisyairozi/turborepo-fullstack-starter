import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-bold text-primary">🚀 Turborepo Starter</span>
      ),
    },
    githubUrl: 'https://github.com/dzikrisyairozi/turborepo-fullstack-starter',
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
    ],
  };
}
