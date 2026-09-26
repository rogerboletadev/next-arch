import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/** Revela o elemento ao entrar na viewport. Respeita prefers-reduced-motion e é seguro no SSR. */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class Reveal {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || !('IntersectionObserver' in window)) {
        node.classList.add('is-visible');
        return;
      }
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            io.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(node);
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
