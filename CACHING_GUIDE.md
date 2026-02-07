# Next.js Caching Strategy Documentation

## Overview

This document describes the caching implementation for the Vaishnavi Organics Next.js application. The strategy covers three layers:
1. **API Response Caching** - HTTP cache headers on API responses
2. **Data Fetch Caching** - Next.js automatic fetch caching for server components
3. **Page Revalidation** - ISR (Incremental Static Regeneration) for pages

## Cache Configuration

Cache durations are defined in `src/lib/cache.ts`:

```typescript
CACHE_DURATIONS = {
  SHORT: 60,                    // 1 minute
  MEDIUM: 5 * 60,              // 5 minutes
  LONG: 1 * 60 * 60,           // 1 hour
  VERY_LONG: 24 * 60 * 60,     // 24 hours
}

CacheConfig = {
  STATIC: CACHE_DURATIONS.VERY_LONG,    // 24 hours
  PRODUCTS: CACHE_DURATIONS.LONG,        // 1 hour
  CATEGORIES: CACHE_DURATIONS.LONG,      // 1 hour
  CONTENT: CACHE_DURATIONS.LONG,         // 1 hour
  ORDERS: CACHE_DURATIONS.SHORT,         // 1 minute
  CUSTOMERS: CACHE_DURATIONS.MEDIUM,     // 5 minutes
  PARTNERS: CACHE_DURATIONS.MEDIUM,      // 5 minutes
  AUTH: false,                            // No caching
  ACCOUNT: false,                         // No caching
}
```

## API Route Caching

### Implementation

API routes use the `revalidate` export and `createCachedResponse()` helper:

```typescript
// src/app/api/products/route.ts
import { createCachedResponse, CacheConfig } from '@/lib/cache';

export const revalidate = CacheConfig.PRODUCTS; // 1 hour

export async function GET(req: Request) {
  try {
    // ... fetch data ...
    return createCachedResponse(data, CacheConfig.PRODUCTS);
  } catch (error) {
    return NextResponse.json({ error }, { 
      status: 500, 
      headers: { 'Cache-Control': 'no-cache, no-store' } 
    });
  }
}

export async function POST(req: Request) {
  // Write operations aren't cached
}
```

### Cache Headers

The `createCachedResponse()` helper automatically adds:

```
Cache-Control: public, max-age=3600, stale-while-revalidate=7200
CDN-Cache-Control: max-age=3600
```

This means:
- **public**: Response can be cached by CDNs and browsers
- **max-age=3600**: Browser caches for 1 hour
- **stale-while-revalidate**: Serves stale cache while revalidating in the background

### Apply to Private Routes

For private/authenticated responses, use:

```typescript
return createCachedResponse(data, CacheConfig.ORDERS, false); // false = private
```

This results in:
```
Cache-Control: private, max-age=60, stale-while-revalidate=120
```

## Server-Side Data Fetching

### Using Cached Fetchers

Use pre-built cached fetchers in Server Components:

```typescript
// src/components/ProductList.tsx
import { cachedGetProducts } from '@/lib/server-data';

export export async function ProductList() {
  const { products } = await cachedGetProducts('featured');
  
  return (
    <div>
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}
```

Available cached fetchers:
- `cachedGetProducts(collection?)` - Get products
- `cachedGetProductById(id)` - Get single product
- `cachedContent(section?)` - Get site content
- `cachedGetOrders()` - Get orders
- `cachedGetCustomers()` - Get customers
- `cachedGetPartners()` - Get partners

### Creating Custom Cached Fetchers

For new data sources:

```typescript
import { CACHE_DURATIONS, memoizedFetch } from '@/lib/cache';

export const cachedGetCustomData = memoizedFetch(async (param: string) => {
  const res = await fetch(`/api/custom?param=${param}`, {
    next: { 
      revalidate: CACHE_DURATIONS.LONG,
      tags: ['custom-data'] 
    },
  });
  return res.json();
});
```

## Request Deduplication

The `memoizedFetch` wrapper uses React's `cache()` to deduplicate identical requests within a single render pass:

```typescript
// These two requests are deduplicated:
const products1 = await cachedGetProducts();
const products2 = await cachedGetProducts(); // Returns cached result, no new fetch
```

## On-Demand Revalidation

### Manual Revalidation

To manually revalidate a cache, call `revalidateTag()`:

```typescript
// src/app/api/products/route.ts (POST handler)
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const product = await saveProduct(req.json());
  
  revalidateTag('products'); // Revalidate all product caches
  revalidateTag(`product-${product._id}`); // Revalidate specific product
  
  return NextResponse.json({ success: true, product });
}
```

### ISR Revalidation

Pages automatically revalidate based on `revalidate` export:

```typescript
// src/app/products/[id]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function ProductPage({ params }) {
  const { product } = await cachedGetProductById(params.id);
  return <ProductDetail product={product} />;
}
```

## Middleware

Global middleware in `src/middleware.ts` adds:
- Security headers
- Fallback cache control headers
- Request logging (optional)

## Static Asset Caching

Configured in `next.config.ts`:

- **Public static files**: Cached for 1 year with `immutable`
- **Next.js static chunks**: Cached for 1 year with `immutable`
- **Images**: Automatically optimized and cached by Next.js

## Best Practices

### ✅ Do

- Cache **read-only** data (products, content, categories)
- Use shorter cache times for user-specific data (orders, accounts)
- Use `revalidateTag()` after writing data
- Use `memoizedFetch()` for frequently called fetchers
- Set correct `isPublic` flag for multi-user vs single-user data
- Test cache by checking network headers with DevTools

### ❌ Don't

- Cache **write operations** (POST, PUT, DELETE)
- Cache **user-specific** data (accounts, wishlists) with `public`
- Cache **sensitive** data (passwords, payment info)
- Set overly long cache times for frequently changing data
- Forget to revalidate after mutations

## Testing

### Check Cache Headers

```bash
curl -I https://vaishnaviorganics.store/api/products
```

Look for:
```
Cache-Control: public, max-age=3600, stale-while-revalidate=7200
```

### Browser DevTools

1. Open Network tab
2. Check Size column (shows "from cache" vs network)
3. Check Response headers for Cache-Control
4. Check Timing tab for revalidation

### Clear Cache

```bash
# Clear all routes cache
rm -rf .next

# Rebuild
npm run build
npm run start
```

## Environment Variables

No new environment variables needed. Uses Next.js built-in caching.

## Performance Impact

Expected improvements with this caching strategy:

- **API Response Time**: 50-70% faster on cache hits
- **TTFB (Time to First Byte)**: 30-40% improvement
- **Database Load**: 60-80% reduction in queries
- **Bandwidth**: 40-50% reduction

## Troubleshooting

### Cache Not Working

1. Check `revalidate` export in route:
   ```typescript
   export const revalidate = 3600; // Must be set
   ```

2. Check response headers:
   ```bash
   curl -i /api/products | grep Cache-Control
   ```

3. Check route has GET handler (caching only works for GET)

4. Check for `export const dynamic = "force-dynamic"` (disables caching)

### Stale Data Issues

1. Call `revalidateTag()` after mutations
2. Reduce cache time for frequently updated data
3. Use shorter `stale-while-revalidate` windows

### Cache Invalidation Not Working

1. Verify tag names match exactly
2. Check tag is passed in `next.revalidate` options
3. Test with `revalidatePath()` as alternative:
   ```typescript
   revalidatePath('/api/products');
   ```

## References

- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [HTTP Caching Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [React Cache Function](https://react.dev/reference/react/cache)
