import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { THESES } from '../landing/content';

@Component({
  selector: 'app-manifesto',
  imports: [MatExpansionModule],
  template: `
    <article class="container page">
      <h1>Manifesto</h1>
      <p class="lead">Três teses para quem precisa evoluir sistemas críticos sem criar o próximo legado.</p>
      <mat-accordion multi>
        @for (t of theses; track t.title; let first = $first) {
          <mat-expansion-panel [expanded]="first">
            <mat-expansion-panel-header><mat-panel-title>{{ t.title }}</mat-panel-title></mat-expansion-panel-header>
            <p>{{ t.body }}</p>
            <p class="todo">[TEXTO COMPLETO DA TESE]</p>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </article>
  `,
  styles: `
    .page { padding-block: clamp(64px, 9vw, 120px); max-width: 860px; }
    h1 { font-size: clamp(44px, 6vw, 80px); margin-bottom: 20px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); margin-bottom: 48px; }
    mat-panel-title { font-family: var(--mat-sys-display-large-font); font-size: 22px; }
    p { line-height: 1.7; margin-bottom: 16px; }
    .todo { color: var(--mat-sys-on-surface-variant); }
  `,
})
export class Manifesto {
  readonly theses = THESES;
}
