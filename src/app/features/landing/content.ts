export const THESES = [
  {
    title: 'A ilusão da transição contínua',
    body: 'Sair do monolito não é a linha de chegada. Um sistema de transição que recebe novas frentes de negócio antes de ser estabilizado vira, no mesmo instante, um legado fragmentado. O velho continua de pé e o novo já nasce devendo.',
  },
  {
    title: 'A pausa estratégica',
    body: 'Antes de escalar produtos, pare. Limpe domínios, defina fronteiras, aplique engenharia no core. Parar agora custa semanas. Não parar custa uma nova migração daqui a três anos.',
  },
  {
    title: 'O paradoxo da inteligência artificial',
    body: 'A IA escreve código em segundos. Sem domínio de arquitetura e de regra de negócio, ela só acelera a produção de débito técnico. A IA amplifica o engenheiro que você já é, para o bem e para o mal.',
  },
];

export const ANTI_PATTERNS = [
  { icon: 'history', title: 'A síndrome do novo legado', body: 'O sistema moderno herda atalhos, gambiarras e prazos do antigo. Stack nova, problemas velhos.' },
  { icon: 'hub', title: 'Domínios sem fronteira', body: 'Módulos que conhecem as regras uns dos outros. Qualquer mudança vira uma cirurgia em cinco lugares.' },
  { icon: 'speed', title: 'O time-to-market ilusório', body: 'Entregar rápido hoje para pagar o dobro de manutenção amanhã. A velocidade aparece no roadmap e some na operação.' },
];

export const PHASES = [
  { title: 'O negócio', body: 'Event Storming e mapeamento de contextos com DDD. Entender o que construir antes de escrever uma linha.' },
  { title: 'A base', body: 'Clean Architecture, SOLID e padrões de resiliência. O que mantém o sistema de pé quando o volume e a equipe crescem.' },
  { title: 'A escala', body: 'Cursor, agentes e Model Context Protocol conectando a IA ao contexto real da sua arquitetura. Velocidade com direção.' },
];

export const RETRY_SNIPPET = `// o anti-padrão
errorHandler(defaultErrorHandler()
    .maximumRedeliveries(-1));

// o mínimo aceitável
errorHandler(deadLetterChannel("dlq")
    .maximumRedeliveries(5)
    .useExponentialBackOff()
    .redeliveryDelay(2000));`;
