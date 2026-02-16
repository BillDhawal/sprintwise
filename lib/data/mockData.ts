/**
 * Mock data and plan generation
 * Re-exports from plan-generator and goal-categories for backward compatibility
 */

import type { QuestionnaireData, Plan } from '@/types';
import { generatePlan } from '@/lib/plan-generator';
import { goalCategories, getCategoryInfo } from '@/lib/data/goal-categories';

export { goalCategories, getCategoryInfo };

/**
 * Generates a full Plan from questionnaire data.
 * Supports both single-goal and multi-goal flows.
 */
export function generateGoalPlan(data: QuestionnaireData): Plan {
  const days = generatePlan(data);
  const recipientName = data.giftMode?.isGift
    ? (data.giftMode.recipientName || 'Recipient')
    : 'You';

  const goalTitle = data.goals?.length
    ? data.goals.map((g) => g.title).join(' + ')
    : (data.goalTitle || 'My 30-Day Plan');
  const category = data.goals?.[0]?.category ?? data.category ?? 'custom';

  return {
    id: Math.random().toString(36).substring(7),
    category,
    goalTitle,
    recipientName,
    createdAt: new Date(),
    questionnaire: data,
    days,
    goals: data.goals,
  };
}
