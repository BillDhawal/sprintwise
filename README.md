# Sprintwise 🎯

A Next.js TypeScript web application that generates personalized 30-day goal plans through a guided questionnaire using the STAR method.

## Features

✨ **Personalized Goal Planning**
- 8 goal categories: Fitness, Finance, Study, Career, Health, Personal Development, Creative, and Relationships
- Guided questionnaire using the STAR method (Situation, Task, Action, Result)
- Customizable schedule based on availability (days per week, time per day, preferred time)

🎁 **Gift Mode**
- Create goal plans as gifts for loved ones
- Add recipient name and personal message
- Beautifully formatted for gifting

📊 **Plan Views**
- **Preview Mode**: Detailed weekly breakdown with task descriptions
- **Poster Mode**: Print-friendly calendar layout with checkboxes

🖨️ **Print-Friendly**
- Optimized A4 poster layout
- Calendar grid with 30-day tracking
- Professional design ready for printing

## Getting Started

### Prerequisites

- Node.js 18+ installed
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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a Personal Goal Plan

1. Click "Start Your Journey" on the homepage
2. Select your goal category (e.g., Fitness, Finance, Study)
3. Enter your specific goal
4. Complete the STAR method questions:
   - **Situation**: Your current state
   - **Task**: What you need to accomplish
   - **Action**: Steps you'll take
   - **Result**: Desired outcome after 30 days
5. Set your schedule (days per week, time per day, preferred time)
6. Review and generate your plan

### Creating a Gift Plan

1. Click "Create a Gift Plan" on the homepage (or add `?gift=true` to the questionnaire URL)
2. Follow the same steps as above
3. On the final step, enter the recipient's name and an optional personal message
4. The generated plan will include the gift information

### Viewing and Printing

- **Preview Mode**: See a detailed breakdown of your 30-day plan by week
- **Poster Mode**: View a print-optimized calendar layout
- Click "Print" to print your plan as a poster or save as PDF

## Project Structure

```
sprintwise/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── questionnaire/
│   │   └── page.tsx          # Questionnaire flow
│   └── plan/
│       └── page.tsx          # Plan preview/poster view
├── components/
│   ├── questionnaire/
│   │   ├── CategoryStep.tsx  # Goal category selection
│   │   ├── STARStep.tsx      # STAR method questions
│   │   ├── ScheduleStep.tsx  # Schedule configuration
│   │   └── GiftModeStep.tsx  # Gift mode settings
│   └── plan/
│       ├── PlanPreview.tsx   # Detailed plan view
│       └── PlanPoster.tsx    # Print-friendly poster
├── lib/
│   └── data/
│       └── mockData.ts       # Mock data and plan generation
└── types/
    └── index.ts              # TypeScript type definitions
```

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + SessionStorage

## Architecture

### Modular Design

The application follows a modular architecture:

- **Types** (`types/`): Centralized type definitions for type safety
- **Data Layer** (`lib/data/`): Mock data and business logic for plan generation
- **Components** (`components/`): Reusable UI components organized by feature
- **Pages** (`app/`): Route-based pages using Next.js App Router

### Mock Data

Currently uses mock data for:
- Goal category templates
- Task generation based on category and STAR input
- Daily task scheduling based on user availability

The mock data service (`lib/data/mockData.ts`) provides:
- 8 goal categories with templates
- Dynamic 30-day task generation
- Schedule-aware task distribution

## Features in Detail

### STAR Method

The STAR method helps users articulate their goals clearly:
- **S**ituation: Current context and why the goal matters
- **T**ask: Specific challenge or objective
- **A**ction: Concrete steps to achieve the goal
- **R**esult: Expected outcome after 30 days

### Schedule Customization

Users can customize their plan based on:
- Days per week (1-7)
- Time per day (15-120+ minutes)
- Preferred time (Morning, Afternoon, Evening, Flexible)

The plan generation algorithm adapts task difficulty and frequency based on these inputs.

### Print Optimization

The poster view is optimized for printing:
- A4 size layout
- High-contrast colors for clarity
- Calendar grid with checkboxes for progress tracking
- All essential information on one page

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Future Enhancements

Potential features for future development:
- User authentication and plan saving
- Progress tracking with data persistence
- Plan sharing via unique URLs
- Integration with calendar apps
- Reminder notifications
- Community-shared goal templates
- AI-powered task generation
- Mobile app version

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
