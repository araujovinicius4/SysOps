import { useState, type FormEvent } from "react";
import { FileText, Plus, Pencil, Trash2, Download } from "lucide-react";
import { DataTable, EmptyState, Modal, ServiceCard } from "../components/ui";
import { useApp } from "../hooks/useApp";
import { useProfessional } from "../hooks/useProfessional";
import {
  activityStatuses,
  attributionSource,
  collections,
  duties,
  type Collection,
  type ProfessionalRecord,
} from "../data/professional";
import { uid } from "../utils";

export function Duties() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">REFERÊNCIA PROFISSIONAL</span>
          <h1>Atribuições do emprego</h1>
          <p>
            Escopo do emprego, sem declaração de experiência ou oferta
            comercial.
          </p>
        </div>
      </div>
      <div className="services-grid">
        {duties.map((d) => (
          <ServiceCard key={d.title} {...d} />
        ))}
      </div>
      <p className="notice">
        Síntese informativa. Consulte a{" "}
        <a
          className="text-link"
          href={attributionSource}
          target="_blank"
          rel="noreferrer"
        >
          descrição institucional das atribuições
        </a>
        .
      </p>
    </>
  );
}

export function Professional({ collection }: { collection: Collection }) {
  const { user } = useApp();
  const { records, save, remove } = useProfessional();
  const config = collections[collection];
  const [editing, setEditing] = useState<
    ProfessionalRecord | null | undefined
  >();
  const [deleting, setDeleting] = useState<ProfessionalRecord | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const own = records.filter((r) => r.collection === collection);
  const shown = own.filter(
    (r) =>
      r.fields.title
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")) &&
      (!status || r.fields.status === status),
  );
  const statusField = config.fields.find((f) => f.name === "status");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const fields = Object.fromEntries(
      config.fields.map((f) => [f.name, String(form.get(f.name) ?? "").trim()]),
    );
    if (config.fields.some((f) => f.required && !fields[f.name])) {
      setError("Preencha os campos obrigatórios.");
      return;
    }
    if (
      collection === "competencias" &&
      own.some((r) => r.id !== editing?.id && r.fields.title === fields.title)
    ) {
      setError(
        "Esta competência já está cadastrada. Edite o registro existente.",
      );
      return;
    }
    if (
      collection === "projetos" &&
      fields.status === "Autorizado" &&
      !fields.authorization
    ) {
      setError(
        "Informe a referência da autorização antes de marcar a proposta como autorizada.",
      );
      return;
    }
    try {
      save({ id: editing?.id ?? uid(), userId: user!.id, collection, fields });
      setEditing(undefined);
      setNotice(
        "Registro salvo neste navegador. Não publicado no perfil público.",
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }
  function download(record: ProfessionalRecord) {
    const text = config.fields
      .map((f) => `${f.label}: ${record.fields[f.name] || "Não informado"}`)
      .join("\n\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "documentacao-profissional.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            ORGANIZAÇÃO PROFISSIONAL · PROTÓTIPO LOCAL
          </span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
        <button
          className="button"
          onClick={() => {
            setError("");
            setEditing(null);
          }}
        >
          <Plus size={18} />
          Adicionar {config.singular}
        </button>
      </div>
      <div className="notice">
        Registros locais para testar a organização do perfil. Não representam
        histórico profissional confirmado nem iniciativas oficiais do HU-UFPI.
        Não registre dados de pacientes, credenciais ou informações restritas.
      </div>
      {notice && (
        <div className="notice" role="status">
          {notice}
        </div>
      )}
      {collection === "atividades" && (
        <div className="metrics-grid">
          {activityStatuses.map((s) => (
            <div className="metric panel" key={s}>
              <span>{s}</span>
              <strong>{own.filter((r) => r.fields.status === s).length}</strong>
              <small>Registros locais</small>
            </div>
          ))}
        </div>
      )}
      <section className="panel">
        <div className="filters">
          <label className="search-input">
            Buscar registros
            <input
              aria-label="Buscar registros"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          {statusField && (
            <select
              aria-label="Filtrar situação"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Todas as classificações</option>
              {statusField.options?.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          )}
          <span>{shown.length} registro(s)</span>
        </div>
        {shown.length ? (
          <DataTable
            headers={["Registro", statusField?.label ?? "Categoria", "Ações"]}
          >
            {shown.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong className="table-title">{r.fields.title}</strong>
                  <small>
                    {r.fields.date || r.fields.competence || r.fields.category}
                  </small>
                  {collection === "capacitacoes" && (
                    <>
                      <progress
                        value={Number(r.fields.progress)}
                        max={100}
                        aria-label={`Progresso de ${r.fields.title}`}
                      />
                      <small>{r.fields.progress}% informado</small>
                    </>
                  )}
                </td>
                <td>
                  {r.fields.status || r.fields.category || "Não informado"}
                </td>
                <td>
                  <div className="record-actions">
                    <button
                      className="icon-button"
                      aria-label={`Editar ${r.fields.title}`}
                      onClick={() => {
                        setError("");
                        setEditing(r);
                      }}
                    >
                      <Pencil size={17} />
                    </button>
                    {collection === "documentacao" && (
                      <button
                        className="icon-button"
                        aria-label={`Baixar ${r.fields.title}`}
                        onClick={() => download(r)}
                      >
                        <Download size={17} />
                      </button>
                    )}
                    <button
                      className="icon-button"
                      aria-label={`Excluir ${r.fields.title}`}
                      onClick={() => setDeleting(r)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState
            title={
              query || status
                ? "Nenhum resultado encontrado"
                : "Nenhum registro cadastrado"
            }
            description="Os dados começam vazios. Adicione somente informações que você possa confirmar."
          />
        )}
      </section>
      {editing !== undefined && (
        <Modal
          title={`${editing ? "Editar" : "Adicionar"} ${config.singular}`}
          onClose={() => setEditing(undefined)}
        >
          <form onSubmit={submit} className="professional-form">
            {config.fields.map((f) => (
              <label key={f.name}>
                {f.label}
                {f.required ? " *" : ""}
                {f.options ? (
                  <select
                    aria-label={`${f.label}${f.required ? " *" : ""}`}
                    name={f.name}
                    required={f.required}
                    defaultValue={editing?.fields[f.name] ?? ""}
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    aria-label={`${f.label}${f.required ? " *" : ""}`}
                    name={f.name}
                    required={f.required}
                    maxLength={6000}
                    defaultValue={editing?.fields[f.name] ?? ""}
                  />
                ) : (
                  <input
                    aria-label={`${f.label}${f.required ? " *" : ""}`}
                    name={f.name}
                    type={f.type ?? "text"}
                    required={f.required}
                    maxLength={f.type ? undefined : 300}
                    min={f.type === "number" ? 0 : undefined}
                    max={f.type === "number" ? 100 : undefined}
                    step={f.type === "number" ? 1 : undefined}
                    defaultValue={editing?.fields[f.name] ?? ""}
                  />
                )}
              </label>
            ))}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="record-actions">
              <button
                type="button"
                className="button secondary"
                onClick={() => setEditing(undefined)}
              >
                Cancelar
              </button>
              <button className="button">
                <FileText size={16} />
                Salvar registro
              </button>
            </div>
          </form>
        </Modal>
      )}
      {deleting && (
        <Modal title="Excluir registro" onClose={() => setDeleting(null)}>
          <p className="document-body">
            Excluir “{deleting.fields.title}” deste navegador?
          </p>
          <div className="record-actions">
            <button
              className="button secondary"
              onClick={() => setDeleting(null)}
            >
              Cancelar
            </button>
            <button
              className="button"
              onClick={() => {
                try {
                  remove(deleting.id);
                  setDeleting(null);
                  setNotice("Registro excluído.");
                } catch (err) {
                  setNotice((err as Error).message);
                }
              }}
            >
              Confirmar exclusão
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
