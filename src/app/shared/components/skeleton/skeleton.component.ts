import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse space-y-4">
      @for (item of Array(count()); track $index) {
        <div class="bg-gray-300 rounded" [class]="height()"></div>
      }
    </div>
  `
})
export class SkeletonComponent {
  readonly count = input(3);
  readonly height = input('h-4');
  
  Array = Array;
}