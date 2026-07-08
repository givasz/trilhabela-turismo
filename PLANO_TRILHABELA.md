# PLANO DE PROJETO — TRILHABELA TURISMO (Landing Page React)

> **Instrução para o Claude Code:** Este documento é a fonte única de verdade do projeto. Leia tudo antes de escrever qualquer código. Os dados de passeios, preços e vantagens foram extraídos do material oficial do cliente e **não podem ser alterados, arredondados ou resumidos**.
>
> **Skills obrigatórias:** Se as skills estiverem disponíveis no ambiente, invoque `/frontend-design` antes de começar o front e rode `/web-design-guidelines` nos arquivos finais como auditoria. Se não estiverem, siga rigorosamente as seções 5 (Direção de Design) e 12 (Checklist de qualidade de UI) deste documento, que resumem as mesmas diretrizes.

---

## 1. Contexto do negócio

- **Nome:** TRILHABELA TURISMO — "Expedições de Trilhas"
- **O que faz:** Agência de ecoturismo em Ilhabela/SP. Trilhas guiadas, travessias, passeios de barco, jeep 4x4, mergulho e observação de baleias.
- **Diferenciais (usar na copy):**
  - Guia principal e fundador: **Ernani Sousa**, 30+ anos morando em Ilhabela, 22 anos como monitor ambiental cadastrado no PEIB (Parque Estadual de Ilhabela).
  - Membro honorário na Fundação Florestal, Parque Estadual de Ilhabela e Caminho da Mata Atlântica.
  - Guias treinados, kits de primeiros socorros, conformidade com normas de conservação ambiental.
- **Site atual (usar como base e MELHORAR):** https://trilhabela.com.br/
- **Contato/WhatsApp:** (12) 99122-6986 → `https://wa.me/5512991226986`
- **Redes:** Instagram e Facebook: `@trilhabela`
- **Avaliações:** Perfil do Google Meu Negócio: https://share.google/f3ROMey5zGupNHRdj (extrair depoimentos reais de lá para a seção de avaliações; enquanto não houver integração, usar os depoimentos provisórios da seção 9).

## 2. Objetivo da página (modelo de conversão)

**O site NÃO vende direto.** O cliente quer **captar leads qualificados via WhatsApp**:

1. Usuário escolhe um passeio.
2. Preenche um **formulário** com: `Nome`, `Telefone`, `Produto escolhido`, `Data de interesse`, `Nº de pessoas`.
3. Botão envia direto pro **WhatsApp do dono** com mensagem pré-formatada contendo esses dados.
4. O dono entra em contato já sabendo o que a pessoa precisa.

**Regra de ouro:** TODO card de passeio precisa ter um CTA que leva ao formulário (com o produto pré-selecionado) ou direto ao WhatsApp com o nome do passeio na mensagem.

### Formato da mensagem do WhatsApp (URL-encoded)
```
Olá! Vim pelo site da Trilhabela 🌴
*Nome:* {nome}
*Telefone:* {telefone}
*Passeio:* {produto}
*Data de interesse:* {data}
*Nº de pessoas:* {pessoas}
```
URL: `https://wa.me/5512991226986?text={mensagem_encodada}`

## 3. Público-alvo

- Idade 25 a 60 anos, todos os gêneros.
- Região: Brasil inteiro (turistas indo a Ilhabela).
- Acesso predominantemente **mobile** → mobile-first obrigatório.

---

## 4. ⚠️ MODELO DE PREÇOS — LEIA COM ATENÇÃO (regra central do negócio)

A maioria dos passeios usa **preço por pessoa que DIMINUI conforme o tamanho do grupo**. O valor mostrado **não é o total do grupo** — é o que **cada pessoa** paga, definido pela quantidade total de pessoas:

### Tabela PADRÃO (vale para os passeios marcados como "tabela padrão")

