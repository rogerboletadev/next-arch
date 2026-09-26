import { JAVA_ARTICLES } from './articles-java';

export interface Article {
  slug: string;
  title: string;
  summary: string;
  pillar: 'Anti-padrões' | 'Sistemas distribuídos' | 'Fundamentos + IA';
  date: string;
  readingMinutes: number;
  markdown: string;
}

export const ARTICLES: Article[] = [
  ...JAVA_ARTICLES,
  {
    slug: 'retry-infinito-nao-e-resiliencia',
    title: 'Retry infinito não é resiliência',
    summary: 'Como retentativas cegas em integrações distribuídas transformam uma instabilidade pontual em efeito cascata.',
    pillar: 'Sistemas distribuídos',
    date: '2026-10-01',
    readingMinutes: 9,
    markdown: `
Um serviço downstream fica lento por dois minutos. Em vez de degradar, o ecossistema inteiro cai. O motivo quase nunca é o serviço lento: é a política de retry de quem chama.

## O anti-padrão

\`\`\`java
errorHandler(defaultErrorHandler()
    .maximumRedeliveries(-1));
\`\`\`

Cada mensagem que falha volta para a fila e tenta de novo, para sempre. Multiplique isso por dezenas de consumidores concorrentes e o sistema que já estava sofrendo passa a receber o triplo de carga.

## O mínimo aceitável

\`\`\`java
errorHandler(deadLetterChannel("dlq")
    .maximumRedeliveries(5)
    .useExponentialBackOff()
    .redeliveryDelay(2000));
\`\`\`

Limite de tentativas, backoff exponencial e um destino para o que não deu certo. E, antes de tudo isso, idempotência no consumidor.

[CONTINUAR O ARTIGO]
`,
  },
];
