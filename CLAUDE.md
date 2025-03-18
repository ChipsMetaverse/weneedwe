# CLAUDE.md - Agent Instructions

## Project Overview
WeneedWe is a web platform for community support with donation capabilities. Tech stack includes Vite/React, Supabase (backend), and integrations with Stripe/PayPal. It uses Shadcn UI components and Tailwind CSS for styling.

## Build Commands
```bash
# Install dependencies
npm install
# Alternative using bun
bun install

# Run development server
npm run dev

# Build for production
npm run build
# Build for development
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npx tsc --noEmit

# Run Prettier (requires installing prettier)
npx prettier --write src/
```

## Code Style Guidelines
- **Formatting**: Use Prettier with default settings
- **Imports**: Group imports: React, libraries, components, utils, types, styles
- **Naming**: 
  - Components: PascalCase
  - Functions/variables: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: kebab-case.tsx for components, camelCase.ts for utilities
- **Types**: TypeScript with strictNullChecks disabled (see tsconfig.json). Path aliases use @/* for src/ directory
- **Error Handling**: Use try/catch with proper logging, especially for Supabase operations
- **Component Structure**: Use functional components with hooks, prefer composition over inheritance
- **State Management**: React Context for global state, react-hook-form for forms
- **Routing**: Uses react-router-dom for page navigation
- **API Calls**: Use @tanstack/react-query for data fetching and cache management