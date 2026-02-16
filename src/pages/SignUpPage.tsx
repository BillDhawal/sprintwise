import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Get started</h1>
          <p className="mt-2 text-gray-600">Create your Sprintwise account</p>
        </div>
        <SignUp 
          routing="path" 
          path="/sign-up"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
