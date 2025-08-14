'use client';

import { AspectRatio } from '@repo/ui/aspect-ratio';
import { Button } from '@repo/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/collapsible';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@repo/ui/resizable';
import { ScrollArea } from '@repo/ui/scroll-area';
import { Separator } from '@repo/ui/separator';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export function LayoutDemos() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid gap-8">
      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Resizable Panels</h3>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel 1</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel 2</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Separator</h3>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Radix UI</h4>
          <p className="text-sm text-muted-foreground">
            An open-source UI component library.
          </p>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Aspect Ratio</h3>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <div className="flex h-full items-center justify-center">
            16:9 Aspect Ratio
          </div>
        </AspectRatio>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Scroll Area</h3>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="text-sm">
                Scrollable content item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Card</h3>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Collapsible</h3>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">Collapsible Content</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              Content that can be collapsed
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
