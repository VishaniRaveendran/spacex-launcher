# SpaceX Launcher

This is a [Next.js](https://nextjs.org) app (using React 19) that displays SpaceX launches with filtering, search, and details, using the public SpaceX API.

Development tooling and testing use [Vite](https://vitejs.dev/) for a fast and modern workflow.

Custom styling is implemented with [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

First, run the development server:

```bash
# Development
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```bash
# Production build
npm run build
npm start
```

## Testing

```bash
npm run test
# or
yarn test
```

## Linting

```bash
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Architecture & Decisions

### State Management

- **React useState/useEffect/useMemo**: All state is managed locally in React components and custom hooks. No external state management library is used, as the app's state is simple and mostly local (filters, search, pagination, favorites).
- **Favorites**: Managed with a custom hook (`useFavorites`) and persisted in `localStorage`.

### Data Fetching

- **REST API**: Data is fetched from the public SpaceX API (v4) using [axios](https://axios-http.com/).
- **Custom Hooks**: Hooks like `useLaunches` and `useLaunchDetails` encapsulate fetching, filtering, sorting, and error/loading state.
- **Client-side Filtering**: All launches are fetched once, then filtered/sorted/paginated on the client for responsiveness. This is a trade-off for simplicity and speed, but may not scale for very large datasets.

### Trade-offs

- **No Global State Library**: Chose not to use Redux, Zustand, or Context API to keep things simple and avoid unnecessary boilerplate.
- **Client-side Filtering**: Fast for small/medium datasets, but not ideal for very large data. For production-scale, server-side filtering or pagination would be preferable.
- **No SSR/ISR**: All data fetching is client-side for simplicity. Could be improved with Next.js server components or API routes for SEO and performance.

---

## Next Steps (with more time)

- Add server-side data fetching (SSR/ISR) for SEO and initial load performance.
- Implement server-side filtering/pagination for scalability.
- Add more robust error handling and loading skeletons.
- Add user authentication for personalized features (e.g., saving favorites to a user account).
- Improve test coverage (unit, integration, e2e).
- Add accessibility and performance optimizations.
- Polish UI/UX and add animations.

---

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
