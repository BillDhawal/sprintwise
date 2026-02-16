import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import CreatePlanPage from './pages/CreatePlanPage';
import GiftPlanPage from './pages/GiftPlanPage';

// Get Clerk publishable key from environment variables
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  console.warn('Missing Clerk Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY to your .env file.');
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder'}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-plan"
            element={
              <ProtectedRoute>
                <CreatePlanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gift-plan"
            element={
              <ProtectedRoute>
                <GiftPlanPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
};

export default App;
