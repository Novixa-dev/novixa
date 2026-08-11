import { GoogleGenAI } from '@google/genai';
import { getServerEnv } from '../env';

if (typeof window !== 'undefined') {
  throw new Error('SECURITY VIOLATION: gemini.ts imported in browser bundle.');
}

export async function generateGeminiGreeting(customPrompt?: string) {
  const env = getServerEnv();

  if (!env.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not configured in server environment.');
  }

  const ai = new GoogleGenAI({
    apiKey: env.geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const prompt = customPrompt || 'Say hello from Novixa in one short sentence.';

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
  });

  const text = response.text || 'No response text generated.';

  return {
    text: text.trim(),
    model: 'gemini-3.6-flash',
    timestamp: new Date().toISOString(),
  };
}
