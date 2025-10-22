import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, ViewChild, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements AfterViewInit {
  telaAtual = signal<'login' | 'cadastro'>('login');

  ultimaTela: 'login' | 'cadastro' = 'login';

  @ViewChildren('loginScreen .animatable', { read: ElementRef }) loginAnimItems!: QueryList<ElementRef>;
  @ViewChildren('cadastroScreen .animatable', { read: ElementRef }) cadastroAnimItems!: QueryList<ElementRef>;
  @ViewChild('loginScreen', { read: ElementRef }) loginScreen!: ElementRef;
  @ViewChild('cadastroScreen', { read: ElementRef }) cadastroScreen!: ElementRef;

  loginForm = {
    email: '',
    senha: ''
  };

  cadastroForm = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  isLoading = signal(false);
  private staggerDelay = 100;
  private itemAnimationDuration = 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustAnimationsForScreenSize();
  }

  ngAfterViewInit() {
    console.log('Login items:', this.loginAnimItems?.length);
    console.log('Cadastro items:', this.cadastroAnimItems?.length);
    setTimeout(() => {
      this.animateInElements('login', 'up');
    }, 200);
  }

  mostrarLogin() {
    if (this.telaAtual() !== 'login') {
      this.ultimaTela = this.telaAtual();
      this.animateOutElements('cadastro', 'down');
      setTimeout(() => {
        this.telaAtual.set('login');
        setTimeout(() => {
          this.animateInElements('login', 'down');
        }, 50);
      }, 300);
    }
  }

  mostrarCadastro() {
    if (this.telaAtual() !== 'cadastro') {
      this.ultimaTela = this.telaAtual();
      this.animateOutElements('login', 'up');
      setTimeout(() => {
        this.telaAtual.set('cadastro');
        setTimeout(() => {
          this.animateInElements('cadastro', 'up');
        }, 50);
      }, 300);
    }
  }

  async fazerLogin() {
    if (!this.loginForm.email || !this.loginForm.senha) {
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

  async fazerCadastro() {
    if (!this.cadastroForm.nome || !this.cadastroForm.email || !this.cadastroForm.senha || !this.cadastroForm.confirmarSenha) {
      this.showNotification('Por favor, preencha todos os campos', 'error');
      return;
    }

    if (this.cadastroForm.senha !== this.cadastroForm.confirmarSenha) {
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

  private showNotification(message: string, type: 'success' | 'error') {
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  private adjustAnimationsForScreenSize() {
    const isMobile = window.innerWidth < 768;
    this.staggerDelay = isMobile ? 60 : 100;
    this.itemAnimationDuration = isMobile ? 400 : 600;
  }

  private animateScreenTransition(
    currentScreen: 'login' | 'cadastro',
    currentDirection: 'up' | 'down',
    newScreen: 'login' | 'cadastro',
    newDirection: 'up' | 'down'
  ) {
    const currentElement = currentScreen === 'login' ? this.loginScreen : this.cadastroScreen;
    const newElement = newScreen === 'login' ? this.loginScreen : this.cadastroScreen;

    if (!currentElement || !newElement) return;

    console.log(`Animando transição: ${currentScreen} ${currentDirection}, ${newScreen} ${newDirection}`);

    if (newDirection === 'up') {
      newElement.nativeElement.style.transform = 'translateY(100vh)';
      newElement.nativeElement.style.opacity = '1';
    }

    this.telaAtual.set(newScreen);
    currentElement.nativeElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    if (currentDirection === 'up') {
      currentElement.nativeElement.style.transform = 'translateY(-100vh)';
    } else {
      currentElement.nativeElement.style.transform = 'translateY(100vh)';
    }

    setTimeout(() => {
      newElement.nativeElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      newElement.nativeElement.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
      currentElement.nativeElement.style.transition = '';
      newElement.nativeElement.style.transition = '';
    }, 650);
  }

  private animateInElements(screen: 'login' | 'cadastro', direction: 'up' | 'down' = 'up') {
    const screenElement = screen === 'login' ? this.loginScreen : this.cadastroScreen;
    if (!screenElement) return;

    const animatableElements = screenElement.nativeElement.querySelectorAll('.animatable');
    console.log(`Animando ${animatableElements.length} elementos de entrada na tela ${screen} (${direction})`);

    const elementsArray = Array.from(animatableElements);
    elementsArray.forEach((element, index) => {
      const htmlElement = element as HTMLElement;

      const initialTransform = direction === 'up' ? 'translate-y-6' : '-translate-y-6';
      htmlElement.classList.add('opacity-0', initialTransform, 'scale-95');
      htmlElement.classList.remove('transition-all', 'duration-500', 'ease-out');

      htmlElement.offsetHeight;

      setTimeout(() => {
        htmlElement.classList.add('transition-all', 'duration-500', 'ease-out');
        htmlElement.classList.remove('opacity-0', initialTransform, 'scale-95');
        htmlElement.classList.add('opacity-100', 'translate-y-0', 'scale-100');
      }, index * this.staggerDelay);
    });
  }

  private animateOutElements(screen: 'login' | 'cadastro', direction: 'up' | 'down' = 'up') {
    const screenElement = screen === 'login' ? this.loginScreen : this.cadastroScreen;
    if (!screenElement) return;

    const animatableElements = screenElement.nativeElement.querySelectorAll('.animatable');
    console.log(`Animando ${animatableElements.length} elementos de saída na tela ${screen} (${direction})`);

    const elementsArray = Array.from(animatableElements);
    const reversedElements = elementsArray.reverse();

    reversedElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      const exitTransform = direction === 'up' ? '-translate-y-6' : 'translate-y-6';

      setTimeout(() => {
        htmlElement.classList.add('transition-all', 'duration-300', 'ease-in');
        htmlElement.classList.add('opacity-0', exitTransform, 'scale-95');
        htmlElement.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
      }, index * this.staggerDelay);
    });
  }

  private animateIn(items: QueryList<ElementRef>, direction: 'up' | 'down') {
    if (!items || items.length === 0) return;

    items.forEach((item, index) => {
      const element = item.nativeElement;

      element.classList.add('opacity-0', 'translate-y-6', 'scale-95');
      element.classList.remove('transition-all', 'duration-500', 'ease-out');

      element.offsetHeight;

      setTimeout(() => {
        element.classList.add('transition-all', 'duration-500', 'ease-out');
        element.classList.remove('opacity-0', 'translate-y-6', 'scale-95');
        element.classList.add('opacity-100', 'translate-y-0', 'scale-100');
      }, index * this.staggerDelay);
    });
  }

  private animateOut(items: QueryList<ElementRef>, direction: 'up' | 'down') {
    if (!items || items.length === 0) return;

    const reversedItems = items.toArray().reverse();
    reversedItems.forEach((item, index) => {
      const element = item.nativeElement;

      setTimeout(() => {
        element.classList.add('transition-all', 'duration-300', 'ease-in');
        element.classList.add('opacity-0', '-translate-y-6', 'scale-95');
        element.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
      }, index * this.staggerDelay);
    });
  }
}
