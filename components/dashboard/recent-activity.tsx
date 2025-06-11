"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, MessageSquare, ThumbsUp, Upload } from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'question',
    user: 'Alex Chen',
    action: 'asked a question about',
    topic: 'React Hooks optimization',
    time: '2 hours ago',
    icon: MessageSquare
  },
  {
    id: '2',
    type: 'answer',
    user: 'Sarah Kim',
    action: 'answered',
    topic: 'TypeScript generics',
    time: '4 hours ago',
    icon: ThumbsUp
  },
  {
    id: '3',
    type: 'upload',
    user: 'Admin',
    action: 'uploaded new Q&A about',
    topic: 'Next.js 14 features',
    time: '6 hours ago',
    icon: Upload
  },
  {
    id: '4',
    type: 'question',
    user: 'Mike Johnson',
    action: 'asked about',
    topic: 'Database optimization',
    time: '8 hours ago',
    icon: MessageSquare
  }
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium">{activity.topic}</span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}