import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, { data: any, expiry: number }>();
  private cacheDuration = 60000; 

  constructor() {}

  
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

 
  set(key: string, data: any): void {
    const expiry = Date.now() + this.cacheDuration;
    this.cache.set(key, { data, expiry });
  }

  
  clear(key: string): void {
    this.cache.delete(key);
  }

 
  clearAll(): void {
    this.cache.clear();
  }
}
