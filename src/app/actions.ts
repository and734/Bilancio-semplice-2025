'use server';
import { getFinancialInsights, type FinancialInsightsInput, type FinancialInsightsOutput } from '@/ai/flows/financial-insights';

interface AiActionResult {
  success: boolean;
  insights?: string;
  error?: string;
}

export async function fetchAiInsightsAction(input: FinancialInsightsInput): Promise<AiActionResult> {
  try {
    // Add a small delay to simulate network latency for better UX on loading states
    // await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result: FinancialInsightsOutput = await getFinancialInsights(input);
    if (result && result.insights) {
      return { success: true, insights: result.insights };
    }
    // This case should ideally not be reached if the AI flow schema is enforced
    return { success: false, error: "Insights non generati correttamente." };
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    // Check if error is an instance of Error to safely access message
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Impossibile generare insights: ${errorMessage}` };
  }
}
