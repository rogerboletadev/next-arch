import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FOUNDER } from '../../core/content/site';

@Component({
  selector: 'app-fundador',
  imports: [MatButtonModule, MatChipsModule],
  template: `
    <section class="container page">
      <div class="identity">
        <div class="avatar" aria-hidden="true">{{ f.initials }}</div>
        <div>
          <p class="eyebrow">{{ f.role }}</p>
          <h1>{{ f.name }}</h1>
        </div>
      </div>

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

      <p class="disclaimer">{{ f.disclaimer }}</p>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(48px, 9vw, 120px); max-width: 760px; }
    .identity { display: flex; align-items: center; gap: clamp(16px, 3vw, 28px); margin-bottom: 32px; }
    .avatar {
      flex: none; display: grid; place-items: center; width: clamp(72px, 14vw, 104px); aspect-ratio: 1; border-radius: 50%;
      background: var(--mat-sys-primary); color: var(--mat-sys-on-primary);
      font-family: var(--mat-sys-display-large-font); font-size: clamp(26px, 5vw, 38px); font-weight: 600;
    }
    .eyebrow { font-family: var(--ap-mono); font-size: 14px; color: var(--mat-sys-primary); margin-bottom: 8px; }
    h1 { font-size: clamp(34px, 6vw, 68px); line-height: 1.05; }
    h2 { font-size: 28px; margin: 48px 0 16px; }
    p { line-height: 1.75; margin-bottom: 16px; font-size: 18px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); margin-bottom: 24px; }
    .links { display: flex; flex-wrap: wrap; gap: 12px; }
    .disclaimer { margin-top: 56px; padding-top: 20px; border-top: 1px solid var(--mat-sys-outline-variant); font-size: 14px; color: var(--mat-sys-on-surface-variant); }
  `,
})
export class Fundador {
  readonly f = FOUNDER;
  readonly links = FOUNDER.links.filter(l => l.url);
}
