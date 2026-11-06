import { useEffect, useRef, useId, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Boxes,
  Check,
  DatabaseBackup,
  FileText,
  Gauge,
  Globe,
  Network,
  ScanLine,
  Server,
  Terminal,
  Workflow,
  X,
  Inbox,
  type LucideIcon,
} from "lucide-react";
import { identity } from "../data/professional";
import type { Alert, Request, Server as ServerType } from "../types";
export const icons: Record<string, LucideIcon> = {
  ScanLine,
  Terminal,
  Network,
  Globe,
  Gauge,
  Boxes,
  DatabaseBackup,
  Activity,
  Workflow,
  FileText,
};
export function Logo() {
  return (
    <Link
      to="/"
      className="logo"
      aria-label="Analista de TI – Sistemas Operacionais início"
    >
      <span className="logo-icon">
        <Terminal size={22} />
      </span>
      <span className="professional-brand">
        {identity.brand}
        <small>PERFIL PROFISSIONAL · HU-UFPI</small>
      </span>
    </Link>
  );
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`badge ${["Concluída", "Operacional", "Verificado"].includes(status) ? "green" : ["Alta", "Atenção", "Incidente"].includes(status) ? "amber" : ["Cancelada", "Manutenção"].includes(status) ? "gray" : "blue"}`}
    >
      <i />
      {status}
    </span>
  );
}
export function MetricCard({
  label,
  value,
  detail,
  icon: Icon = Activity,
}: {
  label: string;
  value: string | number;
  detail?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="metric panel">
      <div className="metric-top">
        <span>{label}</span>
        <Icon size={19} />
      </div>
      <strong>{value}</strong>
      <small>{detail || "Dados de demonstração"}</small>
    </div>
  );
}
export function ServiceCard({
  title,
  description,
  icon,
  relation,
}: {
  title: string;
  description: string;
  icon: string;
  relation?: string;
}) {
  const Icon = icons[icon] || Server;
  return (
    <a className="service-card" href="/#competencias">
      <span className="service-icon">
        <Icon size={22} />
      </span>
      <ArrowUpRight className="service-arrow" size={19} />
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="service-link">
        {relation || "Atribuição profissional"} <span>↗</span>
      </span>
    </a>
  );
}
export function EmptyState({
  title = "Nenhum resultado encontrado",
  description = "Tente ajustar os filtros ou crie um novo registro.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="empty">
      <Inbox size={34} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
export function RequestCard({ request: r }: { request: Request }) {
  return (
    <Link className="request-card" to={`/app/solicitacoes/${r.id}`}>
      <span className="service-icon">
        <FileText size={20} />
      </span>
      <div>
        <small>
          {r.id} · {r.category}
        </small>
        <h3>{r.title}</h3>
      </div>
      <StatusBadge status={r.status} />
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function ServerCard({ server: s }: { server: ServerType }) {
  return (
    <div className="panel server-card">
      <div className="between">
        <Server size={23} />
        <StatusBadge status={s.status} />
      </div>
      <h3>{s.name}</h3>
      <p>
        {s.os} · {s.ip}
      </p>
      <small>{s.environment}</small>
      <div className="resource">
        <span>
          CPU <b>{s.cpu}%</b>
        </span>
        <progress value={s.cpu} max="100" />
      </div>
      <div className="resource">
        <span>
          Memória <b>{s.memory}%</b>
        </span>
        <progress value={s.memory} max="100" />
      </div>
    </div>
  );
}
export function AlertCard({
  alert: a,
  onAcknowledge,
}: {
  alert: Alert;
  onAcknowledge: () => void;
}) {
  return (
    <div className="alert-card">
      <span className={`alert-dot ${a.acknowledged ? "resolved" : ""}`}>
        <Activity size={18} />
      </span>
      <div>
        <strong>{a.title}</strong>
        <small>
          {a.server} · {a.acknowledged ? "Reconhecido" : a.severity}
        </small>
      </div>
      <button
        className="icon-button"
        disabled={a.acknowledged}
        onClick={onAcknowledge}
        aria-label={`Reconhecer ${a.title}`}
      >
        <Check size={18} />
      </button>
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="between">
        <h2 id={titleId}>{title}</h2>
        <button onClick={onClose} className="icon-button" aria-label="Fechar">
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Chart({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`chart ${compact ? "compact" : ""}`}
      role="img"
      aria-label="Gráfico demonstrativo de disponibilidade entre 99,90% e 99,99% nos últimos sete dias"
    >
      <div className="chart-y">
        <span>100%</span>
        <span>99,9%</span>
        <span>99,8%</span>
      </div>
      <svg viewBox="0 0 600 140" preserveAspectRatio="none">
        <defs>
          <linearGradient
            id={compact ? "fill-small" : "fill-large"}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--brand-vibrant)"
              stopOpacity=".2"
            />
            <stop
              offset="100%"
              stopColor="var(--brand-vibrant)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path
          d="M0 55 L25 49 L50 57 L75 30 L100 37 L125 28 L150 35 L175 26 L200 34 L225 72 L250 40 L275 42 L300 31 L325 38 L350 23 L375 31 L400 20 L425 28 L450 19 L475 25 L500 15 L525 22 L550 14 L575 23 L600 17 L600 140 L0 140 Z"
          fill={`url(#${compact ? "fill-small" : "fill-large"})`}
        />
        <path
          d="M0 55 L25 49 L50 57 L75 30 L100 37 L125 28 L150 35 L175 26 L200 34 L225 72 L250 40 L275 42 L300 31 L325 38 L350 23 L375 31 L400 20 L425 28 L450 19 L475 25 L500 15 L525 22 L550 14 L575 23 L600 17"
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="2.5"
        />
      </svg>
      <div className="chart-x">
        {"Seg Ter Qua Qui Sex Sáb Dom".split(" ").map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}
