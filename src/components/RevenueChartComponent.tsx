"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

interface YearlyData {
  year: string;
  revenue: number;
  profit: number;
}

interface RevenueChartProps {
  data: YearlyData[];
}

const chartConfig = {
  revenue: {
    label: "Ricavi",
    color: "hsl(var(--primary))", // Use primary color
  },
  profit: {
    label: "Profitto",
    color: "hsl(var(--accent))", // Use accent color
  },
} satisfies ChartConfig;

const RevenueChartComponent: React.FC<RevenueChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center py-10">Dati non disponibili per il grafico.</p>;
  }
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full aspect-video">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 10, left: -10, bottom: 5 }}
          barGap={4}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `€${Number(value/1000).toLocaleString()}k`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent 
                        indicator="dot" 
                        className="bg-background shadow-lg border-border rounded-lg" 
                        formatter={(value, name) => [`€${Number(value).toLocaleString()}`, chartConfig[name as keyof typeof chartConfig]?.label]}
                        />}
          />
          <ChartLegend content={<ChartLegendContent wrapperStyle={{ paddingTop: '10px' }} />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} maxBarSize={40}/>
          <Bar dataKey="profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} maxBarSize={40}/>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RevenueChartComponent;
