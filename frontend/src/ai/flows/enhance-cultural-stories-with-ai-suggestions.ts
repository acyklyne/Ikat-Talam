'use server';
/**
 * @fileOverview An AI agent that suggests details to include in cultural stories to make them more engaging and informative.
 *
 * - enhanceCulturalStoriesWithAISuggestions - A function that enhances cultural stories with AI-suggested details.
 * - EnhanceCulturalStoriesWithAISuggestionsInput - The input type for the enhanceCulturalStoriesWithAISuggestions function.
 * - EnhanceCulturalStoriesWithAISuggestionsOutput - The return type for the enhanceCulturalStoriesWithAISuggestions function.
 */

import {ai} from '../../ai/genkit';
import {z} from 'genkit';

const EnhanceCulturalStoriesWithAISuggestionsInputSchema = z.object({
  storyDraft: z.string().describe('The draft of the cultural story.'),
  productDescription: z.string().describe('The description of the related product.'),
});
export type EnhanceCulturalStoriesWithAISuggestionsInput = z.infer<typeof EnhanceCulturalStoriesWithAISuggestionsInputSchema>;

const EnhanceCulturalStoriesWithAISuggestionsOutputSchema = z.object({
  enhancedStory: z.string().describe('The enhanced cultural story with AI-suggested details.'),
});
export type EnhanceCulturalStoriesWithAISuggestionsOutput = z.infer<typeof EnhanceCulturalStoriesWithAISuggestionsOutputSchema>;

export async function enhanceCulturalStoriesWithAISuggestions(input: EnhanceCulturalStoriesWithAISuggestionsInput): Promise<EnhanceCulturalStoriesWithAISuggestionsOutput> {
  return enhanceCulturalStoriesWithAISuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceCulturalStoriesWithAISuggestionsPrompt',
  input: {schema: EnhanceCulturalStoriesWithAISuggestionsInputSchema},
  output: {schema: EnhanceCulturalStoriesWithAISuggestionsOutputSchema},
  prompt: `You are an AI assistant helping to enhance cultural stories related to woven products.

  Given a draft of a cultural story and a description of the related product, suggest details from the weaver or the pattern's history to include in the story to make it more engaging and informative.

  Story Draft: {{{storyDraft}}}
  Product Description: {{{productDescription}}}

  Enhanced Story:`,
});

const enhanceCulturalStoriesWithAISuggestionsFlow = ai.defineFlow(
  {
    name: 'enhanceCulturalStoriesWithAISuggestionsFlow',
    inputSchema: EnhanceCulturalStoriesWithAISuggestionsInputSchema,
    outputSchema: EnhanceCulturalStoriesWithAISuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
