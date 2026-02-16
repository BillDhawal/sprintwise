/**
 * KIE API client for nano-banana-pro image generation.
 * Uses backend (Lambda) or Next.js API routes when NEXT_PUBLIC_API_URL is set.
 */

import { kieCreateTaskUrl, kieStatusUrl } from '@/lib/api-config';

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 60; // ~2 min

export interface GeneratePosterResult {
  imageUrl: string;
  taskId: string;
}

export async function generatePosterImage(
  templateUrl: string,
  userImageUrl: string
): Promise<GeneratePosterResult> {
  const res = await fetch(kieCreateTaskUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ templateUrl, userImageUrl }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to create task: ${res.status}`);
  }

  const { taskId } = await res.json();
  if (!taskId) throw new Error('No taskId returned');

  for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

    const statusRes = await fetch(kieStatusUrl(taskId));
    if (!statusRes.ok) {
      throw new Error(`Failed to get status: ${statusRes.status}`);
    }

    const statusData = await statusRes.json();
    const state = statusData?.data?.state;
    const resultJson = statusData?.data?.resultJson;

    if (state === 'success' && resultJson) {
      try {
        const parsed = JSON.parse(resultJson);
        const urls = parsed?.resultUrls;
        if (Array.isArray(urls) && urls.length > 0) {
          return { imageUrl: urls[0], taskId };
        }
      } catch {
        // ignore parse error
      }
    }

    if (state === 'fail') {
      const msg = statusData?.data?.failMsg || 'Generation failed';
      throw new Error(msg);
    }
  }

  throw new Error('Generation timed out');
}
