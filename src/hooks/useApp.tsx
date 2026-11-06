import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, Request, Server, Asset, Alert } from "../types";
import { read, write } from "../services/storage";
import { hash, uid } from "../utils";
import type { ProfessionalRecord } from "../data/professional";
function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    if (!import.meta.env.DEV) return fallback;
    const v = read(key, fallback);
    write(key, v);
    return v;
  });
  const save = (v: T) => {
    if (!import.meta.env.DEV)
      throw new Error("Edição indisponível em produção.");
    write(key, v);
    setValue(v);
  };
  return [value, save] as const;
}
function useStore() {
  const [users, setUsers] = useStored<User[]>("users", []);
  const [session, setSession] = useStored<string | null>("session", null);
  const [requests, setRequests] = useStored<Request[]>("requests", []);
  const [servers, setServers] = useStored<Server[]>("servers", []);
  const [assets, setAssets] = useStored<Asset[]>("inventory", []);
  const [alerts, setAlerts] = useStored<Alert[]>("alerts", []);
  const [professionalRecords, setProfessionalRecords] = useStored<
    ProfessionalRecord[]
  >("professional-records:v1", []);
  const user = users.find((u) => u.id === session) ?? null;
  function requireLocalEditor() {
    if (!import.meta.env.DEV)
      throw new Error(
        "Edição indisponível: autenticação de produção ainda não configurada.",
      );
  }
  const login = async (email: string, password: string) => {
    requireLocalEditor();
    const digest = await hash(password);
    const found = users.find(
      (u) =>
        u.email === email.trim().toLowerCase() && u.passwordHash === digest,
    );
    if (!found) throw new Error("E-mail ou senha incorretos.");
    setSession(found.id);
  };
  const register = async (name: string, email: string, password: string) => {
    requireLocalEditor();
    email = email.trim().toLowerCase();
    if (users.some((u) => u.email === email))
      throw new Error("Este e-mail já está cadastrado.");
    const u = {
      id: uid(),
      name: name.trim(),
      email,
      passwordHash: await hash(password),
      organization: "",
    };
    setUsers([...users, u]);
    setSession(u.id);
  };
  const demo = () => {
    requireLocalEditor();
    if (!users.some((u) => u.id === "professional-demo"))
      setUsers([
        ...users,
        {
          id: "professional-demo",
          name: "Visitante de demonstração",
          email: "demo@example.com",
          passwordHash: "",
          organization: "Ambiente de demonstração",
        },
      ]);
    setSession("professional-demo");
  };
  return {
    user,
    professionalRecords: professionalRecords.filter(
      (r) => r.userId === user?.id,
    ),
    saveProfessionalRecord: (record: ProfessionalRecord) => {
      requireLocalEditor();
      if (!user || record.userId !== user.id)
        throw new Error("Acesso não autorizado.");
      if (
        professionalRecords.some(
          (r) => r.id === record.id && r.userId !== user.id,
        )
      )
        throw new Error("Registro de outra conta.");
      setProfessionalRecords([
        record,
        ...professionalRecords.filter((r) => r.id !== record.id),
      ]);
    },
    deleteProfessionalRecord: (id: string) => {
      requireLocalEditor();
      if (!user) throw new Error("Acesso não autorizado.");
      setProfessionalRecords(
        professionalRecords.filter(
          (r) => !(r.id === id && r.userId === user.id),
        ),
      );
    },
    users,
    requests: requests.filter((r) => r.userId === user?.id),
    servers,
    assets,
    alerts,
    login,
    register,
    demo,
    logout: () => setSession(null),
    saveProfile: (u: User) =>
      setUsers(users.map((x) => (x.id === u.id ? u : x))),
    addRequest: (r: Request) => setRequests([r, ...requests]),
    updateRequest: (r: Request) =>
      setRequests(
        requests.map((x) => (x.id === r.id && x.userId === user?.id ? r : x)),
      ),
    setServers,
    setAssets,
    setAlerts,
  };
}
const Context = createContext<ReturnType<typeof useStore> | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const store = useStore();
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error("AppProvider ausente");
  return value;
}
