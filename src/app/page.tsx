"use client";

import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import FileUploadForm from '@/components/FileUploadForm';
import FinancialDashboard from '@/components/FinancialDashboard';
import AiInsightsDisplay from '@/components/AiInsightsDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RotateCcw } from 'lucide-react';
import { fetchAiInsightsAction } from './actions';

// Types
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

interface AnalyzedFinancialData {
  fileName: string;
  parsedData?: MockParsedData;
  aiInsights?: string;
}

export default function HomePage() {
  const [analyzedData, setAnalyzedData] = useState<AnalyzedFinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalyzedData(null);

    try {
      const fileContent = await file.text();

      const aiResult = await fetchAiInsightsAction({ balanceSheetData: fileContent });

      if (!aiResult.success || !aiResult.insights) {
        throw new Error(aiResult.error || 'Impossibile ottenere gli insights AI.');
      }

      // Mock data parsing based on file content length or random values for demo
      const baseValue = Math.max(100000, fileContent.length * 10); // Make values somewhat related to file size for variety
      const mockData: MockParsedData = {
        totalAssets: Math.floor(Math.random() * baseValue * 2) + baseValue,
        totalLiabilities: Math.floor(Math.random() * baseValue) + baseValue / 2,
        equity: 0,
        revenue: Math.floor(Math.random() * baseValue * 3) + baseValue * 1.5,
        netIncome: Math.floor(Math.random() * (baseValue / 2)) + (baseValue / 10),
        profitMargin: 0,
        debtToEquityRatio: 0,
        currentRatio: parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)), // e.g. 0.5 to 2.0
        yearlySummary: [
          { year: '2021', revenue: Math.floor(Math.random()*baseValue/2)+baseValue, profit: Math.floor(Math.random()*baseValue/5)+baseValue/10 },
          { year: '2022', revenue: Math.floor(Math.random()*baseValue/2)+baseValue*1.2, profit: Math.floor(Math.random()*baseValue/5)+baseValue/8 },
          { year: '2023', revenue: Math.floor(Math.random()*baseValue/2)+baseValue*1.5, profit: Math.floor(Math.random()*baseValue/5)+baseValue/6 },
        ],
      };
      mockData.equity = mockData.totalAssets - mockData.totalLiabilities;
      mockData.profitMargin = mockData.revenue > 0 ? parseFloat(((mockData.netIncome / mockData.revenue) * 100).toFixed(2)) : 0;
      mockData.debtToEquityRatio = mockData.equity !== 0 ? parseFloat((mockData.totalLiabilities / mockData.equity).toFixed(2)) : Infinity;
      
      // Ensure equity is not negative for this mock data, adjust if needed
      if (mockData.equity < 0) {
        mockData.equity = 0;
        mockData.debtToEquityRatio = Infinity; // Or handle as per financial conventions
      }


      setAnalyzedData({
        fileName: file.name,
        aiInsights: aiResult.insights,
        parsedData: mockData,
      });

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Si è verificato un errore sconosciuto durante l\'analisi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalyzedData(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        {!analyzedData && !isLoading && (
          <Card className="shadow-2xl rounded-xl overflow-hidden border-primary/30">
            <CardHeader className="bg-primary/5 p-6">
              <CardTitle className="text-2xl md:text-3xl font-semibold text-primary">
                Analisi di Bilancio Semplice
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-1">
                Carica il tuo bilancio (PDF, XLS, XLSX, o XML) per ottenere un'analisi finanziaria dettagliata e insights basati sull'Intelligenza Artificiale.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <FileUploadForm onSubmit={handleFileUpload} disabled={isLoading} />
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center p-10 rounded-xl shadow-2xl bg-card h-64">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
            <p className="text-2xl font-medium text-foreground">Analisi in corso...</p>
            <p className="text-muted-foreground mt-2">Attendere prego, stiamo elaborando i dati del bilancio.</p>
          </div>
        )}

        {error && !isLoading && (
          <Card className="shadow-2xl rounded-xl border-destructive/50">
            <CardHeader className="bg-destructive/10 p-6">
              <CardTitle className="text-2xl text-destructive">Errore nell'Analisi</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-destructive-foreground bg-destructive p-4 rounded-md mb-6 text-center">{error}</p>
              <Button onClick={handleReset} variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                <RotateCcw className="mr-2 h-4 w-4" />
                Riprova con un altro file
              </Button>
            </CardContent>
          </Card>
        )}

        {analyzedData && !isLoading && !error && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 bg-card rounded-lg shadow-md border border-border">
              <h2 className="text-xl font-semibold text-primary truncate" title={analyzedData.fileName}>
                Risultati per: <span className="font-normal text-foreground">{analyzedData.fileName}</span>
              </h2>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
                <RotateCcw className="mr-2 h-4 w-4" />
                Analizza Nuovo File
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-6">
                {analyzedData.parsedData && <FinancialDashboard data={analyzedData.parsedData} />}
              </div>
              <div className="lg:col-span-1">
                {analyzedData.aiInsights && <AiInsightsDisplay insights={analyzedData.aiInsights} />}
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="text-center p-6 text-sm text-muted-foreground border-t border-border mt-auto">
        Bilancio Analyzer &copy; {new Date().getFullYear()} - Realizzato con Next.js e ShadCN UI.
      </footer>
    </div>
  );
}
