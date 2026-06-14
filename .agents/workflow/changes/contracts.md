# Contract Changes

## Entry Template

### YYYY-MM-DD - T-1

- changed_surface: dto | api | event | schema | none
- compatibility: backward-compatible | breaking | n-a
- migration: none
- rollback: none
- impact: Replace with the impact summary.
- files:
  - path/to/file

## Entries

### 2026-06-14 - T-3

- changed_surface: api
- compatibility: backward-compatible
- migration: none
- rollback: Remover os registros inseridos via POST diretamente do db.json
- impact: >
    A entidade `lugares` passa a receber escritas via POST e PUT pelo front-end.
    O `db.json` é mutado em runtime pelo JSON Server.
    Nenhuma alteração no schema — os campos existentes são mantidos.
    A entidade `experiencias` não é alterada.
- files:
  - db/db.json
  - public/assets/js/cadastro.js
  - public/cadastro_lugar.html
