# Sprintwise

Transform your goals into actionable 30-day plans. Sprintwise helps you break down ambitious goals into structured daily tasks, track your progress, and stay motivated throughout your journey.

## Features

- 🎯 **Goal Setting**: Define clear, achievable 30-day goals
- 📋 **Structured Plans**: Get personalized 30-day action plans
- ✅ **Progress Tracking**: Check off daily tasks and monitor your progress
- 🎁 **Gift Plans**: Share personalized plans with friends and family
- 🔐 **Secure Authentication**: Sign up and sign in with Clerk

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BillDhawal/sprintwise.git
cd sprintwise
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Get your Clerk Publishable Key:
   - Sign up at [Clerk](https://clerk.com)
   - Create a new application
   - Copy your publishable key from the dashboard
   - Add it to your `.env` file

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, Card, etc.)
│   ├── layout/       # Layout components (Navigation, Layout)
│   └── auth/         # Authentication components
├── pages/            # Page components (Home, Dashboard, etc.)
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Pages

- **Home**: Landing page with feature overview
- **Sign In / Sign Up**: Authentication pages powered by Clerk
- **Dashboard**: View active plans and track progress
- **Create Plan**: Define a new goal and generate a 30-day plan
- **Gift Plan**: Create a personalized plan for someone else

## Future Enhancements

- AI-powered plan generation using OpenAI/Anthropic
- Advanced progress analytics and insights
- Plan sharing and collaboration features
- Mobile app (React Native)
- Reminder notifications
- Plan templates and community sharing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
