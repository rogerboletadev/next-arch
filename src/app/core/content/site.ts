export interface SocialLink {
  label: string;
  url: string;
}

/** Edite aqui. Links com url vazia não aparecem no site. */
export const FOUNDER = {
  name: 'Rogério Cardoso',
  role: 'Fundador da Arquitetura Pragmática',
  bio: [
    'Sou engenheiro de software e trabalho com sistemas corporativos em Java, integrações e arquitetura de sistemas distribuídos. O que escrevo aqui vem de problemas que apareceram em produção, não de tutorial.',
    'Criei a Arquitetura Pragmática porque vi o mesmo padrão se repetir: sistemas que nasceram para substituir um legado e acabam virando o próximo. A resposta quase nunca é mais tecnologia. É fronteira clara, resiliência básica bem feita e decisões documentadas.',
    'Aqui você encontra anti-padrões reais, com o erro, a causa e a correção, e o raciocínio de arquitetura por trás de cada um.',
  ],
  focus: ['Java e Spring', 'Sistemas distribuídos', 'Integrações e mensageria', 'Resiliência', 'Arquitetura evolutiva'],
  links: [
    { label: 'LinkedIn', url: '' },
    { label: 'GitHub', url: 'https://github.com/rogerboletadev' },
  ] as SocialLink[],
};
