import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrainingService } from '../../core/content/training.service';

@Component({
  selector: 'app-treinamento',
  imports: [RouterLink, DatePipe],
  template: `
    <section class="container page">
      <h1>Treinamento IA</h1>
      <p class="lead">Como programar com IA da forma certa: tópicos para engenheiros de inteligência artificial.</p>

      <ul class="list">
        @for (t of trainings.all; track t.slug) {
          <li>
            <a [routerLink]="['/treinamento', t.slug]" class="item">
              <span class="meta">{{ t.date | date: 'dd/MM/yyyy' }}, {{ t.readingMinutes }} min</span>
              <h2>{{ t.title }}</h2>
              <p>{{ t.summary }}</p>
            </a>
          </li>
        } @empty {
          <li class="empty">Nenhum tópico publicado ainda.</li>
        }
      </ul>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(64px, 9vw, 120px); max-width: 900px; }
    h1 { font-size: clamp(44px, 6vw, 80px); margin-bottom: 24px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); }
    .list { list-style: none; padding: 0; margin: 40px 0 0; border-top: 2px solid var(--mat-sys-on-surface); }
    .item { display: grid; gap: 10px; padding-block: 32px; border-bottom: 1px solid var(--mat-sys-outline-variant); text-decoration: none; }
    .item:hover h2 { color: var(--mat-sys-primary); }
    .meta { font-family: var(--ap-mono); font-size: 14px; color: var(--mat-sys-on-surface-variant); }
    h2 { font-size: 30px; transition: color 150ms; }
    p { color: var(--mat-sys-on-surface-variant); line-height: 1.6; }
    .empty { padding-block: 32px; color: var(--mat-sys-on-surface-variant); }
  `,
})
export class Treinamento {
  readonly trainings = inject(TrainingService);
}
