import localFont from 'next/font/local';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Medal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';

const headingFont = localFont({ src: '../../public/fonts/font.woff2' });

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default async function MainPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <div
          className={cn(
            'flex flex-col items-center justify-center',
            headingFont.className
          )}
        >
          <div className='mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm'>
            <Medal className='mr-2 h-6 w-6' />
            No 1 task management
          </div>
          <h1 className='mb-6 text-center text-3xl text-slate-300 md:text-6xl'>
            TaskBoard helps team move
          </h1>
          <div className='w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl'>
            work forward.
          </div>
        </div>
        <div
          className={cn(
            'mx-auto my-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
            textFont.className
          )}
        >
          Collabrate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is unique -
          accomplish it all with TaskBoard.
        </div>
        <Button>
          <Link href={'/auth/register'}>Get TaskBoard for free</Link>
        </Button>
      </div>
    );
  }
  if (session) {
    <div>
      <div>user: {JSON.stringify(session)}</div>
    </div>;
  }
}
