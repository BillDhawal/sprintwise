import type { GoalPlan } from '@/types';
import { getCategoryInfo } from '@/lib/data/mockData';

interface PlanPreviewProps {
  plan: GoalPlan;
}

export default function PlanPreview({ plan }: PlanPreviewProps) {
  const categoryInfo = getCategoryInfo(plan.category);
  const { questionnaire } = plan;

  const weeklyTasks = [1, 2, 3, 4].map((week) =>
    plan.dailyTasks.filter((task) => task.week === week)
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{categoryInfo?.emoji}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.goalTitle}
          </h1>
          <p className="text-lg text-indigo-600 dark:text-indigo-400">
            30-Day {categoryInfo?.label} Plan
          </p>
          
          {questionnaire.giftMode.isGift && (
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg">
              <p className="text-lg font-semibold text-purple-900 dark:text-purple-200">
                🎁 For: {questionnaire.giftMode.recipientName}
              </p>
              {questionnaire.giftMode.message && (
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-2 italic">
                  &quot;{questionnaire.giftMode.message}&quot;
                </p>
              )}
            </div>
          )}
        </div>

        {/* Schedule Info */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Your Schedule
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {questionnaire.schedule.daysPerWeek}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days per week</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {questionnaire.schedule.timePerDay}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minutes per day</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 capitalize">
                {questionnaire.schedule.preferredTime}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Preferred time</div>
            </div>
          </div>
        </div>

        {/* STAR Method Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Your Goal Story
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                Situation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{questionnaire.star.situation}</p>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Task</h3>
              <p className="text-gray-700 dark:text-gray-300">{questionnaire.star.task}</p>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Action</h3>
              <p className="text-gray-700 dark:text-gray-300">{questionnaire.star.action}</p>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Result</h3>
              <p className="text-gray-700 dark:text-gray-300">{questionnaire.star.result}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="space-y-8">
        {weeklyTasks.map((tasks, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Week {index + 1}
            </h2>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.day}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full font-semibold text-sm">
                        {task.day}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {task.title}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {task.duration} min
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm ml-11">
                    {task.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
