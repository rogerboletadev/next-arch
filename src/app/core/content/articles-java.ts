import type { Article } from './articles';

export const JAVA_ARTICLES: Article[] = [
  {
    slug: 'spring-scheduled-com-varios-pods',
    title: 'O perigo do @Scheduled do Spring com mais de um pod',
    summary: 'Em produção, cada instância roda o seu próprio agendador. Com dois pods, o job executa duas vezes.',
    pillar: 'Anti-padrões',
    date: '2026-10-08',
    readingMinutes: 6,
    markdown: `
Em desenvolvimento, o job roda uma vez por minuto e tudo parece certo. Em produção, você sobe dois pods e o mesmo job passa a rodar duas vezes por minuto: cobrança em duplicidade, e-mail repetido, arquivo processado duas vezes.

## Por que acontece

O \`@Scheduled\` é local à JVM. Ele não sabe que existe outra instância da aplicação. Cada pod tem o seu agendador e cada um dispara o método no horário.

\`\`\`java
@Scheduled(cron = "0 */5 * * * *")
public void processarPendentes() {
    // roda em TODOS os pods, ao mesmo tempo
    pendenteService.processar();
}
\`\`\`

Escalar horizontalmente, algo que deveria ser seguro, muda o comportamento do sistema. Esse é o sinal do anti-padrão.

## Opções de correção

**1. Lock distribuído com ShedLock.** Mantém o \`@Scheduled\` e garante que só uma instância execute por vez, usando uma tabela no banco (ou Redis) como trava.

\`\`\`java
@Scheduled(cron = "0 */5 * * * *")
@SchedulerLock(name = "processarPendentes",
               lockAtMostFor = "4m",
               lockAtLeastFor = "30s")
public void processarPendentes() {
    pendenteService.processar();
}
\`\`\`

**2. Quartz em modo cluster.** Mais pesado, mas oferece persistência dos jobs e balanceamento entre nós.

**3. Tirar o agendamento da aplicação.** Um \`CronJob\` do Kubernetes dispara o processamento, que roda uma vez por execução. Faz sentido quando o job não precisa viver dentro do serviço.

## Os cuidados que ficam

- \`lockAtMostFor\` menor que a duração real do job libera o lock no meio da execução e o segundo pod entra. Dimensione com folga.
- Relógios diferentes entre os pods desalinham a disputa pelo lock.
- O lock reduz a duplicidade, mas não garante zero. Se o pod cair no meio, o job pode rodar de novo. O processamento precisa ser **idempotente**.

## Regra prática

Todo método agendado deve responder a duas perguntas: "o que acontece se rodar em dois pods?" e "o que acontece se rodar duas vezes?". Se a resposta for "dano", falta lock e falta idempotência.
`,
  },
  {
    slug: 'caracteres-especiais-sybase-driver-legado',
    title: 'Caracteres especiais no Sybase: isolar o driver legado em vez de brigar com ele',
    summary: 'Quando o driver moderno corrompe acentos ao gravar, um componente pequeno com o driver antigo resolve sem contaminar o resto do sistema.',
    pillar: 'Anti-padrões',
    date: '2026-10-15',
    readingMinutes: 7,
    markdown: `
O sintoma é conhecido: o texto entra com acento e cedilha e chega na base como \`?\` ou como caracteres trocados. Ou pior, a gravação falha com erro de conversão. O sistema é moderno, o banco Sybase não é.

## Onde o problema costuma nascer

A cadeia tem três pontos de conversão de caracteres, e o erro está em algum deles:

1. **A aplicação**: a JVM trabalha em Unicode.
2. **O driver**: converte de Unicode para o charset da conexão.
3. **O servidor**: tem um charset padrão, muitas vezes antigo, e um charset por banco.

Se o charset da conexão e o do servidor não conversam, há perda. Antes de mudar qualquer coisa, meça: consulte o charset do servidor e o da sessão, e grave uma string de teste com os caracteres problemáticos.

## A tentação errada

Trocar o driver da aplicação inteira, ou sanitizar o texto na entrada removendo acentos. A primeira quebra o que funciona. A segunda destrói dado do usuário.

## A solução pragmática: um componente isolado

Quando a versão antiga do driver é a única que grava corretamente, não tente fazer o resto do sistema conviver com ela. Confine-a:

\`\`\`java
// Fronteira estreita: o sistema só conhece esta interface
public interface GravadorLegado {
    void gravar(RegistroLegado registro);
}
\`\`\`

O driver antigo, e só ele, vive em um módulo separado, com classpath próprio, ou em um serviço pequeno atrás dessa interface. O restante da aplicação continua com o driver moderno.

## O que isso compra

- **Contenção**: o risco do driver antigo fica em um lugar só.
- **Testabilidade**: a interface permite testar com um fake.
- **Saída futura**: no dia em que o banco migrar, troca-se uma implementação e não o sistema.

## Cuidados

- Documente por que a versão antiga é necessária, com a versão exata e o comportamento que ela corrige. Sem isso, alguém "atualiza" o driver e o problema volta.
- Escreva um teste de integração com acentos, cedilha e caracteres fora do Latin-1. Ele é o guardião dessa decisão.
- Trate o componente como dívida assumida, com dono e prazo de revisão.
`,
  },
  {
    slug: 'catch-para-rollback-cuidados',
    title: 'Os cuidados ao usar catch para fazer rollback de um fluxo',
    summary: 'O bloco catch que desfaz uma operação é código que só roda quando tudo já deu errado. É o lugar onde mais se erra.',
    pillar: 'Anti-padrões',
    date: '2026-10-22',
    readingMinutes: 7,
    markdown: `
É comum escrever um fluxo em etapas e, se algo falhar, desfazer o que já foi feito dentro de um \`catch\`. A ideia é razoável. A execução costuma esconder quatro problemas.

## 1. O rollback também falha

\`\`\`java
try {
    reservarEstoque(pedido);
    cobrar(pedido);
} catch (Exception e) {
    liberarEstoque(pedido); // e se isto lançar exceção?
    throw e;
}
\`\`\`

Se \`liberarEstoque\` falhar, a exceção original se perde e o sistema fica em estado parcial. Proteja a compensação e preserve a causa:

\`\`\`java
} catch (Exception e) {
    try {
        liberarEstoque(pedido);
    } catch (Exception ex) {
        e.addSuppressed(ex);
        alertar(pedido, e);
    }
    throw e;
}
\`\`\`

## 2. Engolir a exceção dentro de uma transação

No Spring, capturar a exceção dentro de um método \`@Transactional\` sem relançar pode marcar a transação como rollback-only. O resultado é um \`UnexpectedRollbackException\` no commit, longe da causa. Além disso, por padrão o Spring só faz rollback para exceções não verificadas. Para as verificadas, declare \`rollbackFor\`.

## 3. Capturar amplo demais

\`catch (Exception e)\` trata da mesma forma um erro de negócio, uma falha de rede e um bug. Cada um pede uma reação diferente. Capture o mais específico que você consegue tratar.

## 4. Rollback só cobre o que é seu

Se o fluxo chamou outro serviço, o \`catch\` não desfaz o efeito remoto. Aí é preciso uma **compensação explícita**, chamada a uma operação de cancelamento, e ela precisa ser idempotente, porque pode ser repetida. Esse é o núcleo do padrão Saga.

## Regra prática

- Compensação deve ser idempotente e com falha tratada.
- Nunca perca a exceção original.
- Se o desfazer é crítico, não dependa de um \`catch\` em memória. Registre a intenção de compensar de forma durável, por exemplo em uma tabela ou fila, e processe com retentativa.
`,
  },
  {
    slug: 'async-java-sistemas-distribuidos',
    title: 'Cuidados com @Async em sistemas distribuídos cheios de integrações',
    summary: 'O @Async devolve o controle rápido, mas troca a garantia de execução por uma promessa em memória que some quando o pod cai.',
    pillar: 'Sistemas distribuídos',
    date: '2026-10-29',
    readingMinutes: 8,
    markdown: `
Colocar \`@Async\` num método é a forma mais barata de "deixar para depois". Em um sistema com muitas integrações, esse depois tem custo.

## O que você perde sem perceber

**Durabilidade.** A tarefa vive numa fila em memória do pod. Se o pod reiniciar em um deploy ou por falta de memória, o trabalho pendente some, sem erro e sem registro.

**Exceções.** Em métodos \`void\`, a exceção não chega a quem chamou. Sem um \`AsyncUncaughtExceptionHandler\`, ela vira apenas uma linha de log.

\`\`\`java
@Async
public void notificarParceiro(Pedido p) {
    parceiroClient.enviar(p); // falhou? ninguém sabe
}
\`\`\`

**Contexto.** Usuário autenticado, transação, MDC de log e correlation id ficam na thread original. Na thread assíncrona eles não existem, a menos que você os propague.

## O pool é parte do design

Se você não configurar, o Spring Boot fornece um executor padrão, com fila praticamente ilimitada. Sob carga, a fila cresce até a memória acabar, em vez de aplicar contrapressão. Configure um pool com limites e uma política de rejeição explícita:

\`\`\`java
@Bean
public Executor integracaoExecutor() {
    var ex = new ThreadPoolTaskExecutor();
    ex.setCorePoolSize(8);
    ex.setMaxPoolSize(16);
    ex.setQueueCapacity(200);
    ex.setThreadNamePrefix("integracao-");
    ex.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
    return ex;
}
\`\`\`

Use pools separados por integração. Uma integração lenta não deve esgotar as threads das outras.

## Quando @Async não é a ferramenta

Se perder a tarefa é inaceitável, o trabalho precisa passar por algo durável: uma fila de mensagens, ou o padrão outbox. O \`@Async\` serve para trabalho descartável ou refazível, como cache e métricas.

## Checklist

- O trabalho pode ser perdido? Se não, use fila.
- Quem trata a falha? Ela é observável?
- O pool tem limite e política de rejeição?
- O contexto necessário está sendo propagado?
- A operação é idempotente para o caso de reexecução?
`,
  },
  {
    slug: 'completablefuture-cuidados-chamadas',
    title: 'Cuidados ao usar CompletableFuture para chamadas remotas',
    summary: 'Sem executor próprio e sem timeout, o CompletableFuture paralelo vira um gargalo compartilhado por todo o sistema.',
    pillar: 'Sistemas distribuídos',
    date: '2026-11-05',
    readingMinutes: 8,
    markdown: `
O \`CompletableFuture\` deixa disparar várias chamadas em paralelo e combinar os resultados. Funciona muito bem, até o dia em que uma dependência lenta trava a aplicação inteira.

## 1. O pool padrão é compartilhado

Sem passar um executor, \`supplyAsync\` usa o \`ForkJoinPool.commonPool()\`. Ele é dimensionado pelo número de CPUs e serve a toda a JVM. Chamada de rede é bloqueante: poucas requisições lentas ocupam todas as threads e o resto da aplicação, inclusive outras partes que usam o mesmo pool, para de progredir.

\`\`\`java
// evite: bloqueia o pool comum
CompletableFuture.supplyAsync(() -> clienteHttp.buscar(id));

// prefira: pool dedicado e dimensionado para I/O
CompletableFuture.supplyAsync(() -> clienteHttp.buscar(id), ioExecutor);
\`\`\`

## 2. Não existe timeout por padrão

Um \`get()\` ou \`join()\` sem prazo espera para sempre. Desde o Java 9 há suporte direto:

\`\`\`java
CompletableFuture.supplyAsync(() -> clienteHttp.buscar(id), ioExecutor)
    .orTimeout(2, TimeUnit.SECONDS)
    .exceptionally(ex -> respostaAlternativa());
\`\`\`

Use também timeout no próprio cliente HTTP. O do future não interrompe a chamada que já está em curso.

## 3. Cancelar não cancela o trabalho

\`cancel()\` completa o future, mas não interrompe a thread que está executando. A chamada segue consumindo recurso até terminar.

## 4. Exceções vêm embrulhadas

\`join()\` lança \`CompletionException\` e \`get()\` lança \`ExecutionException\`. A causa real está em \`getCause()\`. Trate isso, ou toda falha vai parecer a mesma.

## 5. allOf não devolve os resultados

\`CompletableFuture.allOf(...)\` retorna \`Void\`. Guarde as referências dos futures e leia cada um depois de a espera terminar. Se um falhar, o \`allOf\` falha, mas os demais continuam rodando.

## Regra prática

Paralelizar aumenta a carga sobre a dependência, e nem toda dependência aguenta. Defina antes o número máximo de chamadas simultâneas, o timeout e o comportamento em falha. Se essas três respostas não existem, o paralelismo é um risco e não uma otimização.
`,
  },
];
