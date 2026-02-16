'use client';

import type { QuestionnaireData, ParsedGoal, GoalCategory } from '@/types';
import { getCategoryInfo } from '@/lib/data/goal-categories';

interface ReviewGoalsStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function ReviewGoalsStep({ formData, updateFormData }: ReviewGoalsStepProps) {
  const goals = formData.goals || [];

  const updateGoal = (index: number, updates: Partial<ParsedGoal>) => {
    const next = [...goals];
    next[index] = { ...next[index], ...updates };
    updateFormData({ goals: next });
  };

  const removeGoal = (index: number) => {
    const next = goals.filter((_, i) => i !== index);
    updateFormData({ goals: next });
  };

  const confirmAll = () => {
    updateFormData({
      goals: goals.map((g) => ({ ...g, confirmed: true })),
    });
  };

  const allConfirmed = goals.length > 0 && goals.every((g) => g.confirmed);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Review & Confirm Your Goals
      </h2>
      <p className="text-text-secondary mb-6">
        Check each goal. Edit if needed, then confirm. Is this the time you want to spend per day?
      </p>

      <div className="space-y-4">
        {goals.map((goal, i) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            index={i}
            onUpdate={(u) => updateGoal(i, u)}
            onRemove={() => removeGoal(i)}
            canRemove={goals.length > 1}
          />
        ))}
      </div>

      {goals.length > 0 && (
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={confirmAll}
            className={`px-4 py-2 rounded-design-md font-medium ${
              allConfirmed
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-accent-primary text-white hover:opacity-90'
            }`}
          >
            {allConfirmed ? '✓ All confirmed' : 'Confirm all'}
          </button>
        </div>
      )}
    </div>
  );
}

function GoalCard({
  goal,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: {
  goal: ParsedGoal;
  index: number;
  onUpdate: (u: Partial<ParsedGoal>) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const categoryInfo = getCategoryInfo(goal.category);
  const isConfirmed = goal.confirmed;

  return (
    <div
      className={`border-2 rounded-design-xl p-4 transition-all ${
        isConfirmed
          ? 'border-green-300 bg-green-50/50'
          : 'border-border-light hover:border-border-medium'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold text-sm">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={goal.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full font-semibold text-text-primary bg-transparent border-b border-transparent hover:border-border-light focus:border-accent-primary focus:outline-none pb-1"
              placeholder="Goal title"
            />
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
              <span className="text-text-secondary">{categoryInfo?.emoji} {categoryInfo?.label}</span>
              <label className="flex items-center gap-1">
                <span className="text-text-tertiary">Time/day:</span>
                <input
                  type="number"
                  value={goal.timePerDay}
                  onChange={(e) => onUpdate({ timePerDay: parseInt(e.target.value, 10) || 30 })}
                  min={5}
                  max={180}
                  className="w-16 px-2 py-0.5 border border-border-light rounded text-center"
                />
                <span className="text-text-tertiary">min</span>
              </label>
              <label className="flex items-center gap-1">
                <span className="text-text-tertiary">Days/week:</span>
                <input
                  type="number"
                  value={goal.daysPerWeek}
                  onChange={(e) => onUpdate({ daysPerWeek: parseInt(e.target.value, 10) || 5 })}
                  min={1}
                  max={7}
                  className="w-14 px-2 py-0.5 border border-border-light rounded text-center"
                />
              </label>
            </div>
            {goal.keyResults.length > 0 && (
              <ul className="mt-2 text-sm text-text-secondary list-disc list-inside">
                {goal.keyResults.map((kr, j) => (
                  <li key={j}>{kr}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => onUpdate({ confirmed: !isConfirmed })}
            className={`px-3 py-1.5 rounded-design-sm font-medium text-sm ${
              isConfirmed
                ? 'bg-green-100 text-green-800'
                : 'bg-border-light text-text-secondary hover:bg-border-medium'
            }`}
          >
            {isConfirmed ? '✓ Confirmed' : 'Confirm'}
          </button>
          {canRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 text-text-tertiary hover:text-red-600"
              aria-label="Remove goal"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
