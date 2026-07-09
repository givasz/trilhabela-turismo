import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { tours, CATEGORIAS, tourNaCategoria } from '../data/tours.js'
import TourCard from './TourCard.jsx'
import { useReveal } from '../hooks/useReveal.js'

// Âncoras de navegação (#hash) → categoria do filtro.
const HASH_CAT = { trilhas: 'trilhas', experiencias: 'experiencia', tours: 'tour', cachoeiras: 'cachoeiras', passeios: 'passeios' }

export default function TourGrid() {
  const [cat, setCat] = useState('todos')
  const [ref, shown] = useReveal()
  const { hash } = useLocation()

  // ao clicar num botão de segmento, aplica o filtro correspondente
  useEffect(() => {
    const key = HASH_CAT[hash.replace('#', '')]
    if (key) setCat(key)
  }, [hash])

  // Exibe todos os passeios na grade (inclui a Travessia, já destacada acima).
  // A Travessia fica separada (bloco de destaque acima) — fora da grade.
  const lista = useMemo(
    () => tours.filter((t) => t.categoria !== 'travessia' && tourNaCategoria(t, cat)),
    [cat],
  )

  return (
    <section id="passeios" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      {/* âncoras p/ os botões de segmento rolarem até a grade */}
      <span id="trilhas" aria-hidden="true" className="absolute -top-20" />
      <span id="experiencias" aria-hidden="true" className="absolute -top-20" />
      <span id="tours" aria-hidden="true" className="absolute -top-20" />
      <span id="cachoeiras" aria-hidden="true" className="absolute -top-20" />
      <div className="topo" />
      <div className="container-x relative z-10">
        <header ref={ref} className={`mb-10 max-w-2xl ${shown ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="eyebrow">O que você vai viver</span>
          <h2 className="h-display mt-3 text-[clamp(2rem,6vw,3.5rem)]">
            Todos os <span className="text-accent">passeios</span>
          </h2>
          <p className="mt-4 font-body text-sand/80">
            Escolha a categoria, abra o passeio para ver a tabela completa e reserve direto pelo WhatsApp
            com tudo pré-preenchido.
          </p>
        </header>

        {/* chips de filtro */}
        <div className="mb-9 flex flex-wrap gap-2" role="group" aria-label="Filtrar passeios por categoria">
          {CATEGORIAS.map((c) => {
            const active = cat === c.key
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                aria-pressed={active}
                className={`chip ${active ? 'border-sun bg-sun text-[#0a0e14]' : 'border-sand/20 text-sand/80 hover:border-gold/60'}`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
