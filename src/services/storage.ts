export function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem("sysops:" + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function write<T>(key: string, value: T) {
  try {
    localStorage.setItem("sysops:" + key, JSON.stringify(value));
  } catch {
    throw new Error(
      "Não foi possível salvar no navegador. Verifique o espaço e as permissões de armazenamento.",
    );
  }
}