| Tamanho do grupo | Cada pessoa paga | Total do grupo |
|---|---|---|
| 1 pessoa | R$ 500 | R$ 500 |
| 2 pessoas | R$ 400 (por pessoa) | R$ 800 |
| 3 pessoas | R$ 300 (por pessoa) | R$ 900 |
| 4 ou mais pessoas | R$ 250 (por pessoa) | 4 × R$ 250 = R$ 1.000, 5 × R$ 250 = R$ 1.250, e assim por diante |

**Exemplos para não ter dúvida:**
- 2 amigos fazem a Trilha do Bonete → cada um paga R$ 400 → total R$ 800.
- Família de 5 no Tour Sensacional → cada um paga R$ 250 → total R$ 1.250.
- Uma pessoa sozinha no Pico do Baepi → paga R$ 500.

### Outras tabelas que seguem a MESMA lógica (preço por pessoa cai com o grupo)

- **Tabela cachoeiras** (Circuito Água Branca, Cachoeira do Bananal, Cachoeira da Friagem):
  1 = R$ 400 | 2 = R$ 300/pessoa | 3 = R$ 250/pessoa | 4+ = R$ 200/pessoa
- **Travessia das 6 Praias (guiamento):**
  1 = R$ 1.500 | 2 = R$ 1.200/pessoa | 3 = R$ 1.000/pessoa | 4+ = R$ 800/pessoa

### Passeios de preço FIXO por pessoa (não muda com o grupo)

Baleias R$ 300 · Barco Bonete–Indaiaúba R$ 300 · Escuna R$ 160 · Mergulho Livre R$ 250 · Mergulho com Cilindro R$ 500 · Barco p/ Castelhanos R$ 350 · Mar–Terra R$ 300 · Terra–Mar R$ 300 · Jeep 4x4 R$ 150 · Lanchas: a consultar.

### Como exibir isso na UI (obrigatório)

1. **No card do passeio:** mostrar "a partir de R$ 250/pessoa" (o menor valor da tabela) com selo "grupos pagam menos".
2. **No detalhe/modal do passeio:** mostrar a tabela completa de 4 linhas, com a coluna "por pessoa" em destaque.
3. **No formulário:** ao selecionar o passeio e o nº de pessoas, calcular e exibir em tempo real:
   `"{N} pessoas × R$ {valor_por_pessoa} = R$ {total} no total"`.
4. Implementar isso como função pura em `src/utils/pricing.js`:

```js
// Retorna o preço POR PESSOA de acordo com o tamanho do grupo
export function precoPorPessoa(tabela, pessoas) {
  // tabela ex.: { 1: 500, 2: 400, 3: 300, "4+": 250 }  (padrão)
  if (pessoas >= 4) return tabela["4+"];
  return tabela[pessoas];
}
export const total = (tabela, pessoas) => precoPorPessoa(tabela, pessoas) * pessoas;
```

---

## 5. 🎨 DIREÇÃO DE DESIGN — "Expedição Premium" (front incrível e único)

> Meta: um front que NÃO pareça template. Quem abrir tem que sentir cheiro de mata e vontade de reservar. Comprometa-se 100% com esta direção e execute com precisão. Nada de estética genérica de IA: proibido Inter/Roboto/Arial/system fonts, proibido gradiente roxo em fundo branco, proibido layout de template de agência.

### 5.1 Conceito

**"Diário de expedição noturno"** — dark-mode permanente em preto/azul-marinho profundo (céu de Ilhabela à noite), rasgado por amarelo-sol e dourado. A página conta uma jornada: você "entra na trilha" no hero e vai descendo pela ilha até o convite final no WhatsApp. Luxo de aventura: rústico nos detalhes (texturas, carimbos, traços de mapa), refinado na execução (espaçamento, tipografia, motion).

**A coisa inesquecível:** uma **linha de trilha pontilhada em SVG** (como rota de mapa, igual à arte da Travessia das 6 Praias do cliente) que percorre a página inteira verticalmente, conectando as seções, e vai sendo "desenhada" conforme o scroll (stroke-dashoffset animado via scroll progress). Marcos da trilha (ícones de pegada/farol/onda) acendem em amarelo quando a seção entra na viewport.

