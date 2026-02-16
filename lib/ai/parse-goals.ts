'use server';

import OpenAI from 'openai';
import type { ParsedGoal, GoalCategory } from '@/types';

const CATEGORY_VALUES: GoalCategory[] = [
  'fitness',
  'financial',
  'career',
  'study',
  'habit-building',
  'personal-growth',
  'custom',
];

function buildPrompt(userInput: string): string {
  return `You are a goal-planning expert. The user has listed multiple goals they want to work on. Convert each into a SMART goal with structured fields.

## User's raw input:
"""
${userInput}
"""

## Instructions:
1. Extract each distinct goal from the input (e.g., "Study AWS 1 hour per day" = one goal, "Solve 2 leetcodes" = another)
2. For each goal, determine:
   - title: Short, clear goal name
   - category: One of: fitness, financial, career, study, habit-building, personal-growth, custom
   - timePerDay: Minutes per day (e.g., "1 hour" = 60, "30 min" = 30)
   - daysPerWeek: How many days per week (e.g., "6 times a week" = 6, "daily" = 7)
   - keyResults: 1-2 measurable outcomes (e.g., "Complete 30 hours of AWS study", "Solve 60 LeetCode problems")
3. Return as JSON array. No other text.

Example output format:
[
  {"title": "Study AWS", "category": "study", "timePerDay": 60, "daysPerWeek": 5, "keyResults": ["Complete 30 hours of study", "Pass 1 practice exam"]},
  {"title": "LeetCode Practice", "category": "career", "timePerDay": 45, "daysPerWeek": 5, "keyResults": ["Solve 60 problems", "Cover 3 problem patterns"]}
]

Return valid JSON array only.`;
}

function parseGoals(raw: string): ParsedGoal[] {
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) return [];

    return arr.slice(0, 8).map((item: Record<string, unknown>, i: number) => {
      const cat = String(item.category || 'custom').toLowerCase().replace(/\s+/g, '-');
      const validCategory = CATEGORY_VALUES.includes(cat as GoalCategory)
        ? (cat as GoalCategory)
        : 'custom';

      return {
        id: `goal-${i}-${Date.now()}`,
        title: String(item.title || `Goal ${i + 1}`).slice(0, 80),
        category: validCategory,
        timePerDay: Math.min(180, Math.max(5, Number(item.timePerDay) || 30)),
        daysPerWeek: Math.min(7, Math.max(1, Number(item.daysPerWeek) || 5)),
        keyResults: Array.isArray(item.keyResults)
          ? item.keyResults.slice(0, 3).map(String)
          : [String(item.keyResults || 'Track progress')],
        confirmed: false,
      };
    });
  } catch {
    return [];
  }
}

export async function parseGoalsWithAI(userInput: string): Promise<ParsedGoal[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return parseGoalsFallback(userInput);
  }

  const client = new OpenAI({ apiKey });

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You convert free-text goal lists into structured JSON. Respond ONLY with valid JSON: {"goals": [{"title": "...", "category": "study|fitness|career|...", "timePerDay": 60, "daysPerWeek": 5, "keyResults": ["..."]}, ...]}. category must be one of: fitness, financial, career, study, habit-building, personal-growth, custom. No other text.`,
        },
        { role: 'user', content: buildPrompt(userInput) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return parseGoalsFallback(userInput);

    const parsed = JSON.parse(content);
    const arr = parsed?.goals ?? parsed?.items ?? (Array.isArray(parsed) ? parsed : []);
    return parseGoals(JSON.stringify(arr));
  } catch (err) {
    console.error('parseGoalsWithAI failed:', err);
    return parseGoalsFallback(userInput);
  }
}

function parseGoalsFallback(userInput: string): ParsedGoal[] {
  const lines = userInput
    .split(/[\n,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);

  if (lines.length === 0) return [];

  return lines.slice(0, 6).map((line, i) => {
    const timeMatch = line.match(/(\d+)\s*(hour|hr|min|minute)s?/i);
    const time = timeMatch
      ? /hour|hr/i.test(timeMatch[2] || '')
        ? parseInt(timeMatch[1], 10) * 60
        : parseInt(timeMatch[1], 10)
      : 30;

    const daysMatch = line.match(/(\d+)\s*(?:times?|x)\s*(?:per|a)\s*week|(\d+)\s*days?/i);
    const days = daysMatch ? parseInt(daysMatch[1] || daysMatch[2] || '5', 10) : 5;

    const title = line
      .replace(/\d+\s*(?:hour|hr|min)s?/gi, '')
      .replace(/\d+\s*(?:times?|x)\s*(?:per|a)\s*week/gi, '')
      .trim()
      .slice(0, 60) || `Goal ${i + 1}`;

    return {
      id: `goal-${i}-${Date.now()}`,
      title,
      category: 'custom' as GoalCategory,
      timePerDay: Math.min(180, Math.max(5, time)),
      daysPerWeek: Math.min(7, Math.max(1, days)),
      keyResults: ['Track progress'],
      confirmed: false,
    };
  });
}
