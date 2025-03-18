'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectHandler({
  shouldRedirect,
}: {
  shouldRedirect: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (shouldRedirect) {
      router.replace('/setup-organization');
    }
  }, [shouldRedirect, router]);

  return null;
}