### 5.2 Tipografia (caracterful, nada genérico)

- **Display (títulos):** uma slab/condensed com personalidade de expedição — sugestões: `Clash Display`, `Archivo Black` ou `Bricolage Grotesque` (pesos altos, tracking apertado, uppercase nos H1/H2).
- **Acento manuscrito (pouquíssimo uso):** `Caveat` ou similar para anotações tipo "vale cada vista!" sobre fotos — remete aos carimbos "Eu Fui!!!" do material do cliente.
- **Corpo:** uma sans humanista legível e elegante (ex.: `Sora` ou `Albert Sans`), 16–18px, line-height 1.6.
- Carregar via Google Fonts/Fontshare com `font-display: swap` e preload.

### 5.3 Cor (CSS variables — dominante + acento afiado)

```css
:root {
  --ink: #0A0E14;        /* preto-noite (fundo dominante) */
  --navy: #11233F;       /* azul-marinho do logo (cards, camadas) */
  --sun: #FFC400;        /* amarelo do logo (CTAs, marcos da trilha) */
  --gold: #C9A227;       /* dourado (selo premium, bordas, detalhes) */
  --sand: #F4EBD6;       /* areia (texto sobre escuro, respiros claros) */
  --jungle: #143D2B;     /* verde-mata (tags de nível, detalhes) */
  --wa: #25D366;         /* exclusivo do botão WhatsApp */
}
```
Regras: fundo quase sempre `--ink`/`--navy`; `--sun` reservado para CTAs e a linha da trilha (escassez = impacto); `--gold` só na seção da Travessia (produto premium) e microdetalhes; texto em `--sand`, nunca branco puro.

### 5.4 Atmosfera e texturas (nada de fundo chapado)

- Grain/noise sutil (SVG `feTurbulence` ou PNG 2–3% opacity) sobre o fundo inteiro.
- Topografia: linhas de curva de nível em SVG, bem sutis, atrás dos títulos de seção.
- Fotos com tratamento: leve vinheta + overlay `--navy` multiply para unificar as fotos reais do cliente (qualidades variadas).
- Bordas de "selo/carimbo" (border dashed dourada + cantos recortados) no card da Travessia.
- Divisórias de seção orgânicas: silhuetas de mata/montanha em SVG (clip-path), não linhas retas.

### 5.5 Layout & composição (quebrar o grid com intenção)

- **Hero:** foto fullscreen de Ilhabela com gradiente para `--ink`; headline display gigante (clamp 2.5–6rem) levemente rotacionada (-1°); selo circular do logo girando devagar (animation 30s linear) no canto; a linha da trilha "nasce" aqui.
- **Travessia (destaque):** seção assimétrica — texto à esquerda, colagem de 3 fotos sobrepostas com rotações leves (estilo polaroids de expedição) à direita; faixa dourada "TICKET ALTO · 2 DIAS · 6 PRAIAS"; tabela de preços própria.
- **Grade de passeios:** cards com foto bleed no topo, número de ordem grande estilo editorial ("01", "02"...), hover que levanta o card e revela a tabela de preço; categorias como chips-carimbo filtráveis.
- **Tabela de preços por grupo:** visual de "quanto mais gente, menor o preço" — barras decrescentes animadas ou stepper interativo de pessoas que atualiza o valor ao vivo (este componente É um argumento de venda; capriche).
- **Avaliações:** cards estilo recorte de caderno com estrelas douradas e aspas display gigantes.
- Alternar densidade: seções cheias (grade) intercaladas com respiros de negative space + uma frase manuscrita.

### 5.6 Motion (alto impacto, poucos momentos)

- **Page load:** reveal orquestrado do hero com stagger (headline → sub → CTA → selo), 600–800ms total, easing `cubic-bezier(0.16,1,0.3,1)`.
- **Scroll:** a linha da trilha desenhando (requestAnimationFrame + scroll progress); fade-up sutil dos cards (IntersectionObserver, uma vez só).
- **Micro:** CTA WhatsApp com pulso suave a cada ~6s; hover dos cards com foto dando zoom 1.05 lento; marcos da trilha acendendo.
- Framer Motion permitido, mas preferir CSS quando der. **Respeitar `prefers-reduced-motion`** (desligar trilha animada e parallax).
- Proibido: parallax pesado, animação em loop chamativa, qualquer coisa que derrube o Lighthouse.

