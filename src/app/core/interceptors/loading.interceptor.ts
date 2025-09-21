import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { CacheService } from '../services/cache.service';

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);
  
  activeRequests++;
  if (activeRequests === 1) {
    cacheService.setGlobalLoading(true);
  }
  
  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        cacheService.setGlobalLoading(false);
      }
    })
  );
};