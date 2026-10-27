# Guia visual — site Círio & Barcellos

Tudo o que o agente precisa para deixar o site **igual ao protótipo**: imagens, cores, fontes, medidas e o visual de cada parte.
O protótipo completo está em `docs/prototipo-v5.html` (abra no Chrome para ver).

---

## 1. Imagens

| Arquivo (em `docs/brand/`) | Copiar para | Tamanho real | Uso |
|---|---|---|---|
| `logo-simbolo.png` | `public/brand/logo-simbolo.png` | 149 × 168 | símbolo "CB" colorido (amarelo → azul) |
| `logo-nome.png` | `public/brand/logo-nome.png` | 518 × 120 | "Círio&Barcellos / Seguros" em **preto** (fundo claro) |
| `logo-nome-branco.png` | `public/brand/logo-nome-branco.png` | 518 × 120 | o mesmo nome em **branco** (fundo escuro) |

**Montagem da logo (horizontal):** símbolo + linha vertical + nome, com 12px entre eles.

| Parte | Tamanho na tela | Celular (até 380px) |
|---|---|---|
| Símbolo | 39 × 44 px | 33 × 37 px |
| Linha vertical | 2 × 44 px, cantos 2px, degradê de cima `#E8D26A` para baixo `#1A6FF0` | 2 × 37 px |
| Nome | 130 × 30 px | 112 × 26 px |

- Cabeçalho (fundo branco): nome preto.
- Rodapé e painel (fundo escuro): nome branco.

**Fotos que o cliente ainda vai mandar** (até lá, usar o componente de espaço reservado, com o texto abaixo):

| Onde | Texto do espaço reservado | Proporção |
|---|---|---|
| Home — topo | Foto da equipe Círio & Barcellos no escritório | 4/5 (16/10 no celular) |
| Home — atendimento humano | Foto real de atendimento com cliente | 5/4 |
| Consórcio — topo | Foto de arquitetura: casa contemporânea, interior ou obra em andamento | 4/5 |
| Consórcio — planos | Foto do imóvel (uma por plano: R$ 200, 300, 400, 500 e 600 mil) | 4/5 |
| Consórcio — especialista | Foto profissional da Priscila | 4/5 |
| Imobiliária | Foto de condomínio ou fachada de imóvel | 5/4 |
| Logo Porto Bank | Logo Porto Bank (versão normal e versão clara) | — |

---

## 2. Cores (copiar este bloco para `src/app/globals.css`)

```css
:root {
  /* fundos claros */
  --color-white: #ffffff;        /* seções claras, cabeçalho, cards */
  --color-gray-50: #f5f6f8;      /* seções claras intercaladas */
  --color-cream: #f7f1e6;        /* chamadas finais */

  /* textos */
  --color-text: #161a20;         /* títulos e texto principal */
  --color-text-2: #5b6472;       /* descrições */
  --color-text-3: #8a93a0;       /* textos de apoio */

  /* bordas */
  --color-line: #e1e5ea;
  --color-line-strong: #c4cbd4;

  /* azuis */
  --color-navy: #14213a;         /* azul-marinho (início do degradê) */
  --color-navy-2: #20314f;       /* azul-marinho (fim do degradê) */
  --color-navy-mid: #1a2944;     /* meio do degradê do topo da home */
  --color-slate: #1b2536;        /* azul-ardósia: seções escuras */
  --color-mist: #2a3e60;         /* azul-névoa (início) */
  --color-mist-2: #34507a;       /* azul-névoa (fim) */
  --color-blue-deep: #1c579a;    /* azul Círio: card com mouse em cima */
  --color-blue: #2e6fb0;         /* azul médio: ícones e links */
  --color-blue-soft: #dceafa;    /* azul suave: fundos de selo, avatar */

  /* dourados (só em botões principais e títulos pequenos) */
  --color-gold: #a9752e;         /* botão principal em fundo claro */
  --color-gold-light: #d8ba5a;   /* botão principal em fundo escuro */
  --color-gold-soft: #f3e7ce;    /* fundo de selo dourado */
  --color-gold-ink: #6b4e1e;     /* eyebrow (título pequeno) em fundo claro */
  --color-gold-ink-light: #e2c77a; /* eyebrow em fundo escuro */
  --color-on-gold: #1b1204;      /* texto dentro do botão dourado */

  /* textos em fundo escuro */
  --color-on-dark: #f5f6f8;
  --color-on-dark-2: rgba(241, 242, 244, 0.74);
  --color-on-dark-line: rgba(255, 255, 255, 0.14);

  /* avisos */
  --color-success: #2f855a;
  --color-success-soft: #dbf0e4;
  --color-danger: #b42318;

  /* logo */
  --color-logo-yellow: #e8d26a;
  --color-logo-blue: #1a6ff0;
}
```

