# Problema de Negocio

O projeto "Mundo Tour" exibe lugares turísticos de forma estática. Não é possível cadastrar, editar ou remover lugares pelo navegador — qualquer alteração exige editar o `db.json` manualmente. A atividade prática das Semanas 16/17 exige implementar o CRUD completo consumindo a API do JSON Server via Fetch API.

# Objetivo

Implementar as operações Create, Read, Update e Delete para a entidade `lugares` com HTML + CSS + JavaScript vanilla e Fetch API, respeitando os critérios de avaliação da disciplina (commits incrementais, tags `v1.0`, `v2.0`, `v3.0`, README com prints).

# Escopo

- Listagem dinâmica de lugares via `GET /lugares` ao carregar `index.html`
- Botão "Excluir" em cada card da listagem → `DELETE /lugares/:id` → remove o card do DOM sem recarregar a página
- Botão "Editar" em cada card → navega para `cadastro_lugar.html?id=<id>`
- Botão "Novo Cadastro" global → navega para `cadastro_lugar.html` sem query string
- Página `cadastro_lugar.html` com formulário para os campos: `nome`, `descricao`, `conteudo`, `localizacao`, `categoria`, `destaque`, `data`, `imagemPrincipal`
- Modo edição: ao carregar com `?id=<id>`, preenche o formulário via `GET /lugares/:id`
- Modo cadastro: ao carregar sem query string, formulário vazio
- Submit do formulário: `POST /lugares` (sem id) ou `PUT /lugares/:id` (com id)
- Validação front-end nos campos obrigatórios: `nome`, `descricao`, `localizacao`
- Feedback visual de erro ao usuário em caso de falha na requisição
- Redirecionamento para `index.html` após sucesso no POST ou PUT
- `Content-Type: application/json` em todas as requisições POST e PUT
- Tratamento de erros com `try/catch` em todas as chamadas Fetch
- Atualização dinâmica do DOM após DELETE (sem recarregar a página)
- Commit inicial + tag `v1.0` com mensagem `"chore: Testes da API para a estrutura lugares"`
- Commit do CRUD + tag `v2.0` com mensagem `"feat: dinâmica de CRUD para lugares com JSONServer"`
- `README.md` completo + tag `v3.0` + `git push origin main --tags`

# Nao Escopo

- Testes automatizados (unitários ou de integração) — os testes são manuais pelo usuário no Postman/Insomnia
- Uso de frameworks JavaScript (React, Vue, Angular, etc.)
- CRUD da entidade `experiencias` — somente `lugares` é o alvo
- Autenticação ou controle de acesso
- Upload real de arquivos de imagem — `imagemPrincipal` é um campo de texto com caminho da imagem
- Paginação ou busca/filtro
- Testes no Postman/Insomnia — esses prints são de responsabilidade do usuário e executados manualmente
- Modificação de `detalhes.html` — a página de detalhe existente não é alterada
- Deploy em servidor externo

# Criterios de Aceite

- Ao abrir `index.html` com o JSON Server rodando, os cards de lugares são renderizados via Fetch sem conteúdo HTML estático pré-existente na `div#cards-container`
- Ao clicar em "Excluir" em qualquer card, o JSON Server retorna status 200 e o card é removido da lista na tela sem recarregar a página
- Ao clicar em "Editar" em qualquer card, o navegador navega para `cadastro_lugar.html?id=<id>` e o formulário é preenchido com os dados do lugar correspondente
- Ao clicar em "Novo Cadastro", o navegador navega para `cadastro_lugar.html` sem parâmetro `id` e o formulário é exibido vazio
- Ao submeter o formulário de novo cadastro com os campos obrigatórios preenchidos, o JSON Server recebe um `POST /lugares` com `Content-Type: application/json` e retorna status 201; o usuário é redirecionado para `index.html`; o novo lugar aparece na listagem
- Ao submeter o formulário de edição com dados alterados, o JSON Server recebe um `PUT /lugares/:id` com `Content-Type: application/json` e retorna status 200; o usuário é redirecionado para `index.html`; as alterações aparecem no card correspondente
- Ao submeter o formulário de cadastro com campo obrigatório vazio (`nome`, `descricao` ou `localizacao`), uma mensagem de erro é exibida na página e nenhuma requisição é enviada ao JSON Server
- Quando o JSON Server está offline, a tentativa de DELETE ou submit do formulário exibe uma mensagem de erro na tela (não apenas no console)
- O repositório git possui commits com as mensagens e tags `v1.0`, `v2.0`, `v3.0` na ordem correta
- O arquivo `README.md` contém as seções: nome do aluno/matrícula/disciplina, descrição do projeto, estrutura JSON da entidade, instrução de como rodar, e espaços para os prints

# Riscos e Dependencias

