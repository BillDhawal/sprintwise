const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Get started</h1>
          <p className="mt-2 text-gray-600">Create your Sprintwise account</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">🔐 Authentication Setup Required</h3>
            <p className="text-sm text-green-800 mb-4">
              To enable sign-up functionality, configure Clerk authentication:
            </p>
            <ol className="text-sm text-green-800 list-decimal list-inside space-y-1">
              <li>Create an account at <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="underline">clerk.com</a></li>
              <li>Create a new application in your Clerk dashboard</li>
              <li>Copy your publishable key</li>
              <li>Add it to your <code className="bg-green-100 px-1 rounded">.env</code> file as <code className="bg-green-100 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
