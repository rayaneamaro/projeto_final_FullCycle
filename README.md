# Projeto final Full Cycle 
## Nível escolhido: Projeto B (API de pedidos)

[![CI](https://github.com/rayaneamaro/projeto_final_FullCycle/actions/workflows/ci.yml/badge.svg)](https://github.com/rayaneamaro/projeto_final_FullCycle/actions/workflows/ci.yml)

API REST de domínio único para criar e consultar pedidos. A aplicação usa
TypeScript, Express e SQLite, com validação de entrada, logs estruturados,
métricas Prometheus e um fluxo completo coberto por testes.

## Requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose (opcional)

## Executar localmente

```bash
cp .env.example .env
npm install
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

## Executar com Docker Compose

```bash
docker compose up --build
```

## Endpoints principais

- `POST /orders` - cria um pedido
- `GET /orders/:id` - consulta um pedido
- `GET /health` - health check
- `GET /metrics` - métricas Prometheus

Exemplo:

```bash
curl -X POST http://localhost:3000/orders \
  -H 'content-type: application/json' \
  -d '{"customerName":"Rayane","items":[{"description":"Livro","quantity":2,"unitPrice":49.9}]}'
```

## Qualidade

```bash
npm test
npm run lint
npm run coverage
```

O pipeline declara e verifica cobertura mínima de **80%** para linhas,
funções, branches e statements.

## Documentação

- [ADR 0001](docs/adr/0001-persistencia-sqlite.md)
- [OpenAPI](docs/openapi.yaml)
- [Desempenho](docs/desempenho.md)
- [Uso de IA](docs/ia.md)
- [Contributors](CONTRIBUTORS.md)
