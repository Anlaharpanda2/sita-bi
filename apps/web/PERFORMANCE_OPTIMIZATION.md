# Performance Optimization Guide

## Overview

This guide explains the performance optimization techniques applied to the SITA-BI frontend application.

## Techniques Implemented

### 1. **Separation of Concerns: Logic vs UI**

- **Hooks** (`/hooks`): Contains all data fetching and business logic
- **Components** (`/app/components`): Pure presentation components
- **Benefits**: Better code reusability, easier testing, smaller component bundles

### 2. **UI Streaming with Suspense**

```tsx
<Suspense fallback={<SkeletonCard />}>
  <HeavyComponent />
</Suspense>
```

- Allows progressive rendering
- Shows skeleton loaders while data is loading
- Improves perceived performance

### 3. **Lazy Loading for Heavy Components**

```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

- Components are loaded only when needed
- Reduces initial bundle size
- Faster Time to Interactive (TTI)

### 4. **Automatic Code Splitting**

- Next.js automatically splits code per route
- Each page only loads what it needs
- Configured in `next.config.js`:
  ```javascript
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          /* vendor chunk */
        },
        common: {
          /* common chunk */
        },
      },
    };
  };
  ```

### 5. **Strategic Loading States**

- Page-level: `loading.tsx` for each route
- Component-level: Skeleton components
- Global: Root `loading.tsx`

## File Structure

```
apps/web/
├── hooks/                       # Custom hooks for logic
│   ├── useFetch.ts             # Generic data fetching
│   ├── useMutation.ts          # Generic mutations
│   └── useTugasAkhir.ts        # Domain-specific logic
├── app/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   └── StatusChip.tsx
│   │   └── loading/            # Loading skeletons
│   │       ├── PageLoader.tsx
│   │       ├── SkeletonCard.tsx
│   │       └── TableSkeleton.tsx
│   ├── dashboard/
│   │   └── mahasiswa/
│   │       └── tugas-akhir/
│   │           ├── page.tsx              # Main page (optimized)
│   │           ├── loading.tsx           # Route loading state
│   │           ├── SimilarityForm.tsx    # Lazy-loaded form
│   │           ├── RecommendedTopics.tsx # Lazy-loaded list
│   │           └── SubmittedTitlesTable.tsx # Lazy-loaded table
│   └── loading.tsx             # Global loading
└── next.config.js              # Optimization configs
```

## How to Optimize a New Page

### Step 1: Extract Logic to Hooks

```typescript
// hooks/useMyFeature.ts
export function useMyFeature() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // ... fetch logic
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refetch: fetchData };
}
```

### Step 2: Create UI Components

```tsx
// app/components/ui/MyComponent.tsx
export default function MyComponent({ data }) {
  return <Card>{/* Pure presentation */}</Card>;
}
```

### Step 3: Create Loading States

```tsx
// app/my-page/loading.tsx
export default function Loading() {
  return <SkeletonCard />;
}
```

### Step 4: Use Lazy Loading & Suspense

```tsx
// app/my-page/page.tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function Page() {
  const { data, loading } = useMyFeature();

  if (loading) return <PageLoader />;

  return (
    <div>
      {/* Critical content */}
      <Suspense fallback={<SkeletonCard />}>
        <HeavyComponent data={data} />
      </Suspense>
    </div>
  );
}
```

## Performance Checklist

- [ ] Extract all API calls to custom hooks
- [ ] Separate logic from UI components
- [ ] Add `loading.tsx` for each route
- [ ] Use `<Suspense>` for below-the-fold content
- [ ] Lazy load heavy components (charts, tables, forms)
- [ ] Use skeleton loaders instead of spinners
- [ ] Optimize images with Next.js `<Image>`
- [ ] Enable SWC minification in `next.config.js`
- [ ] Test with Bundle Analyzer: `ANALYZE=true pnpm run build`

## Best Practices

1. **Critical Content First**: Load above-the-fold content immediately
2. **Below-the-Fold Lazy**: Use lazy loading for content users scroll to
3. **Skeleton > Spinner**: Skeleton loaders are more user-friendly
4. **Small Hooks**: Keep hooks focused on single responsibilities
5. **Memoization**: Use `useMemo` for expensive computations

## Testing Performance

```bash
# Build and analyze bundle
ANALYZE=true pnpm run build

# Check Lighthouse scores
# Use Chrome DevTools > Lighthouse

# Monitor in development
pnpm run dev
# Then use React DevTools Profiler
```

## Example: Optimized vs Original

### Original (500KB, 3s load)

```tsx
export default function Page() {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  // 200 lines of mixed logic and UI
  return <div>{/* Everything at once */}</div>;
}
```

### Optimized (100KB initial, 1s load)

```tsx
const Table = lazy(() => import('./Table'));
const Chart = lazy(() => import('./Chart'));

export default function Page() {
  const { data } = useData(); // Hook handles logic

  return (
    <>
      <CriticalContent data={data} />
      <Suspense fallback={<Skeleton />}>
        <Table data={data} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Chart data={data} />
      </Suspense>
    </>
  );
}
```

## Migration Strategy

1. Start with high-traffic pages
2. Measure current performance (Lighthouse)
3. Apply optimizations incrementally
4. Measure improvements
5. Document learnings
6. Repeat for other pages

## Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Lazy Loading](https://react.dev/reference/react/lazy)
- [Web Vitals](https://web.dev/vitals/)
