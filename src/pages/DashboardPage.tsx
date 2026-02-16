import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plan, DayTask } from '../types';

const DashboardPage = () => {
  const navigate = useNavigate();
  
  // Placeholder state - will be replaced with actual data management
  const [plans] = useState<Plan[]>([
    {
      id: '1',
      goalId: 'goal-1',
      goalTitle: 'Learn React and TypeScript',
      tasks: generatePlaceholderTasks(),
      createdAt: new Date(),
    },
  ]);

  const activePlan = plans.length > 0 ? plans[0] : null;
  const completedTasks = activePlan?.tasks.filter(t => t.completed).length || 0;
  const totalTasks = activePlan?.tasks.length || 30;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">My Dashboard</h1>
          <Button onClick={() => navigate('/create-plan')}>
            Create New Plan
          </Button>
        </div>

        {activePlan ? (
          <>
            <Card variant="elevated">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {activePlan.goalTitle}
                  </h2>
                  <p className="text-gray-600">
                    Started {activePlan.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{progress}%</div>
                  <div className="text-sm text-gray-600">
                    {completedTasks} of {totalTasks} tasks completed
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Next Tasks (Days 1-7)
                </h3>
                {activePlan.tasks.slice(0, 7).map((task) => (
                  <TaskCard key={task.day} task={task} />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" fullWidth>
                  View Full 30-Day Plan
                </Button>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card variant="outlined">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor(completedTasks / 7)}
                  </div>
                  <div className="text-sm text-gray-600">Week Streak</div>
                </div>
              </Card>
              <Card variant="outlined">
                <div className="text-center">
                  <div className="text-4xl mb-2">📅</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.max(0, 30 - completedTasks)}
                  </div>
                  <div className="text-sm text-gray-600">Days Remaining</div>
                </div>
              </Card>
              <Card variant="outlined">
                <div className="text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {completedTasks}
                  </div>
                  <div className="text-sm text-gray-600">Tasks Completed</div>
                </div>
              </Card>
            </div>
          </>
        ) : (
          <Card variant="elevated">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Active Plans Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Create your first 30-day action plan to get started
              </p>
              <Button onClick={() => navigate('/create-plan')}>
                Create Your First Plan
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

interface TaskCardProps {
  task: DayTask;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => setIsCompleted(e.target.checked)}
        className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-blue-600">Day {task.day}</span>
          <h4 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h4>
        </div>
        <p className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
          {task.description}
        </p>
      </div>
    </div>
  );
};

// Helper function to generate placeholder tasks
function generatePlaceholderTasks(): DayTask[] {
  const taskTemplates = [
    { title: 'Set up development environment', description: 'Install Node.js, VS Code, and create your first React app' },
    { title: 'Learn JSX basics', description: 'Understand JSX syntax and how to write components' },
    { title: 'Master component props', description: 'Learn how to pass data between components' },
    { title: 'Understand state management', description: 'Learn useState hook and state basics' },
    { title: 'Work with useEffect', description: 'Master side effects and lifecycle methods' },
    { title: 'Build a simple todo app', description: 'Apply your knowledge to build a functional app' },
    { title: 'Learn TypeScript basics', description: 'Understand types, interfaces, and type safety' },
  ];

  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: taskTemplates[i % taskTemplates.length].title,
    description: taskTemplates[i % taskTemplates.length].description,
    completed: i < 3, // First 3 tasks marked as completed
  }));
}

export default DashboardPage;
