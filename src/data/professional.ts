export const identity = {
  brand: "Analista de TI – Sistemas Operacionais",
  role: "Analista de TI – Sistemas Operacionais",
  institution: "HU Brasil/Ebserh",
  unit: "HU-UFPI",
  context:
    "Hospital Universitário da Universidade Federal do Piauí – HU-UFPI | HU Brasil/Ebserh",
  subtitle: "Perfil Profissional | Analista de TI – Sistemas Operacionais",
  about:
    "Perfil informativo de Analista de TI – Sistemas Operacionais no contexto do HU-UFPI/Ebserh. O escopo profissional está relacionado à administração, diagnóstico, análise e aperfeiçoamento de ambientes computacionais, observadas as atribuições do emprego, as diretrizes institucionais e as políticas de segurança da informação.",
};
export const institutionalNotice =
  "Perfil profissional de caráter informativo. Este ambiente não constitui portal institucional oficial da HU Brasil/Ebserh nem substitui seus canais administrativos e operacionais.";
export const attributionSource =
  "https://www.gov.br/hubrasil/pt-br/acesso-a-informacao/agentes-publicos/demonstrativos-de-quadro-de-pessoal-remuneracoes-e-beneficios/cargos-carreiras-e-beneficios/plano-de-cargos-e-beneficios/descricao-sumaria-das-atribuicoes-dos-cargos-efetivos-cargos-comissionados-e-funcoes-gratificadas-2026.pdf/view";
// Descriptions summarize the employment scope, not the holder's experience.
export const duties = [
  {
    title: "Diagnóstico de ambientes servidores",
    description:
      "Examinar o funcionamento de ambientes servidores e identificar necessidades de ajuste nos sistemas operacionais.",
    relation: "Diagnóstico de servidores e sistemas operacionais.",
    icon: "ScanLine",
  },
  {
    title: "Estudos para implementação de serviços de rede",
    description:
      "Estudar requisitos técnicos para implantação de serviços de rede.",
    relation: "Estudos para implementação de serviços de rede.",
    icon: "Network",
  },
  {
    title: "Diagnóstico de servidores Web e de aplicação",
    description:
      "Analisar ambientes Web e de aplicação, identificando condições de funcionamento e problemas técnicos.",
    relation: "Diagnóstico de servidores Web e de aplicação.",
    icon: "Globe",
  },
  {
    title: "Administração de ambientes de sistemas operacionais",
    description:
      "Utilizar ferramentas de administração para manter ambientes de sistemas operacionais.",
    relation: "Administração de sistemas operacionais.",
    icon: "Terminal",
  },
  {
    title: "Análise de desempenho e tuning",
    description:
      "Analisar desempenho e estudar ajustes nos sistemas operacionais e no uso de recursos computacionais.",
    relation: "Análise de performance e tuning.",
    icon: "Gauge",
  },
  {
    title: "Inventário de ambientes computacionais",
    description:
      "Organizar informações técnicas sobre os ambientes computacionais por meio de ferramentas de inventário.",
    relation: "Inventário de ambientes computacionais.",
    icon: "Boxes",
  },
  {
    title: "Estudos para implementação de backup e restore",
    description:
      "Estudar requisitos de cópia e restauração para apoiar o planejamento da recuperação de dados.",
    relation: "Estudos para implementação de backup e restore.",
    icon: "DatabaseBackup",
  },
  {
    title: "Demais atividades inerentes ao emprego",
    description:
      "Desenvolver outras atividades compatíveis com o emprego, conforme diretrizes e necessidades institucionais.",
    relation: "Demais atividades inerentes ao emprego.",
    icon: "Workflow",
  },
];
export const competenceNames = [
  "Linux e Windows Server",
  "Redes de computadores",
  "Administração de servidores",
  "Virtualização",
  "Servidores Web e de aplicação",
  "Monitoramento e observabilidade",
  "Backup e restauração",
  "Diagnóstico de desempenho",
  "Automação e scripts",
  "Documentação técnica",
];
export const levels = [
  "Em desenvolvimento",
  "Conhecimento básico",
  "Conhecimento intermediário",
  "Conhecimento avançado",
];
export const activityStatuses = [
  "Atividades realizadas",
  "Atividades em andamento",
  "Atividades propostas",
  "Estudos e capacitações",
];
export const projectStatuses = [
  "Ideia",
  "Em estudo",
  "Proposta apresentada",
  "Em avaliação institucional",
  "Autorizado",
  "Em desenvolvimento",
  "Concluído",
];
export type Collection =
  "competencias" | "atividades" | "projetos" | "capacitacoes" | "documentacao";
