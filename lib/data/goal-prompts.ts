import type { GoalCategory } from '@/types';

/**
 * Decision tree prompts for OKRs + SMART.
 * Category-specific hints to guide users toward measurable Key Results.
 */

export interface CategoryPrompts {
  objectiveHint: string;
  keyResultPlaceholders: string[];
  measurableHint: string;
}

export const GOAL_PROMPTS: Record<GoalCategory, CategoryPrompts> = {
  fitness: {
    objectiveHint: 'e.g., Improve physical fitness, Build a running habit',
    keyResultPlaceholders: [
      'Run 15 km total this month',
      'Attend 8 yoga/gym classes',
      'Reduce sugar intake by 50%',
      'Complete 20 strength sessions',
      'Walk 10,000 steps daily for 20 days',
    ],
    measurableHint: 'Use numbers: km, classes, %, days, reps',
  },
  financial: {
    objectiveHint: 'e.g., Save more, Reduce debt, Learn investing',
    keyResultPlaceholders: [
      'Save $500 this month',
      'Track expenses for 30 days',
      'Pay off $200 of debt',
      'Complete 1 investing course',
      'Build $1000 emergency fund',
    ],
    measurableHint: 'Use numbers: $, %, days, courses completed',
  },
  career: {
    objectiveHint: 'e.g., Land a new role, Build a skill, Expand network',
    keyResultPlaceholders: [
      'Apply to 15 jobs',
      'Complete 1 certification',
      'Connect with 20 people on LinkedIn',
      'Update resume and portfolio',
      'Attend 3 networking events',
    ],
    measurableHint: 'Use numbers: applications, connections, events, certifications',
  },
  study: {
    objectiveHint: 'e.g., Master a skill, Complete a course, Learn a language',
    keyResultPlaceholders: [
      'Complete 5 course modules',
      'Practice 30 min daily for 25 days',
      'Build 1 portfolio project',
      'Pass 1 certification exam',
      'Read 2 books on the topic',
    ],
    measurableHint: 'Use numbers: modules, hours, projects, books',
  },
  'habit-building': {
    objectiveHint: 'e.g., Build a morning routine, Quit a bad habit',
    keyResultPlaceholders: [
      'Do the habit for 25/30 days',
      'Track daily for 30 days',
      'Reduce [habit] by 50%',
      'Stack with existing routine',
      'Create environment cues',
    ],
    measurableHint: 'Use numbers: days completed, %, streak length',
  },
  'personal-growth': {
    objectiveHint: 'e.g., Improve mindfulness, Build confidence, Reduce stress',
    keyResultPlaceholders: [
      'Meditate 10 min daily for 20 days',
      'Journal 5x per week',
      'Read 2 personal development books',
      'Practice gratitude 25 days',
      'Complete 1 therapy/coaching session',
    ],
    measurableHint: 'Use numbers: minutes, days, books, sessions',
  },
  custom: {
    objectiveHint: 'e.g., Your big-picture goal in one sentence',
    keyResultPlaceholders: [
      'Key result 1 (measurable)',
      'Key result 2 (measurable)',
      'Key result 3 (measurable)',
      'Key result 4 (optional)',
      'Key result 5 (optional)',
    ],
    measurableHint: 'Make each result measurable: numbers, dates, or clear outcomes',
  },
};

export function getPrompts(category: GoalCategory): CategoryPrompts {
  return GOAL_PROMPTS[category] || GOAL_PROMPTS.custom;
}
