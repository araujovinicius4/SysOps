import type { Server, Asset, Alert, Request } from "../types";
export const categories = [
  "Sistema Operacional",
  "Servidor",
  "Rede",
  "Aplicação",
  "Performance",
  "Backup",
  "Restore",
  "Monitoramento",
  "Inventário",
  "Segurança Operacional",
  "Automação",
  "Documentação",
  "Outro",
];
export const services = [
  [
    "Diagnóstico de Servidores",
    "Uma visão completa da saúde do seu ambiente. Identifique riscos antes que se tornem incidentes.",
    "ScanLine",
  ],
  [
    "Sistemas Operacionais",
    "Administração de Linux e Windows com configuração, atualização e boas práticas.",
    "Terminal",
  ],
  [
    "Serviços de Rede",
    "Conectividade confiável para DNS, DHCP, diretórios e serviços essenciais.",
    "Network",
  ],
  [
    "Servidores Web e Aplicações",
    "Ambientes preparados para manter suas aplicações disponíveis e estáveis.",
    "Globe",
  ],
  [
    "Performance e Tuning",
    "Identifique gargalos e otimize o uso de CPU, memória e armazenamento.",
    "Gauge",
  ],
  [
    "Inventário de Infraestrutura",
    "Servidores e ativos organizados. Saiba o que existe, onde está e como está.",
    "Boxes",
  ],
  [
    "Backup e Restore",
    "Rotinas de backup verificadas e recuperação planejada para seus dados.",
    "DatabaseBackup",
  ],
  [
    "Monitoramento",
    "Indicadores e alertas para acompanhar a saúde da sua infraestrutura.",
    "Activity",
  ],
  [
    "Automação",
    "Rotinas consistentes, menos tarefas repetitivas e mais eficiência operacional.",
    "Workflow",
  ],
  [
    "Documentação Técnica",
    "Conhecimento acessível, procedimentos claros e mudanças rastreáveis.",
    "FileText",
  ],
];
export const servers: Server[] = [
  {
    id: "srv-01",
    name: "srv-app-prod-01",
    os: "Ubuntu 24.04 LTS",
    ip: "10.0.1.10",
    environment: "Produção",
    cpu: 32,
    memory: 58,
    status: "Operacional",
  },
  {
    id: "srv-02",
    name: "srv-db-prod-01",
    os: "Windows Server 2022",
    ip: "10.0.1.20",
    environment: "Produção",
    cpu: 78,
    memory: 86,
    status: "Atenção",
  },
  {
    id: "srv-03",
    name: "srv-web-prod-01",
    os: "Debian 12",
    ip: "10.0.1.30",
    environment: "Produção",
    cpu: 24,
    memory: 41,
    status: "Operacional",
  },
  {
    id: "srv-04",
    name: "srv-backup-01",
    os: "Ubuntu 24.04 LTS",
    ip: "10.0.2.10",
    environment: "Produção",
    cpu: 18,
    memory: 35,
    status: "Operacional",
  },
  {
    id: "srv-05",
    name: "srv-app-hml-01",
    os: "Rocky Linux 9",
    ip: "10.0.3.10",
    environment: "Homologação",
    cpu: 12,
    memory: 28,
    status: "Operacional",
  },
  {
    id: "srv-06",
    name: "srv-dev-01",
    os: "Windows Server 2022",
    ip: "10.0.4.10",
    environment: "Desenvolvimento",
    cpu: 9,
    memory: 22,
    status: "Manutenção",
  },
];
export const assets: Asset[] = servers.map((s, i) => ({
  id: `AT-${100 + i}`,
  name: s.name,
  type: i === 1 ? "Banco de dados" : "Servidor virtual",
  owner: "Equipe de infraestrutura",
  status: s.status,
}));
export const alerts: Alert[] = [
  {
    id: "a1",
    title: "Uso de memória acima de 85%",
    server: "srv-db-prod-01",
    severity: "Atenção",
    acknowledged: false,
  },
  {
    id: "a2",
    title: "Janela de manutenção programada",
    server: "srv-dev-01",
    severity: "Informação",
    acknowledged: false,
  },
];
export const initialRequests: Request[] = [
  "Análise de consumo de memória",
  "Validação de restore mensal",
  "Atualização do servidor web",
  "Documentar rotina de backup",
  "Configurar alertas de disco",
].map((title, i) => ({
  id: `SYS-${1042 + i}`,
  userId: "demo",
  title,
  description:
    "Solicitação demonstrativa para avaliação técnica do ambiente e documentação das ações necessárias.",
  category: [
    "Performance",
    "Restore",
    "Sistema Operacional",
    "Documentação",
    "Monitoramento",
  ][i],
  priority: i === 0 ? "Alta" : "Média",
  environment: "Produção",
  os: servers[i].os,
  server: servers[i].name,
  impact: "Um serviço",
  urgency: "Normal",
  evidence: "Indicadores coletados no monitoramento demonstrativo.",
  attachments: [],
  contact: "demo@sysops.local",
  status: (
    ["Em análise", "Em execução", "Em triagem", "Concluída", "Nova"] as const
  )[i],
  createdAt: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
  history: [
    {
      at: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
      text: "Solicitação criada no ambiente de demonstração.",
    },
  ],
}));
