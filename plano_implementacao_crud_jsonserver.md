# Plano de Implementação — CRUD com JSON Server

## Contexto

Atividade prática (Semanas 16 e 17) de evolução de um projeto web já existente que usa JSON Server. O objetivo é implementar o CRUD completo (Create, Read, Update, Delete) da entidade principal do projeto, consumindo a API REST do JSON Server via Fetch API.

> ⚠️ **Antes de começar:** substitua todas as ocorrências de `[ENTIDADE]` pelo nome real da entidade principal do projeto (ex.: `produto`, `livro`, `cliente`).

---

## Stack / Ferramentas

- **Node.js** — plataforma de execução
- **JSON Server** — fake REST API
- **HTML + CSS + JavaScript (vanilla)** — front-end
- **Fetch API** — consumo da API REST
- **Git + GitHub** — controle de versão (com tags)
- **Postman / Insomnia / Thunder Client** — testes de requisições (uso manual, fora do código)

---

## Estrutura esperada do projeto

```
.
├── db/
│   └── db.json                 # base de dados do JSON Server
├── public/                     # (ou raiz) arquivos do front-end
│   ├── index.html              # listagem da entidade
│   ├── cadastro_[ENTIDADE].html  # formulário de cadastro/edição
│   ├── styles.css
│   ├── app.js                  # lógica da listagem (GET, DELETE)
│   ├── cadastro.js             # lógica do formulário (POST, PUT, GET por id)
│   └── img/
├── package.json
└── README.md
```

---

## Etapa 1 — Ambiente e teste da API (tag `v1.0`)

### O que fazer
1. Garantir que o JSON Server está instalado e funcional (reaproveitar ambiente da atividade anterior).
2. Trazer arquivos do projeto anterior **ou** criar a estrutura básica (`index.html`, `styles.css`, `app.js`, `img/`).
3. Garantir que o `db.json` tem o array da entidade principal com alguns registros de exemplo.
4. Configurar `package.json` com script para subir o JSON Server, por exemplo:
   ```json
   "scripts": {
     "start": "json-server --watch db/db.json --port 3000"
   }
   ```
5. **(Manual, fora do código)** Criar no Postman/Insomnia/Thunder Client uma coleção com requisições `GET`, `POST`, `PUT` e `DELETE` para a entidade principal e tirar **um print de cada teste** com o resultado aparente.

### Entregáveis Git
- Commit: mensagem sobre montagem do ambiente de desenvolvimento inicial.
- Tag:
  ```bash
  git tag -a v1.0 -m "chore: Testes da API para a estrutura [ENTIDADE]"
  ```

---

## Etapa 2 — CRUD dinâmico via JSON Server (tag `v2.0`)

### O que fazer

#### 2.1. Página de listagem (`index.html` + `app.js`)
- **READ (listar):** ao carregar a página, fazer `fetch('http://localhost:3000/[ENTIDADE]')` (GET) e renderizar a lista dinamicamente no DOM.
- **DELETE:** botão "Excluir" em cada item, que dispara `fetch(url, { method: 'DELETE' })` e atualiza a lista.
- **Botão "Editar"** em cada item, que navega para `cadastro_[ENTIDADE].html?id=<id>` (passagem de parâmetro via query string).
- **Botão "Novo cadastro"** que navega para `cadastro_[ENTIDADE].html` (sem id).

#### 2.2. Página de cadastro/edição (`cadastro_[ENTIDADE].html` + `cadastro.js`)
- Formulário HTML com os campos da entidade principal.
- **Validação no front-end** (campos obrigatórios, tipos, etc.).
- Ao carregar a página:
  - Ler o `id` da query string.
  - Se houver `id`: fazer `GET /[ENTIDADE]/<id>` e preencher o formulário (modo edição).
  - Se não houver: formulário vazio (modo cadastro).
- Ao submeter:
  - Sem `id` → `POST /[ENTIDADE]` (CREATE).
  - Com `id` → `PUT /[ENTIDADE]/<id>` (UPDATE).
- Após sucesso, redirecionar para `index.html`.

#### 2.3. Boas práticas
- Sempre enviar `Content-Type: application/json` nos `POST`/`PUT`.
- Tratar erros de rede com `try/catch` e exibir feedback ao usuário.
- Separar responsabilidades: HTML estrutura, CSS estilo, JS comportamento.
- Atualização dinâmica da DOM (não recarregar a página inteira após operações de DELETE).

#### 2.4. Prints obrigatórios
- Print da tela de **cadastro** mostrando o formulário e itens já inseridos.
- Print do **DevTools → aba Network** mostrando as requisições Fetch/XHR de `GET` e `POST` feitas pelo formulário, confirmando a inserção no `db.json`.

### Entregáveis Git
- Commit: mensagem sobre a mudança da dinâmica de consumo dos dados.
- Tag:
  ```bash
  git tag -a v2.0 -m "feat: dinâmica de CRUD para a [ENTIDADE] com JSONServer"
  ```

---

## Etapa 3 — Documentação (tag `v3.0`)

### O que fazer
Editar o `README.md` contendo:
- Nome do aluno / matrícula / disciplina.
- Descrição do projeto e da entidade principal.
- Estrutura de dados JSON da entidade (exemplo de objeto).
- Como rodar o projeto (instalação, comando para subir o JSON Server, abrir o front).
- **Todos os prints solicitados:**
  - Prints dos testes de API no Postman/Insomnia/Thunder Client (GET, POST, PUT, DELETE) — da Etapa 1.
  - Print do formulário de cadastro com itens inseridos — da Etapa 2.
  - Print do DevTools (aba Network) mostrando GET e POST — da Etapa 2.

### Entregáveis Git
- Commit: fechamento do trabalho e alteração da documentação.
- Tag:
  ```bash
  git tag -a v3.0 -m "docs: Alterações do README.md"
  ```
- Push final:
  ```bash
  git push origin main --tags
  ```

---

## Critérios de avaliação (checklist final)

- [ ] Estrutura organizada (pastas `db/`, `public/`).
- [ ] JSON Server configurado e API funcionando.
- [ ] Listagem e detalhes via Fetch funcionando.
- [ ] CRUD completo: Create, Read, Update, Delete.
- [ ] Navegação entre páginas com parâmetros via query string.
- [ ] Layout funcional, responsivo básico e visual agradável.
- [ ] Commits incrementais claros e tags `v1.0`, `v2.0`, `v3.0`.
- [ ] README completo, com prints e estrutura JSON da entidade.

---

## Notas para o agente de implementação

- **Não criar testes automatizados** — não é pedido. Os "testes" são manuais via Postman/Insomnia/Thunder Client (com prints).
- **JSON Server roda em `http://localhost:3000`** por padrão; o endpoint da entidade é `http://localhost:3000/[ENTIDADE]`.
- **A passagem de parâmetro entre listagem e cadastro é via query string** (`?id=<id>`), conforme critério de avaliação.
- **Os prints são responsabilidade do usuário** (executados manualmente no navegador/Postman); o agente apenas garante que o código permita gerá-los.
- **Não use frameworks** (React, Vue, etc.) — a atividade pede JavaScript vanilla com Fetch API.
- **Antes de iniciar a Etapa 1**, perguntar ao usuário qual é o nome da `[ENTIDADE]` e quais campos compõem a entidade, caso não estejam claros no projeto existente.
