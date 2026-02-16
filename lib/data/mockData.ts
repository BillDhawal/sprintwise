import type { GoalCategory, GoalPlan, QuestionnaireData, DailyTask, STARMethod } from '@/types';

export const goalCategories: { value: GoalCategory; label: string; emoji: string; description: string }[] = [
  {
    value: 'fitness',
    label: 'Fitness',
    emoji: '💪',
    description: 'Build strength, endurance, or develop a healthy exercise routine',
  },
  {
    value: 'finance',
    label: 'Finance',
    emoji: '💰',
    description: 'Save money, invest wisely, or improve financial literacy',
  },
  {
    value: 'study',
    label: 'Study',
    emoji: '📚',
    description: 'Learn new skills, complete courses, or master a subject',
  },
  {
    value: 'career',
    label: 'Career',
    emoji: '💼',
    description: 'Advance professionally, build skills, or change careers',
  },
  {
    value: 'health',
    label: 'Health',
    emoji: '🏥',
    description: 'Improve mental or physical health, develop wellness habits',
  },
  {
    value: 'personal',
    label: 'Personal Development',
    emoji: '🌱',
    description: 'Build character, develop mindfulness, or grow personally',
  },
  {
    value: 'creative',
    label: 'Creative',
    emoji: '🎨',
    description: 'Express creativity through art, music, writing, or other media',
  },
  {
    value: 'relationships',
    label: 'Relationships',
    emoji: '❤️',
    description: 'Strengthen bonds, build connections, or improve social skills',
  },
];

export function generateGoalPlan(data: QuestionnaireData): GoalPlan {
  const dailyTasks = generateDailyTasks(data);
  
  return {
    id: Math.random().toString(36).substring(7),
    category: data.category,
    goalTitle: data.goalTitle,
    createdAt: new Date(),
    questionnaire: data,
    dailyTasks,
  };
}

function generateDailyTasks(data: QuestionnaireData): DailyTask[] {
  const tasks: DailyTask[] = [];
  const { category, star, schedule } = data;
  
  // Generate tasks based on category
  const templates = getTaskTemplates(category, star);
  
  // Distribute tasks across 30 days based on schedule
  const activeDays = Math.ceil((30 * schedule.daysPerWeek) / 7);
  const tasksPerPhase = Math.ceil(templates.length / 4); // 4 phases: Foundation, Building, Acceleration, Mastery
  
  let taskIndex = 0;
  let dayCounter = 1;
  
  for (let week = 1; week <= 4; week++) {
    for (let dayInWeek = 0; dayInWeek < 7 && dayCounter <= 30; dayInWeek++, dayCounter++) {
      // Skip days based on schedule
      if (dayInWeek >= schedule.daysPerWeek && schedule.daysPerWeek < 7) {
        continue;
      }
      
      const template = templates[taskIndex % templates.length];
      tasks.push({
        day: dayCounter,
        week,
        title: template.title,
        description: template.description,
        duration: Math.min(schedule.timePerDay, template.baseDuration),
      });
      
      taskIndex++;
      
      if (dayCounter >= 30) break;
    }
  }
  
  return tasks;
}

