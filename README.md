## Important note

This project uses DummyJSON for backend API consumption.
Create, update, and delete operations return success/fail responses but do not persist data permanently because the backend is mock-based.

- Default Credintials
  username : emilys
  password : emilyspass

## Hamro Dashboard

Hamro Dashboard is a modular Next.js dashboard application built for my assessment on aitc.
It includes authentication, protected routing, and CRUD style modules for posts, products, and users.

## Architecture summary

The application follows a feature-first architecture to keep domain logic grouped and maintainable.

- Routing and layouts live in app/
- Domain logic lives in app/features/
- Reusable UI and shared components live in components/
- Shared utilities and HTTP client setup live in lib/
- Access control at request/route level is handled through proxy.ts

This structure keeps concerns separated between page composition, server state, API calls, and presentation components.

## Folder structure and separation of concerns

app/

- Public routes: login and register
- Protected routes: dashboard, posts, products, users
- Route-level layouts and API handlers

app/features/

- api/: request functions for each feature
- queries/: TanStack Query keys and options
- hooks/: reusable feature hooks for pages/components
- components/: feature-specific UI blocks
- types/: feature payload/response typing
- validation/: Zod schemas and parsed form outputs

components/

- components/ui: shadcn UI primitives
- components/custom: shared app components (sidebar, table, pagination, header menu, dashboard sections)

## Authentication and proxy flow

Authentication flow:

- User logs in from public route
- Auth response is stored and current profile is fetched with useMeQuery
- Protected routes render only for authenticated state
- Logout clears auth query state and redirects to login

Token lifecycle:

- Refresh flow is integrated through auth endpoints and auth query flow
- Session invalidation path logs user out and returns to login

Proxy usage:

- proxy.ts centralizes access behavior between public and protected route areas
- This avoids repeating guard logic in every page component

## UI and UX implementation

- Clean, responsive dashboard layout using shadcn components
- Reusable loading indicators using skeleton states
- Clear mutation/query error feedback using toast messaging
- Form validation handled with feature-level Zod schemas

## Performance optimizations

- TanStack Query caching for efficient server state reuse
- Scoped query invalidation after create/update/delete actions
- Paginated data loading to limit payload and rendering cost
- Reusable shared components to reduce duplication and heavy page-level code
- Lazy user-perceived loading through skeleton states during fetch transitions

## Assessment checklist alignment

- Lazy loading approach: implemented via loading states and skeleton-driven rendering
- Clean architecture and folder structure: implemented with feature-first organization
- Separation of concerns: implemented with distinct api/hooks/queries/components/validation layers
- Clean UI and validation/error states: implemented throughout create/update/list flows
- Responsive design: implemented for desktop and mobile breakpoints
- Token refresh and auto-logout path: integrated in auth flow
- RBAC: base-ready through auth profile model, but strict role-level route restriction is not fully enforced in current scope

## Setup instructions

run "npm install" to install dependencies
run "npm run dev" to start the development server
run "npm run lint" to check lint issues
run "npm run build" to build the project

## Submission notes

GitHub repository link:
https://github.com/NirmanStha/aict-assessment/

Deployed application link:
https://aict-assessment-blscpjjhd-nirmansthas-projects.vercel.app/
