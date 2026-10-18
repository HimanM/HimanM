'use client';

import './globals.css';
import { ErrorState } from '@/components/ErrorState';

export default function GlobalError({ reset }: { reset: () => void }) {
  return <html lang="en" data-theme="dark"><body><ErrorState reset={reset} /></body></html>;
}
