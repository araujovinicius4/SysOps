import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./ui";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="public-header">
      <div className="container header-inner">
        <Logo />
        <button
          className="icon-button mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={open ? "public-nav open" : "public-nav"}
          onClick={() => setOpen(false)}
        >
          {[
            ["Início", "#inicio"],
            ["Sobre", "#sobre"],
            ["Atribuições", "#atribuicoes"],
            ["Competências", "#competencias"],
            ["Atividades", "#atividades"],
            ["Projetos", "#projetos"],
            ["Contato", "#contato"],
          ].map(([label, url]) => (
            <a href={url} key={url}>
              {label}
            </a>
          ))}
          {import.meta.env.DEV && (
            <Link to="/login" className="login-link">
              Área local
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
