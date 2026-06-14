# Progress Log

## Entry Template

### YYYY-MM-DD

- actor: planning | execution | review
- task: T-1 | n-a
- status_from: todo
- status_to: in_progress
- branch: task/t-1-short-slug
- worktree: ../wt-repo-t-1
- summary: Replace with a concise summary.
- validation:
  - cmd: Replace with the command.
    result: pass | fail | not-run
- blockers:
  - none
- next_action: Replace with the next action.

## Entries

### 2026-06-14

- actor: planning
- task: n-a
- status_from: n-a
- status_to: n-a
- branch: n-a
- worktree: n-a
- summary: >
    PRD e tasks criados para o projeto "Mundo Tour" — CRUD de lugares com JSON Server.
    4 tarefas planejadas: T-1 (git init + tag v1.0), T-2 (DELETE + botões na listagem),
    T-3 (formulário cadastro_lugar.html + cadastro.js + tag v2.0), T-4 (README + tag v3.0 + push).
    Contexto: app.js já existe com GET e renderização; faltam DELETE, formulário e documentação.
    Decisão de fatiamento: T-2 e T-3 separadas pois são arquivos distintos e PRs independentes;
    tag v2.0 só é criada no final de T-3 quando o CRUD está completo.
- validation:
  - cmd: python3 /home/oli/.claude/skills/_workflow-kit/scripts/validate_workflow.py /home/oli/Documentos/trabalho-pratico
    result: not-run
- blockers:
  - Repositório git ainda não inicializado (descoberto durante o planejamento — T-1 trata isso)
  - Nome do aluno, matrícula e URL do GitHub não informados — bloqueadores para T-4 (não para T-1/T-2/T-3)
- next_action: Executar T-1 com `#task-exec T-1`
