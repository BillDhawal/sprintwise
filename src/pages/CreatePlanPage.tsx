import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';

const CreatePlanPage = () => {
  const navigate = useNavigate();
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder: Will implement actual plan generation later
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Plan generation will be implemented in the next phase!');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your 30-Day Plan</h1>
        <p className="text-gray-600 mb-8">
          Tell us about your goal, and we'll help you create a structured 30-day action plan
        </p>

        <Card variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Goal Title"
              placeholder="e.g., Learn to play guitar, Run a 5K, Build a web app"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              fullWidth
              required
            />

            <TextArea
              label="Goal Description"
              placeholder="Describe your goal in detail. What do you want to achieve? Why is it important to you?"
              value={goalDescription}
              onChange={(e) => setGoalDescription(e.target.value)}
              rows={6}
              fullWidth
              required
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for Success</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about what you want to achieve</li>
                <li>• Make sure your goal is achievable in 30 days</li>
                <li>• Include any relevant context or constraints</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                fullWidth
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating Plan...' : 'Generate My 30-Day Plan'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your plan will be personalized based on your goal and saved to your dashboard</p>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePlanPage;
