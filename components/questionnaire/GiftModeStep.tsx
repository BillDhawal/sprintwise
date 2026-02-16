import type { QuestionnaireData, GiftMode } from '@/types';

interface GiftModeStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function GiftModeStep({ formData, updateFormData }: GiftModeStepProps) {
  const updateGiftMode = (field: keyof GiftMode, value: string | boolean) => {
    updateFormData({
      giftMode: {
        ...(formData.giftMode || { isGift: false }),
        [field]: value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        Gift Mode (Optional)
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Creating this plan as a gift for someone special?
      </p>

      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isGift"
            checked={formData.giftMode?.isGift || false}
            onChange={(e) => updateGiftMode('isGift', e.target.checked)}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="isGift" className="text-gray-900 dark:text-white font-medium">
            Yes, this is a gift plan
          </label>
        </div>

        {formData.giftMode?.isGift && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Recipient&apos;s Name *
              </label>
              <input
                type="text"
                value={formData.giftMode?.recipientName || ''}
                onChange={(e) => updateGiftMode('recipientName', e.target.value)}
                placeholder="Enter the recipient&apos;s name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Personal Message (Optional)
              </label>
              <textarea
                value={formData.giftMode?.message || ''}
                onChange={(e) => updateGiftMode('message', e.target.value)}
                placeholder="Add a personal message or words of encouragement..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
              <p className="text-sm text-purple-900 dark:text-purple-200">
                🎁 The recipient&apos;s name and your message will be beautifully displayed on the printed plan poster.
              </p>
            </div>
          </>
        )}

        {!formData.giftMode?.isGift && (
          <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 If you&apos;re creating this plan for yourself, you&apos;re all set! Click &quot;Generate Plan&quot; to continue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
