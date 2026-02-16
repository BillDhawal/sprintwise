/**
 * Sprintwise Type Definitions
 * Supports single OR multiple goals (USP: AI converts free text to SMART goals)
 */

export type GoalCategory =
  | 'fitness'
  | 'financial'
  | 'career'
  | 'study'
  | 'habit-building'
  | 'personal-growth'
  | 'custom';

/** Single goal parsed by AI from user's free-text input */
export interface ParsedGoal {
  id: string;
  title: string;
  category: GoalCategory;
  /** Minutes per day for this goal */
  timePerDay: number;
  /** Days per week (e.g., 6 for gym) */
  daysPerWeek: number;
  /** SMART: 1-2 key measurable results */
  keyResults: string[];
  /** User can confirm or edit */
  confirmed?: boolean;
}

/** OKRs: Objective + Key Results (legacy for single-goal flow) */
export interface GoalDefinition {
  objective: string;
  keyResults: string[];
  achievable?: 'yes' | 'scale-down';
}

export interface Schedule {
  daysPerWeek: number;
  timePerDay: number;
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
  wakeUpTime?: string;
  sleepTime?: string;
  workingDays?: number[];
}

export type IntensityLevel = 'light' | 'medium' | 'aggressive';

export interface GiftMode {
  isGift: boolean;
  recipientName?: string;
  senderName?: string;
  message?: string;
}

/** Poster template for themed calendar generation */
export type PosterThemeId = 'zen_minimal' | 'professional_career' | 'warm_mother';

export interface QuestionnaireData {
  /** Single-goal flow (legacy) */
  category?: GoalCategory;
  goalTitle?: string;
  goalDefinition?: GoalDefinition;

  /** Multi-goal flow (USP) */
  goalsRaw?: string;
  goals?: ParsedGoal[];

  schedule: Schedule;
  giftMode: GiftMode;
  intensity: IntensityLevel;

  /** Poster theme selection (before plan page) */
  posterTheme?: PosterThemeId;
  /** User photo URL for KIE image generation */
  userImageUrl?: string;
  /** KIE-generated personalized poster URL (after generation) */
  generatedPosterUrl?: string;
}

/** Single activity block (used in multi-goal plans) */
export interface PlanActivity {
  goalId: string;
  title: string;
  focus: string;
  tasks: string[];
  timeBlocks: string[];
}

export interface PlanDay {
  day: number;
  title: string;
  focus: string;
  tasks: string[];
  timeBlocks: string[];
  goalId?: string;
  /** Multi-goal: multiple activities per day */
  activities?: PlanActivity[];
}

export interface Plan {
  id: string;
  category: GoalCategory;
  goalTitle: string;
  recipientName: string;
  createdAt: Date;
  questionnaire: QuestionnaireData;
  days: PlanDay[];
  /** For multi-goal plans */
  goals?: ParsedGoal[];
}
