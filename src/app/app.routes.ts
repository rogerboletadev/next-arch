import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'AndaimeTech', loadComponent: () => import('./features/andaimetech/andaimetech').then(m => m.Andaimetech) },
  { path: 'manifesto', title: 'Manifesto | AndaimeTech', loadComponent: () => import('./features/manifesto/manifesto').then(m => m.Manifesto) },
  { path: 'blog', title: 'Artigos | AndaimeTech', loadComponent: () => import('./features/blog/blog').then(m => m.Blog) },
  { path: 'blog/:slug', loadComponent: () => import('./features/artigo/artigo').then(m => m.Artigo) },
  { path: 'fundador', title: 'Fundador | AndaimeTech', loadComponent: () => import('./features/fundador/fundador').then(m => m.Fundador) },
  { path: 'roteiro', title: 'Roteiro do Desenvolvedor | AndaimeTech', loadComponent: () => import('./features/roteiro/roteiro').then(m => m.Roteiro) },
  { path: 'treinamento', title: 'Treinamento IA | AndaimeTech', loadComponent: () => import('./features/treinamento/treinamento').then(m => m.Treinamento) },
  { path: 'treinamento/:slug', loadComponent: () => import('./features/treinamento/topico').then(m => m.Topico) },
  { path: '**', redirectTo: '' },
];
