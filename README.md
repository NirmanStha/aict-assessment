## Hamro Dashboard

This is a minimal dashboard application created using Nextjs.

## Application overview

This project is a modular dashboard with authentication, protected routing, and CRUD style flows for posts, products, and users.
The implementation focuses on clean feature separation, reusable UI components, and maintainable data fetching patterns.

## Folder structure

app/
Contains routes and route-level layouts.
Includes public routes (login/register), protected routes (dashboard/posts/products/users), and API route handlers for auth.

app/features/
Contains domain-based feature modules.
Each feature keeps its own api layer, hooks, queries, types, validation, and UI pieces.

components/
Contains shared UI and shared custom components.
`components/ui` holds shadcn primitives.
`components/custom` holds reusable app-level pieces such as sidebar, table, pagination, and dashboard/header components.

lib/
Contains common helpers such as HTTP client setup and utility functions.

proxy.ts
Central middleware/proxy layer for route guarding and auth-aware request flow in protected/public navigation scenarios.

## Pages and routing

Public pages:
`/login` and `/register`.

Protected pages:
`/` dashboard, `/posts`, `/products`, `/users`, and detail/create routes for each module.

Routing approach:
Route groups separate public and protected experiences while sharing global layout and providers.

## Feature module pattern

Each feature follows the same pattern for consistency:

api/
Handles HTTP requests and response mapping.

queries/
Defines TanStack Query keys and query/mutation options.

hooks/
Exposes feature-focused hooks for pages/components.

components/
Contains feature-specific UI such as table renderers and form field sections.

types/
Keeps payload and response types close to the feature.

validation/
Uses Zod schemas for create/update form validation and parsed outputs.

## Authentication flow

Login:
User submits credentials from the login form.
Auth API returns token/profile payload.
Profile is cached in TanStack Query and user is redirected to protected routes.

Session check:
Protected layout/pages use `useMeQuery` to fetch current user profile and keep UI auth-aware.

Logout:
Logout mutation clears auth query cache, redirects to login, and refreshes route state.

Header profile menu:
Avatar + dropdown menu uses shadcn components and exposes logout action in protected layout header.

## Proxy usage

`proxy.ts` is used to manage request-time route control and auth behavior between public and protected sections.
This keeps access logic centralized instead of repeating checks inside each page.

## Architecture decisions and why

Feature-first organization:
Chosen to keep business logic close to each domain and reduce cross-file coupling.

TanStack Query:
Chosen for server-state management, caching, mutation handling, and predictable invalidation.

shadcn UI components:
Chosen for consistent design primitives, accessibility-friendly base components, and faster UI composition.

Zod validation in feature folders:
Chosen for type-safe form validation and shared parse/validation logic between create and update pages.

## Performance optimizations performed

React Query caching:
Avoids unnecessary refetching and keeps server state stable across page transitions.

Query invalidation strategy:
Invalidates only relevant query keys after mutations to keep updates efficient and scoped.

Reusable skeleton/loading states:
Reduces layout shifts and improves perceived performance while data is loading.

Paginated data loading:
Uses paginated queries and controlled page size to avoid large payload rendering.

Component reuse and split:
Shared table/pagination/form sections reduce duplicate render logic and improve maintainability.
