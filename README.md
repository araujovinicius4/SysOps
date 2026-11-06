# SysOps — Perfil e Gestão de Atividades Profissionais em Sistemas Operacionais

O **SysOps** é uma aplicação web para apresentar o escopo de atuação de um **Analista de TI – Sistemas Operacionais** e, em ambiente local de desenvolvimento, organizar registros de competências técnicas, atividades, projetos, capacitações e documentação profissional.

O projeto utiliza como contexto de referência o **HU-UFPI | HU Brasil/Ebserh**, mas **não é um sistema institucional oficial**, não representa autorização da instituição e não substitui seus canais administrativos ou operacionais.

## Problema que o projeto procura resolver

O trabalho de administração de sistemas operacionais envolve diagnóstico, manutenção, estudos técnicos, documentação e aperfeiçoamento contínuo. Quando informações sobre essas atividades ficam espalhadas entre anotações e arquivos, torna-se difícil:

- distinguir atribuições formais de experiências efetivamente realizadas;
- registrar atividades concluídas, em andamento e apenas propostas;
- acompanhar competências e necessidades de capacitação;
- organizar projetos por problema, objetivo, solução e situação;
- manter evidências e documentação técnica acessíveis;
- apresentar um panorama profissional claro, sem divulgar informações restritas.

O SysOps busca reunir esses registros em uma estrutura única, com categorias e situações explícitas. **Organizar registros não equivale a comprovar sua execução ou validação institucional**: os dados são informados pelo usuário.

## O que está implementado

### Página pública

- Apresentação informativa do emprego e do contexto profissional.
- Oito atribuições de referência, sintetizadas a partir de documento institucional.
- Dez áreas de competência técnica, sem atribuição automática de nível de conhecimento.
- Seções de atividades, projetos e contato, com avisos sobre o caráter não oficial da página.
- Interface responsiva para desktop e dispositivos móveis.

### Área local de trabalho (somente desenvolvimento)

- **Dashboard:** contagens de registros e acompanhamento do progresso informado em capacitações.
- **Competências:** cadastro de conhecimentos, nível autodeclarado e evidências.
- **Atividades:** registro de descrição, categoria, data, resultados e situação (realizada, em andamento, proposta ou estudo/capacitação).
- **Projetos:** descrição do problema, objetivo, solução, tecnologias, benefícios e estágio da proposta. A situação “Autorizado” exige referência informada pelo usuário, mas o sistema não verifica a autorização.
- **Capacitações:** objetivos, competências relacionadas, progresso percentual, evidências e vínculo com atribuições do emprego.
- **Documentação:** cadastro e exportação local de conteúdo textual.
- **Perfil e acesso de demonstração:** contas locais de teste e registros separados por conta no navegador.

As informações cadastradas localmente **não são publicadas automaticamente** na página pública.

## Tecnologias

| Componente | Tecnologia |
| --- | --- |
| Interface | React 19 e TypeScript |
| Navegação | React Router 7 |
| Ferramentas de desenvolvimento e build | Vite 6 |
| Estilos | Tailwind CSS 4 e CSS |
| Ícones | Lucide React |
| Persistência do protótipo | LocalStorage |
| Testes automatizados | Playwright |

**Não há backend, API de persistência ou banco de dados implementados nesta versão.**

## Organização do código

```text
SysOps/
├── src/
│   ├── components/       # Componentes visuais e navegação
│   ├── data/             # Referências e modelos de formulários
│   ├── hooks/            # Estado da aplicação e registros profissionais
│   ├── layouts/          # Estrutura da área interna
│   ├── pages/            # Página pública, dashboard e cadastros
│   ├── services/         # Acesso ao armazenamento local
│   ├── types/            # Tipos TypeScript
│   ├── utils/            # Utilitários
│   ├── main.tsx          # Rotas e inicialização
│   └── styles.css        # Estilos
├── tests/                # Testes de interface
├── index.html
├── package.json
├── vite.config.ts
├── playwright.config.ts
└── PRIVACIDADE.md
```

O repositório também contém componentes e estruturas legadas de solicitações e infraestrutura. As antigas rotas de solicitações redirecionam para **Atividades**; as de infraestrutura, para **Atribuições**. Essas estruturas não devem ser confundidas com módulos operacionais ativos.

## Como executar

Requisitos: Node.js e npm compatíveis com as dependências do projeto.

```bash
npm install
npm run dev
```

Acesse **http://127.0.0.1:5173**. Na área local, utilize a demonstração ou crie uma conta exclusivamente para testes. **Não use credenciais reais nem informações sensíveis.**

Para gerar e inspecionar a versão de produção:

```bash
npm run build
npm run preview
```

O build é gerado em `dist/`.

### Testes

```bash
npm run build
npm test
```

A configuração atual do Playwright utiliza **Microsoft Edge** e comandos `npm.cmd`, adequados ao Windows. Para executar os testes em Linux, adapte `playwright.config.ts` para utilizar `npm` e um navegador disponível. Os testes abrangem navegação, responsividade, cadastros, persistência local, isolamento demonstrativo de contas e bloqueio de edição em produção.

## Limitações e cuidados de segurança

- **Produção somente informativa:** o build de produção bloqueia login, cadastro e rotas de edição. O bloqueio está implementado no cliente e não substitui autorização em servidor.
- **Autenticação simulada:** as contas locais e os resumos SHA-256 no navegador são recursos de prototipagem, não um sistema seguro de autenticação.
- **Dados locais:** os registros dependem do armazenamento do navegador e podem ser perdidos se esse armazenamento for limpo.
- **Sem comprovação automática:** níveis de competência, resultados, progresso e referências de autorização são declarados pelo usuário.
- **Sem integração institucional:** não há conexão com sistemas administrativos, servidores, inventário real, chamados ou dados da HU Brasil/Ebserh.
- **Privacidade:** não cadastre dados de pacientes, senhas, endereços internos, topologias, documentos sigilosos ou outras informações restritas.

Consulte [PRIVACIDADE.md](PRIVACIDADE.md) para o escopo da revisão de exposição de dados pessoais. Antes de publicar, revise também os arquivos estáticos e o histórico do repositório.

## Possíveis evoluções

As funcionalidades abaixo **não estão implementadas** e dependem de definição de requisitos e validação técnica:

1. Backend com autenticação, autorização e persistência segura.
2. Exportação e backup estruturado dos registros profissionais.
3. Relatórios periódicos de atividades, capacitações e documentação.
4. Publicação seletiva de informações profissionais revisadas.
5. Melhorias na rastreabilidade de evidências e no vínculo entre atividades e atribuições.

## Referência das atribuições

As atribuições apresentadas são uma síntese da **Descrição Sumária das Atribuições dos Cargos**, HU Brasil/Ebserh, edição de 2026, páginas 12–13. São referências ao escopo do emprego e **não uma declaração de experiência individual**.

[Consultar documento institucional](https://www.gov.br/hubrasil/pt-br/acesso-a-informacao/agentes-publicos/demonstrativos-de-quadro-de-pessoal-remuneracoes-e-beneficios/cargos-carreiras-e-beneficios/plano-de-cargos-e-beneficios/descricao-sumaria-das-atribuicoes-dos-cargos-efetivos-cargos-comissionados-e-funcoes-gratificadas-2026.pdf/view)

---

**SysOps** — organização e apresentação informativa de atividades profissionais em Sistemas Operacionais. Projeto independente, sem caráter de portal institucional oficial.
