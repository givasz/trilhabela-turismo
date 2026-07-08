# Trilhabela Turismo — Landing Page

Landing page de captação de leads via WhatsApp para a **Trilhabela Turismo** (ecoturismo em Ilhabela/SP).
Construída conforme o `PLANO_TRILHABELA.md` (fonte única de verdade).

## Stack
- React 18 + Vite 5
- Tailwind CSS 3 (tema "Expedição Premium" — preto/azul-marinho + amarelo/dourado)
- Framer Motion (apenas no reveal do hero)
- Sem backend: o formulário monta a URL do `wa.me` e abre o WhatsApp.

## Rodar localmente
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
npm run preview  # serve o build de produção
```

## Estrutura
```
src/
  components/   # Header, Hero, TrailLine, FeaturedTravessia, TourGrid/Card/Modal,
                # GroupPricing, About, Reviews, BookingForm, FAQ, Footer, WhatsAppFloat
  data/         # tours.js (21 passeios), pricingTables.js
  utils/        # pricing.js (preço por grupo), whatsapp.js (monta URL wa.me)
  hooks/        # useReveal.js (fade-up por IntersectionObserver)
public/
  logo.jpg
  photos/       # cachoeira / mergulho / praia / trilha (fotos reais do cliente)
```

## Onde trocar conteúdo
- **Passeios, preços e vantagens:** `src/data/tours.js` (dados oficiais da seção 8 do plano).
- **Tabelas de preço por grupo:** `src/data/pricingTables.js`.
- **Número do WhatsApp:** `src/utils/whatsapp.js` (`WHATSAPP_NUMERO`).
- **Fotos:** substituir os arquivos em `public/photos/` (mesmos nomes) por fotos reais de cada passeio.
  Para fotos por passeio, criar `public/tours/<slug>/` e apontar `foto`/`fotos` em `tours.js`.
- **Avaliações:** `src/components/Reviews.jsx` (provisórias; trocar pelas do Google na v2).

## Deploy (prévia)
Vercel ou Netlify — preset "Vite". Build command `npm run build`, output `dist`.
```bash
npx vercel        # ou: arraste a pasta /dist no Netlify Drop
```
