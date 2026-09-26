# Arquitetura Pragmática

Angular 20 + SSR (prerender) + Angular Material 3 + zoneless.

## 1. Criar o projeto base

```bash
node --version            # precisa ser >= 20.19
npm install -g @angular/cli@20
ng new arquitetura-pragmatica --ssr --style=scss --zoneless
cd arquitetura-pragmatica
ng add @angular/material  # tema: Custom | tipografia global: Yes
npm install marked
```

## 2. Copiar os arquivos deste pacote

Copie a pasta `src/` por cima da gerada pelo CLI (substitui os arquivos iguais).
Apague `src/app/app.html`, `app.scss` e `app.spec.ts` gerados, o shell agora está inline em `app.ts`.

Se o `ng new` não perguntou sobre zoneless, remova `"zone.js"` de `polyfills` no `angular.json`.

## 3. Rodar

```bash
ng serve        # dev
ng build        # gera dist/arquitetura-pragmatica/browser (todas as rotas pré-renderizadas)
```

## 4. Ajustar a paleta (opcional, recomendado)

O tema usa paletas prontas do Material. Para gerar uma paleta M3 exata das cores do projeto:

```bash
ng generate @angular/material:theme-color
# primary: #9A3A1A  tertiary: #1F4E79  neutral: #F1EEE6
```

Depois troque `mat.$red-palette` / `mat.$azure-palette` em `src/styles.scss` pelas paletas geradas.

## 5. Deploy na Vercel

- Framework preset: Angular
- Build command: `ng build`
- Output directory: `dist/arquitetura-pragmatica/browser`

## Estrutura

```
src/app/
  core/content/     conteúdo dos artigos (markdown) e service
  shared/           header, footer, diretiva de revelação
  features/         landing, manifesto, blog, artigo, roteiro
```

## Novo artigo

Adicione um objeto em `src/app/core/content/articles.ts`. O prerender gera a rota `/blog/<slug>` automaticamente.
