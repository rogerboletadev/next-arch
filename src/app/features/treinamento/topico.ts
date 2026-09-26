import { Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TrainingService } from '../../core/content/training.service';

@Component({
  selector: 'app-topico',
  imports: [RouterLink, DatePipe, MatButtonModule],
  template: `
    @if (training(); as t) {
      <article class="container page">
        <p class="meta">Treinamento IA, {{ t.date | date: 'dd/MM/yyyy' }}, {{ t.readingMinutes }} min de leitura</p>
        <h1>{{ t.title }}</h1>
        <p class="lead">{{ t.summary }}</p>
        <div class="prose" [innerHTML]="html()"></div>
        <a mat-stroked-button routerLink="/treinamento">Todos os tópicos</a>
      </article>
    } @else {
      <section class="container page">
        <h1>Tópico não encontrado</h1>
        <p class="lead">O endereço pode ter mudado. Veja a lista completa.</p>
        <a mat-flat-button routerLink="/treinamento">Ver tópicos</a>
      </section>
    }
  `,
  styles: `
    .page { padding-block: clamp(64px, 9vw, 120px); max-width: 760px; }
    .meta { font-family: var(--ap-mono); font-size: 14px; color: var(--mat-sys-on-surface-variant); margin-bottom: 20px; }
    h1 { font-size: clamp(38px, 5vw, 64px); line-height: 1.05; margin-bottom: 20px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); margin-bottom: 48px; }
    .prose { font-size: 19px; line-height: 1.75; margin-bottom: 56px; }
    .prose ::ng-deep h2 { font-size: 32px; margin: 56px 0 16px; }
    .prose ::ng-deep p { margin-bottom: 20px; }
    .prose ::ng-deep pre { background: var(--ap-ink); color: #d9d5cb; padding: 28px; overflow-x: auto; border-radius: 4px; font: 15px/1.7 var(--ap-mono); margin: 28px 0; }
  `,
})
export class Topico {
  private readonly trainings = inject(TrainingService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly slug = input.required<string>();
  readonly training = computed(() => this.trainings.bySlug(this.slug()));
  readonly html = computed(() => {
    const t = this.training();
    return t ? this.trainings.toHtml(t.markdown) : '';
  });

  constructor() {
    effect(() => {
      const t = this.training();
      if (!t) return;
      this.title.setTitle(`${t.title} | Treinamento IA`);
      this.meta.updateTag({ name: 'description', content: t.summary });
      this.meta.updateTag({ property: 'og:title', content: t.title });
      this.meta.updateTag({ property: 'og:description', content: t.summary });
    });
  }
}