### 5.7 O que NÃO fazer

- Nada de hero com gradiente roxo, glassmorphism genérico, emojis como ícones de UI, cards todos iguais com sombra padrão do Tailwind, carrossel automático de depoimentos, fontes do sistema.
- Não usar verde-água/teal dos flyers antigos do cliente — a marca nova é amarelo/preto/dourado.

## 6. Stack técnica

- **React + Vite** (SPA, navegação por âncoras; React Router só se criar página por passeio na v2).
- **Tailwind CSS** + CSS variables da seção 5.3 (config estendendo as cores).
- Framer Motion (opcional) para o reveal do hero; resto em CSS/IntersectionObserver.
- Sem backend: o formulário monta a URL do `wa.me` e abre em nova aba. Validação client-side.
- Imagens: WebP, `loading="lazy"` (exceto hero com `fetchpriority="high"`), `srcset` responsivo.
- SEO: title, meta description, Open Graph, schema.org `LocalBusiness`/`TouristTrip`.
- Botão flutuante de WhatsApp fixo (canto inferior direito) em todas as seções.

## 7. Arquitetura da página (ordem das seções)

1. **Header fixo** — logo + nav (Passeios, Travessia 6 Praias, Preços, Sobre, Avaliações, Contato) + CTA "Reservar pelo WhatsApp".
2. **Hero** — conforme 5.5.
3. **⭐ DESTAQUE — Travessia das 6 Praias (PEDIDO ESPECIAL DO CLIENTE)** — logo após o hero, visual dourado premium, com TODAS as vantagens inclusas e CTA forte. Dados na seção 8.1.
4. **Grade de passeios** — filtros: `Trilhas`, `Cachoeiras`, `Barco & Mar`, `Mergulho`, `4x4`, `Baleias`. Card: foto, nome, duração, nível, "a partir de R$ X/pessoa", botão "Reservar".
5. **Seção "Quanto mais gente, menor o preço"** — componente interativo do modelo de preços (seção 4).
6. **Sobre / Quem guia você** — Ernani Sousa, credenciais PEIB, segurança.
7. **Avaliações** — depoimentos + estrelas + botão "Ver todas no Google".
8. **Formulário de reserva** — especificação na seção 10.
9. **FAQ curto** — ponto de encontro ("a combinar com o guia pelo WhatsApp"), pagamento (parcelamento em até 10x no cartão), o que levar, política de clima.
10. **Footer** — logo, contato, redes, links, nota de privacidade de dados.

## 8. CATÁLOGO COMPLETO DE PASSEIOS (dados oficiais — usar exatamente assim)

> "Tabela padrão" = 1 → R$ 500 | 2 → R$ 400/pessoa | 3 → R$ 300/pessoa | 4+ → R$ 250/pessoa (ver seção 4).
> Em todos: **Ponto de encontro: a combinar com o guia pelo WhatsApp.**

### 8.1 ⭐ Travessia Bonete – Castelhanos ("Travessia das 6 Praias") — PRODUTO DESTAQUE / TICKET ALTO
- **Pedido do cliente: destacar no topo da página.**
- Trekking de **2 dias**, percurso total **30 km** (1º dia: 14 km, 5–6h de caminhada / 2º dia: 16 km, 7–8h), com **pernoite na Praia do Bonete**. Circuito das 6 praias, trilha de nível alto, indicada para aventureiros com experiência. Em Castelhanos, traslado de volta para a cidade em Jipes Offroad.
- **Nível:** Difícil (pessoas experientes).
- **Pacote completo incluso (escrever exatamente estas vantagens):**
  - Guiamento
  - 02 hospedagens
  - Traslado em Jipes
  - Seguro Aventura
  - Equipamentos de Segurança (Bastão de caminhada + Perneiras)
  - Imagens de alta resolução
