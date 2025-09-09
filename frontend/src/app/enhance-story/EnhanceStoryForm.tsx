'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '../../components/ui/form';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../components/ui/card';
import { enhanceCulturalStoriesWithAISuggestions, EnhanceCulturalStoriesWithAISuggestionsInput } from '../../ai/flows/enhance-cultural-stories-with-ai-suggestions';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';

const formSchema = z.object({
  storyDraft: z.string().min(20, { message: 'Story draft must be at least 20 characters.' }),
  productDescription: z.string().min(10, { message: 'Product description must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function EnhanceStoryForm() {
  const { toast } = useToast();
  const [enhancedStory, setEnhancedStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyDraft: "Lola Anya is a weaver. She makes blankets. The patterns are from her ancestors. It's a family tradition.",
      productDescription: "Kalinga Woven Blanket. Handwoven by Kalinga master weavers, perfect for a cozy home. Made from 100% locally sourced cotton, it is both soft and durable.",
    },
  });

  async function onSubmit(data: EnhanceCulturalStoriesWithAISuggestionsInput) {
    setIsLoading(true);
    setEnhancedStory('');
    try {
      const result = await enhanceCulturalStoriesWithAISuggestions(data);
      setEnhancedStory(result.enhancedStory);
      toast({
        title: 'Story Enhanced!',
        description: "The AI has added more detail to your story.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'An Error Occurred',
        description: "Could not enhance the story. Please try again.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <Wand2 className="text-primary" />
            AI Story Enhancer
          </CardTitle>
          <CardDescription>
            Input a story draft and product details to enrich your narrative with cultural and historical context.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="storyDraft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Story Draft</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short story about a weaver or a tradition..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief narrative to start with.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related Product Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description of the woven product..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormDescription>
                      Describe the product linked to the story.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Enhancing...' : 'Enhance Story'}
                <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle className="font-headline text-2xl">Enhanced Story</CardTitle>
            <CardDescription>The AI-generated story will appear below.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-foreground">
          {isLoading ? (
             <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-3/4" />
             </div>
          ) : (
            enhancedStory ? <p>{enhancedStory}</p> : <p className="text-muted-foreground">Waiting for input...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
