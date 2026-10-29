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
curl -X POST http://localhost:3001/leads -H "Content-Type: application/json" -d "{\"nome\":\"Maria Teste\",\"whatsapp\":\"51999998888\",\"objetivo\":\"imovel\",\"valor\":\"300a500\",\"prazo\":\"1a3\",\"consentimento\":true,\"origem\":{\"pagina\":\"/\",\"utmSource\":\"google\",\"gclid\":\"teste\"}}"
```

Resposta: `{"protocolo":"CB-2026-XXXXX","criadoEm":"..."}`. O pedido aparece na coleção `leads` (Compass ou Atlas).

## Comandos

| Comando | O que faz |
|---|---|
| `npm run start:dev` | roda com recarga automática |
| `npm run typecheck` | confere os tipos |
| `npm test` | roda os testes |
| `npm run build` | gera a versão de produção em `dist/` |
