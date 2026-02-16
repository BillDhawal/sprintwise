'use client';

import type { QuestionnaireData } from '@/types';

interface GiftDetailsStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function GiftDetailsStep({ formData, updateFormData }: GiftDetailsStepProps) {
  const giftMode = formData.giftMode || { isGift: false };

  const updateGift = (field: keyof typeof giftMode, value: string | boolean) => {
    updateFormData({
      giftMode: { ...giftMode, [field]: value },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Gift Details
      </h2>
      <p className="text-text-secondary mb-6">
        Add a personal touch to your gift plan
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-text-primary">
            Your name (sender)
          </label>
          <input
            type="text"
            value={giftMode.senderName || ''}
            onChange={(e) => updateGift('senderName', e.target.value)}
            placeholder="Who is this gift from?"
            className="w-full px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-text-primary">
            Custom message (optional)
          </label>
          <textarea
            value={giftMode.message || ''}
            onChange={(e) => updateGift('message', e.target.value)}
            placeholder="Add a personal message or words of encouragement..."
            rows={4}
            className="w-full px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-primary outline-none"
          />
        </div>

        <div className="bg-accent-peach/20 border border-accent-peach/40 rounded-design-lg p-4">
          <p className="text-sm text-text-secondary">
            The recipient&apos;s name and your message will be displayed on the printed plan. You can also order a physical print (coming soon).
          </p>
        </div>
      </div>
    </div>
  );
}
