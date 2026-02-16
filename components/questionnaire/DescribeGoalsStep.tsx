'use client';

import type { QuestionnaireData } from '@/types';

interface DescribeGoalsStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

const EXAMPLE = `Study AWS 1 hour per day
Solve 2 LeetCode problems per day
Work on my side project
Go to the gym 6 times a week`;

export default function DescribeGoalsStep({ formData, updateFormData }: DescribeGoalsStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Describe Your Goals
      </h2>
      <p className="text-text-secondary mb-4">
        You can work on <strong>multiple things</strong>. List each goal with time commitments—we&apos;ll convert them into SMART goals.
      </p>

      <div className="mb-4 p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-design-lg">
        <p className="text-sm font-medium text-text-primary mb-2">
          Be specific with time: &quot;X hours per day&quot;, &quot;Y times per week&quot;
        </p>
        <p className="text-xs text-text-secondary">
          Example: Study AWS 1 hour per day, Gym 6 times a week, 2 LeetCode problems daily
        </p>
      </div>

      <label className="block text-sm font-medium mb-2 text-text-primary">
        Your goals (one per line or comma-separated)
      </label>
      <textarea
        value={formData.goalsRaw || ''}
        onChange={(e) => updateFormData({ goalsRaw: e.target.value })}
        placeholder={EXAMPLE}
        rows={8}
        className="w-full px-4 py-3 border-2 border-border-light rounded-design-lg bg-white text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none resize-y"
      />

      <p className="text-xs text-text-tertiary mt-2">
        Our AI will convert your list into structured SMART goals—our unique approach.
      </p>
    </div>
  );
}
