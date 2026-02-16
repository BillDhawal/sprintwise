import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Layout from '../components/layout/Layout';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Transform Your Goals into 30-Day Action Plans
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sprintwise helps you break down your ambitious goals into actionable 30-day sprints.
          Stay focused, track progress, and achieve more.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Button size="lg" onClick={() => navigate('/create-plan')}>
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
            View Dashboard
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Set Your Goal</h3>
            <p className="text-gray-600">
              Define what you want to achieve in the next 30 days
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Get Your Plan</h3>
            <p className="text-gray-600">
              Receive a structured 30-day action plan tailored to your goal
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Stay motivated by checking off daily tasks and seeing your progress
            </p>
          </div>
        </div>

        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Gift a Plan to Someone Special</h2>
          <p className="text-gray-700 mb-6">
            Help friends and family achieve their goals by gifting them a personalized 30-day plan
          </p>
          <Button onClick={() => navigate('/gift-plan')}>
            Gift a Plan
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
