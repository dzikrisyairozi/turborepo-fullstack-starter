'use client';

import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/alert-dialog';
import { Button } from '@repo/ui/button';
import { Progress } from '@repo/ui/progress';
import { Skeleton } from '@repo/ui/skeleton';
import { useState } from 'react';

import { useToast } from '@repo/ui/hooks/use-toast';

export function FeedbackDemos() {
  const [progress, setProgress] = useState(13);
  const { toast } = useToast();

  return (
    <div className="grid gap-8">
      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Progress</h3>
        <Progress value={progress} className="w-[60%]" />
        <Button
          onClick={() => {
            setProgress((prev) => Math.min(100, prev + 10));
          }}
          className="w-fit"
        >
          Increment Progress
        </Button>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Skeleton</h3>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Toast</h3>
        <Button
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up',
              description: 'Friday, February 10, 2024 at 5:57 PM',
            });
          }}
        >
          Show Toast
        </Button>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Alert</h3>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Alert Dialog</h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
