import { Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ArticleService } from '../../core/content/article.service';

@Component({
  selector: 'app-artigo',
  imports: [RouterLink, DatePipe, MatButtonModule],
  template: `
    <div class="progress" aria-hidden="true"></div>
    @if (article(); as a) {
      <article class="container page">
        <p class="meta">{{ a.pillar }}, {{ a.date | date: 'dd/MM/yyyy' }}, {{ a.readingMinutes }} min de leitura</p>
        <h1>{{ a.title }}</h1>
        <p class="lead">{{ a.summary }}</p>
        <div class="prose" [innerHTML]="html()"></div>
        <aside class="support">
          <p>Quer continuar aprendendo? Veja os outros artigos.</p>
          <a mat-flat-button routerLink="/blog">Ver todos os artigos</a>
        </aside>
      </article>
    } @else {
      <section class="container page">
        <h1>Artigo não encontrado</h1>
        <p class="lead">O endereço pode ter mudado. Veja a lista completa de artigos.</p>
        <a mat-flat-button routerLink="/blog">Ver artigos</a>
      </section>
    }
  `,
  styles: `
    .progress {
      position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 10;
      background: var(--mat-sys-primary); transform-origin: 0 50%; transform: scaleX(0);
      animation: grow linear both; animation-timeline: scroll(root);
    }
    @keyframes grow { to { transform: scaleX(1); } }
    @supports not (animation-timeline: scroll()) { .progress { display: none; } }
    @media (prefers-reduced-motion: reduce) { .progress { display: none; } }

    .page { padding-block: clamp(64px, 9vw, 120px); max-width: 760px; }
    .meta { font-family: var(--ap-mono); font-size: 14px; color: var(--mat-sys-on-surface-variant); margin-bottom: 20px; }
    h1 { font-size: clamp(38px, 5vw, 64px); line-height: 1.05; margin-bottom: 20px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); margin-bottom: 48px; }
    .prose { font-size: 19px; line-height: 1.75; }
    .prose ::ng-deep h2 { font-size: 32px; margin: 56px 0 16px; }
    .prose ::ng-deep p { margin-bottom: 20px; }
    .prose ::ng-deep pre { background: var(--ap-ink); color: var(--ap-code-fg); padding: 20px; overflow-x: auto; border-radius: 4px; font: 15px/1.7 var(--ap-mono); margin: 28px 0; }
    .support { margin-top: 72px; padding: 32px; background: var(--mat-sys-surface-container); display: flex; flex-wrap: wrap; gap: 16px 32px; align-items: center; justify-content: space-between; }
  `,
})
export class Artigo {
  private readonly articles = inject(ArticleService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly slug = input.required<string>();
  readonly article = computed(() => this.articles.bySlug(this.slug()));
  readonly html = computed(() => {
    const a = this.article();
    return a ? this.articles.toHtml(a.markdown) : '';
  });

  constructor() {
    effect(() => {
      const a = this.article();
      if (!a) return;
      this.title.setTitle(`${a.title} | Arquitetura Pragmática`);
      this.meta.updateTag({ name: 'description', content: a.summary });
      this.meta.updateTag({ property: 'og:title', content: a.title });
      this.meta.updateTag({ property: 'og:description', content: a.summary });
    });
  }
}
