'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { QuestionnaireData, GoalCategory, STARMethod, Schedule, GiftMode } from '@/types';
import { goalCategories } from '@/lib/data/mockData';
import CategoryStep from '@/components/questionnaire/CategoryStep';
import STARStep from '@/components/questionnaire/STARStep';
import ScheduleStep from '@/components/questionnaire/ScheduleStep';
import GiftModeStep from '@/components/questionnaire/GiftModeStep';

const steps = ['Category', 'Goal Details', 'Schedule', 'Gift Mode'];

function QuestionnaireContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGiftFromUrl = searchParams.get('gift') === 'true';

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    giftMode: { isGift: isGiftFromUrl },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save to sessionStorage and navigate to preview
      sessionStorage.setItem('questionnaireData', JSON.stringify(formData));
      router.push('/plan');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<QuestionnaireData>) => {
    setFormData({ ...formData, ...data });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.category && !!formData.goalTitle;
      case 1:
        return formData.star?.situation && formData.star?.task && 
               formData.star?.action && formData.star?.result;
      case 2:
        return formData.schedule?.daysPerWeek && formData.schedule?.timePerDay;
      case 3:
        if (formData.giftMode?.isGift) {
          return !!formData.giftMode?.recipientName;
        }
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`text-sm font-medium ${
                    index <= currentStep
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-400'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 0 && (
              <CategoryStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 1 && (
              <STARStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 2 && (
              <ScheduleStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 3 && (
              <GiftModeStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Generate Plan' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <QuestionnaireContent />
    </Suspense>
  );
}
