export const statuses = [
  "Nova",
  "Em triagem",
  "Em diagnóstico",
  "Em análise",
  "Plano de ação",
  "Em execução",
  "Aguardando validação",
  "Concluída",
  "Cancelada",
] as const;
export type Status = (typeof statuses)[number];
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  organization: string;
}
export interface HistoryEntry {
  at: string;
  text: string;
}
export interface Request {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  environment: string;
  os: string;
  server: string;
  impact: string;
  urgency: string;
  evidence: string;
  attachments: string[];
  contact: string;
  status: Status;
  createdAt: string;
  history: HistoryEntry[];
}
export interface Server {
  id: string;
  name: string;
  os: string;
  ip: string;
  environment: string;
  cpu: number;
  memory: number;
  status: string;
}
export interface Asset {
  id: string;
  name: string;
  type: string;
  owner: string;
  status: string;
}
export interface Alert {
  id: string;
  title: string;
  server: string;
  severity: string;
  acknowledged: boolean;
}
