'use client';

import type { QuestionnaireData } from '@/types';

interface WhoStepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function WhoStep({ formData, updateFormData }: WhoStepProps) {
  const isGift = formData.giftMode?.isGift ?? false;

  const setGift = (value: boolean) => {
    updateFormData({
      giftMode: {
        ...(formData.giftMode || {}),
        isGift: value,
        recipientName: value ? formData.giftMode?.recipientName : undefined,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-text-primary">
        Who is this for?
      </h2>
      <p className="text-text-secondary mb-6">
        Are you creating this plan for yourself or as a gift for someone?
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => setGift(false)}
          className={`p-6 border-2 rounded-design-xl text-left transition-all ${
            !isGift
              ? 'border-accent-primary bg-accent-primary/10'
              : 'border-border-light hover:border-border-medium'
          }`}
        >
          <span className="text-3xl block mb-2">👤</span>
          <h3 className="font-semibold text-text-primary">Myself</h3>
          <p className="text-sm text-text-secondary mt-1">
            I&apos;m creating this plan for my own goals
          </p>
        </button>
        <button
          onClick={() => setGift(true)}
          className={`p-6 border-2 rounded-design-xl text-left transition-all ${
            isGift
              ? 'border-accent-primary bg-accent-primary/10'
              : 'border-border-light hover:border-border-medium'
          }`}
        >
          <span className="text-3xl block mb-2">🎁</span>
          <h3 className="font-semibold text-text-primary">Gift for Someone</h3>
          <p className="text-sm text-text-secondary mt-1">
            I want to create a personalized plan as a gift
          </p>
        </button>
      </div>

      {isGift && (
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2 text-text-primary">
            Recipient&apos;s Name *
          </label>
          <input
            type="text"
            value={formData.giftMode?.recipientName || ''}
            onChange={(e) =>
              updateFormData({
                giftMode: {
                  isGift: true,
                  ...(formData.giftMode || {}),
                  recipientName: e.target.value,
                },
              })
            }
            placeholder="Enter their name"
            className="w-full px-4 py-2 border border-border-light rounded-design-sm bg-white text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none"
          />
        </div>
      )}
    </div>
  );
}
