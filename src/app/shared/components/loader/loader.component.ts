import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center" [class]="containerClass()">
      <div class="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" 
           [class]="size()">
      </div>
      @if (text()) {
        <span class="ml-3 text-gray-600">{{ text() }}</span>
      }
    </div>
  `
})
export class LoaderComponent {
  readonly size = input('h-8 w-8');
  readonly text = input<string>();
  readonly containerClass = input('py-8');
}