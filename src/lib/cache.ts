import { cache } from 'react';
import { NextResponse } from 'next/server';

/**
 * Caching utility for Next.js 13+ with App Router
 * Supports fetch caching, request deduplication, and cache revalidation
 */

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 60, // 1 minute
  MEDIUM: 5 * 60, // 5 minutes
  LONG: 1 * 60 * 60, // 1 hour
  VERY_LONG: 24 * 60 * 60, // 24 hours
} as const;

/**
 * Get cache control headers for API responses
 * @param duration - Cache duration in seconds
 * @param isPublic - Whether the response is public or private
 */
export function getCacheHeaders(
  duration: number,
  isPublic: boolean = true
): HeadersInit {
  return {
    'Cache-Control': `${isPublic ? 'public' : 'private'}, max-age=${duration}, stale-while-revalidate=${duration * 2}`,
    'CDN-Cache-Control': `max-age=${duration}`,
  };
}

/**
 * Create a cached API response
 * @param data - Response data
 * @param cacheDuration - Duration in seconds
 * @param isPublic - Whether to make response public
 */
export function createCachedResponse(
  data: any,
  cacheDuration: number = CACHE_DURATIONS.LONG,
  isPublic: boolean = true
) {
  return NextResponse.json(data, {
    headers: getCacheHeaders(cacheDuration, isPublic),
  });
}

/**
 * Server-side fetch wrapper with built-in caching
 * Deduplicates requests within the same render
 * @param url - URL to fetch
 * @param options - Fetch options
 * @param cacheDuration - Duration in seconds (omit for no cache)
 */
export async function cachedFetch(
  url: string,
  options?: RequestInit & { cacheDuration?: number }
) {
  const { cacheDuration, ...fetchOptions } = options || {};

  const finalOptions: RequestInit = {
    ...fetchOptions,
    next: {
      revalidate: cacheDuration,
      tags: [url],
      ...fetchOptions?.next,
    },
  };

  return fetch(url, finalOptions);
}

/**
 * Reusable React cache for deduplicating requests within a render
 * Example: const getCachedProduct = memoizedFetch(async (id) => { ... })
 */
export function memoizedFetch<T extends any[], R>(
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return cache(fn);
}

/**
 * Parse revalidation config from query parameters
 * Useful for on-demand revalidation
 */
export function getRevalidateFromQuery(searchParams: URLSearchParams): number | false {
  const revalidate = searchParams.get('revalidate');
  if (!revalidate) return false;
  const num = parseInt(revalidate, 10);
  return isNaN(num) ? false : num;
}

/**
 * Recommended cache durations for different data types
 */
export const CacheConfig = {
  // Static, rarely changes
  STATIC: CACHE_DURATIONS.VERY_LONG,
  
  // Product and content data
  PRODUCTS: CACHE_DURATIONS.LONG, // 1 hour
  CATEGORIES: CACHE_DURATIONS.LONG,
  CONTENT: CACHE_DURATIONS.LONG,
  
  // Dynamic but not frequently updated
  ORDERS: CACHE_DURATIONS.SHORT, // 1 minute
  CUSTOMERS: CACHE_DURATIONS.MEDIUM, // 5 minutes
  PARTNERS: CACHE_DURATIONS.MEDIUM,
  
  // User-specific, should not be cached or use private cache
  AUTH: false, // No caching
  ACCOUNT: false,
} as const;
