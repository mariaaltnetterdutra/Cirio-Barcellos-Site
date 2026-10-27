# Instruções para o agente — site Círio & Barcellos

> Este arquivo é copiado para a raiz do projeto como `CLAUDE.md` (Claude Code) e `AGENTS.md`. Os arquivos de referência ficam na pasta `docs/`.

## Sobre o projeto

- Site da **Círio & Barcellos Seguros** (Canoas/RS): seguros, consórcio Porto Bank e soluções para imobiliárias.
- Projeto acadêmico de ADS (Maria Eduarda Dutra e Emily Cardoso) para uma empresa real.
- Projeto **começado do zero** em **Next.js (App Router) + React + TypeScript estrito + CSS Modules**. Depois ele vai conversar com um backend **NestJS** (API).
- **Guia visual: `docs/DESIGN.md`** — imagens, cores (bloco CSS pronto), fontes, medidas e o visual de cada parte. **Sempre siga esse arquivo.**
- **Protótipo: `docs/prototipo-v5.html`** — a referência de textos e layout. **Os textos do site devem ser copiados exatamente do protótipo.** Não invente textos novos.
- **Logo:** imagens em `docs/brand/`, copiadas para `public/brand/`.

## Regra de negócio mais importante

O atendimento da empresa é **sempre humano**. O site **nunca** pode ter chatbot, IA respondendo cliente ou mensagem automática para o cliente. Automação só no lado interno (protocolo, painel, avisos para a equipe).

## Arquitetura (projeto novo — seguir esta estrutura)

```
src/
  app/                 rotas (App Router). Páginas só montam seções, sem lógica.
    (site)/            páginas públicas
    painel/            área do corretor
  core/                httpClient, erros, logger, env, endpoints da API
  shared/
    components/ui/     botões, ícones, títulos (genéricos, sem regra de negócio)
    components/brand/  logo
    components/media/  espaço para foto
    components/layout/ SiteHeader, SiteFooter, Section
    constants/         dados da empresa, rotas, menu
    utils/ hooks/ domain/
  features/
    marketing/         páginas institucionais (home, seguros, consórcio, imobiliária)
    reviews/           avaliações do Google
    simulator/         formulário de cotação
    auth/ leads/       área do corretor
```

- Crie as pastas **só quando forem usadas** (nada de pasta vazia).
- Cada componente fica em sua pasta: `NomeDoComponente/NomeDoComponente.tsx` + `NomeDoComponente.module.css`.
- Textos de cada página ficam em um arquivo de conteúdo tipado da feature (ex.: `features/marketing/home/content.ts`), não espalhados no JSX.

## Padrões de Clean Code (obrigatórios)

1. **Uma responsabilidade por componente/função.** Componente com mais de ~150 linhas deve ser dividido.
2. **Nomes claros em inglês no código** (`HomeHero`, `formatPhone`); **textos para o usuário em português**.
3. **TypeScript estrito:** proibido `any`. Evite `as`; se for inevitável, comente o motivo.
4. **Sem estilos inline.** Todo estilo em CSS Modules. **Sem cores soltas (hex) nos módulos**: use só as variáveis de `globals.css`.
5. **Sem números e textos mágicos:** use constantes (`shared/constants`) ou o arquivo de conteúdo.
6. **Server Components por padrão.** Use `'use client'` só quando houver estado, evento ou efeito.
7. **Não duplique código.** Se algo se repete duas vezes, extraia um componente ou função.
8. **Sem código morto:** remova imports, componentes e estilos que deixarem de ser usados.
9. **Comentários explicam o porquê**, não o que o código faz.
10. **Estados de tela sempre tratados:** carregando, erro, vazio e sucesso.
11. **Acessibilidade:** HTML semântico (`header`, `nav`, `main`, `section`, `footer`), títulos em ordem (um `h1` por página), `alt` em imagens, foco visível, `aria-*` em menus e botões de ícone.
12. **Responsivo:** precisa funcionar em 390px (celular) sem rolagem lateral.
13. **Não instale bibliotecas novas sem perguntar.**

## Paleta (tokens em `src/app/globals.css`)

Resumo da paleta (os nomes exatos das variáveis estão no bloco CSS do `docs/DESIGN.md`):

| Cor | Valor | Uso |
|---|---|---|
| Azul-marinho | `#14213A` → `#20314F` | topo da home, bloco Porto Bank, rodapé |
| Azul-ardósia | `#1B2536` | seções escuras intercaladas |
| Azul-névoa | `#2A3E60` → `#34507A` | tabelinha +20 anos sobre o azul-marinho |
| Azul Círio | `#1C579A` | cards ao passar o mouse |
| Azul médio | `#2E6FB0` | ícones e links |
| Azul suave | `#DCEAFA` | fundos suaves azuis |
| Dourado | `#A9752E` | botão principal em fundo claro |
| Dourado claro | `#D8BA5A` | botão principal em fundo escuro |
| Dourado suave / tinta | `#F3E7CE` / `#6B4E1E` | selos e títulos pequenos |
| Branco | `#FFFFFF` | seções claras, cabeçalho, cards |
| Cinza-claro | `#F5F6F8` | seções claras intercaladas |
| Creme | `#F7F1E6` | chamadas finais |
| Textos | `#161A20` / `#5B6472` / `#8A93A0` | principal / secundário / apoio |
| Bordas | `#E1E5EA` / `#C4CBD4` | normal / forte |
| Degradê da logo | `#E8D26A` → `#1A6FF0` | só na logo |

Tipografia: **Fraunces** (títulos, peso 600) e **Public Sans** (textos, 400/600/700), via `next/font/google`. IBM Plex Mono só para protocolos.

O site tem **visual fixo claro com seções escuras intercaladas**; não depende do modo escuro do computador.

## Como trabalhar

- Faça **só a etapa pedida**. Não mexa em outras páginas.
- Antes de editar, **leia os arquivos envolvidos** e diga o plano em poucas linhas.
- Ao terminar, rode `npm run typecheck` e `npm run lint` e corrija os erros.
- No fim, responda com: arquivos criados/alterados, o que foi feito, e como testar no navegador.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
