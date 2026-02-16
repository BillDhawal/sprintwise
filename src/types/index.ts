// Goal and Plan Types
export interface Goal {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface DayTask {
  day: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface Plan {
  id: string;
  goalId: string;
  goalTitle: string;
  tasks: DayTask[];
  createdAt: Date;
  isGift?: boolean;
  recipientEmail?: string;
}

// User Types
export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
