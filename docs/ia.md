# Uso de IA

Escolhi o Projeto B porque era o nível que eu conseguia entregar melhor no
prazo. Usei IA como apoio, mas as decisões do projeto foram minhas.

## GitHub Copilot

Usei o GitHub Copilot como guia durante a construção: ele gerou a estrutura
inicial da API de pedidos (TypeScript, Express e SQLite) e aplicou as
correções depois da análise descrita abaixo. Não tenho registro dos prompts
que enviei ao Copilot, então não os reproduzo aqui. A medição de p95 com o
k6, registrada em [desempenho](desempenho.md), foi executada pelo Copilot
no ambiente dele, com Docker Compose.

## Claude (chat)

Usei o Claude para analisar o repositório contra a rubrica. Colei o texto dos
slides do encontro 24, enviei o link do meu repositório e pedi "analisa de
novo" a cada versão.

O que o Claude apontou: p95 sem medição, nível fora da primeira linha do
README, rótulo de rota da métrica com cardinalidade alta, falta de camada de
serviço e `ia.md` genérico.

- **Apliquei:** medição do p95, nível na primeira linha, rótulo da métrica
  com `req.route?.path`, bucket de 0,3 s, camada de serviço com Repository,
  ADR atualizado e este arquivo.
- **Não apliquei:** documentar `/health` e `/metrics` no OpenAPI, mais testes
  de domínio e o tratamento de rotas inexistentes nas métricas.

O Claude também gerou uma versão alternativa do projeto (API de tarefas) que
não usei.

## Validação

Conferi o resultado pela execução verde da CI (install, lint, test e
coverage).
