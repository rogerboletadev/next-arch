import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header class="bar">
      <div class="bar-inner">
        <a routerLink="/" class="brand" aria-label="AndaimeTech, página inicial" (click)="close()">
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="26" height="26" />
            <path d="M3 16h26M16 3v26" />
            <rect x="16" y="16" width="13" height="13" class="brand-fill" stroke="none" />
          </svg>
          <span class="brand-text">AndaimeTech</span>
        </a>

        <nav class="nav" aria-label="Principal">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path" routerLinkActive="active" class="nav-link">{{ link.label }}</a>
          }
        </nav>

        <button type="button" class="burger" [attr.aria-expanded]="open()" aria-controls="menu-mobile"
                [attr.aria-label]="open() ? 'Fechar menu' : 'Abrir menu'" (click)="toggle()">
          <mat-icon aria-hidden="true">{{ open() ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>

      @if (open()) {
        <nav id="menu-mobile" class="panel" aria-label="Menu">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path" routerLinkActive="active" class="panel-link" (click)="close()">{{ link.label }}</a>
          }
        </nav>
      }
    </header>
  `,
  styles: `
    :host { display: block; position: sticky; top: 0; z-index: 20; }
    .bar {
      background: color-mix(in srgb, var(--mat-sys-surface) 92%, transparent);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--mat-sys-outline-variant);
    }
    .bar-inner {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      width: min(100% - 2 * var(--ap-gutter), var(--ap-max)); margin-inline: auto; height: 68px;
    }
    .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; min-width: 0; color: var(--mat-sys-primary); }
    .brand-text { font: var(--mat-sys-title-large); font-family: var(--mat-sys-display-large-font); font-weight: 600; color: var(--mat-sys-on-surface); white-space: nowrap; }
    .brand-fill { fill: var(--mat-sys-primary); }

    .nav { display: flex; align-items: center; gap: 4px; }
    .nav-link {
      position: relative; padding: 10px 14px; text-decoration: none; font-weight: 500; font-size: 15px;
      color: var(--mat-sys-on-surface-variant); border-radius: 8px; transition: color 150ms, background 150ms;
    }
    .nav-link:hover { color: var(--mat-sys-on-surface); background: var(--mat-sys-surface-container); }
    .nav-link.active { color: var(--mat-sys-primary); }
    .nav-link.active::after {
      content: ''; position: absolute; left: 14px; right: 14px; bottom: 2px; height: 2px;
      background: var(--mat-sys-primary); border-radius: 2px;
    }

    .burger {
      display: none; align-items: center; justify-content: center; width: 48px; height: 48px;
      border: 0; background: transparent; color: var(--mat-sys-on-surface); border-radius: 12px; cursor: pointer;
    }
    .burger:hover { background: var(--mat-sys-surface-container); }

    .panel {
      display: none; flex-direction: column; gap: 4px; padding: 12px var(--ap-gutter) 24px;
      background: var(--mat-sys-surface); border-bottom: 1px solid var(--mat-sys-outline-variant);
      box-shadow: 0 16px 32px -16px rgb(15 34 56 / 25%);
    }
    .panel-link {
      display: flex; align-items: center; min-height: 52px; padding-inline: 12px; text-decoration: none;
      font-size: 18px; font-weight: 500; border-radius: 10px; border-bottom: 1px solid var(--mat-sys-outline-variant);
    }
    .panel-link.active { color: var(--mat-sys-primary); background: var(--mat-sys-surface-container-low); }

    @media (max-width: 860px) {
      .nav { display: none; }
      .burger { display: inline-flex; }
      .panel { display: flex; }
      .bar-inner { height: 60px; }
      .brand-text { font-size: 19px; }
    }
    @media (max-width: 360px) { .brand-text { font-size: 17px; } }
  `,
})
export class Header {
  readonly links = [
    { path: '/manifesto', label: 'Manifesto' },
    { path: '/blog', label: 'Artigos' },
    { path: '/roteiro', label: 'Roteiro' },
    { path: '/treinamento', label: 'Treinamento IA' },
    { path: '/fundador', label: 'Fundador' },
  ];

  readonly open = signal(false);

  toggle() { this.open.update(v => !v); }
  close() { this.open.set(false); }

  @HostListener('document:keydown.escape')
  onEscape() { this.close(); }
}
