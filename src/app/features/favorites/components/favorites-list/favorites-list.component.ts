import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { PostsStateService } from '../../../posts/services/posts-state.service';
import { FavoritesService } from '../../../posts/services/favorites.service';
import { PostCardComponent } from '../../../posts/components/post-card/post-card.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PostCardComponent, LoaderComponent],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Favorite Posts
          @if (favoritePostsCount() > 0) {
            <span class="text-lg font-normal text-gray-600 ml-2">
              ({{ favoritePostsCount() }})
            </span>
          }
        </h1>
        
        @if (favoritePostsCount() > 0) {
          <button
            (click)="clearAllFavorites()"
            class="text-red-600 hover:text-red-800 px-4 py-2 border border-red-300 hover:border-red-400 rounded-md font-medium transition-colors">
            Clear all favorites
          </button>
        }
      </div>

      @if (postsState.loading()) {
        <app-loader text="Loading posts..." />
      } @else {
        @if (favoritePosts().length === 0) {
          <div class="text-center py-16">
            <div class="text-gray-400 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-700 mb-2">No favorite posts yet</h2>
            <p class="text-gray-500 mb-6">
              Start exploring posts and add them to your favorites!
            </p>
            <a routerLink="/posts" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Browse Posts
            </a>
          </div>
        } @else {
          <div [@listAnimation] class="grid gap-6">
            @for (post of favoritePosts(); track post.id) {
              <app-post-card [post]="post" />
            }
          </div>
        }
      }
    </div>
  `
})
export class FavoritesListComponent implements OnInit {
  readonly postsState = inject(PostsStateService);
  readonly favoritesService = inject(FavoritesService);

  readonly favoritePostsCount = computed(() => this.favoritesService.favoritesCount());
  
  readonly favoritePosts = computed(() => {
    const allPosts = this.postsState.posts();
    const favoriteIds = this.favoritesService.favoriteIds();
    return allPosts.filter(post => favoriteIds.has(post.id));
  });

  ngOnInit() {
    this.postsState.loadPosts();
  }

  clearAllFavorites() {
    if (confirm('Are you sure you want to remove all favorite posts?')) {
      // Clear all favorites
      const favoriteIds = Array.from(this.favoritesService.favoriteIds());
      favoriteIds.forEach(id => this.favoritesService.removeFavorite(id));
    }
  }
}