- **Valor do guiamento por pessoa:** 1 pessoa → R$ 1.500 | 2 pessoas → R$ 1.200 cada | 3 pessoas → R$ 1.000 cada | 4+ pessoas → R$ 800 cada.
- **Incluso (material original):** cajado, perneira, seguro aventura. **Não incluso: alimentação.**

### 8.2 Observação de Baleias e Cetáceos — R$ 300/pessoa (fixo)
- Avistamento de baleias & cetáceos em embarcação **Flexboat 760, capacidade até 24 pessoas**, com equipamentos de salvatagem e primeiros socorros em dia, incluindo remédios para enjoo.
- **A bordo:** sucos em três sabores (uva, laranja e pêssego), Coca-Cola normal e zero, água à vontade e frutas (banana e maçã — ajudam a evitar enjoo e náusea).
- **Guia e biólogo Pedro**, fluente em inglês e espanhol, à disposição dos clientes.
- **Horários:** duas saídas por dia — 1ª: 10:00 às 13:00–13:30 | 2ª: 14:00 às 17:00–17:30. Duração: 3h a 3h30.

### 8.3 Cachoeira Couro do Boi — tabela padrão
- Queda d'água de **45 metros**, hidromassagem natural (águas caem nos degraus e correm por uma rampa). Trilha com pontos confusos, escorregadios e mata fechada — guia credenciado necessário.
- **Tempo:** ~3h | **Nível:** Difícil (adultos).

### 8.4 Barco (Flexboat) Bonete – Indaiaúba — R$ 300/pessoa (fixo)
- Navegação pelo lado sul de Ilhabela, passando pelo imponente **Buraco do Cação** e parada de **1h na paradisíaca Praia de Indaiaúba**, com destino à mágica Praia do Bonete.
- **Tempo:** ~6h | **Nível:** Fácil (todas as idades).

### 8.5 Passeio de Escuna — R$ 160/pessoa (fixo; descontos para crianças)
- Navegação por **7 praias paradisíacas**, com paradas exclusivas na **Praia da Fome e Jabaquara**. Águas cristalinas e a energia única do Pirata a bordo.
- **Tempo:** ~6h de passeio completo | **Nível:** Fácil (todas as idades).

### 8.6 Tour Incrível — tabela padrão
- Extremo sul de Ilhabela, indicado para toda a família: **Cachoeira da Laje, Lago Dourado e o imponente Buraco do Cação**.
- **Tempo:** ~6h | **Nível:** Médio (crianças e adultos).

### 8.7 Tour Sensacional — tabela padrão
- Atrativos naturais mais cobiçados do lado sul: **Piscina Natural, Prainha Secreta, Porto São Pedro, Prainha das Conchas e a famosa Cachoeira Paquetá** (tobogã natural que deságua numa piscina de borda infinita com vista para o mar).
- **Tempo:** ~6h | **Nível:** Médio (crianças e adultos).

### 8.8 Mergulho Livre (Flutuação) — R$ 250/pessoa (fixo)
- Na **Ilha das Cabras**, zona do "Santuário Ecológico da Ilha das Cabras", rica em fauna e flora marinha extremamente preservadas. Um barquinho leva até o outro lado do canal; ~1h ao lado da ilhota. Para toda a família.
- **Tempo:** ~1h | **Nível:** Fácil (todas as idades).

### 8.9 Mergulho com Cilindro (Discovery Scuba Dive) — R$ 500/pessoa (fixo)
- Na Ilha das Cabras (Santuário Ecológico). Duração de **1h30**: 30 min de explicação teórica, 10 min de treinamento equipado em superfície (para perder a sensação de claustrofobia) e em média **50 min debaixo d'água**. **Fotos com câmera GoPro (brinde).**
- **Tempo na água:** ~1h | **Nível:** Médio (adultos).

