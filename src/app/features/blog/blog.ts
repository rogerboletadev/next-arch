import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { ArticleService } from '../../core/content/article.service';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, DatePipe, MatChipsModule],
  template: `
    <section class="container page">
      <h1>Artigos</h1>
      <mat-chip-listbox aria-label="Filtrar por pilar" (change)="pillar.set($event.value ?? null)">
        @for (p of pillars; track p) { <mat-chip-option [value]="p">{{ p }}</mat-chip-option> }
      </mat-chip-listbox>

      <ul class="list">
        @for (a of filtered(); track a.slug) {
          <li>
            <a [routerLink]="['/blog', a.slug]" class="item">
              <span class="meta">{{ a.pillar }}, {{ a.date | date: 'dd/MM/yyyy' }}, {{ a.readingMinutes }} min</span>
              <h2>{{ a.title }}</h2>
              <p>{{ a.summary }}</p>
            </a>
          </li>
        } @empty {
          <li class="empty">Nenhum artigo neste pilar ainda. Escolha outro filtro.</li>
        }
      </ul>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(64px, 9vw, 120px); max-width: 900px; }
    h1 { font-size: clamp(44px, 6vw, 80px); margin-bottom: 32px; }
    .list { list-style: none; padding: 0; margin: 40px 0 0; border-top: 2px solid var(--mat-sys-on-surface); }
    .item { display: grid; gap: 10px; padding-block: 32px; border-bottom: 1px solid var(--mat-sys-outline-variant); text-decoration: none; }
    .item:hover h2 { color: var(--mat-sys-primary); }
    .meta { font-family: var(--ap-mono); font-size: 14px; color: var(--mat-sys-on-surface-variant); }
    h2 { font-size: 30px; transition: color 150ms; }
    p { color: var(--mat-sys-on-surface-variant); line-height: 1.6; }
    .empty { padding-block: 32px; color: var(--mat-sys-on-surface-variant); }
  `,
})
export class Blog {
  private readonly articles = inject(ArticleService);
  readonly pillars = ['Anti-padrões', 'Sistemas distribuídos', 'Fundamentos + IA'];
  readonly pillar = signal<string | null>(null);
  readonly filtered = computed(() => {
    const p = this.pillar();
    return p ? this.articles.all.filter(a => a.pillar === p) : this.articles.all;
  });
}
