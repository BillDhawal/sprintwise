'use client';

import type { Plan, PlanDay } from '@/types';
import { getCategoryInfo } from '@/lib/data/goal-categories';

interface PlanPreviewProps {
  plan: Plan;
  viewMode: 'calendar' | 'list' | 'poster';
}

export default function PlanPreview({ plan, viewMode }: PlanPreviewProps) {
  const categoryInfo = getCategoryInfo(plan.category);
  const { questionnaire } = plan;

  if (viewMode === 'calendar') {
    return <CalendarView plan={plan} categoryInfo={categoryInfo} />;
  }
  if (viewMode === 'list') {
    return <ListView plan={plan} categoryInfo={categoryInfo} />;
  }
  return <PosterPreview plan={plan} categoryInfo={categoryInfo} />;
}

function Header({
  plan,
  categoryInfo,
}: {
  plan: Plan;
  categoryInfo: ReturnType<typeof getCategoryInfo>;
}) {
  const { questionnaire } = plan;
  const gd = questionnaire.goalDefinition;
  const goals = plan.goals;
  const keyResults = gd?.keyResults?.filter((k) => k?.trim()) || [];
  return (
    <div className="text-center mb-8">
      <div className="text-5xl mb-4">{categoryInfo?.emoji}</div>
      <h1 className="text-3xl font-bold text-text-primary mb-2">{plan.goalTitle}</h1>
      <p className="text-lg text-text-secondary">
        30-Day Plan for {plan.recipientName}
      </p>
      {goals?.length ? (
        <div className="mt-6 p-4 bg-accent-primary/10 border border-accent-primary/30 rounded-design-xl text-left max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-text-primary mb-2">Your Goals</p>
          <ul className="space-y-2">
            {goals.map((g) => (
              <li key={g.id} className="text-text-secondary">
                <strong>{g.title}</strong> — {g.timePerDay}min/day, {g.daysPerWeek}x/week
                {g.keyResults[0] && (
                  <span className="block text-sm text-text-tertiary mt-0.5">→ {g.keyResults[0]}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : gd?.objective && (
        <div className="mt-6 p-4 bg-accent-primary/10 border border-accent-primary/30 rounded-design-xl text-left max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-text-primary mb-2">Objective</p>
          <p className="text-text-secondary">{gd.objective}</p>
          {keyResults.length > 0 && (
            <>
              <p className="text-sm font-semibold text-text-primary mt-3 mb-2">Key Results</p>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                {keyResults.map((kr, i) => (
                  <li key={i}>{kr}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
      {questionnaire.giftMode?.isGift && (
        <div className="mt-6 p-4 bg-accent-peach/20 border border-accent-peach/40 rounded-design-xl max-w-xl mx-auto">
          <p className="font-semibold text-text-primary">
            🎁 For: {questionnaire.giftMode.recipientName}
          </p>
          {questionnaire.giftMode.senderName && (
            <p className="text-sm text-text-secondary mt-1">
              From: {questionnaire.giftMode.senderName}
            </p>
          )}
          {questionnaire.giftMode.message && (
            <p className="text-sm text-text-secondary mt-2 italic">
              &quot;{questionnaire.giftMode.message}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function CalendarView({
  plan,
  categoryInfo,
}: {
  plan: Plan;
  categoryInfo: ReturnType<typeof getCategoryInfo>;
}) {
  const days = plan.days;
  const grid = Array.from({ length: 30 }, (_, i) => days[i] || null);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-design-xl shadow-soft-md border border-border-light p-8">
        <Header plan={plan} categoryInfo={categoryInfo} />
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          30-Day Calendar
        </h2>
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
          {grid.map((day, i) => (
            <DayCard key={i} day={day} dayNum={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DayCard({
  day,
  dayNum,
}: {
  day: PlanDay | null;
  dayNum: number;
}) {
  if (!day) return null;
  const isRest = day.title === 'Rest Day';
  const tasks = day.tasks.filter((t) => t?.trim());
  return (
    <div
      className={`min-h-[100px] border-2 rounded-design-md p-2 ${
        isRest
          ? 'border-border-light bg-canvas'
          : 'border-accent-primary/30 bg-white'
      }`}
    >
      <div className="text-xs font-bold text-text-primary mb-1">Day {day.day}</div>
      {tasks.length === 0 ? (
        <div className="text-[0.6rem] text-text-tertiary">Rest</div>
      ) : (
        <div className="space-y-0.5">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-1 text-[0.55rem]">
              <span className="flex-shrink-0 w-3 h-3 border-2 border-current rounded mt-0.5" />
              <span className="text-text-primary line-clamp-2">{task}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ListView({
  plan,
  categoryInfo,
}: {
  plan: Plan;
  categoryInfo: ReturnType<typeof getCategoryInfo>;
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-design-xl shadow-soft-md border border-border-light p-8">
        <Header plan={plan} categoryInfo={categoryInfo} />
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          Daily Task View
        </h2>
        <div className="space-y-4">
          {plan.days.map((day) => (
            <div
              key={day.day}
              className="border border-border-light rounded-design-lg p-4 hover:border-accent-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-primary text-white rounded-full font-semibold text-sm">
                      {day.day}
                    </span>
                    <h3 className="font-semibold text-text-primary">{day.title}</h3>
                    <span className="text-xs text-text-tertiary">({day.focus})</span>
                  </div>
                  <ul className="ml-10 space-y-1.5">
                    {day.tasks.filter(Boolean).map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="flex-shrink-0 w-4 h-4 border-2 border-text-primary rounded" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PosterPreview({
  plan,
  categoryInfo,
}: {
  plan: Plan;
  categoryInfo: ReturnType<typeof getCategoryInfo>;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <PrintablePoster plan={plan} categoryInfo={categoryInfo} />
    </div>
  );
}

function PrintablePoster({
  plan,
  categoryInfo,
}: {
  plan: Plan;
  categoryInfo: ReturnType<typeof getCategoryInfo>;
}) {
  const { questionnaire } = plan;
  return (
    <div className="bg-white rounded-design-xl shadow-soft-md border border-border-light p-8 print:shadow-none print:border-2 print:border-black">
      <div className="text-center mb-8 pb-6 border-b-4 border-accent-primary">
        <div className="text-5xl mb-4">{categoryInfo?.emoji}</div>
        <h1 className="text-3xl font-bold text-text-primary">{plan.goalTitle}</h1>
        <p className="text-lg text-text-secondary mt-1">
          30-Day {categoryInfo?.label} Plan
        </p>
        {questionnaire.giftMode?.isGift && (
          <div className="mt-4 p-4 bg-accent-peach/20 rounded-design-lg">
            <p className="font-bold text-text-primary">
              🎁 For: {questionnaire.giftMode.recipientName}
            </p>
            {questionnaire.giftMode.senderName && (
              <p className="text-sm text-text-secondary">From: {questionnaire.giftMode.senderName}</p>
            )}
            {questionnaire.giftMode.message && (
              <p className="text-sm text-text-secondary mt-2 italic">
                &quot;{questionnaire.giftMode.message}&quot;
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {plan.days.map((day) => {
          const tasks = day.tasks.filter(Boolean);
          return (
            <div
              key={day.day}
              className={`min-h-[90px] border-2 rounded-design-md p-2 ${
                day.title === 'Rest Day'
                  ? 'border-border-light bg-canvas'
                  : 'border-accent-primary/40 bg-white'
              }`}
            >
              <div className="text-xs font-bold text-text-primary">Day {day.day}</div>
              <div className="mt-1 space-y-0.5">
                {tasks.length === 0 ? (
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 border-2 border-current rounded" />
                    <span className="text-[0.5rem] text-text-tertiary">Rest</span>
                  </div>
                ) : (
                  tasks.map((t, i) => (
                    <div key={i} className="flex items-center gap-1 text-[0.5rem]">
                      <span className="flex-shrink-0 w-2.5 h-2.5 border-2 border-current rounded" />
                      <span className="text-text-primary line-clamp-1">{t}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t-2 border-border-medium text-center">
        <p className="text-sm text-text-secondary">
          Created with Sprintwise • Tick off each item as you complete it
        </p>
      </div>
    </div>
  );
}
