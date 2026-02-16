import type { GoalCategory } from '@/types';

export interface GoalCategoryConfig {
  value: GoalCategory;
  label: string;
  emoji: string;
  description: string;
}

export const goalCategories: GoalCategoryConfig[] = [
  { value: 'fitness', label: 'Fitness', emoji: '💪', description: 'Build strength, endurance, or develop a healthy exercise routine' },
  { value: 'financial', label: 'Financial', emoji: '💰', description: 'Save money, invest wisely, or improve financial literacy' },
  { value: 'career', label: 'Career', emoji: '💼', description: 'Advance professionally, build skills, or change careers' },
  { value: 'study', label: 'Study', emoji: '📚', description: 'Learn new skills, complete courses, or master a subject' },
  { value: 'habit-building', label: 'Habit Building', emoji: '🔄', description: 'Build lasting habits and routines' },
  { value: 'personal-growth', label: 'Personal Growth', emoji: '🌱', description: 'Develop mindfulness, character, and self-awareness' },
  { value: 'custom', label: 'Custom Goal', emoji: '✨', description: 'Define your own goal and structure' },
];

export function getCategoryInfo(category: GoalCategory) {
  return goalCategories.find((c) => c.value === category);
}
