'use server';
/**
 * @fileOverview An AI agent that provides design and pattern recommendations for woven products.
 *
 * - getDesignRecommendations - A function that provides design recommendations based on user input.
 * - GetDesignRecommendationsInput - The input type for the getDesignRecommendations function.
 * - GetDesignRecommendationsOutput - The return type for the getDesignRecommendations function.
 */

import {ai} from '../../ai/genkit';
import {z} from 'genkit';

const GetDesignRecommendationsInputSchema = z.object({
  productType: z.string().describe('The type of woven product (e.g., blanket, scarf, bag).'),
  desiredFeeling: z.string().describe('The desired feeling or mood for the design (e.g., modern, traditional, vibrant, calming).'),
  colorPreferences: z.string().describe('User\'s color preferences.'),
});
export type GetDesignRecommendationsInput = z.infer<typeof GetDesignRecommendationsInputSchema>;

const GetDesignRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.object({
    patternName: z.string().describe('The name of the recommended pattern.'),
    description: z.string().describe('A description of the pattern and why it fits the user\'s request.'),
    culturalOrigin: z.string().describe('The cultural origin of the pattern.'),
  })).describe('A list of design recommendations.'),
});
export type GetDesignRecommendationsOutput = z.infer<typeof GetDesignRecommendationsOutputSchema>;

export async function getDesignRecommendations(input: GetDesignRecommendationsInput): Promise<GetDesignRecommendationsOutput> {
  return getDesignRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getDesignRecommendationsPrompt',
  input: {schema: GetDesignRecommendationsInputSchema},
  output: {schema: GetDesignRecommendationsOutputSchema},
  prompt: `You are an expert in Cordillera weaving traditions and modern design. Provide 3 pattern recommendations for a woven product based on the user's request.

For each recommendation, provide a pattern name, a description of why it fits the request, and its cultural origin.

Product Type: {{{productType}}}
Desired Feeling/Mood: {{{desiredFeeling}}}
Color Preferences: {{{colorPreferences}}}
`,
});

const getDesignRecommendationsFlow = ai.defineFlow(
  {
    name: 'getDesignRecommendationsFlow',
    inputSchema: GetDesignRecommendationsInputSchema,
    outputSchema: GetDesignRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


