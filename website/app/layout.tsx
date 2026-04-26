import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Cursor } from '@/components/Cursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'HimanM - DevOps Engineer',
  description: 'DevOps Engineer and AI Practitioner based in Colombo, Sri Lanka.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-inter bg-bg text-fg min-h-screen transition-colors duration-[400ms] antialiased overflow-x-hidden`} suppressHydrationWarning>
        <Providers>
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
