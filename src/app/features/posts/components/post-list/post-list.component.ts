import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsStateService } from '../../services/posts-state.service';
import { FavoritesService } from '../../services/favorites.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostFiltersComponent } from '../post-filters/post-filters.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule, 
    PostCardComponent, 
    PostFiltersComponent, 
    LoaderComponent,
    SkeletonComponent
  ],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">All Posts</h1>
        <button
          (click)="refreshPosts()"
          [disabled]="postsState.loading()"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium transition-colors">
          {{ postsState.loading() ? 'Refreshing...' : 'Refresh' }}
        </button>
      </div>

      <app-post-filters />

      @if (postsState.loading()) {
        <div class="space-y-6">
          @for (item of Array(6); track $index) {
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <app-skeleton [count]="1" height="h-6" />
              <div class="mt-3">
                <app-skeleton [count]="3" height="h-4" />
              </div>
            </div>
          }
        </div>
      } @else {
        @if (displayedPosts().length === 0) {
          <div class="text-center py-12">
            <div class="text-gray-500 text-lg">
              @if (hasActiveFilters()) {
                No posts match your filters
              } @else {
                No posts available
              }
            </div>
            @if (hasActiveFilters()) {
              <button
                (click)="clearFilters()"
                class="mt-4 text-blue-600 hover:text-blue-800 underline">
                Clear filters
              </button>
            }
          </div>
        } @else {
          <div class="grid gap-6">
            @for (post of displayedPosts(); track post.id) {
              <app-post-card [post]="post" />
            }
          </div>
        }
      }

      @if (!postsState.loading() && displayedPosts().length > 0) {
        <div class="text-center text-sm text-gray-500 py-4">
          Showing {{ displayedPosts().length }} posts
          @if (favoritesService.favoritesCount() > 0) {
            • {{ favoritesService.favoritesCount() }} favorites
          }
        </div>
      }
    </div>
  `
})
export class PostListComponent implements OnInit {
  readonly postsState = inject(PostsStateService);
  readonly favoritesService = inject(FavoritesService);
  
  Array = Array;

  ngOnInit() {
    console.log('PostListComponent initialized');
    this.postsState.loadPosts();
    this.postsState.loadUsers(); // Load users for display in cards
  }

  displayedPosts() {
    const posts = this.postsState.filteredPosts();
    const filters = this.postsState.filters();
    
    if (filters.favoritesOnly) {
      const favoriteIds = this.favoritesService.favoriteIds();
      return posts.filter(post => favoriteIds.has(post.id));
    }
    
    return posts;
  }

  hasActiveFilters(): boolean {
    const filters = this.postsState.filters();
    return !!(filters.search || filters.userId || filters.favoritesOnly);
  }

  clearFilters() {
    this.postsState.setFilters({ search: '', userId: null, favoritesOnly: false });
  }

  refreshPosts() {
    this.postsState.loadPosts(true);
  }
}