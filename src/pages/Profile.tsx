import { useState } from "react";
import { useApp } from "../hooks/useApp";
export function Profile() {
  const { user, saveProfile } = useApp();
  const [notice, setNotice] = useState("");
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">CONTA DO PROTÓTIPO LOCAL</div>
          <h1>Meu perfil</h1>
          <p>Mantenha suas informações de demonstração atualizadas.</p>
        </div>
      </div>
      <form
        className="panel profile-form"
        onSubmit={(e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          try {
            saveProfile({
              ...user!,
              name: String(d.get("name")).trim(),
              organization: String(d.get("organization")).trim(),
            });
            setNotice("Perfil atualizado neste navegador.");
          } catch (e) {
            setNotice((e as Error).message);
          }
        }}
      >
        <div className="profile-intro">
          <span className="avatar large">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h2>{user?.name}</h2>
            <p>
              Conta de teste · Não altera a identificação pública do titular
            </p>
          </div>
        </div>
        <label>
          Nome
          <input name="name" defaultValue={user?.name} required minLength={2} />
        </label>
        <label>
          E-mail
          <input type="email" value={user?.email} disabled />
          <small>
            O e-mail identifica sua conta local e não pode ser alterado neste
            protótipo.
          </small>
        </label>
        <label>
          Organização
          <input
            name="organization"
            defaultValue={user?.organization}
            placeholder="Nome fictício da organização"
          />
        </label>
        {notice && (
          <div className="notice" role="status">
            {notice}
          </div>
        )}
        <button className="button">Salvar alterações</button>
      </form>
    </>
  );
}
