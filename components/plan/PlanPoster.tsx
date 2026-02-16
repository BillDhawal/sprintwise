'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Plan } from '@/types';
import { getCategoryInfo } from '@/lib/data/goal-categories';
import { getTemplateById, getTemplateUrlForKie } from '@/lib/data/poster-templates';
import { generatePosterImage } from '@/lib/kie/generate-poster';

interface PlanPosterProps {
  plan: Plan;
  layout: 'poster' | 'planner';
  variant?: 'color' | 'bw';
  onGeneratedPosterUrl?: (url: string) => void;
}

export default function PlanPoster({ plan, layout, variant = 'bw', onGeneratedPosterUrl }: PlanPosterProps) {
  const categoryInfo = getCategoryInfo(plan.category);
  const { questionnaire } = plan;
  const isBw = variant === 'bw';
  const posterTheme = questionnaire.posterTheme;
  const userImageUrl = questionnaire.userImageUrl;

  const [generatedUrl, setGeneratedUrl] = useState<string | null>(questionnaire.generatedPosterUrl ?? null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const triggerGeneration = useCallback(async () => {
    if (!posterTheme || !userImageUrl) return;
    const template = getTemplateById(posterTheme);
    if (!template) return;

    const templateUrl = getTemplateUrlForKie(posterTheme);

    setIsGenerating(true);
    setGenerateError(null);
    try {
      const { imageUrl } = await generatePosterImage(templateUrl, userImageUrl);
      setGeneratedUrl(imageUrl);
      onGeneratedPosterUrl?.(imageUrl);
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [posterTheme, userImageUrl, onGeneratedPosterUrl]);

  useEffect(() => {
    setGeneratedUrl(questionnaire.generatedPosterUrl ?? null);
  }, [questionnaire.generatedPosterUrl]);

  const borderCls = isBw ? 'border-black' : 'border-accent-primary';
  const bgCls = isBw ? 'bg-white' : 'bg-white';
  const textCls = isBw ? 'text-black' : 'text-text-primary';
  const accentCls = isBw ? 'text-black' : 'text-text-secondary';

  if (layout === 'planner') {
    return (
      <div className={`max-w-[210mm] mx-auto ${bgCls} p-8 print:p-4 ${isBw ? 'print-bw' : ''}`}>
        <div className={`text-center mb-6 pb-4 border-b-4 ${borderCls}`}>
          <h1 className={`text-2xl font-bold ${textCls}`}>{plan.goalTitle}</h1>
          <p className={`text-sm mt-1 ${accentCls}`}>
            30-Day {categoryInfo?.label} Plan • {plan.recipientName}
          </p>
          {questionnaire.giftMode?.isGift && (
            <div className={`mt-3 p-3 border ${borderCls} rounded-design-sm`}>
              <p className={`text-sm font-semibold ${textCls}`}>
                🎁 For: {questionnaire.giftMode.recipientName}
              </p>
              {questionnaire.giftMode.senderName && (
                <p className={`text-xs ${accentCls}`}>From: {questionnaire.giftMode.senderName}</p>
              )}
              {questionnaire.giftMode.message && (
                <p className={`text-xs mt-1 italic ${accentCls}`}>
                  &quot;{questionnaire.giftMode.message}&quot;
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {plan.days.map((day) => (
            <div
              key={day.day}
              className={`border ${borderCls} rounded-design-sm p-3 print:break-inside-avoid`}
            >
              <span className={`font-bold text-sm ${textCls}`}>Day {day.day}</span>
              <ul className="text-xs mt-2 space-y-1">
                {day.tasks.filter(Boolean).map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-3.5 h-3.5 border-2 border-current rounded" />
                    <span className={textCls}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-6 pt-4 border-t-2 ${borderCls} text-center`}>
          <p className={`text-xs ${accentCls}`}>
            Sprintwise • 30-day goal planner
          </p>
        </div>
      </div>
    );
  }

  // Themed poster layout: base template + goals overlay
  if (posterTheme) {
    const template = getTemplateById(posterTheme);
    const backgroundUrl = generatedUrl || (template?.imagePath ?? '');

    return (
      <div className="max-w-4xl mx-auto">
        <div className="no-print mb-4 flex flex-wrap items-center gap-3" data-print-hide>
          {userImageUrl && !generatedUrl && !isGenerating && (
            <button
              onClick={triggerGeneration}
              className="px-4 py-2 bg-accent-primary text-white rounded-design-md font-medium hover:opacity-90"
            >
              Generate personalized poster
            </button>
          )}
          {isGenerating && (
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-border-light border-t-accent-primary" />
              <span>Generating personalized poster…</span>
            </div>
          )}
          {generateError && (
            <p className="text-sm text-accent-coral">{generateError}</p>
          )}
        </div>

        <div className="relative w-full aspect-[4/3] max-h-[80vh] rounded-design-xl overflow-hidden shadow-lg print:shadow-none">
          {generatedUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- KIE returns external URLs from various domains
            <img
              src={backgroundUrl}
              alt="Personalized poster"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={backgroundUrl}
              alt="Poster template"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          )}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 gap-1 p-[8%]">
            {plan.days.map((day) => {
              const tasks = day.tasks.filter(Boolean);
              return (
                <div
                  key={day.day}
                  className="flex flex-col justify-end p-1.5 rounded bg-white/80 backdrop-blur-sm border border-black/10"
                >
                  <span className="text-[0.5rem] font-bold text-black/70">Day {day.day}</span>
                  <div className="mt-0.5 space-y-0.5">
                    {tasks.length === 0 ? (
                      <span className="text-[0.4rem] text-black/60">Rest</span>
                    ) : (
                      tasks.map((t, i) => (
                        <div key={i} className="flex items-center gap-0.5">
                          <span className="flex-shrink-0 w-1.5 h-1.5 border border-black/50 rounded-sm" />
                          <span className="text-[0.4rem] line-clamp-1 text-black">{t}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center text-xs text-text-tertiary mt-4 print:mt-2">
          Created with Sprintwise • Tick off each item as you complete it
        </p>
      </div>
    );
  }

  // Default poster layout (no theme)
  return (
    <div className={`max-w-[297mm] mx-auto ${bgCls} p-8 print:p-6 print-poster ${isBw ? 'print-bw' : ''}`}>
      <div className={`text-center mb-8 pb-6 border-b-4 ${borderCls}`}>
        <div className="text-4xl mb-3">{categoryInfo?.emoji}</div>
        <h1 className={`text-3xl font-bold ${textCls}`}>{plan.goalTitle}</h1>
        <p className={`text-lg mt-1 ${accentCls}`}>
          30-Day {categoryInfo?.label} Challenge
        </p>
        {questionnaire.giftMode?.isGift && (
          <div className={`mt-4 p-4 border-2 ${borderCls} rounded-design-lg`}>
            <p className={`text-xl font-bold ${textCls}`}>
              🎁 For: {questionnaire.giftMode.recipientName}
            </p>
            {questionnaire.giftMode.senderName && (
              <p className={`text-sm ${accentCls}`}>From: {questionnaire.giftMode.senderName}</p>
            )}
            {questionnaire.giftMode.message && (
              <p className={`text-sm mt-2 italic ${accentCls}`}>
                &quot;{questionnaire.giftMode.message}&quot;
              </p>
            )}
          </div>
        )}
      </div>

      <h2 className={`text-xl font-bold ${textCls} mb-4 text-center`}>
        Your 30-Day Journey
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {plan.days.map((day) => {
          const tasks = day.tasks.filter(Boolean);
          return (
            <div
              key={day.day}
              className={`min-h-[90px] border-2 rounded-design-md p-2 ${borderCls}`}
            >
              <div className={`text-xs font-bold ${textCls}`}>Day {day.day}</div>
              <div className="mt-1 space-y-0.5">
                {tasks.length === 0 ? (
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 border-2 border-current rounded" />
                    <span className={`text-[0.5rem] ${accentCls}`}>Rest</span>
                  </div>
                ) : (
                  tasks.map((t, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="flex-shrink-0 w-2.5 h-2.5 border-2 border-current rounded" />
                      <span className={`text-[0.5rem] line-clamp-1 ${textCls}`}>{t}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-8 pt-6 border-t-2 ${borderCls} text-center`}>
        <p className={`text-xs ${accentCls}`}>
          Created with Sprintwise • Tick off each item as you complete it
        </p>
      </div>
    </div>
  );
}
