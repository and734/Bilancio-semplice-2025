import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardDescription as it's not used per design

interface KeyMetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string; // Kept description prop for flexibility, though not rendered in current main card design
}

const KeyMetricCard: React.FC<KeyMetricCardProps> = ({ title, value, icon, description }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        {icon && <div className="h-5 w-5 text-accent">{icon}</div>}
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default KeyMetricCard;
