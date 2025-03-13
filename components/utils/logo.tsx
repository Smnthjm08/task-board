import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const headingFont = localFont({ src: '../../public/fonts/font.woff2' });

const Logo = () => {
  return (
    <Link href={'/'}>
      {/* <div className='items-center gap-x-2 transition hover:opacity-75 md:flex'> */}
      <div className='hidden items-center gap-x-2 transition hover:opacity-75 md:flex'>
        <Image src='/logo.svg' alt='logo' height={30} width={30} />
        <p
          className={cn('pb-1 text-lg', headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