function getTaskTemplates(category: GoalCategory, star: STARMethod) {
  const baseTemplates = {
    fitness: [
      { title: 'Warm-up & Stretch', description: 'Start with 5-10 minutes of dynamic stretching', baseDuration: 15 },
      { title: 'Cardio Session', description: 'Light cardio: walking, jogging, or cycling', baseDuration: 30 },
      { title: 'Strength Training', description: 'Focus on major muscle groups with bodyweight exercises', baseDuration: 45 },
      { title: 'Core Workout', description: 'Planks, crunches, and core strengthening exercises', baseDuration: 20 },
      { title: 'Flexibility & Yoga', description: 'Improve flexibility and balance', baseDuration: 30 },
      { title: 'HIIT Training', description: 'High-intensity interval training for 20 minutes', baseDuration: 25 },
      { title: 'Active Recovery', description: 'Light activity like walking or swimming', baseDuration: 30 },
      { title: 'Progressive Cardio', description: 'Increase intensity or duration from previous sessions', baseDuration: 40 },
    ],
    finance: [
      { title: 'Budget Review', description: 'Analyze your spending patterns and create a budget', baseDuration: 30 },
      { title: 'Track Expenses', description: 'Record all daily expenses and categorize them', baseDuration: 15 },
      { title: 'Learn About Investing', description: 'Read articles or watch videos about investment basics', baseDuration: 45 },
      { title: 'Emergency Fund Planning', description: 'Calculate and set up an emergency fund', baseDuration: 30 },
      { title: 'Debt Assessment', description: 'List all debts and create a repayment strategy', baseDuration: 40 },
      { title: 'Savings Automation', description: 'Set up automatic transfers to savings accounts', baseDuration: 20 },
      { title: 'Financial Goals Review', description: 'Review progress and adjust financial goals', baseDuration: 30 },
      { title: 'Investment Research', description: 'Research investment options suitable for your goals', baseDuration: 50 },
    ],
    study: [
      { title: 'Course Introduction', description: 'Review learning objectives and create study plan', baseDuration: 30 },
      { title: 'Core Concept Study', description: 'Deep dive into fundamental concepts', baseDuration: 60 },
      { title: 'Practice Exercises', description: 'Work through practice problems or exercises', baseDuration: 45 },
      { title: 'Review & Notes', description: 'Review material and organize study notes', baseDuration: 30 },
      { title: 'Hands-on Project', description: 'Apply concepts through practical projects', baseDuration: 90 },
      { title: 'Quiz & Self-Test', description: 'Test your understanding with quizzes', baseDuration: 30 },
      { title: 'Advanced Topics', description: 'Explore advanced or supplementary topics', baseDuration: 60 },
      { title: 'Teach Back', description: 'Explain concepts to solidify understanding', baseDuration: 40 },
    ],
    career: [
      { title: 'Skills Assessment', description: 'Identify current skills and gaps', baseDuration: 30 },
      { title: 'Resume Update', description: 'Update resume with recent achievements', baseDuration: 45 },
      { title: 'LinkedIn Profile', description: 'Enhance your LinkedIn presence', baseDuration: 30 },
      { title: 'Networking Activity', description: 'Connect with professionals in your field', baseDuration: 40 },
      { title: 'Skill Development', description: 'Work on developing key professional skills', baseDuration: 60 },
      { title: 'Portfolio Building', description: 'Create or update your professional portfolio', baseDuration: 90 },
      { title: 'Industry Research', description: 'Research trends and opportunities in your field', baseDuration: 45 },
      { title: 'Mentorship Session', description: 'Seek advice or mentor others', baseDuration: 50 },
    ],
    health: [
      { title: 'Mindfulness Practice', description: 'Meditation or breathing exercises', baseDuration: 20 },
      { title: 'Healthy Meal Prep', description: 'Plan and prepare nutritious meals', baseDuration: 60 },
      { title: 'Sleep Routine', description: 'Establish a consistent sleep schedule', baseDuration: 10 },
      { title: 'Hydration Tracking', description: 'Monitor and improve water intake', baseDuration: 5 },
      { title: 'Stress Management', description: 'Practice stress-reduction techniques', baseDuration: 30 },
      { title: 'Health Check-in', description: 'Monitor vital signs and overall wellness', baseDuration: 15 },
      { title: 'Mental Health Care', description: 'Journaling or therapeutic activities', baseDuration: 30 },
      { title: 'Wellness Education', description: 'Learn about health topics relevant to your goals', baseDuration: 40 },
    ],
    personal: [
      { title: 'Self-Reflection', description: 'Journal about personal growth and experiences', baseDuration: 20 },
      { title: 'Gratitude Practice', description: 'Write down things you\'re grateful for', baseDuration: 15 },
      { title: 'Goal Visualization', description: 'Visualize achieving your personal goals', baseDuration: 20 },
      { title: 'Habit Building', description: 'Work on developing positive habits', baseDuration: 30 },
      { title: 'Personal Reading', description: 'Read books on personal development', baseDuration: 45 },
      { title: 'Life Planning', description: 'Plan for long-term personal objectives', baseDuration: 40 },
      { title: 'Mindset Work', description: 'Challenge limiting beliefs and negative thoughts', baseDuration: 30 },
      { title: 'Skill Exploration', description: 'Try new activities or hobbies', baseDuration: 60 },
    ],
    creative: [
      { title: 'Creative Warmup', description: 'Free-form sketching, writing, or improvisation', baseDuration: 20 },
      { title: 'Skill Practice', description: 'Practice fundamental creative techniques', baseDuration: 45 },
      { title: 'Project Development', description: 'Work on your main creative project', baseDuration: 90 },
      { title: 'Inspiration Gathering', description: 'Collect references and inspiration', baseDuration: 30 },
      { title: 'Technique Study', description: 'Learn new creative techniques or methods', baseDuration: 60 },
      { title: 'Critique & Review', description: 'Review and refine your work', baseDuration: 40 },
      { title: 'Experimentation', description: 'Try new styles or approaches', baseDuration: 50 },
      { title: 'Creative Sharing', description: 'Share work and get feedback', baseDuration: 30 },
    ],
    relationships: [
      { title: 'Quality Time', description: 'Spend meaningful time with loved ones', baseDuration: 60 },
      { title: 'Active Listening', description: 'Practice listening without judgment', baseDuration: 30 },
      { title: 'Communication Skills', description: 'Work on expressing feelings clearly', baseDuration: 40 },
      { title: 'Relationship Check-in', description: 'Discuss relationship health and needs', baseDuration: 45 },
      { title: 'Acts of Service', description: 'Do something thoughtful for someone', baseDuration: 30 },
      { title: 'Conflict Resolution', description: 'Address and resolve issues constructively', baseDuration: 50 },
      { title: 'Social Connection', description: 'Reach out to friends or family', baseDuration: 40 },
      { title: 'Empathy Building', description: 'Practice understanding others\' perspectives', baseDuration: 30 },
    ],
  };
  
  return baseTemplates[category] || baseTemplates.personal;
}

export function getCategoryInfo(category: GoalCategory) {
  return goalCategories.find(c => c.value === category);
}
