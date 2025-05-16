import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react'; // Using Sparkles for AI/Insights

interface AiInsightsDisplayProps {
  insights: string;
}

const AiInsightsDisplay: React.FC<AiInsightsDisplayProps> = ({ insights }) => {
  // Basic markdown-like paragraph splitting
  const paragraphs = insights.split(/\n\s*\n/) // Split by one or more empty lines
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return (
    <Card className="shadow-xl h-full flex flex-col border-accent/50">
      <CardHeader className="flex flex-row items-start space-x-3 bg-accent/5 rounded-t-lg p-4">
        <Sparkles className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
        <div>
          <CardTitle className="text-lg font-semibold text-accent">Insights AI</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Analisi e raccomandazioni personalizzate.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-2">
        <div className="space-y-3 text-sm text-foreground">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiInsightsDisplay;
