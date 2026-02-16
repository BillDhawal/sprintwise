'use client';

import { useCallback } from 'react';
import type { QuestionnaireData } from '@/types';

const STORAGE_KEY = 'questionnaireData';

/**
 * Hook for accessing questionnaire data from session storage.
 * Used when navigating to plan preview - can be extended for persistence.
 */
export function useQuestionnaire() {
  const getData = useCallback((): QuestionnaireData | null => {
    if (typeof window === 'undefined') return null;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as QuestionnaireData;
    } catch {
      return null;
    }
  }, []);

  const clearData = useCallback(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const setData = useCallback((data: QuestionnaireData) => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  return { getData, setData, clearData };
}
