import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Arquitetura Pragmática', loadComponent: () => import('./features/landing/landing').then(m => m.Landing) },
  { path: 'manifesto', title: 'Manifesto | Arquitetura Pragmática', loadComponent: () => import('./features/manifesto/manifesto').then(m => m.Manifesto) },
  { path: 'blog', title: 'Artigos | Arquitetura Pragmática', loadComponent: () => import('./features/blog/blog').then(m => m.Blog) },
  { path: 'blog/:slug', loadComponent: () => import('./features/artigo/artigo').then(m => m.Artigo) },
  { path: 'fundador', title: 'Fundador | Arquitetura Pragmática', loadComponent: () => import('./features/fundador/fundador').then(m => m.Fundador) },
  { path: 'roteiro', title: 'Roteiro do Desenvolvedor | Arquitetura Pragmática', loadComponent: () => import('./features/roteiro/roteiro').then(m => m.Roteiro) },
  { path: '**', redirectTo: '' },
];
