# API Círio & Barcellos

## 1. Banco de dados (MongoDB) — escolha uma opção

**Opção A — MongoDB Atlas (na nuvem, grátis, recomendado)**
1. Crie uma conta em mongodb.com/atlas e um cluster gratuito (M0).
2. Em *Database Access*, crie um usuário e senha.
3. Em *Network Access*, libere o seu IP.
4. Em *Connect → Drivers*, copie a string `mongodb+srv://...` e cole no `MONGODB_URI` do `.env`, com `/cirio-barcellos` antes do `?`.

**Opção B — MongoDB no seu computador**
1. Instale o *MongoDB Community Server* (e o *Compass*, para ver os dados).
2. Use `MONGODB_URI=mongodb://127.0.0.1:27017/cirio-barcellos`.

## 2. Rodar a API

```bash
cd api
npm install
copy .env.example .env      # no Windows (no Mac/Linux: cp .env.example .env)
npm run start:dev
```

Teste: abra http://localhost:3001/health → `{"status":"ok"}`.

## 3. Enviar um pedido de teste

```bash
curl -X POST http://localhost:3001/leads -H "Content-Type: application/json" -d "{\"nome\":\"Maria Teste\",\"whatsapp\":\"51999998888\",\"objetivo\":\"imovel\",\"valorCredito\":300000,\"prazoMeses\":180,\"consentimento\":true,\"origem\":{\"pagina\":\"/\",\"utmSource\":\"google\",\"gclid\":\"teste\"}}"
```

Resposta: `{"protocolo":"CB-2026-XXXXX","criadoEm":"..."}`. O pedido aparece na coleção `leads` (Compass ou Atlas).

## 4. Email para a equipe

A cada pedido novo a API manda um email para a equipe (nunca para o cliente) com o protocolo, as respostas, a origem do anúncio e um link que abre o WhatsApp do cliente já com a mensagem pronta.

- **Sem configurar nada** (desenvolvimento): o texto do email aparece no terminal onde a API roda.
- **Para enviar de verdade**: preencha `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` e `MAIL_TO` no `.env` (exemplos no `.env.example`). Em produção eles são obrigatórios e a API não sobe sem eles.
- Se o email falhar, o pedido continua salvo (`emailEnviado` fica `false` no banco) e o erro vai para o log.

## 5. Painel de pedidos (equipe)

O site tem a página `/painel`, onde a equipe vê os pedidos, busca, filtra e muda o status do atendimento. A API protege essas rotas com uma **senha única da equipe**:

1. No `.env`, preencha `ADMIN_PASSWORD` (10+ caracteres) e `ADMIN_TOKEN_SECRET` (32+ caracteres aleatórios; gere com `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`). Vazios = painel desligado; em produção são obrigatórios.
2. `POST /admin/login` com `{ "senha": "..." }` devolve um token que vale 8 horas. As outras rotas pedem `Authorization: Bearer <token>`.
3. `GET /admin/leads?busca=&status=&objetivo=&pagina=&limite=` devolve a página de pedidos, o total e quantos há em cada status. `PATCH /admin/leads/:protocolo` com `{ "status": "EM_ATENDIMENTO" }` muda o status (`NOVO`, `EM_ATENDIMENTO`, `PROPOSTA`, `FECHADO`, `PERDIDO`).
4. O login aceita 5 tentativas por minuto por endereço. Na hospedagem, configure o proxy para a API enxergar o IP real de quem acessa.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run start:dev` | roda com recarga automática |
| `npm run typecheck` | confere os tipos |
| `npm test` | roda os testes |
| `npm run build` | gera a versão de produção em `dist/` |
