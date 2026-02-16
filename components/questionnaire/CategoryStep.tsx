'use client';

import type { QuestionnaireData } from '@/types';
import { goalCategories } from '@/lib/data/goal-categories';

interface CategoryStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function CategoryStep({ formData, updateFormData }: CategoryStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Choose Your Goal Category
      </h2>
      <p className="text-text-secondary mb-6">
        Select the area you&apos;d like to focus on for the next 30 days
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {goalCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => updateFormData({ category: category.value })}
            className={`p-4 border-2 rounded-design-xl text-left transition-all ${
              formData.category === category.value
                ? 'border-accent-primary bg-accent-primary/10'
                : 'border-border-light hover:border-border-medium'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{category.emoji}</span>
              <h3 className="font-semibold text-text-primary">{category.label}</h3>
            </div>
            <p className="text-sm text-text-secondary">{category.description}</p>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          Goal description
        </label>
        <input
          type="text"
          value={formData.goalTitle || ''}
          onChange={(e) => updateFormData({ goalTitle: e.target.value })}
          placeholder="E.g., Run a 5K, Save $1000, Learn Python..."
          className="w-full px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none"
        />
      </div>
    </div>
  );
}
