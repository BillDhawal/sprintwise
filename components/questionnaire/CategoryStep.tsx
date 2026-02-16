import type { QuestionnaireData } from '@/types';
import { goalCategories } from '@/lib/data/mockData';

interface CategoryStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function CategoryStep({ formData, updateFormData }: CategoryStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        Choose Your Goal Category
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select the area you&apos;d like to focus on for the next 30 days
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {goalCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => updateFormData({ category: category.value })}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              formData.category === category.value
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-3xl mr-3">{category.emoji}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {category.label}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.description}
            </p>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
          What specific goal do you want to achieve?
        </label>
        <input
          type="text"
          value={formData.goalTitle || ''}
          onChange={(e) => updateFormData({ goalTitle: e.target.value })}
          placeholder="E.g., Run a 5K, Save $1000, Learn Python..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
    </div>
  );
}
