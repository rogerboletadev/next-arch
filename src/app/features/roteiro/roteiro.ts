import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PHASES } from '../landing/content';

@Component({
  selector: 'app-roteiro',
  imports: [MatStepperModule, MatButtonModule],
  template: `
    <section class="container page">
      <h1>O novo roteiro do desenvolvedor</h1>
      <p class="lead">Fundamentos primeiro. IA como multiplicador. Cada fase se apoia na anterior.</p>
      <mat-stepper [orientation]="vertical() ? 'vertical' : 'horizontal'" [linear]="false" animationDuration="300ms">
        @for (p of phases; track p.title; let last = $last) {
          <mat-step [label]="p.title">
            <div class="step">
              <p>{{ p.body }}</p>
              <p class="todo">[CONTEÚDOS, LEITURAS E EXERCÍCIOS DA FASE]</p>
              <div class="nav">
                <button mat-stroked-button matStepperPrevious>Fase anterior</button>
                @if (!last) { <button mat-flat-button matStepperNext>Próxima fase</button> }
              </div>
            </div>
          </mat-step>
        }
      </mat-stepper>
    </section>
  `,
  styles: `
    .page { padding-block: clamp(64px, 9vw, 120px); }
    h1 { font-size: clamp(40px, 5.5vw, 76px); line-height: 1.05; max-width: 16ch; margin-bottom: 20px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); margin-bottom: 48px; max-width: 48ch; }
    mat-stepper { background: transparent; }
    .step { display: grid; gap: 16px; padding-block: 24px; max-width: 64ch; font-size: 19px; line-height: 1.65; }
    .todo { color: var(--mat-sys-on-surface-variant); }
    .nav { display: flex; gap: 12px; margin-top: 8px; }
  `,
})
export class Roteiro {
  readonly phases = PHASES;
  readonly vertical = toSignal(
    inject(BreakpointObserver).observe('(max-width: 860px)').pipe(map(r => r.matches)),
    { initialValue: false },
  );
}
