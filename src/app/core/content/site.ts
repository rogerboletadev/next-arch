export interface SocialLink {
  label: string;
  url: string;
}

/** Edite aqui. Links com url vazia não aparecem no site. */
export const FOUNDER = {
  name: 'Rogério Cardoso',
  initials: 'RC',
  role: 'Fundador da Arquitetura Pragmática',
  bio: [
    'Sou engenheiro de software e atuo com sistemas corporativos em Java, integrações e arquitetura de sistemas distribuídos. Escrevo sobre o que aprendi construindo e evoluindo esse tipo de sistema.',
    'Criei a Arquitetura Pragmática porque o mesmo padrão se repete no mercado: sistemas que nascem para substituir um legado e acabam virando o próximo. A resposta quase nunca é mais tecnologia. É fronteira clara, resiliência básica bem feita e decisões documentadas.',
    'Aqui você encontra anti-padrões recorrentes de arquitetura, com o erro, a causa e a correção, e o raciocínio por trás de cada um. Os exemplos são genéricos e didáticos.',
  ],
  focus: ['Java e Spring', 'Sistemas distribuídos', 'Integrações e mensageria', 'Resiliência', 'Arquitetura evolutiva'],
  disclaimer: 'Este é um projeto pessoal. As opiniões e os exemplos aqui são de autoria própria e não representam nenhuma empresa ou cliente.',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rogerio-cardoso-de-oliveira/' },
    { label: 'GitHub', url: 'https://github.com/rogerboletadev' },
  ] as SocialLink[],
};
