import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Post } from '../../../../core/services/api.service';
import { FavoriteButtonComponent } from '../../../../shared/components/favorite-button/favorite-button.component';
import { PostsStateService } from '../../services/posts-state.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FavoriteButtonComponent],
  animations: [
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95) translateY(-10px)' }))
      ])
    ])
  ],
  template: `
    <article 
      [@fadeInScale]
      class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      
      <div class="p-6">
        <div class="flex justify-between items-start mb-3">
          <h2 class="text-xl font-semibold text-gray-900 line-clamp-2 flex-1 mr-4">
            <a [routerLink]="['/posts', post().id]" 
               class="hover:text-blue-600 transition-colors">
              {{ formatTitle(post().title) }}
            </a>
          </h2>
          
          <app-favorite-button 
            [postId]="post().id"
            (favoriteToggled)="onFavoriteToggled($event)"
          />
        </div>

        <p class="text-gray-600 text-sm mb-4 line-clamp-3">
          {{ formatBody(post().body) }}
        </p>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <span class="text-xs text-gray-500">
              @if (userInfo()) {
                by {{ userInfo()?.name }}
              } @else {
                User #{{ post().userId }}
              }
            </span>
            <span class="text-xs text-gray-400">•</span>
            <span class="text-xs text-gray-500">
              Post #{{ post().id }}
            </span>
          </div>
          
          <a [routerLink]="['/posts', post().id]" 
             class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Read more →
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class PostCardComponent {
  private readonly postsState = inject(PostsStateService);
  
  readonly post = input.required<Post>();

  readonly userInfo = computed(() => {
    const users = this.postsState.users();
    return users.find(user => user.id === this.post().userId);
  });

  formatTitle(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  formatBody(body: string): string {
    return body.replace(/\n/g, ' ').substring(0, 150) + (body.length > 150 ? '...' : '');
  }

  onFavoriteToggled(event: { postId: number; isFavorite: boolean }) {
    console.log(`Post ${event.postId} ${event.isFavorite ? 'added to' : 'removed from'} favorites`);
  }
}