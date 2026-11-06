# Relatório de exposição de dados pessoais

Revisão realizada em 9 de outubro de 2026, antes de qualquer publicação. O projeto não foi publicado nesta revisão.

## Escopo e resultado

Foram revisados código-fonte, páginas públicas e internas, componentes, dados de exemplo, testes, configurações, metadados HTML, documentação, URLs, arquivos estáticos, arquivos ocultos e artefatos de produção disponíveis neste checkout.

A identificação pública foi reduzida a **Analista de TI – Sistemas Operacionais**. O nome pessoal foi removido da fonte de identidade, páginas, rodapé, metadados, documentação e testes. A lotação específica também foi retirada. A apresentação passou a ser impessoal, preservando a referência pertinente ao HU-UFPI/Ebserh e o aviso de que a página não é um portal oficial.

| Ponto de exposição                                | Resultado e providência                                                                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Página pública, componentes e dados de identidade | Identificação genérica; campos de nome e lotação específica retirados.                                                                                                |
| Título e descrição para buscadores                | Metadados genéricos, sem nome pessoal.                                                                                                                                |
| Documentação e testes                             | Referências pessoais substituídas; testes usam contas fictícias.                                                                                                      |
| Bundle JavaScript e HTML de produção              | Regenerados a partir da fonte anonimizada. A publicação deve usar apenas o `dist/` atual.                                                                             |
| Capturas de tela e resultados de testes           | Regenerados para substituir imagens da identificação anterior. Não são arquivos destinados à publicação.                                                              |
| E-mail, telefone, matrícula e documentos pessoais | Nenhum contato pessoal, matrícula ou documento do titular encontrado nos conteúdos revisados. E-mails remanescentes são exemplos de teste, não contatos públicos.     |
| URLs e nomes de arquivos                          | Rotas genéricas e links institucionais de referência, sem identificadores pessoais encontrados.                                                                       |
| Manifests e mapas de código                       | Não há manifest de publicação/PWA nem source maps no conjunto de arquivos de aplicação e build revisado.                                                              |
| Logs locais do npm                                | Dois logs continham caminhos de perfil do sistema operacional; esses caminhos foram anonimizados. Caches e dependências não devem ser incluídos em um pacote público. |
| Histórico Git                                     | Este diretório não é um repositório Git. Commits, autores, e-mails de commit, branches e versões remotas não puderam ser auditados. Não houve reescrita de histórico. |

## Pontos de exposição que permanecem possíveis

- **Armazenamento do navegador:** contas e registros previamente inseridos no protótipo local podem conter nomes, e-mails ou texto livre. Não foram apagados dados persistidos. A área de desenvolvimento exibe os dados da conta local; o build de produção bloqueia a edição e não lê esse armazenamento. Isso não transforma a autenticação simulada em segurança de produção.
- **Exportações locais:** a função de download de documentação exporta o conteúdo informado pelo usuário. Um documento pode conter dados pessoais se estes forem inseridos manualmente. Ele não é publicado automaticamente.
- **Arquivos fora do checkout:** anexos do chat, capturas copiadas, backups, versões já hospedadas, caches de buscadores e histórico remoto não estão abrangidos por esta revisão. A remoção local não garante a remoção dessas cópias.
- **Caminho do workspace:** o nome de usuário no caminho do sistema operacional é externo ao conteúdo da aplicação. Não distribua o diretório inteiro, logs, caches, resultados de testes ou dependências como arquivos estáticos públicos.
- **Contexto institucional:** a referência ao HU-UFPI/Ebserh foi mantida por pertinência profissional. Ela informa um contexto e pode contribuir para associação indireta com pessoas, embora a página não publique a identidade nominal do titular.

## Validação

Build e testes verificam navegação, responsividade, cadastros e bloqueio de edição em produção. A revisão inclui busca por identificadores anteriores nos arquivos de aplicação, documentação e build, além de verificação dos metadados e da ausência dos campos pessoais na página pública.

Este relatório registra o escopo verificável e as limitações. Ele não certifica anonimato absoluto nem substitui a auditoria de um repositório remoto ou de um ambiente já publicado.
