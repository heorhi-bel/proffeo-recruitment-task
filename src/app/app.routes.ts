import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadChildren: () => import('./features/posts/posts.routes').then(r => r.POSTS_ROUTES)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/favorites.routes').then(r => r.FAVORITES_ROUTES)
  }
];