'use client';

import type { QuestionnaireData, Schedule } from '@/types';

interface ScheduleStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function ScheduleStep({ formData, updateFormData }: ScheduleStepProps) {
  const schedule = formData.schedule || {
    daysPerWeek: 5,
    timePerDay: 30,
    preferredTime: 'flexible' as const,
    wakeUpTime: '7:00',
    sleepTime: '23:00',
    workingDays: [1, 2, 3, 4, 5],
  };

  const updateSchedule = (field: keyof Schedule, value: string) => {
    updateFormData({
      schedule: { ...schedule, [field]: value },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Your Day
      </h2>
      <p className="text-text-secondary mb-6">
        Optional: set your typical wake and sleep times for time block suggestions
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-text-primary">
            Wake-up time (default 7:00)
          </label>
          <input
            type="time"
            value={schedule.wakeUpTime || '7:00'}
            onChange={(e) => updateSchedule('wakeUpTime', e.target.value)}
            className="w-full px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary focus:ring-2 focus:ring-accent-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-text-primary">
            Sleep time
          </label>
          <input
            type="time"
            value={schedule.sleepTime || '23:00'}
            onChange={(e) => updateSchedule('sleepTime', e.target.value)}
            className="w-full px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary focus:ring-2 focus:ring-accent-primary outline-none"
          />
        </div>
      </div>
    </div>
  );
}
