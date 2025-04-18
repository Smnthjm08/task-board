'use client';

import React from 'react';
import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createOrganization } from '@/actions/organization/create-organization';

export default function SetupOrganization() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);

    // Generate slug from organization name
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setSlug(generatedSlug);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow lowercase letters, numbers, and hyphens
    const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlug(newSlug);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createOrganization({
        name,
        slug,
        logo: logo || undefined,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // window.location.href = `/organizations/${slug}`;
        window.location.href = `/`;
      }
    } catch (err) {
      setError('Failed to create organization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className='mx-auto w-[400px] max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl'>Organization Setup</CardTitle>
        <CardDescription>
          Set up your organization profile and workspace
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label>Organization Logo</Label>
            <div className='flex flex-col items-center justify-center'>
              {logo ? (
                <div className='relative mb-2 h-24 w-24'>
                  <Image
                    src={logo || '/placeholder.svg'}
                    alt='Organization logo'
                    fill
                    className='rounded-md object-cover'
                  />
                  <Button
                    type='button'
                    variant='destructive'
                    size='icon'
                    className='absolute -right-2 -top-2 h-6 w-6 rounded-full'
                    onClick={removeLogo}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ) : (
                <div
                  className='mb-2 flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border-2 border-dashed'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className='h-8 w-8 text-muted-foreground' />
                </div>
              )}
              <Input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleLogoUpload}
              />
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => fileInputRef.current?.click()}
              >
                {logo ? 'Change Logo' : 'Upload Logo'}
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='org-name'>Organization Name</Label>
            <Input
              id='org-name'
              placeholder='Acme Inc.'
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='org-slug'>Organization Slug</Label>
            <Input
              id='org-slug'
              placeholder='acme'
              value={slug}
              onChange={handleSlugChange}
              required
            />
            {slug && (
              <p className='mt-1 text-sm text-muted-foreground'>
                Your organization URL:{' '}
                <span className='font-medium'>apporigin/{slug}</span>
              </p>
            )}
          </div>

          {error && (
            <p className='text-sm font-medium text-destructive'>{error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Organization'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
