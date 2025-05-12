import type {Metadata} from 'next';
import './globals.css';
import {Provider} from '@/components/ui/provider';
import {ApolloWrapper} from './ApolloWrapper';

export const metadata: Metadata = {
  title: 'Image Lister - Alan Rogers',
  description: 'Web Team Challenge Brief (v3.5) - Image Lister',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <ApolloWrapper>
          <Provider forcedTheme="dark">{children}</Provider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
