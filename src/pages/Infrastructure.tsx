import { useState, type FormEvent } from "react";
import {
  Activity,
  ArrowUpRight,
  Boxes,
  DatabaseBackup,
  FileText,
  Plus,
  Search,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import {
  AlertCard,
  Chart,
  DataTable,
  EmptyState,
  MetricCard,
  Modal,
  ServerCard,
  StatusBadge,
} from "../components/ui";
import { uid } from "../utils";
import { read, write } from "../services/storage";
export function Infrastructure() {
  const { servers, assets, alerts } = useApp();
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">UMA VISÃO CONECTADA</div>
          <h1>Infraestrutura</h1>
          <p>Os ambientes e recursos que sustentam sua operação.</p>
        </div>
        <Link to="/app/servidores" className="button">
          Explorar servidores <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="metrics-grid">
        <MetricCard label="Servidores" value={servers.length} icon={Server} />
        <MetricCard
          label="Ativos inventariados"
          value={assets.length}
          icon={Boxes}
        />
        <MetricCard label="Ambientes" value="3" icon={ShieldCheck} />
        <MetricCard
          label="Alertas pendentes"
          value={alerts.filter((a) => !a.acknowledged).length}
          icon={Activity}
        />
      </div>
      <div className="server-grid">
        {["Produção", "Homologação", "Desenvolvimento"].map((env) => (
          <div className="panel environment-detail" key={env}>
            <span className="service-icon">
              <Server />
            </span>
            <h2>{env}</h2>
            <p>
              {env === "Produção"
                ? "Serviços essenciais da organização."
                : env === "Homologação"
                  ? "Validação de mudanças antes da publicação."
                  : "Experimentação e desenvolvimento de soluções."}
            </p>
            {servers
              .filter((s) => s.environment === env)
              .map((s) => (
                <div className="between" key={s.id}>
                  <span>{s.name}</span>
                  <StatusBadge status={s.status} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
export function Servers() {
  const { servers, setServers } = useApp();
  const [search, setSearch] = useState("");
  const [env, setEnv] = useState("");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const filtered = servers.filter(
    (s) =>
      (!env || s.environment === env) &&
      `${s.name} ${s.os} ${s.ip}`.toLowerCase().includes(search.toLowerCase()),
  );
  function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name")).trim();
    if (servers.some((s) => s.name === name)) {
      setError("Já existe um servidor com esse nome.");
      return;
    }
    try {
      setServers([
        ...servers,
        {
          id: uid(),
          name,
          os: String(d.get("os")),
          ip: String(d.get("ip")),
          environment: String(d.get("environment")),
          cpu: 0,
          memory: 0,
          status: "Operacional",
        },
      ]);
      setModal(false);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">COMPUTAÇÃO E SISTEMAS</div>
          <h1>Servidores</h1>
          <p>
            Acompanhe sistemas operacionais e recursos do seu ambiente simulado.
          </p>
        </div>
        <button
          className="button"
          onClick={() => {
            setError("");
            setModal(true);
          }}
        >
          <Plus size={18} /> Adicionar servidor
        </button>
      </div>
      <div className="filters standalone">
        <label className="search-input">
          <Search size={18} />
          <input
            aria-label="Buscar servidores"
            placeholder="Buscar servidor, IP ou sistema…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select
          aria-label="Filtrar ambiente"
          value={env}
          onChange={(e) => setEnv(e.target.value)}
        >
          <option value="">Todos os ambientes</option>
          {["Produção", "Homologação", "Desenvolvimento"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <span>{filtered.length} servidores</span>
      </div>
      <div className="server-grid">
        {filtered.map((s) => (
          <ServerCard key={s.id} server={s} />
        ))}
      </div>
      {!filtered.length && <EmptyState />}
      {modal && (
        <Modal
          title="Adicionar servidor simulado"
          onClose={() => setModal(false)}
        >
          <form onSubmit={add}>
            <label>
              Nome
              <input
                name="name"
                required
                pattern="[a-zA-Z0-9.-]+"
                placeholder="srv-app-02"
              />
            </label>
            <label>
              Sistema operacional
              <select name="os">
                {[
                  "Ubuntu 24.04 LTS",
                  "Debian 12",
                  "Rocky Linux 9",
                  "Windows Server 2022",
                  "Outro",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Endereço IP
              <input
                name="ip"
                required
                placeholder="10.0.1.40"
                pattern="((25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])"
              />
            </label>
            <label>
              Ambiente
              <select name="environment">
                {["Produção", "Homologação", "Desenvolvimento"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <p className="muted">
              O cadastro não conecta nem monitora servidores reais.
            </p>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="button full">Salvar servidor</button>
          </form>
        </Modal>
      )}
    </>
  );
}
const backupSeed = [
  {
    id: "b1",
    name: "Aplicações · Produção",
    server: "srv-app-prod-01",
    size: "24,8 GB",
    schedule: "Diário · 02:00",
    checked: "Hoje, 06:00",
  },
  {
    id: "b2",
    name: "Banco de dados",
    server: "srv-db-prod-01",
    size: "128,4 GB",
    schedule: "Diário · 03:00",
    checked: "Hoje, 06:00",
  },
  {
    id: "b3",
    name: "Configurações Web",
    server: "srv-web-prod-01",
    size: "2,1 GB",
    schedule: "Diário · 04:00",
    checked: "Hoje, 06:00",
  },
];
export function Backups() {
  const [backups, setBackups] = useState(() => read("backups", backupSeed));
  const [notice, setNotice] = useState("");
  function verify(id: string) {
    const next = backups.map((b) =>
      b.id === id ? { ...b, checked: new Date().toLocaleString("pt-BR") } : b,
    );
    try {
      write("backups", next);
      setBackups(next);
      setNotice(
        "Verificação simulada registrada. Nenhum backup real foi acessado.",
      );
    } catch (e) {
      setNotice((e as Error).message);
    }
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">PROTEÇÃO E RECUPERAÇÃO</div>
          <h1>Backups</h1>
          <p>Rotinas verificadas, continuidade planejada.</p>
        </div>
        <Link
          className="button"
          to="/app/solicitacoes/nova?categoria=Backup%20e%20Restore"
        >
          Solicitar análise de backup <Plus size={17} />
        </Link>
      </div>
      <div className="metrics-grid three">
        <MetricCard
          label="Rotinas cadastradas"
          value={backups.length}
          icon={DatabaseBackup}
        />
        <MetricCard
          label="Backups verificados"
          value="100%"
          icon={ShieldCheck}
        />
        <MetricCard label="Volume protegido" value="155,3 GB" icon={Server} />
      </div>
      {notice && (
        <div className="notice" role="status">
          {notice}
        </div>
      )}
      <div className="panel">
        <div className="panel-heading">
          <h2>Rotinas de backup</h2>
          <span className="demo-tag">SIMULAÇÃO</span>
        </div>
        <DataTable
          headers={[
            "Rotina / Servidor",
            "Agendamento",
            "Volume",
            "Status",
            "Última verificação",
            "Ações",
          ]}
        >
          {backups.map((b) => (
            <tr key={b.id}>
              <td>
                <strong>{b.name}</strong>
                <small className="block">{b.server}</small>
              </td>
              <td>{b.schedule}</td>
              <td>{b.size}</td>
              <td>
                <StatusBadge status="Verificado" />
              </td>
              <td>{b.checked}</td>
              <td>
                <button
                  className="button secondary small"
                  onClick={() => verify(b.id)}
                >
                  Simular verificação
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
      <div className="notice">
        A recuperação deve ser validada em ambiente segregado. Neste protótipo,
        verificações e indicadores são fictícios.
      </div>
    </>
  );
}
export function Monitoring() {
  const { alerts, setAlerts, servers } = useApp();
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">OBSERVABILIDADE DA OPERAÇÃO</div>
          <h1>Monitoramento</h1>
          <p>
            Identifique sinais, acompanhe tendências e antecipe intervenções.
          </p>
        </div>
        <span className="demo-pill">Telemetria simulada</span>
      </div>
      <div className="metrics-grid three">
        <MetricCard label="Disponibilidade" value="99,98%" />
        <MetricCard
          label="Alertas pendentes"
          value={alerts.filter((a) => !a.acknowledged).length}
        />
        <MetricCard
          label="CPU média"
          value={`${Math.round(servers.reduce((a, s) => a + s.cpu, 0) / Math.max(servers.length, 1))}%`}
        />
      </div>
      <div className="panel chart-panel">
        <div className="panel-heading">
          <h2>Disponibilidade · últimos 7 dias</h2>
          <StatusBadge status="Operacional" />
        </div>
        <Chart />
      </div>
      <section className="panel monitor-alerts">
        <div className="panel-heading">
          <h2>Central de alertas</h2>
          <span>Reconhecer registra a revisão do alerta</span>
        </div>
        {alerts.map((a) => (
          <AlertCard
            key={a.id}
            alert={a}
            onAcknowledge={() =>
              setAlerts(
                alerts.map((x) =>
                  x.id === a.id ? { ...x, acknowledged: true } : x,
                ),
              )
            }
          />
        ))}
      </section>
    </>
  );
}
export function Inventory() {
  const { assets, setAssets } = useApp();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const rows = assets.filter((a) =>
    `${a.id} ${a.name} ${a.type}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">ORGANIZAÇÃO E RASTREABILIDADE</div>
          <h1>Inventário</h1>
          <p>Conheça os ativos que fazem parte da sua infraestrutura.</p>
        </div>
        <button className="button" onClick={() => setOpen(true)}>
          <Plus size={18} /> Adicionar ativo
        </button>
      </div>
      <div className="panel">
        <div className="filters">
          <label className="search-input">
            <Search size={18} />
            <input
              aria-label="Buscar ativos"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nome, identificação ou tipo…"
            />
          </label>
          <span>{rows.length} ativos</span>
        </div>
        {rows.length ? (
          <DataTable
            headers={[
              "Identificação",
              "Ativo",
              "Tipo",
              "Responsável",
              "Status",
            ]}
          >
            {rows.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>
                  <strong>{a.name}</strong>
                </td>
                <td>{a.type}</td>
                <td>{a.owner}</td>
                <td>
                  <StatusBadge status={a.status} />
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState />
        )}
      </div>
      {open && (
        <Modal title="Cadastrar ativo" onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              try {
                setAssets([
                  ...assets,
                  {
                    id: "AT-" + uid().slice(0, 6).toUpperCase(),
                    name: String(d.get("name")).trim(),
                    type: String(d.get("type")),
                    owner: String(d.get("owner")).trim(),
                    status: "Operacional",
                  },
                ]);
                setOpen(false);
              } catch (e) {
                setError((e as Error).message);
              }
            }}
          >
            <label>
              Nome
              <input name="name" required minLength={2} />
            </label>
            <label>
              Tipo
              <select name="type">
                {[
                  "Servidor virtual",
                  "Servidor físico",
                  "Switch",
                  "Armazenamento",
                  "Licença",
                  "Outro",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Responsável
              <input name="owner" required />
            </label>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="button full">Salvar ativo</button>
          </form>
        </Modal>
      )}
    </>
  );
}
const documents = [
  {
    title: "Procedimento de backup e restore",
    category: "Continuidade",
    body: "Objetivo: organizar uma recuperação controlada.\n\n1. Identificar o serviço, o ponto de recuperação desejado e o responsável.\n2. Registrar autorização e janela de execução.\n3. Selecionar a cópia e verificar sua integridade.\n4. Restaurar em ambiente segregado.\n5. Validar dados e aplicação com o responsável.\n6. Registrar resultados, tempos e evidências.\n\nModelo demonstrativo: adaptar e validar antes de qualquer uso operacional.",
  },
  {
    title: "Checklist de diagnóstico de servidores",
    category: "Operação",
    body: "1. Registrar sistema operacional, versão e função do servidor.\n2. Coletar indicadores de CPU, memória, disco e rede.\n3. Verificar logs e eventos no intervalo relatado.\n4. Revisar alterações recentes e dependências.\n5. Documentar hipóteses, riscos e plano de ação.\n6. Validar os resultados após a intervenção.\n\nModelo demonstrativo. Não execute mudanças sem avaliação do ambiente.",
  },
  {
    title: "Política de mudanças e acessos",
    category: "Governança",
    body: "Toda mudança deve ter escopo, responsável, avaliação de impacto, validação e plano de reversão.\n\nAplicar menor privilégio, separar ambientes e manter registros de alterações. Revisar acessos periodicamente e remover permissões desnecessárias.\n\nEste texto é um modelo ilustrativo e não constitui política institucional.",
  },
  {
    title: "Inventário e padronização de ambientes",
    category: "Infraestrutura",
    body: "Registrar nome, identificação, sistema operacional, endereço, ambiente, responsável e dependências de cada ativo.\n\nRevisar o inventário a cada mudança, documentar a origem dos dados e adotar convenções consistentes de nomenclatura.\n\nExemplo fictício para exploração do protótipo.",
  },
];
export function Documentation() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof documents)[number] | null>(
    null,
  );
  const filtered = documents.filter((d) =>
    `${d.title} ${d.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">CONHECIMENTO QUE PERMANECE</div>
          <h1>Documentação</h1>
          <p>
            Procedimentos, checklists e boas práticas para uma operação
            consistente.
          </p>
        </div>
        <Link
          className="button"
          to="/app/solicitacoes/nova?categoria=Documenta%C3%A7%C3%A3o%20T%C3%A9cnica"
        >
          Solicitar documentação <Plus size={18} />
        </Link>
      </div>
      <div className="filters standalone">
        <label className="search-input">
          <Search size={18} />
          <input
            aria-label="Buscar documentação"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar na biblioteca técnica…"
          />
        </label>
      </div>
      <div className="server-grid">
        {filtered.map((d) => (
          <button
            className="panel document-card"
            key={d.title}
            onClick={() => setSelected(d)}
          >
            <span className="service-icon">
              <FileText />
            </span>
            <small>{d.category} · Modelo demonstrativo</small>
            <h2>{d.title}</h2>
            <p>
              Um ponto de partida para registrar e compartilhar conhecimento
              técnico.
            </p>
            <span className="text-link">
              Ler documento <ArrowUpRight size={17} />
            </span>
          </button>
        ))}
      </div>
      {!filtered.length && <EmptyState />}
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <p className="preserve document-body">{selected.body}</p>
          <button
            className="button secondary"
            onClick={() => {
              const url = URL.createObjectURL(
                new Blob([selected.title + "\n\n" + selected.body], {
                  type: "text/plain;charset=utf-8",
                }),
              );
              const a = document.createElement("a");
              a.href = url;
              a.download = "sysops-documento.txt";
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
          >
            Baixar modelo .txt
          </button>
        </Modal>
      )}
    </>
  );
}
