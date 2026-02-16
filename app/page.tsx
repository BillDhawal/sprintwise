import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-accent-peach/30 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Plan your next 30 days
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Sprintwise turns your goals into actionable 30-day plans. Answer guided questions, get a personalized plan, and print it as a wall poster, planner, or diary insert.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center px-8 py-4 bg-accent-primary text-white rounded-design-lg font-bold hover:opacity-90 transition-opacity shadow-soft"
            >
              Create My Plan
            </Link>
            <Link
              href="/create?gift=true"
              className="inline-flex items-center px-8 py-4 border-2 border-border-medium text-text-primary rounded-design-lg font-semibold hover:bg-white/60 transition-colors"
            >
              Create a Gift Plan
            </Link>
          </div>
        </div>
      </section>

      {/* Personalized printable planners */}
      <section className="bg-white border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 text-center">
            Personalized printable planners
          </h2>
          <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
            List your goals in plain English—e.g., &quot;Study AWS 1 hour per day&quot;, &quot;Gym 6 times a week&quot;. Our AI converts them into SMART goals. Review, confirm, and get a 30-day plan with daily tasks—ready to print.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 rounded-design-xl bg-canvas border border-border-light">
              <span className="text-3xl mb-3">📅</span>
              <h3 className="font-semibold text-text-primary mb-2">Calendar View</h3>
              <p className="text-sm text-text-secondary">30-day grid with daily tasks</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-design-xl bg-canvas border border-border-light">
              <span className="text-3xl mb-3">📋</span>
              <h3 className="font-semibold text-text-primary mb-2">List View</h3>
              <p className="text-sm text-text-secondary">Day-by-day breakdown</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-design-xl bg-canvas border border-border-light">
              <span className="text-3xl mb-3">🖨️</span>
              <h3 className="font-semibold text-text-primary mb-2">Poster</h3>
              <p className="text-sm text-text-secondary">Print-ready layout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect gift */}
      <section className="bg-accent-teal/10 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 text-center">
            Perfect gift for friends, students, fitness goals, and more
          </h2>
          <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Create a gift plan for someone special. Add a custom message and sender name. The recipient gets a personalized 30-day planner—ideal for motivation, milestones, or thoughtful encouragement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create?gift=true"
              className="inline-flex items-center px-6 py-3 bg-accent-coral text-white rounded-design-md font-bold hover:opacity-90 transition-opacity"
            >
              Create a Gift Plan
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center px-6 py-3 border-2 border-border-medium text-text-primary rounded-design-md font-semibold hover:bg-white/60 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-text-tertiary">
        <p>Sprintwise — Personalized 30-day goal plans</p>
      </footer>
    </div>
  );
}
