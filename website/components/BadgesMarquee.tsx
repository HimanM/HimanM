'use client';

import badgesData from '@/data/badges.json';

export function BadgesMarquee() {
  const badges = badgesData;

  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className="py-8 overflow-hidden whitespace-nowrap bg-bg border-y border-border flex marquee-wrap" aria-hidden="true" style={{ width: '100vw', contain: 'strict' }}>
      <div 
        className="flex min-w-max pr-16 md:pr-24 marquee-track"
        style={{ animationDuration: '240s' }}
      >
        {[...badges, ...badges, ...badges, ...badges].map((badge, i) => (
          <a key={i} href={badge.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center mr-16 md:mr-24">
            <img 
              src={badge.url} 
              alt={badge.name} 
              className="w-12 h-12 md:w-14 md:h-14 object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              title={badge.name}
              data-cursor
            />
          </a>
        ))}
      </div>
    </div>
  );
}

