import { SectionId } from './types';

// This file contains the raw text data transformed into structured objects where necessary
// for the interactive components to consume.

export const IC_COMPONENTS_DATA = [
  {
    name: 'Capital Humano',
    description: "O conhecimento, habilidades, capacidades e experiências incorporadas nos colaboradores.",
    key_phrase: "Ele sai pela porta todas as noites.",
    indicators: ['Know-how', 'Educação/Treinamento', 'Competências', 'Espírito Empreendedor']
  },
  {
    name: 'Capital Estrutural',
    description: "A capacidade organizacional, infraestrutura e conhecimento codificado que permanece quando os funcionários saem.",
    key_phrase: "O que a empresa possui.",
    indicators: ['Patentes', 'Filosofia de gestão', 'Cultura', 'Sistemas de TI', 'Processos']
  },
  {
    name: 'Capital Relacional',
    description: "Valor derivado das relações com clientes e stakeholders externos (Capital do Cliente).",
    key_phrase: "Estabilidade de mercado e Receita.",
    indicators: ['Marcas', 'Relacionamento com clientes', 'Lealdade', 'Reputação', 'Canais de distribuição']
  },
];

export const SECI_DATA = [
  {
    mode: 'Socialização',
    from: 'Tácito',
    to: 'Tácito',
    desc: 'Compartilhamento de conhecimento através da interação direta e experiência compartilhada.',
    example: 'Aprendizagem, brainstorming.',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    mode: 'Externalização',
    from: 'Tácito',
    to: 'Explícito',
    desc: 'Articulação do conhecimento tácito em conceitos, manuais ou modelos.',
    example: 'Escrever um manual baseado na experiência.',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    mode: 'Combinação',
    from: 'Explícito',
    to: 'Explícito',
    desc: 'Sistematização e integração de diferentes corpos de conhecimento explícito.',
    example: 'Criar um relatório a partir de várias fontes de dados.',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    mode: 'Internalização',
    from: 'Explícito',
    to: 'Tácito',
    desc: 'Incorporação do conhecimento explícito através do "aprender fazendo".',
    example: 'Ler um manual e aplicá-lo.',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
];

export const DISCLOSURE_THEORIES = [
  {
    title: 'Teoria da Agência',
    desc: 'Gestores (agentes) têm mais informações que acionistas (principais). Divulgar o CI reduz a assimetria, diminui custos de agência e constrói confiança.'
  },
  {
    title: 'Teoria dos Stakeholders',
    desc: 'O sucesso depende da satisfação de diversos grupos (empregados, clientes, sociedade). A divulgação mantém a "licença social" para operar.'
  },
  {
    title: 'Teoria da Sinalização',
    desc: 'Empresas de alta qualidade precisam se diferenciar. A divulgação voluntária age como um "sinal" crível de qualidade superior.'
  },
  {
    title: 'Custo-Benefício',
    desc: 'Empresas divulgam apenas quando os benefícios (menor custo de capital, avaliação precisa) superam os custos (auditoria, segredos competitivos).'
  }
];

export const SECI_WORKSHOP_STEPS = [
  {
    id: 'socialization',
    title: 'Socialização',
    sub: 'Tácito para Tácito',
    concept: 'Conversão de conhecimento tácito em outro tácito através do compartilhamento de experiências. Envolve interação direta, observação, imitação ou mentoria.',
    ba: 'Originating Ba (Lugar de Origem): Interação face a face onde emoções e experiências são compartilhadas.',
    question: 'Que atividade promoverá a troca direta de experiências (mentoria, brainstorming informal)?',
    outcome: 'Conhecimento Compreendido (Empatia Simpatizada)'
  },
  {
    id: 'externalization',
    title: 'Externalização',
    sub: 'Tácito para Explícito',
    concept: 'Conversão crítica do saber pessoal em conceitos formais. Exige articular o saber pessoal através de metáforas, analogias ou documentos para torná-lo um ativo formal.',
    ba: 'Dialoguing Ba (Lugar de Diálogo): Espaço para articular modelos mentais e habilidades em termos comuns.',
    question: 'Como este conhecimento será registrado ou documentado (manuais, vídeos, diagramas)?',
    outcome: 'Conhecimento Conceitual'
  },
  {
    id: 'combination',
    title: 'Combinação',
    sub: 'Explícito para Explícito',
    concept: 'Sistematização e integração. Consiste em combinar diferentes conjuntos de informações documentadas (bases de dados, relatórios) sob uma nova forma concreta.',
    ba: 'Systemizing Ba (Lugar de Sistematização): Mundo virtual ou colaborativo onde novas formas de conhecimento explícito são combinadas.',
    question: 'Como esse novo registro será organizado junto ao conhecimento existente da empresa (banco de dados, newsletter, curso)?',
    outcome: 'Conhecimento Sistêmico'
  },
  {
    id: 'internalization',
    title: 'Internalização',
    sub: 'Explícito para Tácito',
    concept: 'Incorporação do conhecimento através do "aprender fazendo". O colaborador interpreta o manual/guia e o transforma em nova habilidade pessoal.',
    ba: 'Exercising Ba (Lugar de Exercício): Espaço de ação onde o conhecimento explícito é praticado.',
    question: 'Qual a atividade prática para garantir que a equipe aprenda fazendo (simulação, projeto piloto)?',
    outcome: 'Conhecimento Operacional'
  }
];