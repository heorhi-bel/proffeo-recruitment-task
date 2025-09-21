import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsStateService } from '../../services/posts-state.service';

@Component({
  selector: 'app-post-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
            Search posts
          </label>
          <input
            id="search"
            type="text"
            [ngModel]="searchQuery()"
            (ngModelChange)="onSearchChange($event)"
            placeholder="Search by title or content..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- User Filter -->
        <div>
          <label for="user" class="block text-sm font-medium text-gray-700 mb-1">
            Filter by user
          </label>
          <select
            id="user"
            [ngModel]="selectedUserId() || ''"
            (ngModelChange)="onUserChange($event)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All users</option>
            @for (user of postsState.users(); track user.id) {
              <option [value]="user.id">{{ user.name }}</option>
            }
          </select>
        </div>

        <!-- Favorites Filter -->
        <div class="flex items-end">
          <label class="flex items-center">
            <input
              type="checkbox"
              [ngModel]="favoritesOnly()"
              (ngModelChange)="onFavoritesChange($event)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">Show favorites only</span>
          </label>
        </div>
      </div>

      @if (hasActiveFilters()) {
        <div class="mt-4 flex justify-between items-center">
          <span class="text-sm text-gray-600">
            {{ postsState.filteredPosts().length }} posts found
          </span>
          <button
            (click)="clearFilters()"
            class="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear filters
          </button>
        </div>
      }
    </div>
  `
})
export class PostFiltersComponent {
  readonly postsState = inject(PostsStateService);

  searchQuery = signal('');
  selectedUserId = signal<number | null>(null);
  favoritesOnly = signal(false);

  ngOnInit() {
    this.postsState.loadUsers();
  }

  onSearchChange(value: string) {
    this.searchQuery.set(value);
    this.postsState.setFilters({ search: value });
  }

  onUserChange(value: any) {
    console.log('User filter changed:', value, typeof value);
    let userId: number | null = null;
    
    // HTML select возвращает строку, нужно правильно обработать
    if (value && value !== '' && value !== 'null') {
      userId = parseInt(value, 10);
      if (isNaN(userId)) {
        userId = null;
      }
    }
    
    console.log('Processed userId:', userId);
    this.selectedUserId.set(userId);
    this.postsState.setFilters({ userId });
  }

  onFavoritesChange(value: boolean) {
    this.favoritesOnly.set(value);
    this.postsState.setFilters({ favoritesOnly: value });
  }

  hasActiveFilters(): boolean {
    const filters = this.postsState.filters();
    return !!(filters.search || filters.userId || filters.favoritesOnly);
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedUserId.set(null);
    this.favoritesOnly.set(false);
    this.postsState.setFilters({ search: '', userId: null, favoritesOnly: false });
  }
}