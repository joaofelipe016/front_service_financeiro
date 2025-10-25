import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick()"
    >
      <div class="bg-gradient-to-r from-cyan-primary via-cyan-secondary to-cyan-tertiary bg-300% animate-gradient bg-clip-text text-transparent flex items-center justify-center gap-2">
        @if (loading) {
          <svg
            class="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ loadingText }}
        } @else {
          {{ text }}
        }
      </div>
    </button>
  `,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string = 'Botão';
  @Input() loadingText: string = 'Carregando...';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseClasses = 'animatable w-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 text-white/60 hover:text-white bg-gradient-to-r from-cyan-tertiary via-cyan-secondary to-cyan-primary bg-300% animate-gradient disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-base',
      lg: 'text-lg'
    };

    return `${baseClasses} ${sizeClasses[this.size]}`;
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
