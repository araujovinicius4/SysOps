import { NavLink, Link } from "react-router-dom";
import {
  Activity,
  GraduationCap,
  BookOpen,
  FileText,
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Plus,
  ListChecks,
  UserRound,
  X,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "./ui";
import { useApp } from "../hooks/useApp";
export const navItems = [
  { path: "dashboard", label: "Visão geral", icon: LayoutDashboard },
  { path: "atribuicoes", label: "Atribuições do emprego", icon: ListChecks },
  { path: "competencias", label: "Competências técnicas", icon: BookOpen },
  { path: "atividades", label: "Atividades profissionais", icon: Activity },
  { path: "projetos", label: "Projetos e propostas", icon: FolderKanban },
  {
    path: "capacitacoes",
    label: "Desenvolvimento profissional",
    icon: GraduationCap,
  },
  { path: "documentacao", label: "Documentações produzidas", icon: FileText },
  { path: "perfil", label: "Meu perfil", icon: UserRound },
];
export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, logout } = useApp();
  return (
    <>
      <button
        className={`sidebar-backdrop ${open ? "visible" : ""}`}
        onClick={onClose}
        aria-label="Fechar navegação"
      />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="between">
          <Logo />
          <button
            className="mobile-menu icon-button"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X />
          </button>
        </div>
        <div className="workspace">
          <span className="workspace-icon">S</span>
          <div>
            <strong>Organização profissional</strong>
            <small>Ambiente demonstrativo</small>
          </div>
          <span className="live-dot" />
        </div>
        <Link to="/app/atividades" className="button" onClick={onClose}>
          <Plus size={18} /> Registrar atividade
        </Link>
        <small className="nav-label">PERFIL PROFISSIONAL</small>
        <nav>
          {navItems.map(({ path, label, icon: Icon }, i) => (
            <NavLink
              key={path}
              to={`/app/${path}`}
              onClick={onClose}
              className={({ isActive }) =>
                `${isActive ? "active" : ""} ${i === 2 ? "nav-divider" : ""}`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="independent-note">
            <ShieldCheck size={20} />
            <strong>Um espaço para explorar</strong>
            <p>Registros de teste. Edição indisponível em produção.</p>
            <Link to="/">
              Ver perfil público <span>↗</span>
            </Link>
          </div>
          <div className="sidebar-user">
            <span className="avatar">
              {user?.name.slice(0, 2).toUpperCase()}
            </span>
            <Link to="/app/perfil">
              <strong>{user?.name}</strong>
              <small>Meu perfil</small>
            </Link>
            <button className="icon-button" onClick={logout} aria-label="Sair">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
