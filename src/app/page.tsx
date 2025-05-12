'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Always Redirect to page 1
  useEffect(() => {
    router.replace('/1');
  }, [router]);

  return null;
}
