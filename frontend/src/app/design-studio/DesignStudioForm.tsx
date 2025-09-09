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
  FormDescription,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { getDesignRecommendations, GetDesignRecommendationsInput, GetDesignRecommendationsOutput } from '../../ai/flows/get-design-recommendations';
import { Wand2, Brush } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';

const formSchema = z.object({
  productType: z.string().min(3, { message: 'Product type must be at least 3 characters.' }),
  desiredFeeling: z.string().min(3, { message: 'Desired feeling must be at least 3 characters.' }),
  colorPreferences: z.string().min(3, { message: 'Color preferences must be at least 3 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function DesignStudioForm() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<GetDesignRecommendationsOutput['recommendations']>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: 'Wall hanging',
      desiredFeeling: 'Modern and calming',
      colorPreferences: 'Earthy tones, like terracotta and beige',
    },
  });

  async function onSubmit(data: GetDesignRecommendationsInput) {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await getDesignRecommendations(data);
      setRecommendations(result.recommendations);
      toast({
        title: 'Recommendations Ready!',
        description: 'The AI has generated some design ideas for you.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'An Error Occurred',
        description: 'Could not get recommendations. Please try again.',
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
            <Brush className="text-primary" />
            AI Design Studio
          </CardTitle>
          <CardDescription>
            Describe your ideal woven product, and our AI will suggest patterns and designs from Cordillera traditions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., blanket, scarf, bag" {...field} />
                    </FormControl>
                    <FormDescription>What kind of product do you have in mind?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredFeeling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Feeling / Mood</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., modern, traditional, vibrant" {...field} />
                    </FormControl>
                     <FormDescription>What kind of vibe are you going for?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Preferences</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., earthy tones, bright colors" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormDescription>Describe the colors you'd like to see.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Get Recommendations'}
                <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle className="font-headline text-2xl">Design Recommendations</CardTitle>
            <CardDescription>AI-generated suggestions will appear below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
             <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2 border-b pb-4 last:border-b-0">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
             </div>
          ) : (
            recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                    <div key={index} className="prose prose-sm max-w-none text-foreground border-b pb-4 last:border-b-0 last:pb-0">
                        <h4 className="font-headline font-semibold text-lg">{rec.patternName}</h4>
                        <p>{rec.description}</p>
                        <p className="text-xs text-muted-foreground"><strong>Cultural Origin:</strong> {rec.culturalOrigin}</p>
                    </div>
                ))
            ) : <p className="text-muted-foreground">Waiting for input...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
