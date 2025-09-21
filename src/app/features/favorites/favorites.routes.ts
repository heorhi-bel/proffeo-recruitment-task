import { Routes } from '@angular/router';

export const FAVORITES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/favorites-list/favorites-list.component')
      .then(c => c.FavoritesListComponent)
  }
];