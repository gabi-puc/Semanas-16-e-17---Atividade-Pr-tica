# Business Objective

Implementar CRUD completo da entidade `lugares` no projeto "Mundo Tour" consumindo a API do JSON Server via Fetch API, conforme exigido na atividade prática das Semanas 16 e 17 da disciplina.

# Summary

O projeto "Mundo Tour" já possui estrutura de front-end com Bootstrap 5, JSON Server configurado e `app.js` com funções de GET e renderização dinâmica. O que falta é a camada de escrita (POST, PUT, DELETE) e a página de formulário de cadastro/edição, além de um repositório git inicializado e README completo.

**Estado atual:**
- `public/assets/js/app.js` — existe, tem GET e renderização; falta DELETE e botões de ação
- `public/index.html` — existe com estrutura Bootstrap e placeholders vazios para os cards
- `public/detalhes.html` — existe, não deve ser modificada
- `db/db.json` — 6 registros de `lugares` e 17 de `experiencias` já populados
- `package.json` — script `start` com json-server já configurado
- `node_modules/` — dependências instaladas

**O que não existe ainda:**
- `public/cadastro_lugar.html` — formulário de cadastro/edição
- `public/assets/js/cadastro.js` — lógica de POST, PUT, GET por id
- DELETE e botões Editar/Novo Cadastro em `app.js`
- Repositório git (não inicializado)
- `README.md`

# Affected Areas

- `public/assets/js/app.js` — extensão de buildCards() para botões CRUD e função deleteLugar()
- `public/index.html` — adição de botão Novo Cadastro na seção de listagem
- `public/cadastro_lugar.html` — arquivo novo, formulário completo
- `public/assets/js/cadastro.js` — arquivo novo, lógica de formulário
- `.gitignore` — novo, para excluir node_modules/
- `README.md` — novo, documentação completa
- `db/db.json` — mutado em runtime pelo JSON Server (POST/PUT/DELETE); não há alteração de schema

# Open Questions

- Nome completo do aluno, matrícula, nome da disciplina e URL do repositório GitHub ainda não informados (necessários para T-4/README)
- O campo `imagemPrincipal` no formulário deve ser texto livre ou select com imagens existentes? Assumido texto livre

# Confidence

alta — todos os arquivos foram lidos, a stack é bem definida (HTML/CSS/JS vanilla + Bootstrap 5 + JSON Server), e o app.js existente serve como base clara para as extensões necessárias.

# Recommendation

Implementar em 4 tarefas sequenciais: T-1 (git init + v1.0), T-2 (DELETE + botões), T-3 (formulário + v2.0), T-4 (README + v3.0 + push). Nenhuma tarefa tem dependência externa além do JSON Server rodando localmente.
