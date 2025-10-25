import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="divider-wrapper animatable">
      <div class="divider-line-left"></div>
      <span class="divider-text">{{ text }}</span>
      <div class="divider-line-right"></div>
    </div>
  `,
  styleUrls: ['./divider.component.css']
})
export class DividerComponent {
  @Input() text: string = 'ou';
}
