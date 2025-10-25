import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SocialProvider {
  name: string;
  icon: string;
  title: string;
  viewBox: string;
  path: string;
}

@Component({
  selector: 'app-social-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-4 sm:gap-6 md:gap-8 mt-3 sm:mt-4 md:mt-6 animatable">
      @for (provider of socialProviders; track provider.name) {
        <a
          href="#"
          class="p-2 sm:p-2.5 social-icon interactive-element"
          (click)="onSocialLogin(provider.name, $event)"
        >
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white/50 hover:text-white/90 transition-colors duration-300"
            role="img"
            [attr.viewBox]="provider.viewBox"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{{ provider.title }}</title>
            <path [attr.d]="provider.path" />
          </svg>
        </a>
      }
    </div>
  `
})
export class SocialLoginComponent {
  @Output() socialLogin = new EventEmitter<string>();

  socialProviders: SocialProvider[] = [
    {
      name: 'google',
      icon: 'google',
      title: 'Google',
      viewBox: '0 0 488 512',
      path: 'M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
    },
    {
      name: 'facebook',
      icon: 'facebook',
      title: 'Facebook',
      viewBox: '0 0 320 512',
      path: 'M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z'
    },
    {
      name: 'linkedin',
      icon: 'linkedin',
      title: 'LinkedIn',
      viewBox: '0 0 448 512',
      path: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 53.79-54.3c29.7 0 53.79 24.5 53.79 54.3a53.79 53.79 0 0 1-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'
    }
  ];

  onSocialLogin(provider: string, event: Event): void {
    event.preventDefault();
    this.socialLogin.emit(provider);
  }
}
