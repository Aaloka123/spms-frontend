import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';

/** MedNexus-style fade-up when the section enters the viewport */
@Directive({
  selector: '[appFadeInOnScroll]',
})
export class FadeInOnScrollDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  /** Optional delay in ms before the transition starts (MedNexus FadeInOnScroll delay) */
  @Input() fadeDelay = 0;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('scroll-fade-in');

    if (this.fadeDelay > 0) {
      node.style.transitionDelay = `${this.fadeDelay}ms`;
    }

    // SSR has no window/IntersectionObserver — show content immediately on the server
    if (!isPlatformBrowser(this.platformId)) {
      node.classList.add('is-visible');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('is-visible');
          this.observer?.disconnect();
          this.observer = null;
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
