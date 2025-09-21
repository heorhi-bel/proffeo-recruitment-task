import { Component, inject, input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { PostsStateService } from '../../services/posts-state.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { FavoriteButtonComponent } from '../../../../shared/components/favorite-button/favorite-button.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    LoaderComponent, 
    SkeletonComponent,
    FavoriteButtonComponent
  ],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 200ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <div class="max-w-4xl mx-auto">
      <!-- Back button -->
      <div class="mb-6">
        <a routerLink="/posts" 
           class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
          ← Back to posts
        </a>
      </div>

      @if (postsState.postDetailLoading()) {
        <!-- Loading skeleton -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <app-skeleton [count]="1" height="h-8" />
          <div class="mt-4">
            <app-skeleton [count]="1" height="h-4" />
          </div>
          <div class="mt-6">
            <app-skeleton [count]="8" height="h-4" />
          </div>
          <div class="mt-8">
            <app-skeleton [count]="1" height="h-6" />
            <div class="mt-4">
              <app-skeleton [count]="3" height="h-16" />
            </div>
          </div>
        </div>
      } @else if (postsState.selectedPost(); as post) {
        <!-- Post content -->
        <article [@slideIn] class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <!-- Header -->
          <div class="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <div class="flex justify-between items-start">
              <div class="flex-1 mr-4">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">
                  {{ formatTitle(post.title) }}
                </h1>
                @if (post.user) {
                  <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span class="text-blue-600 font-semibold text-lg">
                            {{ getUserInitials(post.user.name) }}
                          </span>
                        </div>
                      </div>
                      <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-900">{{ post.user.name }}</h3>
                        <p class="text-sm text-gray-600">@{{ post.user.username }}</p>
                        <div class="mt-2 text-sm text-gray-500 space-y-1">
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            {{ post.user.email }}
                          </div>
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            {{ post.user.phone }}
                          </div>
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {{ post.user.address.city }}, {{ post.user.address.street }}
                          </div>
                          @if (post.user.company) {
                            <div class="flex items-center">
                              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                              </svg>
                              {{ post.user.company.name }}
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <app-favorite-button [postId]="post.id" />
            </div>
          </div>

          <!-- Content -->
          <div class="px-8 py-6">
            <div [@fadeIn] class="prose max-w-none">
              <div class="text-lg text-gray-700 leading-relaxed space-y-4">
                @for (paragraph of formatBodyParagraphs(post.body); track $index) {
                  <p>{{ paragraph }}</p>
                }
              </div>
            </div>
          </div>
        </article>

        <!-- Comments -->
        @if (post.comments && post.comments.length > 0) {
          <section [@slideIn] class="mt-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Comments ({{ post.comments.length }})
            </h2>
            
            <div class="space-y-6">
              @for (comment of post.comments; track comment.id) {
                <div [@fadeIn] class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span class="text-gray-600 font-medium text-sm">
                          {{ getInitials(comment.name) }}
                        </span>
                      </div>
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-start mb-2">
                        <h3 class="font-semibold text-gray-900">{{ formatCommentName(comment.name) }}</h3>
                        <span class="text-sm text-blue-600">{{ comment.email }}</span>
                      </div>
                      <p class="text-gray-700 leading-relaxed">{{ comment.body }}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </section>
        }
      } @else {
        <!-- Error state -->
        <div class="text-center py-12">
          <div class="text-gray-500 text-lg mb-4">Post not found</div>
          <a routerLink="/posts" 
             class="text-blue-600 hover:text-blue-800 underline">
            Return to posts
          </a>
        </div>
      }
    </div>
  `,
  styles: [`
    .prose p {
      margin-bottom: 1rem;
      line-height: 1.75;
    }
  `]
})
export class PostDetailComponent implements OnInit, OnDestroy {
  readonly postsState = inject(PostsStateService);
  readonly id = input.required<string>();

  ngOnInit() {
    const postId = Number(this.id());
    if (postId && !isNaN(postId)) {
      this.postsState.loadPostDetail(postId);
    }
  }

  ngOnDestroy() {
    this.postsState.clearSelectedPost();
  }

  formatTitle(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  formatBodyParagraphs(body: string): string[] {
    return body.split('\n').filter(paragraph => paragraph.trim().length > 0);
  }

  formatCommentName(name: string): string {
    return name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  }

  getUserInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  }
}