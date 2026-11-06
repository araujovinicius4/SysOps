import { test, expect, type Page } from "@playwright/test";

async function demo(page: Page) {
  await page.goto("/login");
  await page.getByRole("button", { name: "Acessar demonstração" }).click();
  await expect(page).toHaveURL(/dashboard/);
}
async function add(page: Page, route: string, name: string) {
  await page.goto(`/app/${route}`);
  await page
    .getByRole("button", { name: `Adicionar ${name}`, exact: true })
    .click();
}
async function save(page: Page) {
  await page.getByRole("button", { name: "Salvar registro" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
}

test("perfil público, identidade, navegação e responsividade", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Analista de TI – Sistemas Operacionais",
  );
  await expect(page.locator(".professional-identity")).toContainText(
    "Analista de TI – Sistemas Operacionais",
  );
  await expect(page.locator(".professional-identity dt")).toHaveText([
    "Emprego",
    "Instituição",
    "Unidade",
  ]);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Perfil informativo de Analista de TI – Sistemas Operacionais no contexto do HU-UFPI/Ebserh. Não constitui portal institucional oficial.",
  );
  await expect(page.locator(".service-card")).toHaveCount(8);
  await expect(page.locator(".competence-level")).toHaveCount(10);
  await expect(page.locator("#sobre")).toContainText(
    "Perfil informativo de Analista",
  );
  await expect(page.locator("footer")).toContainText(
    "não constitui portal institucional oficial",
  );
  await expect(page.locator("body")).not.toContainText("SysOps Service");
  for (const width of [360, 390, 768, 980, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    if (width <= 980)
      await page.getByRole("button", { name: "Abrir menu" }).click();
    for (const label of [
      "Início",
      "Sobre",
      "Atribuições",
      "Competências",
      "Atividades",
      "Projetos",
      "Contato",
    ])
      await expect(
        page
          .locator(".public-nav")
          .getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    if (width <= 980)
      await page.getByRole("button", { name: "Abrir menu" }).click();
  }
  await page
    .getByRole("link", { name: "Conhecer competências", exact: true })
    .click();
  await expect(page).toHaveURL(/#competencias/);
  await page.goto("/");
  await page.screenshot({
    path: "test-results/professional-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/professional-mobile.png",
    fullPage: true,
  });
  for (const route of ["contato", "termos", "privacidade"]) {
    await page.goto(`/${route}`);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("cadastros, edição, progresso e documentação persistem sem publicação automática", async ({
  page,
}) => {
  await demo(page);
  await expect(
    page
      .locator(".metric")
      .filter({ hasText: "Atividades registradas" })
      .locator("strong"),
  ).toHaveText("0");
  await add(page, "competencias", "competência");
  await expect(page.getByLabel("Nível de conhecimento *")).toHaveValue("");
  await page
    .getByLabel("Competência *", { exact: true })
    .selectOption("Linux e Windows Server");
  await page
    .getByLabel("Nível de conhecimento *")
    .selectOption("Conhecimento básico");
  await save(page);
  await page
    .getByRole("button", { name: "Editar Linux e Windows Server" })
    .click();
  await page
    .getByLabel("Nível de conhecimento *")
    .selectOption("Em desenvolvimento");
  await save(page);
  await add(page, "atividades", "atividade");
  await page
    .getByLabel("Título *", { exact: true })
    .fill("Estudo local de diagnóstico");
  await page
    .getByLabel("Descrição *")
    .fill("Exercício de teste, sem execução institucional.");
  await page
    .getByLabel("Categoria técnica *")
    .selectOption("Diagnóstico de desempenho");
  await page.getByLabel("Data *").fill("2026-10-09");
  await page
    .getByLabel("Situação *", { exact: true })
    .selectOption("Estudos e capacitações");
  await page
    .getByLabel("Resultados", { exact: true })
    .fill("Roteiro de estudo registrado.");
  await page.getByLabel("Documentação associada").fill("Notas de laboratório");
  await save(page);
  await add(page, "projetos", "projeto");
  await page
    .getByLabel("Nome *", { exact: true })
    .fill("Proposta de laboratório");
  for (const label of [
    "Problema identificado *",
    "Objetivo *",
    "Solução proposta *",
  ])
    await page
      .getByLabel(label, { exact: true })
      .fill("Texto de teste da proposta pessoal");
  await page.getByLabel("Situação da proposta *").selectOption("Autorizado");
  await page.getByRole("button", { name: "Salvar registro" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "referência da autorização",
  );
  await page.getByLabel("Situação da proposta *").selectOption("Em estudo");
  await save(page);
  await add(page, "capacitacoes", "capacitação");
  await page
    .getByLabel("Curso ou treinamento *")
    .fill("Treinamento local de teste");
  await page
    .getByLabel("Competência a desenvolver *")
    .selectOption("Automação e scripts");
  await page.getByLabel("Objetivo *").fill("Aprender em laboratório");
  await page.getByLabel("Progresso (%) *").fill("40");
  await page
    .getByLabel("Relação com as atribuições do emprego *")
    .selectOption("Administração de ambientes de sistemas operacionais");
  await page
    .getByLabel("Situação *", { exact: true })
    .selectOption("Em andamento");
  await save(page);
  await add(page, "documentacao", "documentação");
  await page
    .getByLabel("Título *", { exact: true })
    .fill("Notas de laboratório");
  await page.getByLabel("Descrição *").fill("Documento de teste");
  await page
    .getByLabel("Categoria técnica *")
    .selectOption("Documentação técnica");
  await page.getByLabel("Data *").fill("2026-10-09");
  await page
    .getByLabel("Conteúdo ou referência pública *")
    .fill("Procedimento fictício sem informação restrita");
  await save(page);
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Baixar Notas de laboratório" })
    .click();
  expect((await download).suggestedFilename()).toBe(
    "documentacao-profissional.txt",
  );
  await page.reload();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.goto("/app/dashboard");
  await expect(page.locator(".donut strong")).toHaveText("40%");
  await expect(
    page
      .locator(".metric")
      .filter({ hasText: "Capacitações em andamento" })
      .locator("strong"),
  ).toHaveText("1");
  await page.screenshot({
    path: "test-results/professional-dashboard.png",
    fullPage: true,
  });
  await page.goto("/app/atividades");
  await page
    .getByRole("button", { name: "Editar Estudo local de diagnóstico" })
    .click();
  await expect(page.getByLabel("Resultados", { exact: true })).toHaveValue(
    "Roteiro de estudo registrado.",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByLabel("Buscar registros", { exact: true })
    .fill("inexistente");
  await expect(page.getByText("Nenhum resultado encontrado")).toBeVisible();
  await page.goto("/");
  await expect(page.locator("#atividades")).not.toContainText(
    "Estudo local de diagnóstico",
  );
  await expect(page.locator("#competencias")).not.toContainText(
    "Conhecimento básico",
  );
});

test("contas locais, isolamento, exclusão confirmada e preservação de dados legados", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem(
      "sysops:requests",
      JSON.stringify([
        { id: "legacy-record", userId: "demo", title: "Registro legado" },
      ]),
    ),
  );
  await page.goto("/app/atividades");
  await expect(page).toHaveURL(/login/);
  await page.getByRole("link", { name: "Criar conta", exact: true }).click();
  await page.getByLabel("Nome", { exact: true }).fill("Conta Teste");
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Senha", { exact: true }).fill("senha-local-teste");
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await add(page, "competencias", "competência");
  await page
    .getByLabel("Competência *", { exact: true })
    .selectOption("Virtualização");
  await page
    .getByLabel("Nível de conhecimento *")
    .selectOption("Conhecimento intermediário");
  await save(page);
  await page.getByRole("button", { name: "Sair", exact: true }).click();
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Senha", { exact: true }).fill("senha-incorreta");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText(
    "E-mail ou senha incorretos",
  );
  await page.getByLabel("Senha", { exact: true }).fill("senha-local-teste");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await page.goto("/app/competencias");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.getByRole("button", { name: "Excluir Virtualização" }).click();
  await page.getByRole("button", { name: "Cancelar", exact: true }).click();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.getByRole("button", { name: "Sair", exact: true }).click();
  await page.getByRole("button", { name: "Acessar demonstração" }).click();
  await page.goto("/app/competencias");
  await expect(page.locator("tbody tr")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("sysops:requests")!)[0].id,
    ),
  ).toBe("legacy-record");
  await page.getByRole("button", { name: "Sair", exact: true }).click();
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Senha", { exact: true }).fill("senha-local-teste");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await page.goto("/app/competencias");
  await page.getByRole("button", { name: "Excluir Virtualização" }).click();
  await page.getByRole("button", { name: "Confirmar exclusão" }).click();
  await page.reload();
  await expect(page.locator("tbody tr")).toHaveCount(0);
});

test("rotas internas, responsividade, formulário e navegação móvel", async ({
  page,
}) => {
  await demo(page);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "dashboard",
      "atribuicoes",
      "competencias",
      "atividades",
      "projetos",
      "capacitacoes",
      "documentacao",
      "perfil",
    ]) {
      await page.goto(`/app/${route}`);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir navegação" }).click();
  await page
    .getByRole("link", { name: "Projetos e propostas", exact: true })
    .click();
  await expect(page).toHaveURL(/projetos/);
  await add(page, "atividades", "atividade");
  await expect(page.getByLabel("Situação *", { exact: true })).toHaveValue("");
  await page.getByLabel("Título *", { exact: true }).focus();
  expect(
    await page
      .getByLabel("Título *", { exact: true })
      .evaluate((el) => getComputedStyle(el).outlineColor),
  ).toBe("rgb(194, 65, 12)");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.keyboard.press("Escape");
  await page.goto("/app/solicitacoes/nova");
  await expect(page).toHaveURL(/app\/atividades/);
});

test("produção bloqueia edição mesmo com sessão local forjada", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5174/");
  await expect(page.getByRole("link", { name: "Área local" })).toHaveCount(0);
  await page.evaluate(() => {
    localStorage.setItem(
      "sysops:users",
      JSON.stringify([
        { id: "forged", name: "Conta forjada", email: "forged@example.com" },
      ]),
    );
    localStorage.setItem("sysops:session", JSON.stringify("forged"));
    localStorage.setItem(
      "sysops:professional-records:v1",
      JSON.stringify([
        {
          id: "secret",
          userId: "forged",
          collection: "atividades",
          fields: { title: "Não expor" },
        },
      ]),
    );
  });
  for (const path of [
    "/login",
    "/cadastro",
    "/app/dashboard",
    "/app/atividades",
    "/app/perfil",
  ]) {
    await page.goto(`http://127.0.0.1:5174${path}`);
    await expect(
      page.getByRole("heading", { name: "Edição indisponível em produção" }),
    ).toBeVisible();
    await expect(page.locator("input,textarea,select")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Não expor");
  }
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("sysops:session")!),
    ),
  ).toBe("forged");
});
