'use client';

import type { QuestionnaireData, GoalDefinition } from '@/types';
import { getPrompts } from '@/lib/data/goal-prompts';

interface GoalDefinitionStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const MIN_KEY_RESULTS = 2;
const MAX_KEY_RESULTS = 5;

export default function GoalDefinitionStep({ formData, updateFormData }: GoalDefinitionStepProps) {
  const category = formData.category || 'custom';
  const prompts = getPrompts(category);
  const goalDef = formData.goalDefinition || {
    objective: '',
    keyResults: ['', ''],
    achievable: undefined,
  };

  const updateGoalDef = (updates: Partial<GoalDefinition>) => {
    updateFormData({
      goalDefinition: { ...goalDef, ...updates },
    });
  };

  const setKeyResult = (index: number, value: string) => {
    const next = [...(goalDef.keyResults || ['', ''])];
    while (next.length <= index) next.push('');
    next[index] = value;
    updateGoalDef({ keyResults: next });
  };

  const addKeyResult = () => {
    const current = goalDef.keyResults || ['', ''];
    if (current.length < MAX_KEY_RESULTS) {
      updateGoalDef({ keyResults: [...current, ''] });
    }
  };

  const removeKeyResult = (index: number) => {
    const next = (goalDef.keyResults || []).filter((_, i) => i !== index);
    if (next.length < MIN_KEY_RESULTS) return;
    updateGoalDef({ keyResults: next });
  };

  const keyResults = goalDef.keyResults || ['', ''];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Define Your Goal (OKRs + SMART)
      </h2>
      <p className="text-text-secondary mb-6">
        We use Objectives & Key Results plus SMART criteria to create a clear, measurable plan.
      </p>

      {/* Step 1: Objective (OKRs) */}
      <div className="mb-8">
        <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent-primary text-white flex items-center justify-center text-sm">1</span>
          Objective — Your big-picture goal
        </h3>
        <p className="text-xs text-text-tertiary mb-2">Specific & Relevant (SMART)</p>
        <input
          type="text"
          value={goalDef.objective}
          onChange={(e) => updateGoalDef({ objective: e.target.value })}
          placeholder={prompts.objectiveHint}
          className="w-full px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-primary outline-none"
        />
      </div>

      {/* Step 2: Key Results (OKRs) */}
      <div className="mb-8">
        <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent-primary text-white flex items-center justify-center text-sm">2</span>
          Key Results — 2–5 measurable steps
        </h3>
        <p className="text-xs text-text-tertiary mb-3">{prompts.measurableHint}</p>
        <div className="space-y-3">
          {keyResults.map((kr, i) => (
            <div key={i} className="flex gap-2">
              <span className="flex-shrink-0 w-6 h-10 flex items-center text-sm text-text-tertiary">
                {i + 1}.
              </span>
              <input
                type="text"
                value={kr}
                onChange={(e) => setKeyResult(i, e.target.value)}
                placeholder={prompts.keyResultPlaceholders[i] || `Key result ${i + 1}`}
                className="flex-1 px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-primary outline-none"
              />
              {keyResults.length > MIN_KEY_RESULTS && (
                <button
                  type="button"
                  onClick={() => removeKeyResult(i)}
                  className="px-2 text-text-tertiary hover:text-accent-coral"
                  aria-label="Remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        {keyResults.length < MAX_KEY_RESULTS && (
          <button
            type="button"
            onClick={addKeyResult}
            className="mt-2 text-sm text-accent-primary hover:text-accent-teal font-medium"
          >
            + Add another key result
          </button>
        )}
      </div>

      {/* Step 3: SMART — Achievable check */}
      <div>
        <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent-primary text-white flex items-center justify-center text-sm">3</span>
          Is this achievable in 30 days? (SMART)
        </h3>
        <p className="text-xs text-text-tertiary mb-3">Time-bound: 30 days ✓</p>
        <div className="flex gap-4">
          <button
            onClick={() => updateGoalDef({ achievable: 'yes' })}
            className={`flex-1 p-4 border-2 rounded-design-xl text-left transition-all ${
              goalDef.achievable === 'yes'
                ? 'border-accent-primary bg-accent-primary/10'
                : 'border-border-light hover:border-border-medium'
            }`}
          >
            <span className="font-medium text-text-primary">Yes, it&apos;s realistic</span>
            <p className="text-sm text-text-secondary mt-1">I can do this in 30 days</p>
          </button>
          <button
            onClick={() => updateGoalDef({ achievable: 'scale-down' })}
            className={`flex-1 p-4 border-2 rounded-design-xl text-left transition-all ${
              goalDef.achievable === 'scale-down'
                ? 'border-accent-primary bg-accent-primary/10'
                : 'border-border-light hover:border-border-medium'
            }`}
          >
            <span className="font-medium text-text-primary">I&apos;ll scale it down</span>
            <p className="text-sm text-text-secondary mt-1">Adjust key results to be more achievable</p>
          </button>
        </div>
      </div>
    </div>
  );
}
