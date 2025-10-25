import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { HeaderComponent } from '../header/header.component';

export interface RegisterForm {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    HeaderComponent
  ],
  template: `
    <div
      #registerScreen
      id="cadastro"
      class="flex flex-col justify-center items-center absolute inset-0 p-4 sm:p-8 screen-container"
      [class.opacity-0]="!isVisible"
      [class.pointer-events-none]="!isVisible"
    >
      <app-header
        title="Ainda não tem uma conta?"
        subtitle="cadastre-se agora mesmo"
      />

      <form
        class="flex flex-col gap-2.5 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 justify-center items-center w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <app-input
          type="text"
          name="nome"
          placeholder="Nome"
          [(ngModel)]="form.nome"
        />
        <app-input
          type="email"
          name="emailCadastro"
          placeholder="Email"
          [(ngModel)]="form.email"
        />
        <app-input
          type="password"
          name="senhaCadastro"
          placeholder="Senha"
          [(ngModel)]="form.senha"
        />
        <app-input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar senha"
          [(ngModel)]="form.confirmarSenha"
        />
      </form>

      <div class="flex justify-center items-center mt-4 sm:mt-6 md:mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <app-button
          text="Cadastrar-se"
          loadingText="Cadastrando..."
          [loading]="isLoading"
          [disabled]="isLoading"
          (clicked)="onRegister()"
        />
      </div>

      <div class="mt-4 sm:mt-6 md:mt-8 text-white/60 text-xs sm:text-sm animatable text-center">
        Já tem uma conta?
        <button
          (click)="onSwitchToLogin()"
          class="font-bold text-white/90 underline hover:text-white transition-all duration-300 hover:scale-105"
        >
          Faça login
        </button>
      </div>
    </div>
  `
})
export class RegisterScreenComponent {
  @Input() form: RegisterForm = { nome: '', email: '', senha: '', confirmarSenha: '' };
  @Input() isLoading: boolean = false;
  @Input() isVisible: boolean = true;

  @Output() register = new EventEmitter<RegisterForm>();
  @Output() switchToLogin = new EventEmitter<void>();

  onRegister(): void {
    this.register.emit(this.form);
  }

  onSwitchToLogin(): void {
    this.switchToLogin.emit();
  }
}
