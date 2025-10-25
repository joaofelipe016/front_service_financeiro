import { Injectable, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ScreenType = 'login' | 'cadastro';
export type AnimationDirection = 'up' | 'down';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private staggerDelay = 100;
  private itemAnimationDuration = 600;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustAnimationsForScreenSize();
    }
  }

  adjustAnimationsForScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isMobile = window.innerWidth < 768;
      this.staggerDelay = isMobile ? 60 : 100;
      this.itemAnimationDuration = isMobile ? 400 : 600;
    }
  }

  animateScreenTransition(
    currentScreen: ElementRef,
    newScreen: ElementRef,
    currentDirection: AnimationDirection,
    newDirection: AnimationDirection
  ): void {
    if (!currentScreen || !newScreen || !isPlatformBrowser(this.platformId)) return;

    console.log(`Animando transição: ${currentDirection}, ${newDirection}`);

    if (newDirection === 'up') {
      newScreen.nativeElement.style.transform = 'translateY(100vh)';
      newScreen.nativeElement.style.opacity = '1';
    }

    currentScreen.nativeElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    if (currentDirection === 'up') {
      currentScreen.nativeElement.style.transform = 'translateY(-100vh)';
    } else {
      currentScreen.nativeElement.style.transform = 'translateY(100vh)';
    }

    setTimeout(() => {
      newScreen.nativeElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      newScreen.nativeElement.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
      currentScreen.nativeElement.style.transition = '';
      newScreen.nativeElement.style.transition = '';
    }, 650);
  }

  animateInElements(screenElement: ElementRef, direction: AnimationDirection = 'up'): void {
    if (!screenElement || !isPlatformBrowser(this.platformId)) return;

    const animatableElements = screenElement.nativeElement.querySelectorAll('.animatable');
    console.log(`Animando ${animatableElements.length} elementos de entrada (${direction})`);

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

  animateOutElements(screenElement: ElementRef, direction: AnimationDirection = 'up'): void {
    if (!screenElement || !isPlatformBrowser(this.platformId)) return;

    const animatableElements = screenElement.nativeElement.querySelectorAll('.animatable');
    console.log(`Animando ${animatableElements.length} elementos de saída (${direction})`);

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

  animateIn(items: ElementRef[], direction: AnimationDirection): void {
    if (!items || items.length === 0 || !isPlatformBrowser(this.platformId)) return;

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

  animateOut(items: ElementRef[], direction: AnimationDirection): void {
    if (!items || items.length === 0 || !isPlatformBrowser(this.platformId)) return;

    const reversedItems = items.reverse();
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
