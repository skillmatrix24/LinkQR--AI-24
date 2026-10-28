import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}
console.log('DEBUG: GEMINI_API_KEY exists: true, Length:', apiKey.length, 'Prefix:', apiKey.substring(0, 4));

/**
 * Genkit initialization with Google AI (Gemini).
 * Standardized to 'googleai/gemini-3.8-flash' as per validated API tests.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-3.8-flash',
});
