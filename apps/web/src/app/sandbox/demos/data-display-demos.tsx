'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import { Badge } from '@repo/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Invoice {
  invoice: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: string;
}

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
];

const invoices: Invoice[] = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    totalAmount: '$250.00',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    paymentMethod: 'PayPal',
    totalAmount: '$150.00',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Bank Transfer',
    totalAmount: '$350.00',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    totalAmount: '$450.00',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    paymentMethod: 'PayPal',
    totalAmount: '$550.00',
  },
];

export function DataDisplayDemos() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Avatar</h3>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/radix-ui.png"
              alt="@radix-ui"
            />
            <AvatarFallback>RU</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Badge</h3>
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Table</h3>
        <Table>
          <TableCaption>A list of recent invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Chart</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
