import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-fg px-6 text-center">
      <p className="text-[11px] tracking-[0.18em] uppercase text-muted mb-3 font-mono">
        404 · Page Not Found
      </p>
      <h1 className="font-syne text-[clamp(48px,8vw,96px)] font-extrabold tracking-[-0.04em] leading-none mb-6">
        Lost in Cloud
      </h1>
      <p className="text-muted text-[15px] max-w-[420px] font-light mb-8">
        The page you are looking for doesn&apos;t exist or has moved. Return to the portfolio to explore projects and credentials.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-transparent border border-border rounded-full py-2.5 px-6 text-muted font-inter text-xs tracking-widest uppercase hover:bg-fg hover:text-bg hover:border-fg transition-all duration-300"
        data-cursor
      >
        ← Back to Home
      </Link>
    </div>
  );
}
