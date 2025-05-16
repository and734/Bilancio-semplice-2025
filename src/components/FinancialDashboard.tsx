import React from 'react';
import KeyMetricCard from './KeyMetricCard';
import RevenueChartComponent from './RevenueChartComponent';
import { DollarSign, TrendingUp, BarChartHorizontalBig, Percent, Activity, Layers3, FileText } from 'lucide-react'; // Adjusted icons
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface MockParsedData {
  totalAssets: number;
  totalLiabilities: number;
  equity: number;
  revenue: number;
  netIncome: number;
  profitMargin: number;
  debtToEquityRatio: number;
  currentRatio: number;
  yearlySummary: { year: string; revenue: number; profit: number }[];
}

interface FinancialDashboardProps {
  data: MockParsedData;
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-primary/20">
        <CardHeader className="bg-primary/5 rounded-t-lg p-4">
          <CardTitle className="text-lg font-semibold text-primary flex items-center">
            <Layers3 className="mr-2 h-5 w-5" /> Riepilogo Finanziario
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Metriche chiave e performance dell'azienda.</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <KeyMetricCard 
              title="Attività Totali" 
              value={`€ ${data.totalAssets.toLocaleString()}`} 
              icon={<DollarSign />} 
              description="Valore complessivo degli asset."
            />
            <KeyMetricCard 
              title="Passività Totali" 
              value={`€ ${data.totalLiabilities.toLocaleString()}`} 
              icon={<DollarSign />} 
              description="Valore complessivo delle passività."
            />
            <KeyMetricCard 
              title="Patrimonio Netto" 
              value={`€ ${data.equity.toLocaleString()}`} 
              icon={<Layers3 />} 
              description="Attività - Passività."
            />
            <KeyMetricCard 
              title="Ricavi" 
              value={`€ ${data.revenue.toLocaleString()}`} 
              icon={<TrendingUp />}
              description="Entrate totali generate."
            />
            <KeyMetricCard 
              title="Utile Netto" 
              value={`€ ${data.netIncome.toLocaleString()}`} 
              icon={<TrendingUp />}
              description="Profitto dopo le spese."
            />
            <KeyMetricCard 
              title="Margine di Profitto" 
              value={`${data.profitMargin.toLocaleString()}%`} 
              icon={<Percent />}
              description="(Utile Netto / Ricavi) × 100"
            />
             <KeyMetricCard 
              title="Debito/Patrimonio" 
              value={`${data.debtToEquityRatio.toLocaleString()}`} 
              icon={<BarChartHorizontalBig />}
              description="Indica la leva finanziaria."
            />
            <KeyMetricCard 
              title="Current Ratio" 
              value={`${data.currentRatio.toFixed(2)}`} 
              icon={<Activity />}
              description="Liquidità a breve termine."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-primary/20">
        <CardHeader className="bg-primary/5 rounded-t-lg p-4">
          <CardTitle className="text-lg font-semibold text-primary flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Andamento Annuale
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Visualizzazione dei ricavi e profitti per anno.</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <RevenueChartComponent data={data.yearlySummary} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDashboard;
