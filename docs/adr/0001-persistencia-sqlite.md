# ADR 0001: Persistência local com SQLite

- Status: aceito
- Data: 2026-11-13

## Contexto

O Projeto B precisa persistir pedidos sem exigir um serviço externo para
subir a aplicação em uma máquina de avaliação.

## Decisão

Usaremos SQLite por meio de `better-sqlite3`, encapsulado em
`src/infrastructure/database.ts`. O arquivo pode ser configurado por
`DATABASE_FILE` e o volume do Compose preserva os dados.

## Consequências

A execução local é simples e determinística. SQLite atende o escopo de uma
API de domínio único; uma futura necessidade de alta concorrência exigiria
migrar o adaptador para PostgreSQL sem alterar o domínio.
