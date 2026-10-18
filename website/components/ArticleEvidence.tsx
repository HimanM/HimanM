import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  source: string;
};

export function ArticleEvidence({ src, alt, width, height, caption, source }: Props) {
  return (
    <figure>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${alt}`}>
        <Image src={src} alt={alt} width={width} height={height} loading="lazy" />
      </a>
      <figcaption>{caption} <a href={source} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">Repository source ↗</a></figcaption>
    </figure>
  );
}
