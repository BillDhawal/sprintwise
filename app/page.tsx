import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to <span className="text-indigo-600 dark:text-indigo-400">Sprintwise</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Transform your goals into actionable 30-day plans with our guided questionnaire
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">1. Answer Questions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete our guided questionnaire using the STAR method
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">2. Get Your Plan</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive a personalized 30-day plan tailored to your goals
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🖨️</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">3. Print & Track</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Print your beautiful calendar poster and track progress
                </p>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <Link
              href="/questionnaire"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Start Your Journey
            </Link>
            <Link
              href="/questionnaire?gift=true"
              className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              Create a Gift Plan
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-600 dark:text-gray-400">
            <p>Choose from 8 goal categories: Fitness, Finance, Study, Career, Health, Personal, Creative, or Relationships</p>
          </div>
        </div>
      </main>
    </div>
  );
}
