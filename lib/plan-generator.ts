/**
 * Plan Generation Engine
 * Uses ONLY confirmed goals as tick-off tasks. No subdivision, no templates.
 */

import type { QuestionnaireData, PlanDay, ParsedGoal } from '@/types';

/** Multi-goal: one tick-off task per confirmed goal, per active day */
export function generateMultiGoalPlan(
  goals: ParsedGoal[],
  schedule: QuestionnaireData['schedule']
): PlanDay[] {
  const days: PlanDay[] = [];

  for (let dayNum = 1; dayNum <= 30; dayNum++) {
    const date = new Date(2000, 0, dayNum);
    const dayOfWeek = date.getDay();

    const tasks: string[] = [];

    for (const goal of goals) {
      const weekDays = [1, 2, 3, 4, 5, 6, 0];
      const goalWorkingDays = weekDays.slice(0, goal.daysPerWeek);
      if (!goalWorkingDays.includes(dayOfWeek)) continue;

      const mins = goal.timePerDay || 30;
      const label =
        mins >= 60
          ? `${goal.title} (${Math.round(mins / 60)}hr)`
          : `${goal.title} (${mins}min)`;
      tasks.push(label);
    }

    days.push({
      day: dayNum,
      title: tasks.length ? tasks.join(' • ') : 'Rest Day',
      focus: 'Progress',
      tasks: tasks.length ? tasks : ['Rest day'],
      timeBlocks: [],
    });
  }

  return days;
}

/** Single-goal plan (legacy) */
export function generatePlan(data: QuestionnaireData): PlanDay[] {
  const goals = data.goals;
  if (goals?.length) {
    return generateMultiGoalPlan(goals, data.schedule);
  }

  const days: PlanDay[] = [];
  const workingDays =
    data.schedule.workingDays?.length
      ? data.schedule.workingDays
      : [1, 2, 3, 4, 5];
  const mins = data.schedule.timePerDay || 30;
  const label =
    mins >= 60
      ? `${data.goalTitle || 'Goal'} (${Math.round(mins / 60)}hr)`
      : `${data.goalTitle || 'Goal'} (${mins}min)`;

  for (let dayNum = 1; dayNum <= 30; dayNum++) {
    const date = new Date(2000, 0, dayNum);
    const dayOfWeek = date.getDay();
    const isWorkingDay = workingDays.includes(dayOfWeek);

    days.push({
      day: dayNum,
      title: isWorkingDay ? (data.goalTitle || 'Goal') : 'Rest Day',
      focus: 'Progress',
      tasks: isWorkingDay ? [label] : ['Rest day'],
      timeBlocks: [],
    });
  }

  return days;
}
