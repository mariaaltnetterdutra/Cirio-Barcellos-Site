# API — Círio & Barcellos (V1)

Backend da landing de consórcio. Fica na pasta `api/` do repositório do site, com dependências próprias.

## O que faz (V1)

- `POST /leads`: recebe o formulário da landing, valida, gera o protocolo (`CB-2026-7K4QZ`) e salva no **MongoDB**.
- Avisa a equipe por email a cada pedido novo (T32).
- `GET /health`: confirma que a API está no ar.

**Regra de negócio:** o atendimento é sempre humano. A API **nunca** responde o cliente automaticamente; o email é só para a equipe.

## Stack

NestJS 11 · Mongoose (`@nestjs/mongoose`) · class-validator · @nestjs/config · @nestjs/throttler · helmet · Jest.

## Regras de Clean Code (backend)

- Módulos por funcionalidade (`leads/`, `health/`, `mail/`).
- Controller fino: só recebe e devolve. Regra de negócio no service. Acesso ao banco **só** no repository.
- DTOs com class-validator e mensagens em português. Valores das opções em `leads.constants.ts` (iguais aos do site).
- TypeScript estrito, sem `any`. Erros tratados pelo `AllExceptionsFilter` (nunca mostrar detalhes internos).
- Logs com o `Logger` do Nest. Nenhum segredo no código: tudo no `.env` (que não vai para o git).
- Cada regra importante com teste (`*.spec.ts`).
