# Uso de IA

A IA foi usada para estruturar a implementação inicial da API, sugerir a
organização dos artefatos do Projeto B e revisar casos de validação.

As decisões finais, incluindo o domínio de pedidos, SQLite, o SLO de p95 e
os limites de entrada, foram revisadas e assumidas pela autora.

## Prompts que contribuíram

- “Implemente uma API REST de pedidos em TypeScript com Express e SQLite,
  incluindo validação de entrada, logs estruturados, métricas Prometheus e
  testes automatizados.”
  A sugestão foi ajustada para manter o domínio pequeno, usar `better-sqlite3`
  e expor apenas os endpoints necessários para o Projeto B.
- “Revise a API procurando problemas de observabilidade e cardinalidade nas
  métricas.”
  A sugestão foi alterada para usar `req.route?.path` como rótulo e buckets
  explícitos, incluindo `0.3` segundo para o SLO.
- “Separe o caso de uso da persistência sem adicionar um framework.”
  A sugestão foi aplicada como um serviço de aplicação e um Repository
  baseado em funções, preservando a simplicidade do projeto.
