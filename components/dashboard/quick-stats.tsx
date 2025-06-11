"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Q&As',
    value: '1,247',
    change: '+12%',
    icon: BookOpen,
    color: 'text-blue-600'
  },
  {
    title: 'Daily Searches',
    value: '389',
    change: '+8%',
    icon: Search,
    color: 'text-green-600'
  },
  {
    title: 'Popular Topics',
    value: '89',
    change: '+3%',
    icon: TrendingUp,
    color: 'text-purple-600'
  },
  {
    title: 'Active Users',
    value: '156',
    change: '+15%',
    icon: Users,
    color: 'text-orange-600'
  }
];

export function QuickStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}