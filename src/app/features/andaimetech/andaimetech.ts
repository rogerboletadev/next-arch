import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-andaimetech',
  imports: [RouterLink, MatButtonModule],
  template: `
    <article class="container page">
      <h1>AndaimeTech</h1>
      <p class="lead">A estrutura que sustenta a evolução, não a permanência.</p>

      <h2>O que é</h2>
      <p>AndaimeTech é um jeito de pensar arquitetura de software. Não é um framework, não é uma metodologia fechada, é um princípio.</p>
      <p>A ideia central é simples: sistemas de verdade não são construídos de uma vez e depois ficam parados. Eles evoluem, se ajustam, se reformam enquanto continuam de pé e em uso. O que sustenta essa evolução não pode ser uma fundação rígida, tem que ser algo montado com intenção, pensado para ser ajustado, e desmontado quando não faz mais sentido.</p>

      <h2>A metáfora</h2>
      <p>Um andaime não é a construção. Ele é a estrutura que permite a construção acontecer, se transformar, crescer. Ele se monta conforme a necessidade, se adapta ao formato do prédio, e quando a obra termina (ou muda de fase), ele é desmontado sem deixar rastro na estrutura final.</p>
      <p>Isso é bem diferente de fundação ou alicerce, que remetem a algo fixo, definitivo, enterrado. Arquitetura de software raramente é definitiva. Ela é constantemente reformada, ampliada, remodelada, muitas vezes sem parar de funcionar.</p>
      <p>O AndaimeTech nasce dessa provocação: e se a gente parasse de projetar sistemas como fundações e começasse a projetar como andaimes?</p>

      <h2>Princípios</h2>
      <ol class="principles">
        @for (p of principles; track p.title) {
          <li>
            <h3>{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </li>
        }
      </ol>

      <h2>Por que esse nome</h2>
      <p>Os termos que já existem no mercado (arquitetura limpa, arquitetura evolutiva, engenharia de software sustentável) são bons conceitos, mas nenhum deles carrega essa ideia de estrutura temporária e viva com a força que eu queria comunicar. Faltava uma palavra que já trouxesse a metáfora certa embutida, sem precisar de explicação longa.</p>
      <p>AndaimeTech nasceu dessa lacuna. É um termo autoral, pensado para representar um jeito específico de encarar arquitetura: pragmático, adaptável, e nunca definitivo.</p>

      <h2>Na prática</h2>
      <p>O AndaimeTech não é só um conceito bonito, é a lente usada aqui para analisar problemas reais de engenharia: migração de sistemas legados, decisões de arquitetura evolutiva, e como IA entra nesse processo como mais uma ferramenta de apoio, não como substituto do raciocínio arquitetural.</p>

      <a mat-flat-button routerLink="/manifesto" class="cta">Veja o manifesto completo →</a>
    </article>
  `,
  styles: `
    .page { padding-block: clamp(64px, 9vw, 120px); max-width: 760px; }
    h1 { font-size: clamp(44px, 6vw, 80px); margin-bottom: 20px; }
    .lead { font: var(--mat-sys-headline-small); color: var(--mat-sys-on-surface-variant); margin-bottom: 48px; }
    h2 { font-size: 32px; margin: 56px 0 16px; }
    p { font-size: 19px; line-height: 1.75; margin-bottom: 20px; }
    .principles { list-style: none; padding: 0; margin: 0; border-top: 2px solid var(--mat-sys-on-surface); }
    .principles li { padding-block: 24px; border-bottom: 1px solid var(--mat-sys-outline-variant); }
    .principles h3 { font-size: 22px; margin-bottom: 8px; }
    .principles p { margin-bottom: 0; color: var(--mat-sys-on-surface-variant); }
    .cta { margin-top: 40px; }
  `,
})
export class Andaimetech {
  readonly principles = [
    { title: 'Estrutura temporária por design', body: 'Todo componente, toda decisão arquitetural, deve assumir que vai precisar mudar. Projetar para durabilidade eterna é projetar para o retrabalho.' },
    { title: 'Evolução sem reconstrução completa', body: 'O sistema precisa suportar mudança incremental. Se toda alteração relevante exige reescrever a base inteira, a estrutura falhou no propósito.' },
    { title: 'Suporte, não engessamento', body: 'Arquitetura deve habilitar o time a construir mais rápido e com mais segurança, nunca virar um obstáculo burocrático que trava a entrega.' },
    { title: 'Desmontagem é parte do ciclo', body: 'Um bom andaime sabe quando sair de cena. Código, padrões e decisões técnicas que já cumpriram seu papel devem poder ser removidos sem trauma.' },
  ];

  constructor() {
    const meta = inject(Meta);
    const description = 'A estrutura que sustenta a evolução, não a permanência.';
    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: 'AndaimeTech' });
    meta.updateTag({ property: 'og:description', content: description });
  }
}
