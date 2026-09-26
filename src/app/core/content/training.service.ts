import { Injectable, inject } from '@angular/core';
import { ArticleService } from './article.service';
import { TRAININGS, Training } from './trainings';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private readonly markdown = inject(ArticleService);
  readonly all: Training[] = [...TRAININGS].sort((a, b) => b.date.localeCompare(a.date));

  bySlug(slug: string): Training | undefined {
    return TRAININGS.find(t => t.slug === slug);
  }

  toHtml(md: string): string {
    return this.markdown.toHtml(md);
  }
}
