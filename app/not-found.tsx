import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    // <main className="p-32 flex items-center justify-center min-h-screen">
    <main className='flex min-h-screen items-center justify-center p-28'>
      <div>
        {/* <span className="text-gray-300 font-semibold ">Page Not Found</span> */}
        <Button>
          <Link href={'/'}>Redirect to Home</Link>
        </Button>
      </div>
    </main>
  );
}
