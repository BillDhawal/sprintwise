'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuestionnaireData, GoalPlan } from '@/types';
import { generateGoalPlan, getCategoryInfo } from '@/lib/data/mockData';
import PlanPreview from '@/components/plan/PlanPreview';
import PlanPoster from '@/components/plan/PlanPoster';

export default function PlanPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<GoalPlan | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'poster'>('preview');

  useEffect(() => {
    const data = sessionStorage.getItem('questionnaireData');
    if (!data) {
      router.push('/questionnaire');
      return;
    }

    const questionnaireData: QuestionnaireData = JSON.parse(data);
    const generatedPlan = generateGoalPlan(questionnaireData);
    setPlan(generatedPlan);
  }, [router]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Generating your personalized plan...</p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleNewPlan = () => {
    sessionStorage.removeItem('questionnaireData');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar - Hide on print */}
      <nav className="no-print bg-white dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            Sprintwise
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'preview'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('poster')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'poster'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              Poster View
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              🖨️ Print
            </button>
            <button
              onClick={handleNewPlan}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              New Plan
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="py-8 px-4">
        {viewMode === 'preview' ? (
          <PlanPreview plan={plan} />
        ) : (
          <PlanPoster plan={plan} />
        )}
      </div>
    </div>
  );
}
