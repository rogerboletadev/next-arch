import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="container foot">
      <strong class="name">Arquitetura Pragmática</strong>
      <p>Engenharia do mundo real. Sem tutorial perfeito.</p>
      <nav aria-label="Rodapé">
        <a routerLink="/manifesto">Manifesto</a>
        <a routerLink="/blog">Artigos</a>
        <a routerLink="/roteiro">Roteiro</a>
        <a routerLink="/fundador">Fundador</a>
      </nav>
      <p class="legal">Projeto pessoal. Opiniões e exemplos são de autoria própria e não representam nenhuma empresa.</p>
    </footer>
  `,
  styles: `
    :host { display: block; border-top: 1px solid var(--mat-sys-outline-variant); }
    .foot { display: flex; flex-wrap: wrap; gap: 16px 32px; align-items: center; justify-content: space-between; padding-block: 40px; color: var(--mat-sys-on-surface-variant); }
    .name { font-family: var(--mat-sys-display-large-font); font-size: 20px; color: var(--mat-sys-on-surface); }
    nav { display: flex; flex-wrap: wrap; gap: 8px 24px; }
    .legal { flex-basis: 100%; font-size: 13px; }
  `,
})
export class Footer {}
