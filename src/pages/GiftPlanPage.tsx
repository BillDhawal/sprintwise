import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';

const GiftPlanPage = () => {
  const navigate = useNavigate();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder: Will implement actual gift plan logic later
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      alert('Gift plan sending will be implemented in the next phase!');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Gift a 30-Day Plan</h1>
        <p className="text-gray-600 mb-8">
          Help someone special achieve their goals with a personalized 30-day action plan
        </p>

        <Card variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Recipient Email"
              type="email"
              placeholder="friend@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              fullWidth
              required
            />

            <Input
              label="Goal Title"
              placeholder="e.g., Start a morning workout routine, Learn photography"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              fullWidth
              required
            />

            <TextArea
              label="Goal Description"
              placeholder="Describe the goal you want to help them achieve"
              value={goalDescription}
              onChange={(e) => setGoalDescription(e.target.value)}
              rows={4}
              fullWidth
              required
            />

            <TextArea
              label="Personal Message (Optional)"
              placeholder="Add a personal message to encourage them..."
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              rows={3}
              fullWidth
            />

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">🎁 Gift Plan Preview</h3>
              <p className="text-sm text-green-800">
                Your recipient will receive an email with their personalized 30-day plan
                and your encouraging message. They can track their progress and celebrate
                their achievements!
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                fullWidth
                disabled={isSending}
              >
                {isSending ? 'Sending Gift...' : 'Send Gift Plan'}
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
      </div>
    </Layout>
  );
};

export default GiftPlanPage;
