# Desempenho

O SLO declarado para o fluxo `POST /orders` é **p95 menor que 300 ms** em
ambiente local Docker, com uma carga smoke de 10 VUs por 10 segundos.

O teste abaixo mede o p95 diretamente no k6:

```bash
k6 run tests/smoke.js
```

O teste exige `http_req_duration p(95)<300` e verifica status `201`. O
endpoint `/metrics` expõe `http_requests_total` e
`http_request_duration_seconds` para acompanhamento.

## Medição realizada

Medição realizada em **13/11/2026**, em uma máquina Linux com **2 vCPUs
AMD EPYC 7763**, usando Docker Compose e k6, pelo comando equivalente ao
teste do repositório:

```text
p(95)=14,57 ms
```

O teste executou 12.794 requisições com 10 VUs durante 10 segundos; todas as
verificações passaram e o p95 ficou abaixo do SLO de 300 ms.
