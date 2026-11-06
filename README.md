# Analista de TI – Sistemas Operacionais

Perfil profissional informativo de Analista de TI – Sistemas Operacionais, HU-UFPI | HU Brasil/Ebserh.

Consulte o [relatório de proteção de dados pessoais](PRIVACIDADE.md) antes de publicar. A apresentação usa identificação profissional genérica; o protótipo não é um portal institucional oficial.

A interface React existente foi adaptada, preservando a paleta laranja, tipografia, componentes, ilustrações de infraestrutura, animações e organização visual. Não há oferta comercial, abertura de chamados ou representação de portal institucional oficial.

## Execução

```powershell
npm.cmd install
npm.cmd run dev
```

O Vite serve o protótipo em http://127.0.0.1:5173. A opção “Área local” permite criar uma conta de teste ou acessar a demonstração. Use somente dados fictícios e senhas exclusivas de teste.

```powershell
npm.cmd run build
npm.cmd test
```

Execute o build antes dos testes: o Playwright inicia o servidor de desenvolvimento na porta 5173 e o preview do build na 5174, usando o Microsoft Edge instalado. `npm.cmd run preview` permite inspecionar a versão de produção.

## Conteúdo e funcionalidades

- Página pública com identificação fornecida pelo titular, sobre, oito atribuições, dez áreas de competência sem classificação automática, atividades, projetos, desenvolvimento e contato.
- Dashboard com contagens dos registros locais e média do progresso informado nas capacitações. Nenhuma experiência profissional ou certificação é presumida.
- Cadastro, consulta, filtros, edição e exclusão confirmada de competências, atividades, projetos, capacitações e documentação.
- Atividades distinguem realizadas, em andamento, propostas e estudos/capacitações. Projetos permitem todas as situações solicitadas; a situação “Autorizado” exige uma referência da autorização, informada pelo usuário e não verificada pela aplicação.
- Capacitações registram competência, curso, objetivo, progresso de 0 a 100%, evidências e relação com o emprego. Documentações podem ser baixadas em texto.
- Registros do protótipo ficam separados por conta no navegador. Esse isolamento é demonstrativo, não autorização segura.
- Dados locais não são publicados automaticamente no perfil público. As seções públicas começam sem atividades, projetos e capacitações confirmados. Os indicadores públicos referem-se apenas a conteúdo publicado, não aos testes locais.
- Nenhum contato pessoal foi inventado. Não há envio de mensagens ou uso de logotipos institucionais.

As atribuições foram sintetizadas a partir da Descrição Sumária das Atribuições da HU Brasil de setembro de 2026, páginas 12–13. São referências do emprego, não declarações de experiência do titular:
https://www.gov.br/hubrasil/pt-br/acesso-a-informacao/agentes-publicos/demonstrativos-de-quadro-de-pessoal-remuneracoes-e-beneficios/cargos-carreiras-e-beneficios/plano-de-cargos-e-beneficios/descricao-sumaria-das-atribuicoes-dos-cargos-efetivos-cargos-comissionados-e-funcoes-gratificadas-2026.pdf/view

## Autenticação e produção

Conforme decisão do titular, a edição permanece disponível exclusivamente no servidor de desenvolvimento (`import.meta.env.DEV`). O build de produção bloqueia login, cadastro e todas as rotas de edição, mesmo com uma sessão local preexistente ou forjada. O contexto não lê nem escreve dados do navegador em produção.

A autenticação local com resumo SHA-256 e localStorage é apenas uma simulação. Não representa segurança de produção. Para habilitar edição privada real será necessário integrar um backend com autenticação, autorização no servidor e armazenamento adequado. Não habilite edição em produção removendo apenas o bloqueio do cliente.

Não registre dados de pacientes, credenciais, topologias internas ou informações restritas. Este ambiente não substitui sistemas e canais administrativos e operacionais institucionais.

## Dados existentes

A chave `sysops:professional-records:v1` guarda os novos registros; as chaves de contas e sessão foram mantidas. Registros legados do SysOps não são apagados nem convertidos em histórico profissional. A demonstração profissional usa uma conta própria, separada da antiga conta de exemplo. Rotas antigas de solicitações redirecionam para atividades; rotas de infraestrutura redirecionam para atribuições. Componentes e fontes legadas foram conservados, mas não fazem parte da navegação ativa.

## Arquivos alterados

- `src/data/professional.ts`: identidade, avisos, referência institucional, atribuições, opções e campos dos cadastros.
- `src/pages/Landing.tsx`: conteúdo e seções públicas adaptados na estrutura existente.
- `src/pages/Dashboard.tsx`: indicadores e acompanhamento profissional.
- `src/pages/Professional.tsx`: atribuições e gerenciamento das cinco coleções.
- `src/hooks/useProfessional.ts` e `src/hooks/useApp.tsx`: registros por conta e bloqueio de gravação em produção.
- `src/components/Header.tsx`, `Sidebar.tsx`, `ui.tsx`: marca, menus e cards reutilizados.
- `src/layouts/AppLayout.tsx`, `src/pages/Auth.tsx`, `Profile.tsx`, `Legal.tsx`: contexto profissional, acesso e aviso institucional.
- `src/main.tsx` e `src/vite-env.d.ts`: rotas, redirecionamentos e tipos do Vite.
- `src/styles.css`: ajustes necessários à marca longa, campos e navegação responsiva; tokens laranja preservados.
- `index.html`: título, descrição e cor de tema.
- `tests/app.spec.ts` e `playwright.config.ts`: validação do perfil, cadastros, persistência, isolamento, responsividade e bloqueio de produção.
- `dist/`: artefatos de produção regenerados.

## Validação

Os testes verificam a identificação, oito cards, ausência de classificação automática, navegação pública em seis larguras (360–1440px), páginas internas em três larguras, edição móvel, foco laranja, cadastro das cinco coleções, persistência, filtros, documentação, contas locais, isolamento, exclusão confirmada, preservação de registros legados e bloqueio da edição no build de produção. As capturas são geradas em `test-results/`.
