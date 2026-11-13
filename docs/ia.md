# Uso de IA

A IA foi usada nesta revisão para analisar o repositório, propor mudanças
pequenas e executar validações. As decisões finais foram revisadas e
assumidas pela autora.

## Prompts que contribuíram

- “O que corrigir, por prioridade: medir o p95 real, colocar o nível na
  primeira linha do README, listar prompts reais, corrigir a cardinalidade
  das métricas e melhorar ou documentar honestamente o design.”
  Esse foi um pedido de revisão da autora, não uma sugestão gerada pela IA.
  Usei `rg`/`view` para inspeção, `apply_patch` para as alterações e `bash`
  para build, testes, Docker Compose e k6.
- “O p95 precisa ser uma medição real; confira também se o better-sqlite3
  funciona no Alpine.”
  Esse segundo comentário da autora levou à execução de
  `docker compose up --build -d` e do smoke test com a imagem
  `grafana/k6`; o resultado foi registrado em [desempenho](desempenho.md).
- “Deixe o texto fiel ao que realmente aconteceu, inclusive qual ferramenta
  fez cada coisa.”
  Em resposta, removi prompts atribuídos indevidamente à IA e identifiquei
  as ferramentas usadas. Caso a conversa com Claude seja incluída na entrega,
  ela deve ser citada como uma fonte separada, com o prompt que realmente foi
  enviado e a alteração correspondente.
