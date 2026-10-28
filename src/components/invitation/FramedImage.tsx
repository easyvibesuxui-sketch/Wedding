'use client';

import Image from 'next/image';

import { useTemplate } from '@/components/TemplateProvider';
import type { PhotoFrame } from '@/templates/types';

/**
 * The paper a painting is printed on. The art is watercolour on cream (the
 * venue is a cut-out), so on a dark band it is shown as a print on its own
 * sheet rather than floating over the dark.
 */
const PRINT_PAPER = '#f7f0e6';

/** Masking tape on the polaroid frame. */
const TAPE = 'rgb(233 220 192 / 0.8)';

/**
 * The venue painting and the couple's portrait, framed the way the template
 * frames pictures. `fit` keeps a cut-out whole inside a cropped shape.
 */
export function FramedImage({
  src,
  alt,
  width,
  height,
  fit = 'cover',
  frame: frameOverride,
  className = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: 'cover' | 'contain';
  frame?: PhotoFrame;
  className?: string;
}) {
  const template = useTemplate();
  const frame = frameOverride ?? template.photoFrame;
  const objectFit = fit === 'contain' ? 'object-contain' : 'object-cover';

  if (frame === 'plain') {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 672px) 90vw, 400px"
        className={`w-full ${fit === 'cover' ? 'border border-t-line/50' : ''} ${className}`}
      />
    );
  }

  if (frame === 'polaroid') {
    return (
      <figure
        className={`relative mx-auto w-[86%] rotate-[-2.5deg] p-3 pb-14 shadow-[0_14px_30px_rgba(60,40,20,0.22)] ${className}`}
        style={{ background: PRINT_PAPER }}
      >
        {/* Two strips of tape hold it to the page. */}
        <span className="absolute -top-3 left-6 h-6 w-20 rotate-[-8deg] shadow-sm" style={{ background: TAPE }} aria-hidden="true" />
        <span className="absolute -top-3 right-6 h-6 w-20 rotate-[7deg] shadow-sm" style={{ background: TAPE }} aria-hidden="true" />
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={src} alt={alt} fill sizes="(max-width: 672px) 80vw, 380px" className={objectFit} />
        </div>
      </figure>
    );
  }

  const shape: Record<Exclude<PhotoFrame, 'plain' | 'polaroid'>, { outer: string; inner: string; aspect: string }> = {
    arch: { outer: 'rounded-t-[999px] p-2', inner: 'rounded-t-[999px]', aspect: 'aspect-[4/5]' },
    oval: { outer: 'rounded-[50%] p-2', inner: 'rounded-[50%]', aspect: 'aspect-[4/5]' },
    circle: { outer: 'rounded-full p-2', inner: 'rounded-full', aspect: 'aspect-square' },
    deco: { outer: 'p-2 [clip-path:polygon(8%_0,92%_0,100%_6%,100%_94%,92%_100%,8%_100%,0_94%,0_6%)]', inner: '[clip-path:polygon(8%_0,92%_0,100%_6%,100%_94%,92%_100%,8%_100%,0_94%,0_6%)]', aspect: 'aspect-[4/5]' },
  };
  const s = shape[frame];

  return (
    <div className={`relative mx-auto w-[84%] border border-t-line/70 ${s.outer} ${className}`}>
      <div className={`relative overflow-hidden ${s.inner} ${s.aspect}`} style={{ background: PRINT_PAPER }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 672px) 80vw, 380px"
          className={`${objectFit} ${fit === 'contain' ? 'p-4' : ''}`}
        />
      </div>
    </div>
  );
}
