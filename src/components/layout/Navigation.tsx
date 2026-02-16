import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Sprintwise
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/create-plan"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Plan
              </Link>
              <Link
                to="/gift-plan"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Gift Plan
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/sign-up')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
