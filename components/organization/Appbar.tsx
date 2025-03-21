import { Plus } from 'lucide-react';
import Logo from '../utils/logo';
import { Button } from '../../components/ui/button';
import { ThemeToggle } from '../global/theme-toogle';
import React from 'react';

export const AppBar = () => {
  return (
    <nav className='fixed top-0 z-50 flex h-14 w-full items-center border-b px-6 shadow-sm'>
      {/* <MobileSidebar /> */}
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <Button
          size='sm'
          className='hidden h-auto rounded-sm px-2 py-1.5 md:block'
        >
          Create
        </Button>
        <Button
          size='sm'
          variant={'outline'}
          className='block rounded-sm md:hidden'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='ml-auto flex items-center gap-x-2'>
        <ThemeToggle />
        <Button size={'sm'} variant={'outline'}>
          Profile
        </Button>
      </div>
    </nav>
  );
};
