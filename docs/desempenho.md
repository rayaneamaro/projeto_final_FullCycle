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
