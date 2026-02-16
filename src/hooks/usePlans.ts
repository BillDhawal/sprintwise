import { useState } from 'react';
import { Goal, Plan } from '../types';

// Placeholder hook for managing goals
// This will be replaced with actual API calls in future phases
export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createGoal = async (title: string, description: string): Promise<Goal> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title,
      description,
      createdAt: new Date(),
    };
    
    setGoals([...goals, newGoal]);
    setIsLoading(false);
    return newGoal;
  };

  const deleteGoal = async (goalId: string): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setGoals(goals.filter(g => g.id !== goalId));
    setIsLoading(false);
  };

  return {
    goals,
    isLoading,
    createGoal,
    deleteGoal,
  };
};

// Placeholder hook for managing plans
// This will be replaced with actual plan generation logic in future phases
export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generatePlan = async (goalId: string, goalTitle: string): Promise<Plan> => {
    setIsLoading(true);
    
    // Simulate plan generation (will be replaced with AI generation)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPlan: Plan = {
      id: `plan-${Date.now()}`,
      goalId,
      goalTitle,
      tasks: generatePlaceholderTasks(goalTitle),
      createdAt: new Date(),
    };
    
    setPlans([...plans, newPlan]);
    setIsLoading(false);
    return newPlan;
  };

  const giftPlan = async (
    goalTitle: string,
    recipientEmail: string,
    message?: string
  ): Promise<void> => {
    setIsLoading(true);
    
    // Simulate sending gift (will be replaced with actual email sending)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const giftedPlan: Plan = {
      id: `gift-${Date.now()}`,
      goalId: `goal-${Date.now()}`,
      goalTitle,
      tasks: generatePlaceholderTasks(goalTitle),
      createdAt: new Date(),
      isGift: true,
      recipientEmail,
    };
    
    setPlans([...plans, giftedPlan]);
    setIsLoading(false);
  };

  const updateTaskCompletion = (planId: string, day: number, completed: boolean): void => {
    setPlans(plans.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          tasks: plan.tasks.map(task => 
            task.day === day ? { ...task, completed } : task
          ),
        };
      }
      return plan;
    }));
  };

  return {
    plans,
    isLoading,
    generatePlan,
    giftPlan,
    updateTaskCompletion,
  };
};

// Helper function to generate placeholder tasks
function generatePlaceholderTasks(goalTitle: string) {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1} task for ${goalTitle}`,
    description: `This is a placeholder task that will be generated based on your specific goal.`,
    completed: false,
  }));
}
