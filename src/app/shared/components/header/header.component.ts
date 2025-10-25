import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="flex flex-col justify-center items-center gap-2 sm:gap-3 md:gap-4">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-tertiary via-cyan-secondary to-cyan-primary bg-300% animate-gradient bg-clip-text text-transparent animatable">
        {{ title }}
      </h1>
      @if (subtitle) {
        <h2 class="text-sm sm:text-base md:text-lg font-light bg-gradient-to-r from-cyan-tertiary via-cyan-secondary to-cyan-primary bg-300% animate-gradient bg-clip-text text-transparent animatable">
          {{ subtitle }}
        </h2>
      }
    </header>
  `
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
