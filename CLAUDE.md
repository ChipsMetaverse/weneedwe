# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

# Type checking
npx tsc --noEmit

# Lint code
npm run lint

# Format code with Prettier
npx prettier --write src/
```

## Code Style Guidelines
- **Formatting**: Use Prettier with default settings
- **Imports**: Group imports: React, libraries, components, utils, types, styles
- **Naming**: 
  - Components/Interfaces: PascalCase (e.g., `ButtonGroup`)
  - Functions/variables: camelCase (e.g., `handleSubmit`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`)
  - Files: kebab-case.tsx for components, camelCase.ts for utilities
- **Types**: TypeScript with strictNullChecks disabled; interfaces for objects, types for unions
- **Path Aliases**: Use @/* for src/ directory imports (e.g., `import Button from '@/components/ui/button'`)
- **Error Handling**: Try/catch with toast notifications for UI feedback, console.error for logging
- **Component Structure**: Functional components with hooks, explicit return types, destructured props
- **State Management**: React Query for server state, React Context for global UI state
- **CSS**: Tailwind CSS with shadcn/ui components; use the cn() utility for class merging

## Project Structure
- `/src/components/` - UI components and layout elements
- `/src/components/ui/` - Shadcn reusable UI components
- `/src/hooks/` - Custom React hooks
- `/src/pages/` - Route-level page components
- `/src/integrations/` - External service integrations (Supabase client in `@/integrations/supabase/client.ts`)
- `/src/lib/` - Utility functions and helpers
- `/src/context/` - React Context providers
- `/src/utils/` - Utility functions and helper methods
- `/client/` - Client-related assets and data