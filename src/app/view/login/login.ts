import { AfterViewInit, Component, ElementRef, ViewChild, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent, LoginForm } from '../../shared/components/login-screen/login-screen.component';
import { RegisterScreenComponent, RegisterForm } from '../../shared/components/register-screen/register-screen.component';
import { AnimationService } from '../../shared/services/animation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginScreenComponent, RegisterScreenComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css', '../../shared/components/shared-components.css'],
})
export class LoginComponent implements AfterViewInit {
  telaAtual = signal<'login' | 'cadastro'>('login');
  ultimaTela: 'login' | 'cadastro' = 'login';

  @ViewChild('loginScreen', { read: ElementRef }) loginScreen!: ElementRef;
  @ViewChild('registerScreen', { read: ElementRef }) registerScreen!: ElementRef;

  loginForm: LoginForm = {
    email: '',
    senha: ''
  };

  cadastroForm: RegisterForm = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  isLoading = signal(false);

  constructor(private animationService: AnimationService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.animationService.adjustAnimationsForScreenSize();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animationService.animateInElements(this.loginScreen, 'up');
    }, 200);
  }

  mostrarLogin() {
    if (this.telaAtual() !== 'login') {
      this.ultimaTela = this.telaAtual();
      this.animationService.animateOutElements(this.registerScreen, 'down');
      setTimeout(() => {
        this.telaAtual.set('login');
        setTimeout(() => {
          this.animationService.animateInElements(this.loginScreen, 'down');
        }, 50);
      }, 300);
    }
  }

  mostrarCadastro() {
    if (this.telaAtual() !== 'cadastro') {
      this.ultimaTela = this.telaAtual();
      this.animationService.animateOutElements(this.loginScreen, 'up');
      setTimeout(() => {
        this.telaAtual.set('cadastro');
        setTimeout(() => {
          this.animationService.animateInElements(this.registerScreen, 'up');
        }, 50);
      }, 300);
    }
  }

  async fazerLogin(form: LoginForm) {
    if (!form.email || !form.senha) {
      this.showNotification('Por favor, preencha todos os campos', 'error');
      return;
    }

    this.isLoading.set(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.showNotification('Login realizado com sucesso!', 'success');
    } catch (error) {
      this.showNotification('Erro ao fazer login. Tente novamente.', 'error');
    } finally {
      this.isLoading.set(false);
    }
  }

  async fazerCadastro(form: RegisterForm) {
    if (!form.nome || !form.email || !form.senha || !form.confirmarSenha) {
      this.showNotification('Por favor, preencha todos os campos', 'error');
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      this.showNotification('As senhas não coincidem', 'error');
      return;
    }

    this.isLoading.set(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.showNotification('Cadastro realizado com sucesso!', 'success');
      this.mostrarLogin();
    } catch (error) {
      this.showNotification('Erro ao fazer cadastro. Tente novamente.', 'error');
    } finally {
      this.isLoading.set(false);
    }
  }

  onSocialLogin(provider: string) {
    console.log(`Login com ${provider}`);
    this.showNotification(`Login com ${provider} em desenvolvimento`, 'info');
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}
