/**
 * Server-side data fetching utilities with built-in Next.js caching
 * Use these functions in Server Components and API routes for automatic caching
 */

import { CACHE_DURATIONS, memoizedFetch } from './cache';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Deduplicates identical requests within the same render pass
export const cachedGetProducts = memoizedFetch(async (collection?: string) => {
  const url = new URL(`${API_BASE}/api/products`);
  if (collection) url.searchParams.set('collection', collection);

  const res = await fetch(url.toString(), {
    next: { revalidate: CACHE_DURATIONS.LONG, tags: ['products'] },
  });
  
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
});

export const cachedGetProductById = memoizedFetch(async (id: string) => {
  const url = new URL(`${API_BASE}/api/products`);
  url.searchParams.set('id', id);

  const res = await fetch(url.toString(), {
    next: { revalidate: CACHE_DURATIONS.LONG, tags: ['product', id] },
  });
  
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
});

export const cachedGetContent = memoizedFetch(async (section?: string) => {
  const url = new URL(`${API_BASE}/api/content`);
  if (section) url.searchParams.set('section', section);

  const res = await fetch(url.toString(), {
    next: { revalidate: CACHE_DURATIONS.LONG, tags: ['content'] },
  });
  
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
});

export const cachedGetOrders = memoizedFetch(async () => {
  const res = await fetch(`${API_BASE}/api/orders`, {
    next: { revalidate: CACHE_DURATIONS.SHORT, tags: ['orders'] },
  });
  
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
});

export const cachedGetCustomers = memoizedFetch(async () => {
  const res = await fetch(`${API_BASE}/api/customers`, {
    next: { revalidate: CACHE_DURATIONS.MEDIUM, tags: ['customers'] },
  });
  
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
});

export const cachedGetPartners = memoizedFetch(async () => {
  const res = await fetch(`${API_BASE}/api/partners`, {
    next: { revalidate: CACHE_DURATIONS.MEDIUM, tags: ['partners'] },
  });
  
  if (!res.ok) throw new Error('Failed to fetch partners');
  return res.json();
});
