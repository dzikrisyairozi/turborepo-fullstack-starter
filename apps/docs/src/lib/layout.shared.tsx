import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-bold text-primary">
          🚀 Monorepo Fullstack Starter
        </span>
      ),
    },
    githubUrl: 'https://github.com/dzikrisyairozi/monorepo-fullstack-starter',
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
    ],
  };
}
