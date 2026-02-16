'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { QuestionnaireData } from '@/types';
import { parseGoalsWithAI } from '@/lib/ai/parse-goals';
import WhoStep from '@/components/questionnaire/WhoStep';
import DescribeGoalsStep from '@/components/questionnaire/DescribeGoalsStep';
import ReviewGoalsStep from '@/components/questionnaire/ReviewGoalsStep';
import ScheduleStep from '@/components/questionnaire/ScheduleStep';
import GiftDetailsStep from '@/components/questionnaire/GiftDetailsStep';
import ThemeStep from '@/components/questionnaire/ThemeStep';

const STEPS = ['Who', 'Goals', 'Review', 'Schedule', 'Gift Details', 'Theme'];

function QuestionnaireContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGiftFromUrl = searchParams.get('gift') === 'true';

  const [currentStep, setCurrentStep] = useState(0);
  const [isParsing, setIsParsing] = useState(false);
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    giftMode: { isGift: isGiftFromUrl },
    schedule: {
      daysPerWeek: 5,
      timePerDay: 30,
      preferredTime: 'flexible',
      wakeUpTime: '7:00',
      sleepTime: '23:00',
      workingDays: [1, 2, 3, 4, 5],
    },
    intensity: 'medium',
  });

  const showGiftStep = formData.giftMode?.isGift;
  const lastStep = showGiftStep ? 5 : 4; // Theme is always last before plan

  const handleNext = async () => {
    if (currentStep === 1 && !formData.goals?.length) {
      setIsParsing(true);
      try {
        const parsed = await parseGoalsWithAI(formData.goalsRaw || '');
        setFormData((prev) => ({ ...prev, goals: parsed }));
        setCurrentStep(2);
      } catch {
        setFormData((prev) => ({ ...prev, goals: [] }));
      } finally {
        setIsParsing(false);
      }
      return;
    }

    if (currentStep < lastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      sessionStorage.setItem('questionnaireData', JSON.stringify(formData));
      router.push('/plan');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const updateFormData = (data: Partial<QuestionnaireData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const themeStepIndex = showGiftStep ? 5 : 4;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        if (formData.giftMode?.isGift) {
          return !!formData.giftMode?.recipientName?.trim();
        }
        return true;
      case 1:
        return !!formData.goalsRaw?.trim();
      case 2:
        return (
          (formData.goals?.length ?? 0) > 0 &&
          formData.goals!.every((g) => g.confirmed)
        );
      case 3:
        return true;
      case 4:
        return true;
      default:
        if (currentStep === themeStepIndex) {
          return !!formData.posterTheme && !!formData.userImageUrl;
        }
        return false;
    }
  };

  const getNextLabel = () => {
    if (currentStep === 1 && !formData.goals?.length) {
      return 'Convert to SMART Goals';
    }
    if (currentStep === lastStep) return 'Generate Plan';
    return 'Next';
  };

  const effectiveSteps = showGiftStep ? STEPS : [...STEPS.slice(0, 4), 'Theme'];

  return (
    <div className="min-h-screen bg-canvas py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-design-2xl shadow-soft-md border border-border-light p-8">
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm font-medium text-text-secondary">
              {effectiveSteps.map((step, i) => (
                <span
                  key={step}
                  className={i <= currentStep ? 'text-text-primary' : ''}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="w-full bg-border-light rounded-full h-2">
              <div
                className="bg-accent-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / effectiveSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-8 min-h-[320px]">
            {currentStep === 0 && (
              <WhoStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 1 && (
              <DescribeGoalsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
              <ReviewGoalsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 3 && (
              <ScheduleStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 4 && showGiftStep && (
              <GiftDetailsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === (showGiftStep ? 5 : 4) && (
              <ThemeStep formData={formData} updateFormData={updateFormData} />
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || isParsing}
              className="px-6 py-2 border-2 border-border-medium rounded-design-md font-semibold text-text-primary hover:bg-canvas disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.goalsRaw?.trim()) ||
                (currentStep === 2 && !canProceed()) ||
                (currentStep === 3 && !canProceed()) ||
                (currentStep === 4 && !canProceed()) ||
                (currentStep === themeStepIndex && !canProceed()) ||
                isParsing
              }
              className="px-6 py-2 bg-accent-primary text-white rounded-design-md font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isParsing ? 'Converting...' : getNextLabel()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-canvas">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-border-light border-t-accent-primary mx-auto mb-4" />
            <p className="text-text-secondary">Loading...</p>
          </div>
        </div>
      }
    >
      <QuestionnaireContent />
    </Suspense>
  );
}
