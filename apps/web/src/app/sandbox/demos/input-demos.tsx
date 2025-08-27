'use client';

import { Calendar } from '@repo/ui/calendar';
import { Checkbox } from '@repo/ui/checkbox';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/select';
import { Slider } from '@repo/ui/slider';
import { Switch } from '@repo/ui/switch';
import { Textarea } from '@repo/ui/textarea';
import { Toggle } from '@repo/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@repo/ui/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';
import { useState } from 'react';

export function InputDemos() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="grid gap-8">
      <div className="grid gap-2">
        <Label>Text Input</Label>
        <Input placeholder="Enter text..." />
      </div>

      <div className="grid gap-2">
        <Label>Calendar</Label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          weekStartsOn={1} // Start week on Monday
        />
      </div>

      <div className="grid gap-2">
        <Label>Checkbox</Label>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Radio Group</Label>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-2">
        <Label>Select</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Slider</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="grid gap-2">
        <Label>Switch</Label>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Textarea</Label>
        <Textarea placeholder="Type your message here." />
      </div>

      <div className="grid gap-2">
        <Label>Toggle</Label>
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="grid gap-2">
        <Label>Toggle Group</Label>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
