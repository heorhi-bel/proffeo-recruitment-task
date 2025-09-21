import { Routes } from '@angular/router';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/post-list/post-list.component')
      .then(c => c.PostListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/post-detail/post-detail.component')
      .then(c => c.PostDetailComponent)
  }
];