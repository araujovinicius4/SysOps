import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { Logo } from "../components/ui";
import { useApp } from "../hooks/useApp";
export function Auth({ register = false }: { register?: boolean }) {
  const app = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.from || "/app/dashboard";
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(e.currentTarget);
    try {
      if (register)
        await app.register(
          String(data.get("name")),
          String(data.get("email")),
          String(data.get("password")),
        );
      else
        await app.login(
          String(data.get("email")),
          String(data.get("password")),
        );
      navigate(target);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  if (!import.meta.env.DEV)
    return (
      <div className="legal-page container">
        <Logo />
        <div className="panel">
          <span className="eyebrow">ÁREA DE EDIÇÃO</span>
          <h1>Edição indisponível em produção</h1>
          <p>
            A área privada depende de autenticação e autorização no servidor,
            ainda não configuradas. A autenticação local do protótipo não
            oferece segurança de produção.
          </p>
          <Link className="button" to="/">
            Ver perfil público
          </Link>
        </div>
      </div>
    );
  return (
    <div className="auth-page">
      <div className="auth-story">
        <Logo />
        <div>
          <span className="eyebrow">DESENVOLVIMENTO PROFISSIONAL</span>
          <h1>
            Organização pessoal.
            <br />
            Aperfeiçoamento contínuo.
          </h1>
          <p>
            Organize competências, atividades, capacitações e propostas
            técnicas.
          </p>
          <div className="auth-terminal">
            <Terminal />
            <span>perfil / desenvolvimento</span>
            <p>
              <b>✓</b> Competências organizadas
              <br />
              <b>✓</b> Atividades registradas
              <br />
              <b>✓</b> Propostas em acompanhamento
            </p>
          </div>
        </div>
        <small>
          <ShieldCheck size={16} /> Perfil informativo. Sem caráter de portal
          institucional oficial.
        </small>
      </div>
      <div className="auth-form-wrap">
        <Link to="/" className="back-link">
          ← Voltar ao início
        </Link>
        <form className="auth-form" onSubmit={submit}>
          <span className="eyebrow">ORGANIZAÇÃO DO PERFIL PROFISSIONAL</span>
          <h2>
            {register
              ? "Sua organização começa aqui."
              : "Bom ter você por aqui."}
          </h2>
          <p>
            {register
              ? "Crie uma conta local para explorar o protótipo."
              : "Entre para testar a organização do perfil neste navegador."}
          </p>
          <div className="notice">
            Ambiente demonstrativo. Use dados fictícios e uma senha exclusiva
            para testes. O acesso é simulado no navegador.
          </div>
          {register && (
            <label>
              Nome
              <input
                name="name"
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                placeholder="Como podemos chamar você?"
              />
            </label>
          )}
          <label>
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="voce@exemplo.com"
            />
          </label>
          <label>
            Senha
            <input
              name="password"
              type="password"
              autoComplete={register ? "new-password" : "current-password"}
              required
              minLength={8}
              placeholder="No mínimo 8 caracteres"
            />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className="button full" disabled={busy}>
            {busy ? "Aguarde…" : register ? "Criar conta" : "Entrar"}
            <ArrowRight size={18} />
          </button>
          <div className="or">
            <span />
            ou explore agora
            <span />
          </div>
          <button
            className="button secondary full"
            type="button"
            onClick={() => {
              try {
                app.demo();
                navigate(target);
              } catch (e) {
                setError((e as Error).message);
              }
            }}
          >
            Acessar demonstração <ArrowRight size={17} />
          </button>
          <p className="auth-switch">
            {register ? "Já tem uma conta?" : "Primeiro acesso?"}{" "}
            <Link
              to={register ? "/login" : "/cadastro"}
              state={{ from: target }}
            >
              {register ? "Entrar" : "Criar conta"}
            </Link>
          </p>
        </form>
        <small>
          Ao usar o protótipo, consulte os <Link to="/termos">termos</Link> e a{" "}
          <Link to="/privacidade">privacidade</Link>.
        </small>
      </div>
    </div>
  );
}
