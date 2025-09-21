import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();
  private readonly globalLoading = signal(false);

  readonly isGlobalLoading = this.globalLoading.asReadonly();

  setGlobalLoading(loading: boolean) {
    this.globalLoading.set(loading);
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, data);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}