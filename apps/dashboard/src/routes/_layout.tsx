import { Outlet, createFileRoute, Link } from '@tanstack/react-router';
import { Home, Layers, Settings, Box } from 'lucide-react';

export const Route = createFileRoute('/_layout')({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white/70 dark:bg-black/70 backdrop-blur-xl border-r border-border shadow-sm transition-all z-20">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-md">
            <Box className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
            Acme Inc
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Overview
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground transition-all font-medium text-sm"
            activeProps={{
              className:
                'bg-white dark:bg-neutral-900 shadow-sm border border-border text-foreground',
            }}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3 px-2">
            Components
          </div>
          <Link
            to="/sandbox"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground transition-all font-medium text-sm"
            activeProps={{
              className:
                'bg-white dark:bg-neutral-900 shadow-sm border border-border text-foreground',
            }}
          >
            <Layers className="h-4 w-4" />
            UI Sandbox
          </Link>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3 px-2">
            Account
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground transition-all font-medium text-sm opacity-50 cursor-not-allowed pointer-events-none"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100/50 dark:from-neutral-950 dark:to-neutral-900/50">
        {/* Header */}
        <header className="h-16 flex justify-end items-center px-8 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-border sticky top-0 z-10 text-foreground">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-inner ring-2 ring-background border border-border cursor-pointer hover:opacity-90 transition-opacity"></div>
          </div>
        </header>

        {/* Scrollable area */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 relative pb-20">
          {/* Subtle background glow effect for extreme modern UI feel */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -ml-20 -mb-20" />

          <div className="max-w-7xl mx-auto relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
