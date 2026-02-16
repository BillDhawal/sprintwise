import type { QuestionnaireData, STARMethod } from '@/types';

interface STARStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function STARStep({ formData, updateFormData }: STARStepProps) {
  const updateSTAR = (field: keyof STARMethod, value: string) => {
    updateFormData({
      star: {
        ...(formData.star || { situation: '', task: '', action: '', result: '' }),
        [field]: value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        Tell Us About Your Goal (STAR Method)
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Help us understand your goal better to create a personalized plan
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Situation:</span> What&apos;s your current situation?
          </label>
          <textarea
            value={formData.star?.situation || ''}
            onChange={(e) => updateSTAR('situation', e.target.value)}
            placeholder="Describe where you are now and why this goal matters to you..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Task:</span> What do you need to accomplish?
          </label>
          <textarea
            value={formData.star?.task || ''}
            onChange={(e) => updateSTAR('task', e.target.value)}
            placeholder="Define the specific task or challenge you're facing..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Action:</span> What actions will you take?
          </label>
          <textarea
            value={formData.star?.action || ''}
            onChange={(e) => updateSTAR('action', e.target.value)}
            placeholder="Describe the steps you plan to take to reach your goal..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Result:</span> What&apos;s your desired outcome?
          </label>
          <textarea
            value={formData.star?.result || ''}
            onChange={(e) => updateSTAR('result', e.target.value)}
            placeholder="What will success look like after 30 days?..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
