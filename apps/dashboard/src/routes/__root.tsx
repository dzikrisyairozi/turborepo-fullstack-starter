import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col antialiased">
      <Outlet />
    </div>
  ),
});