**Tom escuro de seção (azul-ardósia).** Uma classe que só troca as variáveis; tudo dentro dela se adapta:

```css
.tone-slate {
  --color-bg: #1b2536;
  --color-surface: #243044;      /* cards dentro da seção escura */
  --color-text: #eef1f5;
  --color-text-2: #b6bfcd;
  --color-text-3: #8b96a9;
  --color-line: #313e54;
  --color-line-strong: #4a5870;
  --color-gold: #d8ba5a;
  --color-gold-ink: #ecd28f;
  --color-blue: #8dbdf0;
  --color-blue-soft: #283c5c;
  background: var(--color-bg);
  color: var(--color-text);
}
```

**Degradês usados:**

| Nome | CSS |
|---|---|
| Topo da home | `linear-gradient(135deg, #14213A 0%, #1A2944 55%, #20314F 100%)` |
| Rodapé, bloco Porto Bank, login | `linear-gradient(135deg, #14213A, #20314F)` |
| Tabelinha +20 anos (azul-névoa) | `linear-gradient(135deg, #2A3E60 0%, #34507A 100%)` |
| Brilho do topo da home | círculo de 460px, `radial-gradient(circle, rgba(216,186,90,.26), transparent 70%)`, no canto de cima à direita |
| Linha da logo | `linear-gradient(#E8D26A, #1A6FF0)` |

**Regras de uso das cores:**
- O site tem **visual fixo**: não muda com o modo escuro do computador.
- Seções escuras e claras **se intercalam** (nunca duas escuras grandes seguidas).
- Dourado **só** em botões principais e títulos pequenos.
- Em cima do azul-marinho, caixas e cards usam o **azul-névoa**; azul vivo só em ícones e links.
- O degradê amarelo → azul é **só** da logo.

---

## 3. Fontes

| Uso | Fonte | Peso | Como carregar |
|---|---|---|---|
| Títulos (h1, h2), números em destaque | **Fraunces** | 600 | `next/font/google` |
| Textos, botões, formulários | **Public Sans** | 400, 600, 700 | `next/font/google` |
| Protocolos e códigos | **IBM Plex Mono** | 500 | `next/font/google` |

| Elemento | Tamanho |
|---|---|
| Texto padrão | 15.5px, altura de linha 1.6 |
| h1 da home | fluido de 32px a 50px (`clamp(32px, 4.8vw, 50px)`), altura 1.08, máx. 17 caracteres por linha |
| h2 de seção | `clamp(26px, 3.4vw, 36px)`, máx. 22 caracteres por linha |
| Lead (texto abaixo do título) | 16.5px (17px no topo da home), cor texto 2, máx. 62 caracteres por linha |
| Eyebrow (título pequeno em cima) | 12px, peso 700, MAIÚSCULAS, espaçamento 0.12em, cor dourado tinta |
| h3 de card | Public Sans 16px, peso 700 |

Títulos com `text-wrap: balance`.

---

## 4. Medidas

| Item | Valor |
|---|---|
| Largura máxima do conteúdo | 1080px (cabeçalho e rodapé: 1180px) |
| Margem lateral | 28px (16px em telas até 640px) |
| Espaço vertical das seções | 72px (52px até 640px) |
| Espaço entre título da seção e conteúdo | 40px |
| Cantos | botão 9px · card 14px · cartões grandes 16–18px · selo/pílula 999px |
| Sombra de card | `0 1px 2px rgba(22,26,32,.05), 0 16px 34px -20px rgba(22,26,32,.25)` |
| Foco (teclado) | contorno dourado de 2px, afastado 2px |
| Pontos de quebra | 900px · 860px (menu vira hambúrguer) · 820px · 760px · 640px · 560px · 480px · 380px |

