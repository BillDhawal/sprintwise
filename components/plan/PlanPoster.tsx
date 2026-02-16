import type { GoalPlan } from '@/types';
import { getCategoryInfo } from '@/lib/data/mockData';

interface PlanPosterProps {
  plan: GoalPlan;
}

export default function PlanPoster({ plan }: PlanPosterProps) {
  const categoryInfo = getCategoryInfo(plan.category);
  const { questionnaire } = plan;

  // Create calendar grid (30 days)
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const task = plan.dailyTasks.find((t) => t.day === day);
    return { day, task };
  });

  return (
    <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-2xl print-full-page">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-4 border-indigo-600">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl">{categoryInfo?.emoji}</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {plan.goalTitle}
            </h1>
            <p className="text-lg text-indigo-600 mt-1">
              30-Day {categoryInfo?.label} Challenge
            </p>
          </div>
        </div>

        {questionnaire.giftMode.isGift && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
            <p className="text-xl font-bold text-purple-900">
              🎁 For: {questionnaire.giftMode.recipientName}
            </p>
            {questionnaire.giftMode.message && (
              <p className="text-sm text-purple-700 mt-2 italic max-w-2xl mx-auto">
                &quot;{questionnaire.giftMode.message}&quot;
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600">
            {questionnaire.schedule.daysPerWeek}x
          </div>
          <div className="text-xs text-gray-600">per week</div>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600">
            {questionnaire.schedule.timePerDay}m
          </div>
          <div className="text-xs text-gray-600">per day</div>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600 capitalize">
            {questionnaire.schedule.preferredTime.slice(0, 3)}
          </div>
          <div className="text-xs text-gray-600">time</div>
        </div>
      </div>

      {/* 30-Day Calendar Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Your 30-Day Journey
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map(({ day, task }) => (
            <div
              key={day}
              className={`
                aspect-square border-2 rounded-lg p-2 relative
                ${
                  task
                    ? 'border-indigo-400 bg-indigo-50 hover:bg-indigo-100'
                    : 'border-gray-200 bg-gray-50'
                }
              `}
            >
              <div className="text-xs font-bold text-gray-900 mb-1">
                Day {day}
              </div>
              {task && (
                <>
                  <div className="text-[0.5rem] font-semibold text-indigo-700 leading-tight mb-1 line-clamp-2">
                    {task.title}
                  </div>
                  <div className="text-[0.45rem] text-gray-600">
                    {task.duration}m
                  </div>
                  {/* Checkbox for tracking */}
                  <div className="absolute bottom-1 right-1">
                    <div className="w-3 h-3 border-2 border-gray-400 rounded"></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Tasks List */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((week) => {
          const weekTasks = plan.dailyTasks.filter((t) => t.week === week);
          return (
            <div key={week} className="border-2 border-gray-300 rounded-lg p-3">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Week {week}</h3>
              <div className="space-y-1">
                {weekTasks.slice(0, 5).map((task) => (
                  <div key={task.day} className="text-xs">
                    <span className="font-semibold text-indigo-600">D{task.day}:</span>{' '}
                    <span className="text-gray-700">{task.title}</span>
                  </div>
                ))}
                {weekTasks.length > 5 && (
                  <div className="text-xs text-gray-500 italic">
                    +{weekTasks.length - 5} more tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center">
        <p className="text-sm text-gray-600">
          <strong>Your Goal:</strong> {questionnaire.star.result}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Created with Sprintwise • Track your progress by checking off each day!
        </p>
      </div>
    </div>
  );
}
