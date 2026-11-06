import { useState, type FormEvent } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  FileText,
  Paperclip,
  Plus,
  Search,
} from "lucide-react";
import { useApp } from "../hooks/useApp";
import { DataTable, EmptyState, StatusBadge } from "../components/ui";
import { categories, services } from "../data";
import { statuses, type Request, type Status } from "../types";
import { date, uid } from "../utils";
export function Requests() {
  const { requests } = useApp();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const filtered = requests.filter(
    (r) =>
      (!status || r.status === status) &&
      `${r.title} ${r.id} ${r.category}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">GESTÃO DE DEMANDAS</div>
          <h1>Minhas solicitações</h1>
          <p>Da primeira análise à solução, acompanhe cada etapa.</p>
        </div>
        <Link className="button" to="/app/solicitacoes/nova">
          <Plus size={18} /> Nova solicitação
        </Link>
      </div>
      <div className="panel">
        <div className="filters">
          <label className="search-input">
            <Search size={18} />
            <input
              aria-label="Buscar solicitações"
              placeholder="Buscar por título, ID ou categoria…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <select
            aria-label="Filtrar por status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span>{filtered.length} solicitações</span>
        </div>
        {filtered.length ? (
          <DataTable
            headers={[
              "Solicitação",
              "Categoria",
              "Prioridade",
              "Status",
              "Criada em",
              "",
            ]}
          >
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>
                  <Link
                    className="table-title"
                    to={`/app/solicitacoes/${r.id}`}
                  >
                    <small>{r.id}</small>
                    {r.title}
                  </Link>
                </td>
                <td>{r.category}</td>
                <td>
                  <StatusBadge status={r.priority} />
                </td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td>{date(r.createdAt)}</td>
                <td>
                  <Link
                    to={`/app/solicitacoes/${r.id}`}
                    aria-label={`Abrir ${r.title}`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
}
export function NewRequest() {
  const { user, servers, addRequest } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const requested = params.get("categoria") || "";
  const map = [
    "Servidor",
    "Sistema Operacional",
    "Rede",
    "Aplicação",
    "Performance",
    "Inventário",
    "Backup",
    "Monitoramento",
    "Automação",
    "Documentação",
  ];
  const category =
    map[services.findIndex((s) => s[0] === requested)] || "Servidor";
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) || "").trim();
    const now = new Date().toISOString();
    const r: Request = {
      id: "SYS-" + uid().slice(0, 8).toUpperCase(),
      userId: user!.id,
      title: get("title"),
      description: get("description"),
      category: get("category"),
      priority: get("priority"),
      environment: get("environment"),
      os: get("os"),
      server: get("server"),
      impact: get("impact"),
      urgency: get("urgency"),
      evidence: get("evidence"),
      attachments: files,
      contact: get("contact"),
      status: "Nova",
      createdAt: now,
      history: [{ at: now, text: "Solicitação criada." }],
    };
    if (r.title.length < 5 || r.description.length < 15) {
      setError(
        "Informe um título com pelo menos 5 caracteres e uma descrição com 15 caracteres.",
      );
      return;
    }
    try {
      addRequest(r);
      navigate("/app/solicitacoes/" + r.id);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <>
      <Link to="/app/solicitacoes" className="back-link">
        <ArrowLeft size={16} /> Minhas solicitações
      </Link>
      <div className="page-heading">
        <div>
          <div className="eyebrow">VAMOS ENTENDER SEU AMBIENTE</div>
          <h1>Nova solicitação</h1>
          <p>
            Compartilhe o contexto para uma análise técnica bem direcionada.
          </p>
        </div>
        <span className="subtle-chip">Rascunho · Não enviado</span>
      </div>
      <form className="panel request-form" onSubmit={submit}>
        <div className="form-section">
          <h2>
            <FileText size={20} /> Informações da demanda
          </h2>
          <p>Os campos marcados com * são obrigatórios.</p>
          <label>
            Título *
            <input
              name="title"
              required
              minLength={5}
              maxLength={160}
              placeholder="Ex.: Analisar alto consumo de memória no servidor de aplicação"
            />
          </label>
          <label>
            Descrição *
            <textarea
              name="description"
              required
              minLength={15}
              rows={5}
              placeholder="Descreva o cenário, os sintomas e o resultado esperado…"
            />
          </label>
          <div className="form-grid">
            <label>
              Categoria *
              <select name="category" defaultValue={category}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Prioridade *
              <select name="priority" defaultValue="Média">
                {["Baixa", "Média", "Alta", "Crítica"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="form-section">
          <h2>Contexto técnico</h2>
          <div className="form-grid">
            <label>
              Ambiente *
              <select name="environment">
                {["Produção", "Homologação", "Desenvolvimento"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Sistema operacional
              <select name="os">
                {["Não informado", "Linux", "Windows Server", "Outro"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </label>
            <label>
              Servidor relacionado
              <select name="server">
                <option value="">Não informado</option>
                {servers.map((s) => (
                  <option key={s.id}>{s.name}</option>
                ))}
              </select>
            </label>
            <label>
              Impacto
              <select name="impact">
                {[
                  "Um serviço",
                  "Vários serviços",
                  "Toda a organização",
                  "Sem impacto atual",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Urgência
              <select name="urgency">
                {["Normal", "Pode aguardar", "Urgente", "Imediata"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Contato do solicitante *
              <input
                name="contact"
                type="email"
                required
                defaultValue={user?.email}
              />
            </label>
          </div>
        </div>
        <div className="form-section">
          <h2>
            <Paperclip size={20} /> Evidências e anexos
          </h2>
          <label>
            Evidências
            <textarea
              name="evidence"
              rows={3}
              placeholder="Registros de erro, horários e observações relevantes. Use apenas dados fictícios."
            />
          </label>
          <label className="file-drop">
            <Paperclip size={24} />
            <strong>Selecionar anexos simulados</strong>
            <span>
              Apenas os nomes são armazenados. Nenhum arquivo é enviado.
            </span>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setFiles(Array.from(e.target.files || []).map((f) => f.name))
              }
            />
          </label>
          {files.length > 0 && (
            <ul className="attachment-list">
              {files.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
        </div>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <div className="form-actions">
          <Link to="/app/solicitacoes" className="button secondary">
            Cancelar
          </Link>
          <button className="button">
            Criar solicitação <ArrowUpRight size={18} />
          </button>
        </div>
      </form>
    </>
  );
}
export function RequestDetail() {
  const { id } = useParams();
  const { requests, updateRequest } = useApp();
  const r = requests.find((x) => x.id === id);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  if (!r)
    return (
      <EmptyState
        title="Solicitação não encontrada"
        description="Esta demanda não existe ou não pertence à sua conta. Use o menu para voltar às suas solicitações."
      />
    );
  function save(next: Request) {
    try {
      updateRequest(next);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <>
      <Link to="/app/solicitacoes" className="back-link">
        <ArrowLeft size={16} /> Voltar às solicitações
      </Link>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            {r.id} · CRIADA EM {date(r.createdAt)}
          </div>
          <h1>{r.title}</h1>
          <p>
            {r.category} · {r.environment}
          </p>
        </div>
        <StatusBadge status={r.status} />
      </div>
      <div className="detail-grid">
        <section className="panel detail-content">
          <h2>Descrição da demanda</h2>
          <p className="preserve">{r.description}</p>
          <div className="detail-fields">
            {[
              ["Prioridade", r.priority],
              ["Ambiente", r.environment],
              ["Sistema operacional", r.os],
              ["Servidor relacionado", r.server || "Não informado"],
              ["Impacto", r.impact],
              ["Urgência", r.urgency],
              ["Contato", r.contact],
            ].map(([k, v]) => (
              <div key={k}>
                <small>{k}</small>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
          <h2>Evidências</h2>
          <p className="preserve">
            {r.evidence || "Nenhuma evidência informada."}
          </p>
          <h2>Anexos simulados</h2>
          {r.attachments.length ? (
            r.attachments.map((f, i) => (
              <p key={i}>
                <Paperclip size={14} /> {f}{" "}
                <small>· Nome registrado; conteúdo não armazenado</small>
              </p>
            ))
          ) : (
            <p>Nenhum anexo.</p>
          )}
        </section>
        <aside className="panel detail-content">
          <h2>Acompanhamento</h2>
          <label>
            Atualizar status (simulação)
            <select
              value={r.status}
              onChange={(e) =>
                save({
                  ...r,
                  status: e.target.value as Status,
                  history: [
                    ...r.history,
                    {
                      at: new Date().toISOString(),
                      text: `Status alterado para ${e.target.value}.`,
                    },
                  ],
                })
              }
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (message.trim()) {
                save({
                  ...r,
                  history: [
                    ...r.history,
                    { at: new Date().toISOString(), text: message.trim() },
                  ],
                });
                setMessage("");
              }
            }}
          >
            <label>
              Adicionar registro
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Descreva uma ação ou observação…"
              />
            </label>
            <button className="button secondary full">
              Registrar no histórico
            </button>
          </form>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <div className="timeline">
            {[...r.history].reverse().map((h, i) => (
              <div key={i}>
                <span />
                <strong>{h.text}</strong>
                <small>{date(h.at)}</small>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
