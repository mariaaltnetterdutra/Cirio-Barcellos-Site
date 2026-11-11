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

## Comandos

| Comando | O que faz |
|---|---|
| `npm run start:dev` | roda com recarga automática |
| `npm run typecheck` | confere os tipos |
| `npm test` | roda os testes |
| `npm run build` | gera a versão de produção em `dist/` |
