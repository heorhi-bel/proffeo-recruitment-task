import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly _favoriteIds = signal<Set<number>>(new Set());

  readonly favoriteIds = this._favoriteIds.asReadonly();
  
  readonly isFavorite = computed(() => (id: number) => 
    this._favoriteIds().has(id)
  );

  readonly favoritesCount = computed(() => this._favoriteIds().size);

  toggleFavorite(postId: number): void {
    this._favoriteIds.update(favorites => {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(postId)) {
        newFavorites.delete(postId);
      } else {
        newFavorites.add(postId);
      }
      return newFavorites;
    });
  }

  addFavorite(postId: number): void {
    this._favoriteIds.update(favorites => new Set(favorites).add(postId));
  }

  removeFavorite(postId: number): void {
    this._favoriteIds.update(favorites => {
      const newFavorites = new Set(favorites);
      newFavorites.delete(postId);
      return newFavorites;
    });
  }

  isFavoritePost(postId: number): boolean {
    return this._favoriteIds().has(postId);
  }
}