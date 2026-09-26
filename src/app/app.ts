import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <a class="skip" href="#conteudo">Pular para o conteúdo</a>
    <app-header />
    <main id="conteudo"><router-outlet /></main>
    <app-footer />
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 100dvh; }
    main { flex: 1; }
    .skip { position: absolute; left: -9999px; }
    .skip:focus { left: 16px; top: 16px; z-index: 10; background: var(--mat-sys-surface); padding: 12px 16px; }
  `,
})
export class App {}
