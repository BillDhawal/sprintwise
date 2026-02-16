import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          How Sprintwise Works
        </h1>
        <p className="text-lg text-text-secondary mb-12">
          Create personalized 30-day goal plans in minutes. Print them as wall posters, planners, or diary inserts.
        </p>

        <div className="space-y-12">
          <section>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-primary text-white flex items-center justify-center text-xl font-bold">
                1
              </span>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  Describe Your Goals (Multiple OK)
                </h2>
                <p className="text-text-secondary">
                  List your goals with time commitments—e.g., &quot;Study AWS 1 hour per day&quot;, &quot;Solve 2 LeetCode problems daily&quot;, &quot;Gym 6 times a week&quot;. You can work on multiple things at once.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-primary text-white flex items-center justify-center text-xl font-bold">
                2
              </span>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  AI Converts to SMART Goals (Our USP)
                </h2>
                <p className="text-text-secondary">
                  Our AI parses your list and converts each into a structured SMART goal—with category, time per day, days per week, and key results. Review the prefilled cards (like Jira tasks), edit if needed, and confirm.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-primary text-white flex items-center justify-center text-xl font-bold">
                3
              </span>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  Set Your Schedule
                </h2>
                <p className="text-text-secondary">
                  Optionally set your wake and sleep times (default 7am). Then add gift details if creating for someone else.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-primary text-white flex items-center justify-center text-xl font-bold">
                4
              </span>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  Get Your Personalized Plan
                </h2>
                <p className="text-text-secondary">
                  We generate a 30-day plan with daily tasks, focus areas, and time blocks. View it as a calendar, list, or printable poster.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-primary text-white flex items-center justify-center text-xl font-bold">
                5
              </span>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  Print or Gift
                </h2>
                <p className="text-text-secondary">
                  Download as PDF, print as a poster or planner, or create a gift plan with a custom message. Perfect for friends, students, fitness goals, and more.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/create"
            className="inline-flex items-center px-6 py-3 bg-accent-primary text-white rounded-design-md font-bold hover:opacity-90 transition-opacity"
          >
            Create My Plan
          </Link>
          <Link
            href="/create?gift=true"
            className="inline-flex items-center px-6 py-3 border-2 border-border-medium text-text-primary rounded-design-md font-semibold hover:bg-white/60 transition-colors"
          >
            Create a Gift Plan
          </Link>
        </div>
      </main>
    </div>
  );
}
