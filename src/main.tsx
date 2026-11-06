import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AppProvider } from "./hooks/useApp";
import { AppLayout } from "./layouts/AppLayout";
import { Landing } from "./pages/Landing";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Duties, Professional } from "./pages/Professional";
import { Profile } from "./pages/Profile";
import { Legal, NotFound } from "./pages/Legal";
import "./styles.css";
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="not-found">
        <h1>Não foi possível abrir o workspace.</h1>
        <p>
          Verifique se o armazenamento local está habilitado e recarregue a
          página.
        </p>
        <button className="button" onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cadastro" element={<Auth register />} />
            {["privacidade", "termos", "contato"].map((kind) => (
              <Route
                key={kind}
                path={`/${kind}`}
                element={<Legal kind={kind} />}
              />
            ))}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="atribuicoes" element={<Duties />} />
              {(
                [
                  "competencias",
                  "atividades",
                  "projetos",
                  "capacitacoes",
                  "documentacao",
                ] as const
              ).map((collection) => (
                <Route
                  key={collection}
                  path={collection}
                  element={
                    <Professional key={collection} collection={collection} />
                  }
                />
              ))}
              {["solicitacoes", "solicitacoes/nova", "solicitacoes/:id"].map(
                (path) => (
                  <Route
                    key={path}
                    path={path}
                    element={<Navigate to="/app/atividades" replace />}
                  />
                ),
              )}
              {[
                "infraestrutura",
                "servidores",
                "backups",
                "monitoramento",
                "inventario",
              ].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={<Navigate to="/app/atribuicoes" replace />}
                />
              ))}
              <Route path="perfil" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
