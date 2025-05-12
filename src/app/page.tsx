'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/1');
  }, [router]);

  return null; // Or a loading indicator, or some minimal content
}
