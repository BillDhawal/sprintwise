import type { PosterThemeId } from '@/types';

export interface PosterTemplate {
  id: PosterThemeId;
  name: string;
  description: string;
  imagePath: string;
}

export const POSTER_TEMPLATES: PosterTemplate[] = [
  {
    id: 'zen_minimal',
    name: 'Zen Minimal',
    description: 'Clean, minimalist design with calm aesthetics',
    imagePath: '/assets/zen_minimal.png',
  },
  {
    id: 'professional_career',
    name: 'Professional Career',
    description: 'Polished look for career and productivity goals',
    imagePath: '/assets/professional_career.png',
  },
  {
    id: 'warm_mother',
    name: 'Warm Mother',
    description: 'Cozy, warm design for personal growth',
    imagePath: '/assets/warm_mother.png',
  },
];

export function getTemplateById(id: PosterThemeId): PosterTemplate | undefined {
  return POSTER_TEMPLATES.find((t) => t.id === id);
}

/** Public URL for KIE to fetch template (S3). When set, use instead of local /assets path. */
export function getTemplateUrlForKie(templateId: PosterThemeId): string {
  const base = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_TEMPLATE_BASE_URL || '' : '';
  if (base) {
    return `${base.replace(/\/$/, '')}/${templateId}.png`;
  }
  const template = getTemplateById(templateId);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return template ? `${origin}${template.imagePath}` : '';
}
