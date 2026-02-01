import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  Users,
  CreditCard,
  Activity,
} from 'lucide-react';

export const Route = createFileRoute('/_layout/')({
  component: Index,
});

function Index() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-1">
          Welcome back, Admin
        </h2>
        <p className="text-muted-foreground">
          Here is the overview of your premium dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Total Revenue',
            value: '$45,231.89',
            desc: '+20.1% from last month',
            icon: CreditCard,
          },
          {
            title: 'Subscriptions',
            value: '+2350',
            desc: '+180.1% from last month',
            icon: Users,
          },
          {
            title: 'Sales',
            value: '+12,234',
            desc: '+19% from last month',
            icon: BarChart3,
          },
          {
            title: 'Active Now',
            value: '+573',
            desc: '+201 since last hour',
            icon: Activity,
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border-white/20 dark:border-white/5"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 hover:shadow-md transition-shadow bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Your revenue over the last 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-border/50 rounded-lg m-6 mt-0">
            [Chart Placeholder]
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 hover:shadow-md transition-shadow bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                    OM
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-center p-8">
        <Button
          onClick={() => (window.location.href = '/sandbox')}
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all h-12 px-8"
        >
          Check out the UI Sandbox
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
