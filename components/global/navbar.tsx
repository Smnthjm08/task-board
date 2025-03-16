"use client"
import Link from 'next/link';
import Logo from '../utils/logo';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toogle';
import { auth } from '@/auth';
import UserAvatar from './user-avatar';
import { useUserSession } from '@/hooks/use-user-session';

export const NavBar = () => {
const user = true

  return (
    <div className='fixed top-0 flex h-14 w-full items-center border-b px-8 shadow-sm'>
      <div className='mx-auto flex w-full items-center justify-between md:max-w-screen-2xl'>
        <Logo />

        {!user ? (
          <div className='flex items-center justify-center gap-4'>
            <ThemeToggle />
            <Button size={'sm'} variant={'outline'} asChild>
              <Link href={'/auth/login'}>Login</Link>
            </Button>
            <Button size={'sm'} asChild>
              <Link href={'/auth/login'}>Get Taskify for Free</Link>
            </Button>
          </div>
        ) : (
          <section>
            <UserAvatar />{' '}
          </section>
        )}
      </div>
    </div>
  );
};