### 8.10 Lanchas Exclusivas — valores a consultar
- Diversas opções de embarcações para curtir com a família. Roteiros **Sul, Norte e Leste** de Ilhabela.
- **Tempo:** a consultar | **Nível:** Fácil (todas as idades). *Consultar modelos e valores.* (CTA: "Consultar no WhatsApp")

### 8.11 Barco para Castelhanos — R$ 350/pessoa (fixo)
- Opção tranquila que rende mais tempo de praia. Visuais incríveis com breves paradas nas **praias da Fome e Eustáquio**, permanecendo em **Castelhanos até as 16h**.
- **Tempo:** ~5h30 | **Nível:** Fácil (todas as idades).

### 8.12 Mar – Terra Castelhanos — R$ 300/pessoa (fixo)
- Ida de barco rodeando a ilha com paradas de 30 min nas praias da **Fome e Saco do Eustáquio**; tempo de praia em Castelhanos; **volta em Jeep 4x4 pelo interior da Mata Atlântica**.
- **Tempo:** ~5h30 | **Nível:** Fácil (todas as idades).

### 8.13 Terra – Mar Castelhanos — R$ 300/pessoa (fixo)
- Ida em passeio radical pelo interior de Ilhabela passando por diversas **cachoeiras, torres de observação de pássaros e mirantes incríveis**; praia durante o dia; **volta de barco contemplando o pôr do sol no mar**.
- **Tempo:** ~5h30 | **Nível:** Fácil (todas as idades).

### 8.14 Jeep 4x4 para Castelhanos — R$ 150/pessoa (fixo)
- A Praia de Castelhanos ("Castê"), considerada uma das mais bonitas do Brasil e do mundo. Travessia do Parque Estadual no sentido oeste→leste em veículos **offroad**, com breves paradas em **cachoeiras e mirante** para contemplação e fotos.
- **Tempo:** ~6h | **Nível:** Fácil (todas as idades).

### 8.15 Circuito Cachoeiras (Água Branca) — tabela cachoeiras (400/300/250/200)
- **5 atrativos naturais** na cachoeira da Água Branca, acesso pela Guarita do Parque Estadual. Na volta, **Cachoeira da Antiga Usina** e **Parque das Cachoeiras**.
- **Tempo:** 4h a 5h | **Nível:** Médio (crianças e adultos).

### 8.16 Trilha da Praia da Fome — tabela padrão
- Saindo da Praia do Jabaquara (extremo norte), trilha de difícil acesso com várias bifurcações e mata fechada até a belíssima **Praia da Fome**. Diversas nascentes de água no caminho; possível avistar ilhotas, Caraguatatuba e São Sebastião.
- **Tempo:** ~5h (ida e volta) | **Nível:** Difícil (adultos).
- **Opcionais:** transporte de veículo até Jabaquara: R$ 100 | traslado de volta até Jabaquara: R$ 100.

### 8.17 Trilha do Bonete — tabela padrão
- Imersão na Mata Atlântica preservada rumo à mágica **Praia do Bonete**, passando por **3 belíssimas cachoeiras** com paradas para banho e lanche nas 2 primeiras (**Laje e Areado**). Mirante de tirar o fôlego para fotos e vídeos inesquecíveis.
- **Tempo:** ~6h | **Nível:** Médio (adultos).
- **Opcional:** R$ 100 — traslado de volta em pequenas embarcações.

### 8.18 Trilha do Pico do Baepi — tabela padrão
- A única montanha oferecida pelo **PEIB (Parque Estadual de Ilhabela)** para amantes do montanhismo. Percurso de **7 km (ida e volta)** com altimetria de **850 m**, chegando a **1.040 m** no Pico do Baepi. Vista panorâmica do canal entre Ilhabela e São Sebastião, ilhotas, Ilha de Alcatrazes, cidades vizinhas e serra do mar. Trecho de sapezal e Floresta Ombrófila densa, com fauna e flora presentes.
- **Tempo:** ~6h | **Nível:** Difícil (adultos).

