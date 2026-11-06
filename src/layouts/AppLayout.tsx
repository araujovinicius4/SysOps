import { useState } from "react";
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { Menu, ChevronRight, FlaskConical } from "lucide-react";
import { institutionalNotice } from "../data/professional";
import { useApp } from "../hooks/useApp";
import { Sidebar, navItems } from "../components/Sidebar";
export function AppLayout() {
  const { user } = useApp();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  if (!import.meta.env.DEV || !user)
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  const title =
    navItems.find((n) => location.pathname.startsWith("/app/" + n.path))
      ?.label || "Perfil profissional";
  return (
    <div className="app-shell">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="app-main">
        <header className="app-header">
          <div>
            <button
              className="icon-button mobile-menu"
              onClick={() => setOpen(true)}
              aria-label="Abrir navegação"
            >
              <Menu />
            </button>
            <span>Perfil profissional</span>
            <ChevronRight size={14} />
            <strong>{title}</strong>
          </div>
          <div>
            <span className="demo-pill">
              <FlaskConical size={14} /> Modo demonstração
            </span>
            <Link className="avatar" to="/app/perfil">
              {user.name.slice(0, 2).toUpperCase()}
            </Link>
          </div>
        </header>
        <div className="app-content">
          <Outlet />
        </div>
        <footer className="app-footer">{institutionalNotice}</footer>
      </div>
    </div>
  );
}
