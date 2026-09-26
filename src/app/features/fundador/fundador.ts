import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FOUNDER } from '../../core/content/site';

@Component({
  selector: 'app-fundador',
  imports: [MatButtonModule, MatChipsModule],
  template: `
    <section class="container page">
      <p class="eyebrow">{{ f.role }}</p>
      <h1>{{ f.name }}</h1>
      @for (p of f.bio; track $index) {
        <p [class.lead]="$first">{{ p }}</p>
      }

      <h2>Foco</h2>
      <mat-chip-set aria-label="Áreas de foco">
        @for (item of f.focus; track item) {
          <mat-chip>{{ item }}</mat-chip>
        }
      </mat-chip-set>

      <h2>Contato</h2>
      <div class="links">
        @for (l of links; track l.label) {
          <a mat-flat-button [href]="l.url" target="_blank" rel="noopener noreferrer">{{ l.label }}</a>
        }
      </div>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(64px, 9vw, 120px); max-width: 760px; }
    .eyebrow { font-family: var(--ap-mono); font-size: 14px; color: var(--mat-sys-primary); margin-bottom: 16px; }
    h1 { font-size: clamp(44px, 6vw, 80px); margin-bottom: 32px; }
    h2 { font-size: 28px; margin: 48px 0 16px; }
    p { line-height: 1.75; margin-bottom: 16px; font-size: 18px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); margin-bottom: 24px; }
    .links { display: flex; flex-wrap: wrap; gap: 12px; }
  `,
})
export class Fundador {
  readonly f = FOUNDER;
  readonly links = FOUNDER.links.filter(l => l.url);
}
