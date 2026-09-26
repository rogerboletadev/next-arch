import { RenderMode, ServerRoute } from '@angular/ssr';
import { ARTICLES } from './core/content/articles';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ARTICLES.map(a => ({ slug: a.slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
