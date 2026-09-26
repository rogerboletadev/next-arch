# Arquitetura Pragmática

Angular 20 + SSR (prerender estático) + Angular Material 3 + zoneless + `marked`. Site em https://next-arch.vercel.app, deploy automático da Vercel a cada push na `main` (repo `rogerboletadev/next-arch`). Domínio planejado: arquiteturapragmatica.com.br.

## Comandos (ambiente do dono: Windows, Node 20.10)

O Angular 20 exige Node >= 20.19 e o do sistema é 20.10. Rode o CLI sempre assim, sem alterar o Node global:

```bash
npx -y -p node@22 -p @angular/cli@20 -c "ng build"
npx -y -p node@22 -p @angular/cli@20 -c "ng serve"
```

- `ng build` leva ~2 min e gera `dist/arquitetura-pragmatica/browser`. Sucesso = "Prerendered N static routes" sem ERROR.
- O warning de orçamento de `landing.scss` (203 bytes acima de 4 kB) é conhecido e não bloqueia.
- O terminal do dono é Windows PowerShell 5.1: não usa `&&` (usar `;`). No Bash da sessão `&&` funciona.
- Sem Python no ambiente. Não escrever JSON com `\\` via heredoc (as barras se perdem); validar com `node -e "JSON.parse(...)"`.

## Estrutura

```
src/app/core/content/   articles.ts (artigo base + junta JAVA_ARTICLES), articles-java.ts, site.ts (FOUNDER), article.service.ts
src/app/features/       landing, manifesto, blog, artigo, roteiro, fundador
src/app/shared/         header, footer, reveal
vercel.json             cabeçalhos de segurança (CSP, HSTS etc.)
```

## Convenções

- Novo artigo: adicionar objeto `Article` em `articles-java.ts` (ou `articles.ts`). O prerender cria `/blog/<slug>` sozinho via `app.routes.server.ts`. Markdown em template literal: escapar crases como `\``, evitar `${`.
- Pilares válidos: `'Anti-padrões' | 'Sistemas distribuídos' | 'Fundamentos + IA'`.
- Tom dos artigos: PT-BR, direto, problema real -> causa -> correção -> cuidados/checklist. Sem inventar dados do autor.
- Nova página: componente standalone em `features/`, rota em `app.routes.ts` e link em `header.ts`/`footer.ts`.
- Dados do fundador e links (LinkedIn está vazio de propósito; link com `url` vazia não aparece): `site.ts`.
- Sem `provideAnimationsAsync`: o Material 20 não precisa e o pacote `@angular/animations` não está instalado.

## Segurança

Site 100% estático. Se adicionar scripts, fontes ou imagens de outros domínios, atualizar a CSP em `vercel.json` e testar no navegador (o prerender usa scripts inline, por isso `script-src 'unsafe-inline'`).

## Escopo do site (importante)

Site educativo e pessoal, sem fins comerciais. O dono trabalha em banco e precisa evitar qualquer conflito com políticas do empregador. Portanto: sem doação, apoio, anúncios ou monetização; sem citar empresa, cliente ou fatos de produção reais; exemplos sempre genéricos e didáticos; manter o aviso de "projeto pessoal" no rodapé e na página do fundador.

## Regras de trabalho

- Nunca usar tokens/senhas colados no chat; `git push` é feito pelo dono (autenticação dele). Commitar localmente é ok quando pedido.
- Não reexplorar o projeto: a estrutura acima é a fonte. Ler só os arquivos que a tarefa toca.
- Agrupar verificações: um build ao final, não um por edição.
