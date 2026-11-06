import { Link } from "react-router-dom";
import { Logo } from "../components/ui";
import { institutionalNotice } from "../data/professional";
export function Legal({ kind }: { kind: string }) {
  const content: Record<string, { title: string; paragraphs: string[] }> = {
    privacidade: {
      title: "Privacidade no protótipo",
      paragraphs: [
        "Este perfil profissional é informativo. Os cadastros do protótipo local devem utilizar dados de teste, sem informações restritas.",
        "Contas, sessão, competências, atividades, projetos, capacitações e documentação do protótipo são armazenados apenas neste navegador. Não há backend, sincronização entre dispositivos ou publicação automática desses registros no perfil público. Dados legados do SysOps são preservados, mas não são apresentados como histórico profissional.",
        "A senha de teste é registrada como um resumo SHA-256 para a simulação. Isso não substitui uma autenticação de produção. Qualquer pessoa com acesso ao armazenamento deste navegador pode inspecionar ou modificar os dados.",
        "Você pode remover os dados apagando o armazenamento deste site nas configurações do navegador. Essa ação remove contas e registros locais. Não há recuperação ou sincronização entre dispositivos.",
      ],
    },
    termos: {
      title: "Termos do perfil profissional",
      paragraphs: [
        "Esta plataforma apresenta e organiza um perfil profissional de Analista de TI – Sistemas Operacionais. Não oferece serviços comerciais nem recebe chamados institucionais.",
        institutionalNotice,
        "Atribuições do emprego não equivalem a comprovação de experiência. Competências, atividades, projetos e capacitações devem ser confirmados pelo titular antes de publicação. Propostas técnicas não representam automaticamente projetos oficiais ou autorizados.",
        "A ilustração de infraestrutura na página inicial contém dados fictícios, sem conexão com o HU-UFPI. Não registre pacientes, credenciais, topologias internas ou informações restritas. A edição em produção está bloqueada até a configuração de autenticação e autorização adequadas no servidor.",
      ],
    },
    contato: {
      title: "Contato profissional",
      paragraphs: [
        "Nenhum endereço de e-mail, telefone ou outro contato público foi cadastrado pelo titular. Não foram inventados canais de contato.",
        "Este perfil não possui envio de mensagens, canal de atendimento institucional ou abertura de chamados. Para demandas administrativas e operacionais, utilize os canais oficiais da instituição.",
        institutionalNotice,
      ],
    },
  };
  const c = content[kind];
  return (
    <div className="legal-page container">
      <Logo />
      <Link to="/" className="back-link">
        ← Voltar ao início
      </Link>
      <div className="panel">
        <span className="eyebrow">PERFIL PROFISSIONAL · HU-UFPI</span>
        <h1>{c.title}</h1>
        {c.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}
export function NotFound() {
  return (
    <div className="not-found">
      <Logo />
      <span className="eyebrow">ERRO 404</span>
      <h1>Este caminho não existe.</h1>
      <p>Vamos voltar para um lugar conhecido.</p>
      <Link className="button" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
