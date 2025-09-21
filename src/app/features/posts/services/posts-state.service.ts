import { Injectable, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService, Post, PostDetail, User } from '../../../core/services/api.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs';

export interface PostFilters {
  search: string;
  userId: number | null;
  favoritesOnly: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PostsStateService {
  private readonly apiService = inject(ApiService);

  private readonly _posts = signal<Post[]>([]);
  private readonly _loading = signal(false);
  private readonly _selectedPost = signal<PostDetail | null>(null);
  private readonly _postDetailLoading = signal(false);
  private readonly _filters = signal<PostFilters>({ 
    search: '', 
    userId: null, 
    favoritesOnly: false 
  });

  // Users for filter dropdown
  private readonly _users = signal<User[]>([]);

  // Public readonly signals
  readonly posts = this._posts.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly selectedPost = this._selectedPost.asReadonly();
  readonly postDetailLoading = this._postDetailLoading.asReadonly();
  readonly filters = this._filters.asReadonly();
  readonly users = this._users.asReadonly();

  // Computed filtered posts
  readonly filteredPosts = computed(() => {
    const posts = this._posts();
    const filters = this._filters();
    
    console.log('Filtering posts:', {
      totalPosts: posts.length,
      filters,
      samplePost: posts[0]
    });
    
    const filtered = posts.filter(post => {
      // Search filter
      if (filters.search && !post.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !post.body.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // User filter
      if (filters.userId !== null && filters.userId !== undefined) {
        console.log('Checking user filter:', post.userId, 'vs', filters.userId, post.userId === filters.userId);
        if (post.userId !== filters.userId) {
          return false;
        }
      }
      
      return true;
    });
    
    console.log('Filtered result:', filtered.length, 'posts');
    return filtered;
  });

  async loadPosts(forceRefresh = false): Promise<void> {
    if (!forceRefresh && this._posts().length > 0) {
      return;
    }

    this._loading.set(true);
    try {
      console.log('Loading posts from API...');
      const posts = await this.apiService.getPosts().pipe(
        catchError((error) => {
          console.error('Error loading posts:', error);
          return of([] as Post[]);
        })
      ).toPromise();
      
      console.log('Received posts:', posts);
      this._posts.set(posts || []);
    } finally {
      this._loading.set(false);
    }
  }

  async loadUsers(): Promise<void> {
    if (this._users().length > 0) return;

    try {
      const users = await this.apiService.getUsers().pipe(
        catchError(() => of([] as User[]))
      ).toPromise();
      
      this._users.set(users || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async loadPostDetail(id: number): Promise<void> {
    this._postDetailLoading.set(true);
    this._selectedPost.set(null);

    try {
      const [post, comments] = await forkJoin([
        this.apiService.getPost(id),
        this.apiService.getComments(id)
      ]).pipe(
        catchError(() => of([null, []]))
      ).toPromise() || [null, []];

      if (post && !Array.isArray(post)) {
        const user = await this.apiService.getUser(post.userId).pipe(
          catchError(() => of(null))
        ).toPromise();

        const postDetail: PostDetail = {
          ...post,
          user: user || undefined,
          comments: Array.isArray(comments) ? comments : []
        };

        this._selectedPost.set(postDetail);
      }
    } finally {
      this._postDetailLoading.set(false);
    }
  }

  setFilters(filters: Partial<PostFilters>): void {
    this._filters.update(current => ({ ...current, ...filters }));
  }

  clearSelectedPost(): void {
    this._selectedPost.set(null);
  }
}