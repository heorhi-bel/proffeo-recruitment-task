import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../features/posts/services/favorites.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="onToggle()"
      [class]="buttonClass()"
      class="p-2 rounded-full transition-all duration-200 hover:scale-110"
      [attr.aria-label]="isFavorite() ? 'Remove from favorites' : 'Add to favorites'">
      
      @if (isFavorite()) {
        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      } @else {
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      }
    </button>
  `
})
export class FavoriteButtonComponent {
  private readonly favoritesService = inject(FavoritesService);
  
  readonly postId = input.required<number>();
  readonly buttonClass = input('bg-white shadow-sm border border-gray-200 hover:bg-gray-50');
  readonly favoriteToggled = output<{ postId: number; isFavorite: boolean }>();

  readonly isFavorite = this.favoritesService.isFavorite;

  onToggle() {
    const postId = this.postId();
    this.favoritesService.toggleFavorite(postId);
    this.favoriteToggled.emit({ 
      postId, 
      isFavorite: this.favoritesService.isFavorite()(postId) 
    });
  }
}