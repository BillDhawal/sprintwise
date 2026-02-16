import type { QuestionnaireData, Schedule } from '@/types';

interface ScheduleStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function ScheduleStep({ formData, updateFormData }: ScheduleStepProps) {
  const updateSchedule = (field: keyof Schedule, value: number | string) => {
    updateFormData({
      schedule: {
        ...(formData.schedule || { daysPerWeek: 5, timePerDay: 30, preferredTime: 'flexible' }),
        [field]: value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        Set Your Schedule
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Tell us about your availability so we can create a realistic plan
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
            How many days per week can you work on this goal?
          </label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7].map((days) => (
              <button
                key={days}
                onClick={() => updateSchedule('daysPerWeek', days)}
                className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                  formData.schedule?.daysPerWeek === days
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                }`}
              >
                {days} {days === 1 ? 'day' : 'days'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
            How much time can you dedicate per day? (minutes)
          </label>
          <div className="flex gap-2 flex-wrap">
            {[15, 30, 45, 60, 90, 120].map((minutes) => (
              <button
                key={minutes}
                onClick={() => updateSchedule('timePerDay', minutes)}
                className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                  formData.schedule?.timePerDay === minutes
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                }`}
              >
                {minutes} min
              </button>
            ))}
          </div>
          <input
            type="number"
            value={formData.schedule?.timePerDay || ''}
            onChange={(e) => updateSchedule('timePerDay', parseInt(e.target.value) || 0)}
            placeholder="Or enter custom minutes"
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
            When do you prefer to work on your goal?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'morning', label: 'Morning ☀️' },
              { value: 'afternoon', label: 'Afternoon 🌤️' },
              { value: 'evening', label: 'Evening 🌙' },
              { value: 'flexible', label: 'Flexible ⏰' },
            ].map((time) => (
              <button
                key={time.value}
                onClick={() => updateSchedule('preferredTime', time.value)}
                className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                  formData.schedule?.preferredTime === time.value
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                }`}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
