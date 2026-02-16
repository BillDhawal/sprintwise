/**
 * Sprintwise Goal Definition Decision Tree
 *
 * Guides users from a vague goal to a defined OKRs + SMART structure.
 *
 * DECISION TREE:
 *
 * START
 *   │
 *   ├─► WHO? (Myself / Gift)
 *   │     └─► If Gift: Recipient name
 *   │
 *   ├─► CATEGORY? (Fitness | Financial | Career | Study | Habit | Personal | Custom)
 *   │     └─► Load category-specific prompts for next steps
 *   │
 *   ├─► OBJECTIVE (OKRs)
 *   │     "What's your big-picture goal?"
 *   │     Hint: Specific & Relevant (SMART)
 *   │     └─► Category-specific placeholder
 *   │
 *   ├─► KEY RESULTS (OKRs)
 *   │     "2–5 measurable steps that show progress"
 *   │     └─► Category-specific placeholders (e.g. Fitness: "Run 15 km", "8 yoga classes")
 *   │     └─► Measurable hint per category
 *   │
 *   ├─► ACHIEVABLE? (SMART)
 *   │     "Is this realistic for 30 days?"
 *   │     ├─► Yes → Proceed
 *   │     └─► Scale down → User adjusts key results
 *   │
 *   ├─► SCHEDULE
 *   │     Wake, sleep, working days, intensity
 *   │
 *   └─► GIFT DETAILS (if gift)
 *         Sender name, custom message
 *
 * OUTPUT: Defined goal with Objective + Key Results, ready for 30-day plan generation.
 */

export const DECISION_TREE_STEPS = [
  'who',
  'category',
  'objective',
  'keyResults',
  'achievable',
  'schedule',
  'giftDetails',
] as const;
