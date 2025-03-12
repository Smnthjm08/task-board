import Link from 'next/link';
import Logo from '../utils/logo';
import { Button } from '../ui/button';
// import { ThemeToggle } from "./theme-toogle";

export const NavBar = () => {
  return (
    <div className='fixed top-0 flex h-14 w-full items-center border-b bg-white px-8 shadow-sm'>
      <div className='mx-auto flex w-full items-center justify-between md:max-w-screen-2xl'>
        <Logo />

        <div className='flex w-full items-center justify-between space-x-4 md:block md:w-auto'>
          {/* <ThemeToggle /> */}
          <Button size={'sm'} variant={'outline'} asChild>
            <Link href={'/auth/login'}>Login</Link>
          </Button>
          <Button size={'sm'} asChild>
            <Link href={'/auth/login'}>Get Taskify for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
