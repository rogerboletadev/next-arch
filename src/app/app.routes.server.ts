import { RenderMode, ServerRoute } from '@angular/ssr';
import { ARTICLES } from './core/content/articles';
import { TRAININGS } from './core/content/trainings';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ARTICLES.map(a => ({ slug: a.slug }));
    },
  },
  {
    path: 'treinamento/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return TRAININGS.map(t => ({ slug: t.slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