### 8.19 Trilha de Castelhanos — tabela padrão
- Pela estrada-parque de Castelhanos, ~4h de percurso incluindo **atalhos caiçaras**, sentido oeste/leste. Várias cachoeiras, floresta única de Mata Atlântica e mirantes. No **Mirante de Castelhanos**, parada para lanche, descanso e contemplação.
- **Tempo:** ~4h | **Nível:** Difícil (adultos).
- **Opcional:** traslado de volta em Jipes 4x4 — R$ 100/pessoa.

### 8.20 Cachoeira do Bananal — tabela cachoeiras (400/300/250/200)
- Também conhecida como **Cachoeira do Quilombo**. Belíssimas paisagens no interior da Mata Atlântica. Na década de 70, era usada para escoar a produção de banana das fazendas (daí o nome). Ótima trilha para observar pássaros e outros animais — árvores frutíferas atraem diversas espécies.
- **Tempo:** ~5h | **Nível:** Médio (crianças e adultos).

### 8.21 Cachoeira da Friagem — tabela cachoeiras (400/300/250/200)
- Escondida na Mata Atlântica preservada, queda quase inteiramente reta. A água cai diretamente nas pedras — atenção com o piso escorregadio.
- **Tempo:** ~3h | **Nível:** Médio (crianças e adultos).

## 9. Avaliações (conteúdo provisório — substituir pelos do Google depois)

Depoimentos reais do site atual (manter tom, podem ser resumidos):
1. "Fomos acompanhados pelo guia Ernani durante a travessia do Bonete para Castelhanos, um trajeto difícil e incrivelmente lindo. Nosso guia foi super atencioso e responsável, nos auxiliando durante todo o trajeto!"
2. "Optei pelo Tour Sensacional… Adorei!! As fotos ficaram divinas. O guia Ernani foi muito atencioso e nos presenteou com fotos e vídeos. Super recomendo!"
3. "Optamos pelo passeio de Barco para Praia do Bonete e foi maravilhoso. Passamos pelo Buraco do Cação… Na volta vimos golfinhos. Foi mágico."
4. "O melhor guia de Ilhabela! Levou minha família pra conhecer o que tem de mais bonito na ilha."
5. "O guia é TOP! Fui no circuito de cachoeiras e adorei!!! Na próxima quero fazer mergulho."

Botão: **"Ver avaliações no Google"** → https://share.google/f3ROMey5zGupNHRdj

## 10. Formulário de reserva (especificação)

Campos (todos obrigatórios):
- **Nome** (text)
- **Telefone** (tel, máscara BR `(00) 00000-0000`)
- **Passeio** (select — listar TODOS os passeios da seção 8; se o usuário clicou em "Reservar" num card, vir pré-selecionado)
- **Data de interesse** (date, mínimo = hoje)
- **Nº de pessoas** (stepper, ≥ 1)
- **Cálculo ao vivo:** ao mudar passeio ou nº de pessoas, mostrar `"{N} pessoas × R$ {por_pessoa} = R$ {total}"` usando `pricing.js` (seção 4). Para preço fixo: `"{N} × R$ {fixo} = R$ {total}"`. Para Lanchas: "valores sob consulta".
- Botão: **"Enviar pelo WhatsApp"** (cor `--wa`, ícone) → abre `wa.me` com a mensagem da seção 2 (testar encoding de acentos/emoji).

Microcopy abaixo do botão:
- "A solicitação será avaliada quanto à disponibilidade e condições climáticas. Nossa equipe retorna em até 24h."
- "O WhatsApp é nossa principal fonte de comunicação; caso não tenha, retornaremos por ligação (DDD 12 — Ilhabela/SP)."

## 11. SEO & conteúdo

- Title: `Trilhabela Turismo — Trilhas, Travessias e Passeios em Ilhabela`
- Description: agência de ecoturismo com guia credenciado PEIB; trilhas, cachoeiras, barco, 4x4, mergulho e observação de baleias em Ilhabela.
- Headings com: "trilhas em Ilhabela", "travessia Bonete Castelhanos", "passeio de barco Ilhabela", "Pico do Baepi", "Praia de Castelhanos", "observação de baleias Ilhabela".
- Schema.org: `LocalBusiness` + `TouristTrip` por passeio (opcional na v1). OG image: foto hero com logo.

