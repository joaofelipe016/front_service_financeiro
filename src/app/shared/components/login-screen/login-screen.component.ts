import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { HeaderComponent } from '../header/header.component';
import { SocialLoginComponent } from '../social-login/social-login.component';
import { DividerComponent } from '../divider/divider.component';

export interface LoginForm {
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    HeaderComponent,
    SocialLoginComponent,
    DividerComponent
  ],
  template: `
    <div
      #loginScreen
      id="login"
      class="flex flex-col justify-center items-center absolute inset-0 p-4 sm:p-8 screen-container"
      [class.opacity-0]="!isVisible"
      [class.pointer-events-none]="!isVisible"
    >
      <app-header
        title="Bem-vindo de volta!!"
        subtitle="entre com suas redes socias"
      />

      <form
        class="flex flex-col gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-6 md:mt-8 justify-center items-center w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <app-input
          type="email"
          name="email"
          placeholder="Email"
          [(ngModel)]="form.email"
        />
        <app-input
          type="password"
          name="senha"
          placeholder="Senha"
          [(ngModel)]="form.senha"
        />
      </form>

      <div class="flex justify-center items-center mt-4 sm:mt-6 md:mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <app-button
          text="Entrar"
          loadingText="Entrando..."
          [loading]="isLoading"
          [disabled]="isLoading"
          (clicked)="onLogin()"
        />
      </div>

      <app-divider text="ou" />

      <app-social-login (socialLogin)="onSocialLogin($event)" />

      <div class="mt-4 sm:mt-6 md:mt-8 text-white/60 text-xs sm:text-sm animatable text-center">
        Não tem uma conta?
        <button
          (click)="onSwitchToRegister()"
          class="font-bold text-white/90 underline hover:text-white transition-all duration-300 hover:scale-105"
        >
          Cadastre-se
        </button>
      </div>
    </div>
  `
})
export class LoginScreenComponent {
  @Input() form: LoginForm = { email: '', senha: '' };
  @Input() isLoading: boolean = false;
  @Input() isVisible: boolean = true;

  @Output() login = new EventEmitter<LoginForm>();
  @Output() socialLogin = new EventEmitter<string>();
  @Output() switchToRegister = new EventEmitter<void>();

  onLogin(): void {
    this.login.emit(this.form);
  }

  onSocialLogin(provider: string): void {
    this.socialLogin.emit(provider);
  }

  onSwitchToRegister(): void {
    this.switchToRegister.emit();
  }
}
