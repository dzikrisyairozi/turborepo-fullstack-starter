/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Monorepo Fullstack Starter — Dashboard Layout
 *
 * @author  Dzikri Syairozi <dzikrisyairozi@gmail.com>
 * @see     https://github.com/dzikrisyairozi/monorepo-fullstack-starter
 * @license MIT
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Outlet, createFileRoute, Link } from '@tanstack/react-router';
import { Home, Layers, Settings, Box, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../components/theme-toggle';
import { useTranslation } from '@repo/i18n';
import { LanguageSwitcher } from '@repo/i18n';
import { useAppStore } from '../stores/useAppStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/_layout')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { t } = useTranslation('dashboard');
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useAppStore();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  const navLinks = (
    <>
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
        {t('sidebar.overview')}
      </div>
      <Link
        to="/"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground transition-all font-medium text-sm"
        activeProps={{
          className:
            'bg-white dark:bg-neutral-900 shadow-sm border border-border text-foreground',
        }}
        onClick={() => setSidebarOpen(false)}
      >
        <Home className="h-4 w-4" />
        {t('sidebar.dashboard')}
      </Link>
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3 px-2">
        {t('sidebar.components')}
      </div>
      <Link
        to="/sandbox"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground transition-all font-medium text-sm"
        activeProps={{
          className:
            'bg-white dark:bg-neutral-900 shadow-sm border border-border text-foreground',
        }}
        onClick={() => setSidebarOpen(false)}
      >
        <Layers className="h-4 w-4" />
        {t('sidebar.uiSandbox')}
      </Link>
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3 px-2">
        {t('sidebar.account')}
      </div>
      <Link
        to="/"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground transition-all font-medium text-sm opacity-50 cursor-not-allowed pointer-events-none"
      >
        <Settings className="h-4 w-4" />
        {t('sidebar.settings')}
      </Link>
    </>
  );

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, shown on lg+ */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-white/70 dark:bg-black/70 backdrop-blur-xl border-r border-border shadow-sm transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-md">
            <Box className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
            {t('sidebar.title')}
          </span>
          {/* Close button — mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {navLinks}
        </nav>

        {/* Creator Attribution */}
        <div className="px-4 py-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed text-center">
            {t('footer.builtBy')}{' '}
            <a
              href="https://github.com/dzikrisyairozi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dzikri Syairozi
            </a>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100/50 dark:from-neutral-950 dark:to-neutral-900/50 min-w-0">
        {/* Header */}
        <header className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-8 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-border sticky top-0 z-10 text-foreground gap-2">
          {/* Hamburger — mobile only */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Spacer on desktop where hamburger isn't shown */}
          <div className="hidden lg:block" />

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-inner ring-2 ring-background border border-border cursor-pointer hover:opacity-90 transition-opacity"></div>
          </div>
        </header>

        {/* Scrollable area */}
        <div className="flex-1 overflow-auto p-3 sm:p-6 lg:p-8 relative pb-20">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none -mr-20 -mt-20 will-change-transform" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -ml-20 -mb-20 will-change-transform" />

          <div className="max-w-7xl mx-auto relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
