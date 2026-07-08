import { Link, useNavigate } from 'react-router-dom'
import { featuredTour } from '../data/tours.js'
import { linhasTabela, brl } from '../utils/pricing.js'
import { useReveal } from '../hooks/useReveal.js'
import { IconWhatsApp, IconCheck, IconClock, IconLevel, IconFoot, IconArrow } from './icons.jsx'

export default function FeaturedTravessia() {
  const t = featuredTour
  const linhas = linhasTabela(t.preco)
  const [ref, shown] = useReveal()
  const navigate = useNavigate()
  const abrirPagina = (e) => {
    if (!e.target.closest('a')) navigate(`/passeio/${t.slug}`)
  }

  return (
    <section id="travessia" className="relative scroll-mt-20 overflow-hidden bg-ink py-20 sm:py-28">
      <div className="topo" />
      <div className="container-x relative z-10">
        <div
          ref={ref}
          onClick={abrirPagina}
          className={`group relative cursor-pointer rounded-[28px] border border-gold/40 bg-gradient-to-br from-navy via-ink to-ink p-6 shadow-glow transition-colors hover:border-gold/80 sm:p-10 ${shown ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ borderStyle: 'dashed' }}
        >
          {/* faixa de experiência */}
          <div className="mb-7 flex flex-wrap items-center gap-2">
            <span className="chip border-gold/50 text-gold">Experiência</span>
            <span className="chip border-gold/50 text-gold">3 dias</span>
            <span className="chip border-gold/50 text-gold">6 praias</span>
            <span className="ml-auto hidden items-center gap-1 font-body text-xs font-600 text-gold transition-transform group-hover:translate-x-0.5 sm:inline-flex">
              Ver expedição <IconArrow size={15} />
            </span>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            {/* texto */}
            <div>
              <span className="eyebrow text-gold">Produto destaque</span>
              <h2 className="h-display mt-3 text-[clamp(2rem,6vw,3.4rem)] text-sand">
                <Link to={`/passeio/${t.slug}`} className="transition-colors hover:text-gold">
                  Travessia das <span className="text-gold">6 Praias</span>
                </Link>
              </h2>
              <p className="mt-2 font-hand text-2xl text-accent">Bonete – Castelhanos · 30 km</p>

              <p className="mt-5 font-body leading-relaxed text-sand/85">{t.descricao}</p>

              <div className="mt-6 flex flex-wrap gap-4 font-body text-sm text-sand/80">
                <span className="inline-flex items-center gap-2"><IconClock className="text-gold" /> {t.duracao}</span>
                <span className="inline-flex items-center gap-2"><IconLevel className="text-gold" /> Nível {t.nivel}</span>
                <span className="inline-flex items-center gap-2"><IconFoot className="text-gold" /> {t.publico}</span>
              </div>

              <h3 className="mt-7 font-body text-sm font-600 uppercase tracking-wider text-gold">Pacote incluso</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {t.inclusos.map((i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-sand/90">
                    <IconCheck className="mt-0.5 shrink-0 text-accent" /> {i}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-body text-xs text-sand/60">Não incluso: alimentação.</p>
            </div>

            {/* polaroids das praias do percurso + tabela */}
            <div>
              <p className="mb-4 font-body text-xs font-600 uppercase tracking-wider text-gold">As praias do percurso</p>
              <div className="mb-8 flex flex-wrap justify-center gap-3 sm:gap-4">
                {t.fotos.map((f, i) => {
                  const src = typeof f === 'string' ? f : f.src
                  const nome = typeof f === 'string' ? '' : f.legenda
                  const rot = [-4, 3, -2, 4, -3, 2][i % 6]
                  return (
                    <figure
                      key={i}
                      className="polaroid w-[43%] max-w-[168px] transition-transform duration-300 hover:rotate-0 hover:scale-[1.04]"
                      style={{ transform: `rotate(${rot}deg)` }}
                    >
                      <img
                        src={src}
                        alt={nome ? `Praia ${nome} — Travessia das 6 Praias` : `Praia ${i + 1} da Travessia das 6 Praias`}
                        loading="lazy"
                        className="h-28 w-full object-cover sm:h-32"
                      />
                      {nome && (
                        <figcaption className="mt-2 flex items-center justify-center gap-1.5 px-1 text-center font-hand text-lg leading-none text-ink">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy font-body text-[11px] font-700 text-sand">
                            {i + 1}
                          </span>
                          {nome}
                        </figcaption>
                      )}
                    </figure>
                  )
                })}
              </div>

              <div className="rounded-2xl border border-gold/30 bg-ink/60 p-4">
                <p className="mb-3 font-body text-xs font-600 uppercase tracking-wider text-gold">Valor do guiamento por pessoa</p>
                {t.preco.tipo === 'fixo' ? (
                  <>
                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-4xl text-gold">{brl(t.preco.valor)}</span>
                      <span className="font-body text-sm text-sand/60">/ pessoa</span>
                    </p>
                    <p className="mt-2 text-[11px] text-sand/50">Valor único por pessoa, independente do tamanho do grupo.</p>
                  </>
                ) : (
                  <>
                    <table className="w-full border-collapse font-body text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-sand/50">
                          <th className="pb-2 font-500">Grupo</th>
                          <th className="pb-2 text-right font-500 text-gold">Por pessoa</th>
                          <th className="pb-2 text-right font-500">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {linhas.map((l) => (
                          <tr key={l.faixa} className="border-t border-sand/10">
                            <td className="py-2 text-sand/85">{l.faixa}</td>
                            <td className="py-2 text-right font-700 text-gold">{brl(l.porPessoa)}</td>
                            <td className="py-2 text-right text-sand/60">{l.plus ? `${brl(l.totalGrupo)}+` : brl(l.totalGrupo)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-2 text-[11px] text-sand/50">Quanto maior o grupo, menor o valor por pessoa.</p>
                  </>
                )}
              </div>

              <Link to={`/passeio/${t.slug}#reservar`} className="btn-wa mt-5 w-full text-base">
                <IconWhatsApp size={20} /> Reservar a Travessia
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
