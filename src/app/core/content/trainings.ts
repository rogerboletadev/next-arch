export interface Training {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  markdown: string;
}

export const TRAININGS: Training[] = [
  {
    slug: 'primeiro-topico',
    title: 'Programar com IA da forma certa: ponto de partida',
    summary: 'Tópico de exemplo. Substitua pelo seu conteúdo.',
    date: '2026-09-26',
    readingMinutes: 3,
    markdown: `
IA escreve código rápido. Quem responde pela arquitetura, pelos limites e pela revisão continua sendo você.

## Como usar este espaço

Cada tópico é um item independente deste arquivo. Adicione um novo objeto à lista \`TRAININGS\` e ele aparece na página e ganha rota própria.

[SUBSTITUIR PELO CONTEÚDO REAL]
`,
  },
];
