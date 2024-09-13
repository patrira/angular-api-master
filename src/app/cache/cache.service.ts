import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, { data: any, expiry: number }>();
  private cacheDuration = 60000; 

  constructor() {}

  // Get data from the cache
  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() > cached.expiry;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  // Set data to the cache
  set(key: string, data: any): void {
    const expiry = Date.now() + this.cacheDuration;
    this.cache.set(key, { data, expiry });
  }

  // Clear specific cache
  clear(key: string): void {
    this.cache.delete(key);
  }

  // Clear all cache
  clearAll(): void {
    this.cache.clear();
  }
}
