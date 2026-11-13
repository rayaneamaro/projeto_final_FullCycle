# ADR 0001: Persistência local com SQLite

- Status: aceito
- Data: 2026-11-13

## Contexto

O Projeto B precisa persistir pedidos sem exigir um serviço externo para
subir a aplicação em uma máquina de avaliação.

## Decisão

Usaremos SQLite por meio de `better-sqlite3`, encapsulado em
`src/infrastructure/database.ts`. A aplicação usa uma separação simples em
três responsabilidades: o domínio cria o pedido, o serviço de aplicação
coordena o caso de uso e o repositório SQLite persiste e consulta os dados.
Esse é um padrão Repository, escolhido para isolar a persistência sem
introduzir um framework de aplicação. O arquivo pode ser configurado por
`DATABASE_FILE` e o volume do Compose preserva os dados.

## Consequências

A execução local é simples e determinística. SQLite atende o escopo de uma
API de domínio único; uma futura necessidade de alta concorrência exigiria
implementar outro repositório, mantendo o domínio e o serviço de aplicação.
