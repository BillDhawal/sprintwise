export type GoalCategory =
  | 'fitness'
  | 'finance'
  | 'study'
  | 'career'
  | 'health'
  | 'personal'
  | 'creative'
  | 'relationships';

export interface STARMethod {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface Schedule {
  daysPerWeek: number;
  timePerDay: number; // in minutes
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
}

export interface GiftMode {
  isGift: boolean;
  recipientName?: string;
  message?: string;
}

export interface QuestionnaireData {
  category: GoalCategory;
  goalTitle: string;
  star: STARMethod;
  schedule: Schedule;
  giftMode: GiftMode;
}

export interface DailyTask {
  day: number;
  week: number;
  title: string;
  description: string;
  duration: number; // in minutes
  completed?: boolean;
}

export interface GoalPlan {
  id: string;
  category: GoalCategory;
  goalTitle: string;
  createdAt: Date;
  questionnaire: QuestionnaireData;
  dailyTasks: DailyTask[];
}