- O JSON Server precisa estar rodando em `http://localhost:3000` — sem ele, nenhuma operação Fetch funciona; o usuário é responsável por rodar `npm start` antes de testar
- O repositório git precisa estar inicializado antes de criar commits e tags — verificar com `git status` na Tarefa T-1
- O `app.js` existente já tem funções de Fetch (GET, GET por id, carousel, cards) que devem ser aproveitadas e não duplicadas; a Tarefa T-2 estende esse arquivo
- A estrutura de pastas usa `public/assets/js/` para scripts — novos arquivos JS devem seguir esse padrão
- Bootstrap 5 já está sendo usado via CDN — manter consistência visual com as classes já usadas em `index.html` e `detalhes.html`
- O campo `destaque` é boolean — o formulário deve usar `<input type="checkbox">` e converter para `true`/`false` ao serializar

# Estrategia de Testes

- criterio: Cards renderizados via Fetch ao carregar index.html
  testes:
    - level: manual
      behavior: Abrir index.html com JSON Server rodando e verificar que os cards aparecem; abrir sem JSON Server e verificar mensagem de erro

- criterio: DELETE remove card do DOM sem reload
  testes:
    - level: manual
      behavior: Clicar em Excluir em qualquer card e verificar que o card desaparece sem recarregar a página; confirmar no db.json que o registro foi removido

- criterio: Editar preenche formulário com dados corretos
  testes:
    - level: manual
      behavior: Clicar em Editar em um card, verificar URL com ?id=<id>, verificar que o formulário está preenchido com os dados do lugar

- criterio: POST cria novo lugar
  testes:
    - level: manual
      behavior: Abrir cadastro_lugar.html sem id, preencher todos os campos obrigatórios, submeter e verificar redirecionamento para index.html com o novo card aparecendo

- criterio: PUT atualiza lugar existente
  testes:
    - level: manual
      behavior: Abrir cadastro_lugar.html?id=<id>, alterar o nome, submeter e verificar que o card na listagem reflete o nome atualizado

- criterio: Validação bloqueia submit com campo obrigatório vazio
  testes:
    - level: manual
      behavior: Deixar o campo nome vazio e submeter — verificar mensagem de erro e ausência de requisição no DevTools → Network

# Decisoes de Logica e Comportamento

- O `app.js` existente já tem as funções `fetchLugares`, `fetchLugarById`, `buildCarousel`, `buildCards` e `getQueryParam` — a Tarefa T-2 adiciona DELETE e botões de ação dentro de `buildCards`, sem reescrever as demais funções
- `buildCards` deve ser refatorado para incluir os botões "Excluir" e "Editar" no `card-footer` de cada card; o botão "Novo Cadastro" é adicionado na seção `#lugares` do `index.html`
- A função de DELETE deve usar `fetch(url, { method: 'DELETE' })` e, no sucesso, remover o elemento `col` pai do botão clicado do DOM
- O `cadastro.js` é um arquivo separado do `app.js` — responsabilidade única: lógica do formulário
- A URL base da API é `http://localhost:3000` — manter constante `API_URL` já declarada em `app.js`; `cadastro.js` declara sua própria constante local
- O campo `destaque` usa `<input type="checkbox">` — ao serializar, converter `checkbox.checked` para boolean
- O campo `data` usa `<input type="date">` — o valor já vem no formato YYYY-MM-DD, compatível com o db.json
- Ao receber erro de rede, exibir `<div class="alert alert-danger">` já presente no Bootstrap (não usar alert nativo do browser)
- A navegação de volta para `index.html` após POST/PUT usa `window.location.href = 'index.html'`

# Contexto Tecnico Descoberto

- Projeto: "Mundo Tour" — listagem de lugares e atrações turísticas
- Entidade principal: `lugares` com campos id, nome, descricao, conteudo, localizacao, categoria (enum textual), destaque (boolean), data (YYYY-MM-DD), imagemPrincipal (path string)
- Entidade relacionada: `experiencias` (lugarId FK) — somente leitura, não faz parte do CRUD
- JSON Server: `^0.17.4`, porta 3000, script `"start": "json-server --watch db/db.json --static public --port 3000"` já configurado
- db.json: 6 registros de `lugares` e 17 de `experiencias` já populados
- Frontend: Bootstrap 5.3.3 + Bootstrap Icons 1.11.3 via CDN; arquivo `public/assets/css/style.css` existente
- `public/assets/js/app.js` já existe com funções de Fetch e renderização dinâmica — precisa ser estendido com botões CRUD
- `public/index.html`: estrutura completa com seções hero (carousel), listagem (`div#cards-container` vazio), sobre e footer — já referencia `app.js`
- `public/detalhes.html`: página de detalhe existente — não deve ser modificada
- Repositório git: ainda não inicializado — `git init` é o primeiro passo da Tarefa T-1
- Não existe `LOCAL-AGENT.md` nem `.agents/workflow/discovery.md`

# Open Questions

- O usuário não informou nome, matrícula e disciplina para o README — ao executar T-4, perguntar ao usuário antes de escrever o README ou deixar placeholder
- O repositório remoto (GitHub) ainda não existe — ao executar T-4, confirmar com o usuário a URL do remote antes de `git push`
- O campo `imagemPrincipal` no formulário é texto livre (path) ou o usuário quer um select com as imagens existentes em `assets/img/`? Assumido como texto livre por ora
