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
```

## Code Style Guidelines
- **Formatting**: Use Prettier with default settings
- **Imports**: Group imports: React, libraries, components, utils, types, styles
- **Naming**: 
  - Components: PascalCase
  - Functions/variables: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: kebab-case.tsx for components, camelCase.ts for utilities
- **Types**: Use TypeScript strictly, avoid `any`
- **Error Handling**: Use try/catch with proper logging
- **Component Structure**: Use functional components with hooks
- **State Management**: Prefer React Context for global state