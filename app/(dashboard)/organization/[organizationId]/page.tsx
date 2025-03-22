// OrganizationPage.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import createBoard from '@/actions/board/create-board';
import { useContext, useTransition } from 'react';
import OrganizationContext from '@/context/org-context';
import { boardSchema } from '@/schemas/board.schema';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const BoardsList = dynamic(() => import('@/components/organization/board-list'), { ssr: true });

export default function OrganizationPage() {
  const [isPending, startTransition] = useTransition();
  const { organization } = useContext(OrganizationContext);
  
  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: '',
    },
  });

  async function onSubmits(values: z.infer<typeof boardSchema>) {
    if (!organization?.id) {
      console.error('No organization ID available');
      return;
    }
    
    startTransition(async () => {
      try {
        await createBoard({
          title: values.title,
          organizationId: organization.id,
        });
        
        // Reset form after successful submission
        form.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    });
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <div className='flex flex-col space-y-4'>
          <form onSubmit={form.handleSubmit(onSubmits)} className='space-y-8 max-w-[240px]'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Board title' {...field} />
                  </FormControl>
                  <FormDescription>
                    Create a new board for your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Board'}
            </Button>
          </form>
        </div>
      </Form>
      
      {/* Use Suspense to handle loading state */}
      {organization?.id && (
        <Suspense fallback={<div>Loading boards...</div>}>
          <BoardsList organizationId={organization.id} />
        </Suspense>
      )}
    </div>
  );
}