export interface ProfessionalRecord {
  id: string;
  userId: string;
  collection: Collection;
  fields: Record<string, string>;
}
export interface Field {
  name: string;
  label: string;
  type?: "textarea" | "date" | "number";
  options?: string[];
  required?: boolean;
}
export const collections: Record<
  Collection,
  { title: string; singular: string; description: string; fields: Field[] }
> = {
  competencias: {
    title: "Competências técnicas",
    singular: "competência",
    description:
      "Classificação informada pelo titular, sem níveis atribuídos automaticamente.",
    fields: [
      {
        name: "title",
        label: "Competência",
        options: competenceNames,
        required: true,
      },
      {
        name: "status",
        label: "Nível de conhecimento",
        options: levels,
        required: true,
      },
      { name: "evidence", label: "Evidências e observações", type: "textarea" },
    ],
  },
  atividades: {
    title: "Atividades profissionais",
    singular: "atividade",
    description:
      "Diferencie execução, andamento, propostas e estudos. Registre apenas informações confirmadas.",
    fields: [
      { name: "title", label: "Título", required: true },
      {
        name: "description",
        label: "Descrição",
        type: "textarea",
        required: true,
      },
      {
        name: "category",
        label: "Categoria técnica",
        options: competenceNames,
        required: true,
      },
      { name: "date", label: "Data", type: "date", required: true },
      {
        name: "status",
        label: "Situação",
        options: activityStatuses,
        required: true,
      },
      { name: "results", label: "Resultados", type: "textarea" },
      {
        name: "documentation",
        label: "Documentação associada",
        type: "textarea",
      },
    ],
  },
  projetos: {
    title: "Projetos e propostas",
    singular: "projeto",
    description:
      "Propostas pessoais não constituem iniciativas oficiais nem aprovação institucional.",
    fields: [
      { name: "title", label: "Nome", required: true },
      {
        name: "problem",
        label: "Problema identificado",
        type: "textarea",
        required: true,
      },
      {
        name: "objective",
        label: "Objetivo",
        type: "textarea",
        required: true,
      },
      {
        name: "solution",
        label: "Solução proposta",
        type: "textarea",
        required: true,
      },
      { name: "technologies", label: "Tecnologias envolvidas" },
      { name: "benefits", label: "Benefícios esperados", type: "textarea" },
      {
        name: "status",
        label: "Situação da proposta",
        options: projectStatuses,
        required: true,
      },
      {
        name: "authorization",
        label: "Referência da autorização institucional (quando aplicável)",
      },
    ],
  },
  capacitacoes: {
    title: "Desenvolvimento profissional",
    singular: "capacitação",
    description:
      "Acompanhe objetivos de aprendizagem e evidências de aperfeiçoamento contínuo.",
    fields: [
      { name: "title", label: "Curso ou treinamento", required: true },
      {
        name: "competence",
        label: "Competência a desenvolver",
        options: competenceNames,
        required: true,
      },
      {
        name: "objective",
        label: "Objetivo",
        type: "textarea",
        required: true,
      },
      {
        name: "progress",
        label: "Progresso (%)",
        type: "number",
        required: true,
      },
      {
        name: "evidence",
        label: "Evidências de aprendizagem",
        type: "textarea",
      },
      {
        name: "relation",
        label: "Relação com as atribuições do emprego",
        options: duties.map((d) => d.title),
        required: true,
      },
      {
        name: "status",
        label: "Situação",
        options: ["Planejada", "Em andamento", "Concluída"],
        required: true,
      },
    ],
  },
  documentacao: {
    title: "Documentações produzidas",
    singular: "documentação",
    description:
      "Registre documentação técnica sem credenciais, dados de pacientes ou informações restritas.",
    fields: [
      { name: "title", label: "Título", required: true },
      {
        name: "description",
        label: "Descrição",
        type: "textarea",
        required: true,
      },
      {
        name: "category",
        label: "Categoria técnica",
        options: competenceNames,
        required: true,
      },
      { name: "date", label: "Data", type: "date", required: true },
      {
        name: "content",
        label: "Conteúdo ou referência pública",
        type: "textarea",
        required: true,
      },
    ],
  },
};
