'use client';

import { Button } from '@repo/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';

import {
  DataDisplayDemos,
  FeedbackDemos,
  InputDemos,
  LayoutDemos,
  NavigationDemos,
  OverlayDemos,
} from './demos';

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="">
              <ThemeToggle />
            </div>
          </div>
          <h1 className="mt-4 text-4xl font-bold">Component Showcase</h1>
          <p className="mt-2 text-muted-foreground">
            Explore and interact with all available shadcn/ui components.
          </p>
        </div>

        <Tabs defaultValue="inputs" className="space-y-4">
          <TabsList className="flex h-auto flex-wrap gap-2">
            <TabsTrigger value="inputs">Form Inputs</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="data-display">Data Display</TabsTrigger>
            <TabsTrigger value="overlay">Overlay</TabsTrigger>
          </TabsList>

          <TabsContent value="inputs">
            <Card>
              <CardHeader>
                <CardTitle>Form Input Components</CardTitle>
                <CardDescription>
                  Interactive form elements for user input and data collection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InputDemos />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout">
            <Card>
              <CardHeader>
                <CardTitle>Layout Components</CardTitle>
                <CardDescription>
                  Components for structuring and organizing content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LayoutDemos />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Components</CardTitle>
                <CardDescription>
                  Components for user navigation and wayfinding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationDemos />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Components</CardTitle>
                <CardDescription>
                  Components for providing feedback and alerts to users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackDemos />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-display">
            <Card>
              <CardHeader>
                <CardTitle>Data Display Components</CardTitle>
                <CardDescription>
                  Components for displaying and visualizing data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataDisplayDemos />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overlay">
            <Card>
              <CardHeader>
                <CardTitle>Overlay Components</CardTitle>
                <CardDescription>
                  Components that overlay the main content area.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OverlayDemos />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
