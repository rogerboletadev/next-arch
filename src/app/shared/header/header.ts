import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar class="bar">
      <a routerLink="/" class="brand" aria-label="Arquitetura Pragmática, página inicial">
        <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="26" height="26" />
          <path d="M3 16h26M16 3v26" />
          <rect x="16" y="16" width="13" height="13" class="brand-fill" stroke="none" />
        </svg>
        <span>Arquitetura Pragmática</span>
      </a>
      <span class="spacer"></span>

      @if (isHandset()) {
        <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Abrir menu">
          <mat-icon>menu</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          @for (link of links; track link.path) {
            <a mat-menu-item [routerLink]="link.path">{{ link.label }}</a>
          }
          <a mat-menu-item routerLink="/" fragment="apoiar">Apoiar o projeto</a>
        </mat-menu>
      } @else {
        <nav class="nav" aria-label="Principal">
          @for (link of links; track link.path) {
            <a mat-button [routerLink]="link.path" routerLinkActive="active">{{ link.label }}</a>
          }
          <a mat-flat-button routerLink="/" fragment="apoiar">Apoiar o projeto</a>
        </nav>
      }
    </mat-toolbar>
  `,
  styles: `
    .bar {
      position: sticky; top: 0; z-index: 5;
      background: color-mix(in srgb, var(--mat-sys-surface) 88%, transparent);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      padding-inline: var(--ap-gutter);
      height: 72px;
    }
    .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; font: var(--mat-sys-title-large); font-family: var(--mat-sys-display-large-font); }
    .brand-fill { fill: var(--mat-sys-primary); }
    .spacer { flex: 1; }
    .nav { display: flex; gap: 4px; align-items: center; }
    .nav .active { color: var(--mat-sys-primary); }
  `,
})
export class Header {
  readonly links = [
    { path: '/manifesto', label: 'Manifesto' },
    { path: '/blog', label: 'Artigos' },
    { path: '/roteiro', label: 'Roteiro' },
  ];

  readonly isHandset = toSignal(
    inject(BreakpointObserver).observe('(max-width: 860px)').pipe(map(r => r.matches)),
    { initialValue: false },
  );
}
