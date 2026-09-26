import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { ARTICLES, Article } from './articles';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  readonly all: Article[] = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  bySlug(slug: string): Article | undefined {
    return ARTICLES.find(a => a.slug === slug);
  }

  toHtml(markdown: string): string {
    return marked.parse(markdown, { async: false }) as string;
  }
}
