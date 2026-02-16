'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuestionnaireData, Plan } from '@/types';
import { generatePlanWithAI } from '@/lib/ai/generate-plan';
import PlanPreview from '@/components/plan/PlanPreview';
import PlanPoster from '@/components/plan/PlanPoster';

type ViewMode = 'calendar' | 'list' | 'poster';
type PrintLayout = 'poster' | 'planner';

export default function PlanPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [printLayout, setPrintLayout] = useState<PrintLayout>('poster');
  const [printVariant, setPrintVariant] = useState<'color' | 'bw'>('bw');

  useEffect(() => {
    const data = sessionStorage.getItem('questionnaireData');
    if (!data) {
      router.push('/create');
      return;
    }

    let cancelled = false;

    async function loadPlan() {
      try {
        const questionnaireData: QuestionnaireData = JSON.parse(data!);
        const generatedPlan = await generatePlanWithAI(questionnaireData);
        if (!cancelled) setPlan(generatedPlan);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to generate plan');
        }
      }
    }

    loadPlan();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const handlePrint = () => {
    window.print();
  };

  const handleNewPlan = () => {
    sessionStorage.removeItem('questionnaireData');
    router.push('/');
  };

  const handleGeneratedPosterUrl = (url: string) => {
    const data = sessionStorage.getItem('questionnaireData');
    if (!data || !plan) return;
    try {
      const q = JSON.parse(data) as QuestionnaireData;
      q.generatedPosterUrl = url;
      sessionStorage.setItem('questionnaireData', JSON.stringify(q));
      setPlan((prev) =>
        prev
          ? {
              ...prev,
              questionnaire: { ...prev.questionnaire, generatedPosterUrl: url },
            }
          : null
      );
    } catch {
      // ignore
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="text-center max-w-md">
          <p className="text-accent-coral mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              router.push('/create');
            }}
            className="px-6 py-2 bg-accent-primary text-white rounded-design-md font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-border-light border-t-accent-primary mx-auto mb-4" />
          <p className="text-text-secondary">Generating your personalized plan...</p>
          <p className="text-sm text-text-tertiary mt-2">Using AI to create your 30-day action plan</p>
        </div>
      </div>
    );
  }

  const isGift = plan.questionnaire.giftMode?.isGift ?? false;

  return (
    <div className="min-h-screen bg-canvas">
      <div className="bg-white border-b border-border-light py-4 px-4 no-print" data-print-hide>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-text-primary">Sprintwise</h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-text-tertiary mr-2">View:</span>
            {(['calendar', 'list', 'poster'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-design-md text-sm font-medium capitalize transition-colors ${
                  viewMode === mode
                    ? 'bg-accent-primary text-white'
                    : 'bg-canvas text-text-secondary hover:bg-border-light'
                }`}
              >
                {mode}
              </button>
            ))}
            <span className="w-px h-6 bg-border-light mx-1" />
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-accent-primary text-white rounded-design-md font-bold hover:opacity-90 transition-opacity"
            >
              🖨️ Print / Save PDF
            </button>
            <button
              onClick={handleNewPlan}
              className="px-4 py-2 border-2 border-border-medium text-text-primary rounded-design-md font-semibold hover:bg-canvas transition-colors"
            >
              New Plan
            </button>
          </div>
        </div>
        {viewMode === 'poster' && (
          <div className="max-w-6xl mx-auto mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-text-tertiary">Layout:</span>
              <button
                onClick={() => setPrintLayout('poster')}
                className={`px-2 py-1 rounded-design-sm ${printLayout === 'poster' ? 'bg-accent-primary/20 text-accent-primary font-medium' : 'text-text-secondary'}`}
              >
                Poster
              </button>
              <button
                onClick={() => setPrintLayout('planner')}
                className={`px-2 py-1 rounded-design-sm ${printLayout === 'planner' ? 'bg-accent-primary/20 text-accent-primary font-medium' : 'text-text-secondary'}`}
              >
                Planner
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-tertiary">Print style:</span>
              <button
                onClick={() => setPrintVariant('bw')}
                className={`px-2 py-1 rounded-design-sm ${printVariant === 'bw' ? 'bg-accent-primary/20 text-accent-primary font-medium' : 'text-text-secondary'}`}
              >
                B&W
              </button>
              <button
                onClick={() => setPrintVariant('color')}
                className={`px-2 py-1 rounded-design-sm ${printVariant === 'color' ? 'bg-accent-primary/20 text-accent-primary font-medium' : 'text-text-secondary'}`}
              >
                Color
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="py-8 px-4">
        {viewMode === 'poster' ? (
          <PlanPoster
            plan={plan}
            layout={printLayout}
            variant={printVariant}
            onGeneratedPosterUrl={handleGeneratedPosterUrl}
          />
        ) : (
          <PlanPreview plan={plan} viewMode={viewMode} />
        )}
      </div>

      {isGift && (
        <div className="max-w-6xl mx-auto px-4 pb-12 no-print" data-print-hide>
          <div className="bg-accent-peach/20 border border-accent-peach/40 rounded-design-xl p-6 mt-8">
            <h3 className="font-semibold text-text-primary mb-2">Gift Option</h3>
            <p className="text-sm text-text-secondary mb-4">
              Order a physical print of this plan (coming soon). For now, use Print / Save PDF to download.
            </p>
            <button
              disabled
              className="px-6 py-2 bg-border-light text-text-tertiary rounded-design-md font-medium cursor-not-allowed"
            >
              Order Print (Coming Soon)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
