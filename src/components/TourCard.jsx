import { Link, useNavigate } from 'react-router-dom'
import { precoAPartirDe, brl } from '../utils/pricing.js'
import { IconClock, IconLevel, IconArrow } from './icons.jsx'

// pílula "glass" escura fixa — legível sobre qualquer foto, no claro e no escuro
const nivelColor = {
  Fácil: 'border-wa/70 text-wa bg-black/55 backdrop-blur-sm font-600',
  Médio: 'border-sun/70 text-sun bg-black/55 backdrop-blur-sm font-600',
  Difícil: 'border-orange-400/80 text-orange-400 bg-black/55 backdrop-blur-sm font-600',
}

export default function TourCard({ tour, index }) {
  const desde = precoAPartirDe(tour.preco)
  const href = `/passeio/${tour.slug}`
  const navigate = useNavigate()
  // card inteiro clicável (mas deixa links/botões internos tratarem o próprio clique)
  const go = (e) => {
    if (!e.target.closest('a, button')) navigate(href)
  }

  return (
    <article
      onClick={go}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-navy/40 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${
        tour.selo ? 'border-sun/60 ring-2 ring-sun/30 hover:border-sun' : 'border-sand/10 hover:border-gold/40'
      }`}
    >
      {/* número editorial */}
      <span className="pointer-events-none absolute right-3 top-2 z-10 font-display text-4xl leading-none text-sand/15">
        {String(index + 1).padStart(2, '0')}
      </span>

      <Link to={href} className="relative block aspect-[4/3] w-full overflow-hidden" aria-label={`Ver ${tour.nome}`}>
        <img
          src={tour.foto}
          alt={`${tour.nome} — Ilhabela`}
          width="400"
          height="300"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="card-img-fade absolute inset-0" />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {tour.selo && (
            <span className="chip animate-pulse-soft border-sun bg-sun font-600 text-[#0a0e14] shadow-glow">
              {tour.selo}
            </span>
          )}
          <span className={`chip ${nivelColor[tour.nivel] || 'border-sand/30 text-sand'}`}>
            {tour.nivel}
          </span>
        </div>
        {tour.tagline && (
          <span className="absolute bottom-3 left-3 right-3 rounded-full bg-sun/95 px-3 py-1.5 text-center font-display text-[11px] uppercase tracking-wide text-[#0a0e14] shadow-glow">
            {tour.tagline}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-sand">
          <Link to={href} className="transition-colors hover:text-accent">{tour.nome}</Link>
        </h3>
        {tour.subtitulo && <p className="mt-0.5 font-hand text-lg text-accent">{tour.subtitulo}</p>}

        <div className="mt-3 flex flex-wrap gap-3 font-body text-xs text-sand/70">
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="text-gold" size={16} />
            {tour.duracao === 'COM PERNOITE' ? (
              <span className="rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-800 uppercase tracking-wide text-ink shadow-[0_0_14px_-4px_rgb(var(--c-gold))]">{tour.duracao}</span>
            ) : (
              tour.duracao
            )}
          </span>
          <span className="inline-flex items-center gap-1.5"><IconLevel className="text-gold" size={16} /> {tour.publico}</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-sand/10 pt-4">
          <div>
            {tour.preco.tipo === 'consulta' ? (
              <p className="font-display text-xl text-sand">Sob consulta</p>
            ) : (
              <>
                <p className="font-body text-[11px] uppercase tracking-wide text-sand/50">
                  {tour.preco.tipo === 'tabela' ? 'A partir de' : 'Por pessoa'}
                </p>
                <p className="font-display text-2xl text-accent">
                  {brl(desde)}
                  <span className="ml-1 font-body text-xs font-400 text-sand/60">/pessoa</span>
                </p>
              </>
            )}
            {tour.preco.tipo === 'tabela' && (
              <span className="mt-1 inline-block rounded-full bg-jungle/40 px-2 py-0.5 font-body text-[10px] font-500 text-sand/80">
                grupos pagam menos
              </span>
            )}
          </div>
        </div>

        {tour.escassez && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-sun/15 px-2.5 py-1.5 font-body text-[11px] font-600 text-accent">
            ⏳ {tour.escassez}
          </p>
        )}

        <div className="mt-4 flex gap-2">
          <Link to={href} className="btn-ghost flex-1 px-3 py-2.5 text-xs">Detalhes</Link>
          <Link to={`${href}#reservar`} className="btn-sun flex-1 px-3 py-2.5 text-xs">Reservar <IconArrow size={16} /></Link>
        </div>
      </div>
    </article>
  )
}
