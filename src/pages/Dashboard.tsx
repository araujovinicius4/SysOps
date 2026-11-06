import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  FileText,
  FolderKanban,
  ListChecks,
  Plus,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useApp } from "../hooks/useApp";
import { useProfessional } from "../hooks/useProfessional";
import { EmptyState, MetricCard } from "../components/ui";
import { collections, duties, type Collection } from "../data/professional";

export function Dashboard() {
  const { user } = useApp();
  const { records } = useProfessional();
  const count = (c: Collection) =>
    records.filter((r) => r.collection === c).length;
  const trainings = records.filter((r) => r.collection === "capacitacoes");
  const progress = trainings.length
    ? Math.round(
        trainings.reduce((sum, r) => sum + Number(r.fields.progress), 0) /
          trainings.length,
      )
    : 0;
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            VISÃO GERAL DO DESENVOLVIMENTO PROFISSIONAL
          </div>
          <h1>
            Olá, {user?.name.split(" ")[0]} <span className="wave">✳</span>
          </h1>
          <p>Competências, atividades e iniciativas em um só lugar.</p>
        </div>
        <Link className="button" to="/app/atividades">
          <Plus size={18} />
          Registrar atividade
        </Link>
      </div>
      <div className="environment-banner">
        <span className="banner-check">
          <ShieldCheck size={23} />
        </span>
        <div>
          <strong>Organização do perfil profissional</strong>
          <span>
            Protótipo local · Os registros não são publicados nem atribuídos ao
            titular automaticamente.
          </span>
        </div>
        <span className="badge amber">Demonstração local</span>
      </div>
      <div className="metrics-grid three">
        <MetricCard
          label="Atribuições profissionais"
          value={duties.length}
          detail="Escopo do emprego"
          icon={ListChecks}
        />
        <MetricCard
          label="Competências cadastradas"
          value={count("competencias")}
          detail="Níveis informados manualmente"
          icon={BookOpen}
        />
        <MetricCard
          label="Capacitações em andamento"
          value={
            trainings.filter((r) => r.fields.status === "Em andamento").length
          }
          detail="Registros locais"
          icon={GraduationCap}
        />
        <MetricCard
          label="Atividades registradas"
          value={count("atividades")}
          detail="Registros locais"
          icon={FileText}
        />
        <MetricCard
          label="Projetos e propostas"
          value={count("projetos")}
          detail="Sem aprovação institucional presumida"
          icon={FolderKanban}
        />
        <MetricCard
          label="Documentações produzidas"
          value={count("documentacao")}
          detail="Registros locais"
          icon={FileText}
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Desenvolvimento das competências</h2>
              <p>Níveis classificados pelo usuário do protótipo</p>
            </div>
            <Link className="text-link" to="/app/competencias">
              Gerenciar <ArrowUpRight size={16} />
            </Link>
          </div>
          {records.filter((r) => r.collection === "competencias").length ? (
            records
              .filter((r) => r.collection === "competencias")
              .map((r) => (
                <div className="environment-row" key={r.id}>
                  <BookOpen size={18} />
                  <div>
                    <strong>{r.fields.title}</strong>
                    <small>{r.fields.status}</small>
                  </div>
                </div>
              ))
          ) : (
            <EmptyState
              title="Nenhum nível informado"
              description="O catálogo de áreas técnicas não é uma declaração de domínio ou experiência."
            />
          )}
        </section>
        <section className="panel backup-panel">
          <div className="panel-heading">
            <h2>Progresso das capacitações</h2>
            <GraduationCap size={19} />
          </div>
          <div
            className="donut"
            style={{
              background: `conic-gradient(var(--brand-primary) 0 ${progress}%, var(--border-neutral) ${progress}% 100%)`,
            }}
          >
            <div>
              <strong>
                {progress}
                <span>%</span>
              </strong>
              <small>
                {trainings.length ? "média informada" : "sem registros"}
              </small>
            </div>
          </div>
          <Link className="text-link" to="/app/capacitacoes">
            Acompanhar aprendizagem <ArrowUpRight size={16} />
          </Link>
        </section>
        {(
          ["atividades", "projetos", "capacitacoes", "documentacao"] as const
        ).map((c) => (
          <section className="panel" key={c}>
            <div className="panel-heading">
              <h2>{collections[c].title}</h2>
              <Link className="text-link" to={`/app/${c}`}>
                Ver registros <ArrowUpRight size={16} />
              </Link>
            </div>
            {count(c) ? (
              records
                .filter((r) => r.collection === c)
                .slice(0, 4)
                .map((r) => (
                  <div className="activity-row" key={r.id}>
                    <FileText size={18} />
                    <div>
                      <Link to={`/app/${c}`}>{r.fields.title}</Link>
                      <small>
                        {r.fields.status || r.fields.date || "Registro local"}
                      </small>
                    </div>
                  </div>
                ))
            ) : (
              <EmptyState
                title="Nenhum registro cadastrado"
                description="Sem histórico profissional fictício. Registre informações confirmadas para testar o acompanhamento."
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}
