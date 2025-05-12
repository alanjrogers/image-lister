'use client';

import {Images} from '@/components/ui/images';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main>
        <Images />
      </main>
      <footer>
        <p>Challenge Brief (v3.5)</p>

        <a
          href="https://linkedin.com/in/alanjrogers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/InBug-Black.png"
            alt="LinkedIn Logo"
            width={16}
            height={16}
          />
          Alan Rogers (LinkedIn) →
        </a>
      </footer>
    </div>
  );
}
