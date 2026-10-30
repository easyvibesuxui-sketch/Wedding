'use client';

import { Seam } from '@/components/invitation/Seam';
import { useTemplate } from '@/components/TemplateProvider';
import { SURFACE_CLASS, TEXTURE_CLASS } from '@/templates/style';
import type { SectionId } from '@/templates/types';

/**
 * One band of the invitation. The template decides what it sits on, the edge
 * it draws over the band above, its grain, and whether its content is framed;
 * the section only supplies what it says.
 *
 * Each band is its own stacking context, so a later band's seam and spilling
 * ornaments always paint over the band above, and it clips sideways only —
 * the seam has to reach up out of it.
 */
export function Section({
  section,
  id,
  as: Tag = 'section',
  className = '',
  decor,
  contained = true,
  children,
}: {
  section: SectionId;
  id?: string;
  as?: 'section' | 'footer';
  className?: string;
  /**
   * Ornaments placed against the band itself rather than its content, so they
   * keep clear of the headings and can spill over the band's edges.
   */
  decor?: React.ReactNode;
  /**
   * Whether the band is its own stacking context. A band whose ornaments must
   * rise over the next band (seam included) opts out, so their z-index is
   * weighed against the bands themselves.
   */
  contained?: boolean;
  children: React.ReactNode;
}) {
  const template = useTemplate();
  const surface = template.surfaces[section];
  const Frame = template.Frame && template.framed?.includes(section) ? template.Frame : null;

  return (
    <Tag
      id={id}
      data-surface={surface}
      className={`${SURFACE_CLASS[surface]} ${TEXTURE_CLASS[template.texture]} relative ${contained ? 'isolate' : ''} overflow-x-clip px-6 py-20 sm:py-24 ${className}`}
    >
      <Seam />
      {decor}
      <div className="relative z-10">{Frame ? <Frame>{children}</Frame> : children}</div>
    </Tag>
  );
}
