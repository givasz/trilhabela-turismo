import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { IconChevron } from './icons.jsx'
import { LINKS_UTEIS } from '../data/links.js'

const linkCls = 'font-600 text-accent underline underline-offset-2 hover:text-gold'

const ITENS = [
  {
    q: 'Onde é o ponto de encontro?',
    a: 'O ponto de encontro é combinado com o guia pelo WhatsApp, de acordo com o passeio escolhido e onde você está hospedado em Ilhabela.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: (
      <>
        Para reservar, é necessário o pagamento de 50% do valor total do produto como sinal; os
        outros 50% são pagos no check-in, ao iniciar o passeio. Parcelamos em até 10x no cartão,
        aceitamos Pix e você também pode pagar pela nossa{' '}
        <a href={LINKS_UTEIS.loja} target="_blank" rel="noopener noreferrer" className={linkCls}>loja online</a>{' '}
        <span className="text-sand/60">(pagamentos no cartão pela maquininha possuem taxas)</span>.
      </>
    ),
  },
  {
    q: 'Preciso reservar a entrada no Parque Estadual?',
    a: 'Fica tranquilo: o guia faz todo esse trâmite pra você. É só entrar em contato pelo WhatsApp.',
  },
  {
    q: 'Vou precisar assinar algum termo?',
    a: (
      <>
        Sim. Por segurança e conforme a norma ABNT NBR ISO 21101, todo participante assina o{' '}
        <a href={LINKS_UTEIS.termo} target="_blank" rel="noopener noreferrer" className={linkCls}>
          Termo de Conhecimento de Risco e Responsabilidade (TCR)
        </a>{' '}
        — que também inclui uma ficha médica. Você pode baixar e ler com antecedência; é rapidinho de preencher.
      </>
    ),
  },
]

function Item({ item, open, onToggle, id }) {
  return (
    <div className="border-b border-sand/12">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          id={`faq-btn-${id}`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-body text-base font-500 text-sand"
        >
          {item.q}
          <IconChevron className={`shrink-0 text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        hidden={!open}
        className="pb-5 font-body text-sm leading-relaxed text-sand/75"
      >
        {item.a}
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const [ref, shown] = useReveal()

  return (
    <section id="faq" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="container-x relative z-10">
        <div ref={ref} className={`mx-auto max-w-2xl ${shown ? 'animate-fade-up' : 'opacity-0'}`}>
          <header className="mb-8 text-center">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2 className="h-display mt-3 text-[clamp(2rem,6vw,3.2rem)]">Antes de <span className="text-accent">reservar</span></h2>
          </header>
          <div className="rounded-3xl border border-sand/12 bg-navy/30 px-6 sm:px-8">
            {ITENS.map((item, i) => (
              <Item key={i} id={i} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