## 12. Checklist de qualidade de UI (auditar com /web-design-guidelines no final)

Acessibilidade e UX que NÃO podem falhar (resumo das Web Interface Guidelines — se a skill estiver disponível, rode `/web-design-guidelines src/**/*.jsx` ao final e corrija tudo):

- [ ] Contraste AA mínimo (atenção: amarelo sobre areia NÃO passa; amarelo sobre `--ink` passa).
- [ ] Todo input com `<label>` associado; erros de validação anunciados (`aria-describedby`), não só cor.
- [ ] Foco visível customizado (outline dourado), navegação 100% por teclado, ordem de tab lógica.
- [ ] Áreas de toque ≥ 44×44px (mobile-first!); hover nunca é o único caminho para informação (a tabela de preços que aparece no hover do card precisa estar também no modal/detalhe).
- [ ] `alt` descritivo em todas as fotos; ícones decorativos com `aria-hidden`.
- [ ] `prefers-reduced-motion` respeitado em todas as animações.
- [ ] Imagens com width/height definidos (zero CLS); fontes com preload + swap.
- [ ] Links externos (WhatsApp, Google) com `rel="noopener"` e `target="_blank"`.
- [ ] Semântica: `<header> <main> <section> <nav> <footer>`, headings hierárquicos (um único h1).
- [ ] Estados: loading/disabled no botão do formulário; mensagem de erro amigável se campos faltarem.

## 13. Requisitos não-funcionais / critérios de aceite

- [ ] Mobile-first; perfeito em 360px; desktop até 1440px.
- [ ] Lighthouse: Performance ≥ 90 / A11y ≥ 90 / SEO ≥ 90.
- [ ] Todos os 21 passeios presentes, com preços e vantagens EXATOS da seção 8.
- [ ] Lógica de preço por grupo implementada e exibida conforme seção 4 (card → "a partir de"; detalhe → tabela completa; formulário → cálculo ao vivo).
- [ ] Travessia das 6 Praias em destaque no topo, antes da grade geral.
- [ ] Todos os CTAs levam ao formulário ou ao WhatsApp com produto identificado.
- [ ] Botão flutuante de WhatsApp sempre visível.
- [ ] A "linha da trilha" animada por scroll funcionando (e desativada com reduced-motion).
- [ ] Direção de design da seção 5 seguida fielmente — sem estética genérica.
- [ ] Imagens em placeholders organizados por passeio (`/public/tours/<slug>/`) para troca pelas fotos reais.
- [ ] Sem dependência de backend.

## 14. Estrutura de pastas sugerida

```
src/
  components/
    Header.jsx, Hero.jsx, TrailLine.jsx, FeaturedTravessia.jsx, TourGrid.jsx,
    TourCard.jsx, TourModal.jsx, GroupPricing.jsx, About.jsx, Reviews.jsx,
    BookingForm.jsx, FAQ.jsx, Footer.jsx, WhatsAppFloat.jsx
  data/
    tours.js        // TODOS os passeios da seção 8 como objetos:
                    // { id, slug, nome, categoria, descricao, duracao, nivel,
                    //   preco: { tipo: 'tabela'|'fixo'|'consulta', tabela?, valor? },
                    //   opcionais[], inclusos[], naoInclusos[], fotos[] }
  utils/
    pricing.js      // precoPorPessoa() e total() — seção 4
    whatsapp.js     // monta a URL wa.me com a mensagem formatada
  App.jsx, main.jsx, index.css
public/
  logo.png
  tours/<slug>/*.jpg
```

## 15. Fora do escopo da v1

- Pagamento online / checkout (cliente não quer venda direta).
- Painel administrativo.
- Integração automática com API do Google Reviews (v2; na v1 os depoimentos são estáticos).
- Domínio/hospedagem (tratar depois; sugerir Vercel/Netlify para a prévia de 48h).
