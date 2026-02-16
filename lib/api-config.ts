/**
 * API base URL for backend (Lambda). When set, upload and KIE calls go to the backend.
 * Otherwise, Next.js API routes are used.
 */
export const API_BASE =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')
    : '';

export function uploadUrl(): string {
  return API_BASE ? `${API_BASE}/upload` : '/api/upload';
}

export function kieCreateTaskUrl(): string {
  return API_BASE ? `${API_BASE}/api/kie/create-task` : '/api/kie/create-task';
}

export function kieStatusUrl(taskId: string): string {
  const base = API_BASE ? `${API_BASE}/api/kie/status` : '/api/kie/status';
  return `${base}?taskId=${encodeURIComponent(taskId)}`;
}
