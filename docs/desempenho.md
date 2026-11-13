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
teste do repositório. Como o binário `k6` não estava instalado no host, o
comando exato executado foi:

```text
docker run --rm --network projeto_final_fullcycle_default \
  -v "$PWD/tests:/scripts:ro" -e BASE_URL=http://api:3000 \
  grafana/k6 run /scripts/smoke.js
```

O teste executou **12.122 requisições** com 10 VUs durante 10 segundos. Todas
as verificações passaram; o resultado medido foi **p(95)=15,61 ms**, abaixo
do SLO de 300 ms.
