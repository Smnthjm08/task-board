'use client';
import Link from 'next/link';
import Logo from '../utils/logo';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toogle';
import UserAvatar from './user-avatar';
import { useSession } from 'next-auth/react';

export const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div className='fixed top-0 flex h-14 w-full items-center border-b px-8 shadow-sm'>
      <div className='mx-auto flex w-full items-center justify-between md:max-w-screen-2xl'>
        <Logo />

        {!session ? (
          <div className='flex items-center justify-center gap-4'>
            <ThemeToggle />
            <Button size={'sm'} variant={'outline'} asChild>
              <Link href={'/auth/login'}>Login</Link>
            </Button>
            <Button size={'sm'} asChild>
              <Link href={'/auth/register'}>Get Taskify for Free</Link>
            </Button>
          </div>
        ) : (
          <section className='flex items-center justify-center gap-4'>
            <ThemeToggle />
            <UserAvatar />{' '}
          </section>
        )}
      </div>
    </div>
  );
};
