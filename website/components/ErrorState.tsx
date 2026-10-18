'use client';

import Link from 'next/link';

export function ErrorState({ reset }: { reset: () => void }) {
  return (
    <main className="error-state min-h-screen flex flex-col items-center justify-center bg-bg text-fg px-6 text-center">
      <p className="text-[11px] tracking-[0.18em] uppercase text-muted mb-3 font-mono">Something went wrong</p>
      <h1 className="font-syne text-[clamp(40px,8vw,80px)] font-extrabold tracking-[-0.04em] leading-none mb-6">A brief outage</h1>
      <p className="text-muted text-[15px] max-w-[420px] font-light mb-8">This page could not load. Try again, or return to the portfolio.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={reset} className="border border-border rounded-full py-2.5 px-6 text-muted text-xs tracking-widest uppercase hover:bg-fg hover:text-bg hover:border-fg transition-colors">Try again</button>
        <Link href="/" className="border border-border rounded-full py-2.5 px-6 text-muted text-xs tracking-widest uppercase hover:bg-fg hover:text-bg hover:border-fg transition-colors">Back to home</Link>
      </div>
    </main>
  );
}