---

## 5. Componentes (como cada um deve parecer)

**Botões**
- Principal: fundo dourado, texto `#1B1204`, peso 700, 14.5px, padding 13px 22px, cantos 9px. Em fundo escuro usa o dourado claro. No mouse: brilho 1.07.
- Contorno: fundo transparente, borda `--color-line-strong`, texto da cor atual.
- Contorno claro (em fundo escuro): borda `rgba(255,255,255,.32)`, texto claro.

**Card com hover (soluções, seguros, objetivos do consórcio)**
- Branco, borda `--color-line`, cantos 14px, padding 26px 24px, ícone azul médio 28px, título 16px, texto 14px cinza.
- Mouse em cima ou foco: fundo **azul Círio `#1C579A`**, borda igual, textos e ícone **brancos**, sombra `0 18px 36px -20px rgba(28,87,154,.6)`.
- Transição de **0,35s** (o azul-claro aparece só durante a transição).
- O card inteiro é clicável.

**Cabeçalho**
- Branco, borda de baixo, fixo no topo. Logo à esquerda, menu à direita: Sobre · Seguros · Consórcio · Imobiliária · Contato (14px, peso 600, cinza; página atual escura com sublinhado dourado 2px a 8px do texto).
- **Sem** botão "Simular agora" e **sem** "Avaliações".
- Até 860px: botão de menu 42×42 com borda e cantos 9px; links em coluna.

**Rodapé**
- Degradê azul-marinho, texto claro, 4 colunas: logo + frase · Contato · Institucional · Navegue. Títulos das colunas 11.5px MAIÚSCULAS.
- Linha final: "© 2026 Círio & Barcellos Assessoria e Seguros" e link "Área do corretor".
- Dados a confirmar (CNPJ, SUSEP, CEP): selo "a confirmar" com borda tracejada dourada `#E2C77A`.
- **Sem** botão "Simular meu seguro".

**Topo da home (hero)**
- Degradê do topo + brilho dourado. Padding 76px em cima e 116px embaixo (para a tabelinha subir por cima).
- Duas colunas (1.15fr texto / 0.85fr foto, espaço 56px). Uma coluna até 820px.
- Espaço da foto: tom escuro, borda tracejada clara, cantos 18px.

**Tabelinha de números (+20 anos)**
- Sobe 56px por cima do topo. Largura máx. 920px, cantos 16px.
- **Fundo azul-névoa** (degradê), borda `rgba(255,255,255,.14)`, sombra `0 22px 42px -20px rgba(4,10,25,.7)`, **textos brancos**.
- 3 colunas com linhas `rgba(255,255,255,.16)`; número Fraunces 28px; legenda 13px branca com 82% de opacidade.
- Até 640px: uma coluna.

**Espaço reservado de foto**
- Borda tracejada 1.5px, cantos 18px, fundo `linear-gradient(160deg, #E6EDF6, #F5F6F8)` (claro) ou `rgba(255,255,255,.08) → .02` (escuro), ícone de imagem, texto 12.5px peso 700, selo "AGUARDANDO FOTO".

**Avaliações do Google (só no fim da home)**
- Fundo cinza-claro. À esquerda eyebrow "Avaliações no Google" + título; à direita cartão branco com a nota grande (Fraunces 42px), 5 estrelas douradas, "312 avaliações no Google" e link "Ver todas no Google →".
- Cards: círculo 40px com a inicial (fundo azul suave, letra azul Círio), nome 14.5px, tempo 13px, estrelas, texto entre aspas, "Avaliação publicada no Google" no rodapé do card.

---

## 6. Ordem das seções da tela inicial

| # | Seção | Fundo |
|---|---|---|
| 1 | Cabeçalho | branco |
| 2 | Topo (hero) | degradê azul-marinho |
| 3 | Tabelinha de números | azul-névoa (por cima do topo) |
| 4 | Soluções (`id="solucoes"`) | cinza-claro |
| 5 | Atendimento humano | azul-ardósia |
| 6 | Avaliações do Google | cinza-claro |
| 7 | Rodapé (`id="contato"`) | degradê azul-marinho |

Os textos de cada seção estão no protótipo e no arquivo de prompts (Etapa 8). **Copiar exatamente.**
