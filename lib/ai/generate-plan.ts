'use server';

import OpenAI from 'openai';
import type { QuestionnaireData, Plan, PlanDay } from '@/types';
import { generatePlan } from '@/lib/plan-generator';

function buildPrompt(data: QuestionnaireData): string {
  const goals = data.goals;
  if (goals?.length) {
    const goalsDesc = goals
      .map(
        (g) =>
          `- ${g.title}: ${g.timePerDay}min/day, ${g.daysPerWeek}x/week`
      )
      .join('\n');
    return `You are a goal-planning expert. Create a 30-day checklist plan for MULTIPLE goals.

## User's Goals
${goalsDesc}

## Instructions
Generate exactly 30 days. Each day:
- day: 1-30
- title: Short day label (e.g., "Day 1" or "Study + Gym")
- focus: (unused, use "Progress")
- tasks: SHORT tick-off items only. One line per goal active that day. Examples: "Study AWS 1hr", "2 LeetCode", "Gym", "Project work 30min". Max 2-5 words each. No subtasks or bullet lists.
- timeBlocks: (optional, can be empty)

On rest days for a goal, omit that goal. Keep tasks minimal—user will physically tick them off. Return valid JSON only.`;
  }

  const gd = data.goalDefinition;
  const s = data.schedule;
  const keyResults = gd?.keyResults?.filter((k) => k?.trim()).join('\n- ') || 'Not specified';
  const workingDays = s?.workingDays?.length
    ? s.workingDays.map((d) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d]).join(', ')
    : 'Mon-Fri';

  return `You are a goal-planning expert. Create a personalized 30-day action plan.

## User's Goal (OKRs)
**Objective:** ${gd?.objective || data.goalTitle}
**Key Results:**
- ${keyResults}

**Category:** ${data.category}
**Intensity:** ${data.intensity}

## Schedule Constraints
- Days per week: ${s?.daysPerWeek ?? 5}
- Time per day: ${s?.timePerDay ?? 30} minutes
- Preferred time: ${s?.preferredTime ?? 'flexible'}
- Working days: ${workingDays}
- Wake: ${s?.wakeUpTime ?? '7:00'}, Sleep: ${s?.sleepTime ?? '23:00'}

## Instructions
Generate exactly 30 days. For each day:
- day: 1-30
- title: Short activity name
- focus: Theme
- tasks: 2-4 specific actionable tasks
- timeBlocks: Suggested time slots

On non-working days, use title "Rest Day", focus "Recovery", tasks ["Rest", "Reflect", "Recharge"], timeBlocks [].
Return valid JSON only.`;
}

function parseAndValidateDays(content: string): PlanDay[] | null {
  try {
    const parsed = JSON.parse(content);
    const days = parsed?.days;
    if (!Array.isArray(days) || days.length !== 30) return null;

    return days.map((d: unknown, i: number) => {
      const day = d as Record<string, unknown>;
      return {
        day: typeof day.day === 'number' ? day.day : i + 1,
        title: String(day.title ?? 'Focus Day'),
        focus: String(day.focus ?? 'Progress'),
        tasks: Array.isArray(day.tasks) ? day.tasks.map(String) : ['Work toward your goal'],
        timeBlocks: Array.isArray(day.timeBlocks) ? day.timeBlocks.map(String) : [],
      };
    });
  } catch {
    return null;
  }
}

export async function generatePlanWithAI(data: QuestionnaireData): Promise<Plan> {
  const apiKey = process.env.OPENAI_API_KEY;
  const recipientName = data.giftMode?.isGift
    ? (data.giftMode.recipientName || 'Recipient')
    : 'You';

  if (!apiKey) {
    return buildPlanFromDays(data, generatePlan(data), recipientName);
  }

  const client = new OpenAI({ apiKey });

  if (data.goals?.length) {
    return buildPlanFromDays(data, generatePlan(data), recipientName);
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You generate 30-day action plans as JSON. Respond ONLY with valid JSON: {"days": [{"day": 1, "title": "...", "focus": "...", "tasks": ["..."], "timeBlocks": ["..."]}, ...]}. Exactly 30 items. No other text.`,
        },
        { role: 'user', content: buildPrompt(data) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('Empty response');

    const days = parseAndValidateDays(content);
    if (days) {
      return buildPlanFromDays(data, days, recipientName);
    }
  } catch (err) {
    console.error('OpenAI plan generation failed:', err);
  }

  return buildPlanFromDays(data, generatePlan(data), recipientName);
}

function buildPlanFromDays(
  data: QuestionnaireData,
  days: PlanDay[],
  recipientName: string
): Plan {
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
