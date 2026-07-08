import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { tours } from '../data/tours.js'
import { linhasTabela, brl } from '../utils/pricing.js'
import BookingWidget from '../components/BookingWidget.jsx'
import DifficultyGauge from '../components/DifficultyGauge.jsx'
import Lightbox from '../components/Lightbox.jsx'
import {
  IconClock, IconLevel, IconUsers, IconPin, IconCheck, IconArrow, IconChevron,
} from '../components/icons.jsx'

const nivelColor = {
  Fácil: 'border-wa/70 text-wa bg-black/55 backdrop-blur-sm font-600',
  Médio: 'border-sun/70 text-sun bg-black/55 backdrop-blur-sm font-600',
  Difícil: 'border-orange-400/80 text-orange-400 bg-black/55 backdrop-blur-sm font-600',
}

const DIFICULDADE_PCT = { Fácil: 32, Médio: 60, Difícil: 85 }

// % de dificuldade do gauge (base pelo nível + ajustes p/ casos extremos)
function dificuldadePct(tour) {
  let pct = DIFICULDADE_PCT[tour.nivel] ?? 50
  if (tour.id === 'travessia-6-praias') pct = 96 // 2 dias, 30 km
  if (tour.id === 'pico-do-baepi') pct = 90 // 850 m de altimetria
  return pct
}

export default function TourPage() {
  const { slug } = useParams()
  const tour = tours.find((t) => t.slug === slug)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (tour) document.title = `${tour.nome} — Trilhabela Turismo`
    return () => { document.title = 'Trilhabela Turismo — Trilhas, Travessias e Passeios em Ilhabela' }
  }, [tour])

  if (!tour) return <Navigate to="/" replace />

  const linhas = linhasTabela(tour.preco)
  const mesmaCategoria = tours.filter((t) => t.slug !== tour.slug && t.categoria === tour.categoria)
  const outros = (mesmaCategoria.length > 0 ? mesmaCategoria : tours.filter((t) => t.slug !== tour.slug)).slice(0, 3)

  return (
    <main className="relative">
      {/* HERO da trilha — vai até o topo, atrás do header fixo (texto claro fica legível) */}
      <section className="force-dark relative h-[64svh] min-h-[460px] w-full overflow-hidden pt-16 text-sand">
        <img src={tour.fotoModal || tour.foto} alt={`${tour.nome} — Ilhabela`} className="absolute inset-0 h-full w-full object-cover" fetchpriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-10">
          {/* breadcrumb */}
          <nav aria-label="Trilha de navegação" className="mb-5 flex items-center gap-2 font-body text-sm text-sand/70">
            <Link to="/" className="hover:text-accent">Início</Link>
            <IconChevron className="-rotate-90 text-sand/40" size={14} />
            <Link to="/#passeios" className="hover:text-accent">Passeios</Link>
            <IconChevron className="-rotate-90 text-sand/40" size={14} />
            <span className="text-sand/90">{tour.nome}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            {tour.selo
              ? <span className="animate-pulse-soft rounded-full bg-sun px-3 py-1 font-display text-[11px] uppercase tracking-wider text-[#0a0e14] shadow-glow">{tour.selo}</span>
              : tour.destaque && <span className="rounded-full bg-gold px-3 py-1 font-display text-[11px] uppercase tracking-wider text-[#0a0e14]">★ Produto destaque</span>}
            <span className={`chip ${nivelColor[tour.nivel] || 'border-sand/30 text-sand'}`}>{tour.nivel}</span>
          </div>
          <h1 className="h-display mt-3 max-w-3xl text-[clamp(2.2rem,7vw,4.5rem)]">{tour.nome}</h1>
          {tour.subtitulo && <p className="mt-1 font-hand text-3xl text-accent">{tour.subtitulo}</p>}
          {tour.tagline && (
            <p className="mt-3 inline-block rounded-full bg-sun px-4 py-1.5 font-display text-xs uppercase tracking-wide text-[#0a0e14] shadow-glow">
              {tour.tagline}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-sand/85">
            <span className="inline-flex items-center gap-2">
              <IconClock className="text-gold" size={18} />
              {tour.duracao === 'COM PERNOITE' ? (
                <span className="rounded-full bg-gold px-3.5 py-1 text-base font-800 uppercase tracking-wide text-ink shadow-[0_0_18px_-4px_rgb(var(--c-gold))]">{tour.duracao}</span>
              ) : (
                tour.duracao
              )}
            </span>
            <span className="inline-flex items-center gap-2"><IconLevel className="text-gold" size={18} /> Nível {tour.nivel}</span>
            <span className="inline-flex items-center gap-2"><IconUsers className="text-gold" size={18} /> {tour.publico}</span>
          </div>
        </div>
      </section>

      {/* CORPO: detalhes + widget */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="topo" />
        <div className="container-x relative z-10 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* detalhes */}
          <div>
            <h2 className="eyebrow flex items-center gap-2"><span className="h-px w-6 bg-sun" /> Sobre o passeio</h2>
            {tour.escassez && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sun/40 bg-sun/10 px-4 py-3 font-body text-sm font-600 text-accent">
                ⏳ {tour.escassez}
              </p>
            )}
            <p className="mt-4 font-body text-lg leading-relaxed text-sand/90">{tour.descricao}</p>

            {tour.horarios && (
              <p className="mt-5 font-body text-sm text-sand/80"><strong className="text-sand">Horários:</strong> {tour.horarios}</p>
            )}

            <p className="mt-5 inline-flex items-start gap-2 rounded-xl bg-navy/50 px-4 py-3 font-body text-sm text-sand/85">
              <IconPin className="mt-0.5 shrink-0 text-gold" size={18} />
              Ponto de encontro: a combinar com o guia pelo WhatsApp.
            </p>

            {/* roteiro dia a dia */}
            {tour.roteiro?.length > 0 && (
              <div className="mt-9">
                <h3 className="font-display text-xl uppercase tracking-tight text-sand">Roteiro dia a dia</h3>
                <ol className="mt-4 space-y-4">
                  {tour.roteiro.map((r) => (
                    <li key={r.dia} className="rounded-2xl border border-sand/12 bg-navy/40 p-5 shadow-card">
                      <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">{r.dia}</p>
                      <p className="mt-1 font-display text-base uppercase leading-tight tracking-tight text-sand">{r.titulo}</p>
                      <p className="mt-2.5 font-body text-sm leading-relaxed text-sand/85">{r.texto}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* vídeo do passeio */}
            {tour.video && (
              <div className="mt-9">
                <h3 className="font-display text-xl uppercase tracking-tight text-sand">Vídeo</h3>
                <div className="mt-4 mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-2xl border border-sand/12 shadow-card">
                  <iframe
                    src={`https://www.youtube.com/embed/${tour.video}`}
                    title={`Vídeo — ${tour.nome}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
            )}

            {/* galeria de fotos do passeio */}
            {tour.fotos?.length > 0 && (
              <div className="mt-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl uppercase tracking-tight text-sand">Galeria</h3>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {tour.fotos.map((f, i) => {
                    const src = typeof f === 'string' ? f : f.src
                    const legenda = typeof f === 'string' ? '' : f.legenda
                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightbox(i)}
                        aria-label={legenda ? `Ampliar: ${legenda}` : `Ampliar foto ${i + 1}`}
                        className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-card"
                      >
                        <img
                          src={src}
                          alt={legenda || `${tour.nome} — foto ${i + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/15" />
                        {legenda && (
                          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent px-2.5 pb-2 pt-6 text-left font-body text-[11px] font-600 leading-tight text-sand">
                            {legenda}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* detalhes do percurso + gauge animado */}
            <div className="mt-9 overflow-hidden rounded-2xl border border-sand/12 bg-navy/40 p-6 shadow-card">
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg uppercase tracking-tight text-sand">
                <IconClock className="text-gold" size={20} /> Detalhes do percurso
              </h3>
              <div className="grid items-center gap-6 sm:grid-cols-2">
                <ul className="space-y-3">
                  <li className="flex items-center justify-between gap-3 border-b border-sand/10 pb-3 font-body text-sm">
                    <span className="inline-flex items-center gap-2 text-sand/70"><IconClock className="text-gold" size={16} /> Duração</span>
                    <span className="font-600 text-sand">{tour.duracao}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3 border-b border-sand/10 pb-3 font-body text-sm">
                    <span className="inline-flex items-center gap-2 text-sand/70"><IconLevel className="text-gold" size={16} /> Nível</span>
                    <span className="font-600 text-sand">{tour.nivel}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3 font-body text-sm">
                    <span className="inline-flex items-center gap-2 text-sand/70"><IconUsers className="text-gold" size={16} /> Indicado para</span>
                    <span className="text-right font-600 text-sand">{tour.publico}</span>
                  </li>
                </ul>
                <DifficultyGauge percent={dificuldadePct(tour)} nivel={tour.nivel} />
              </div>
            </div>

            {/* tabela completa */}
            {tour.preco.tipo === 'tabela' && (
              <div className="mt-9">
                <h3 className="font-display text-xl uppercase tracking-tight text-sand">Tabela de preços por grupo</h3>
                <p className="mt-1 font-body text-sm text-sand/65">O valor é por pessoa e diminui conforme o grupo aumenta.</p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-sand/15">
                  <table className="w-full border-collapse font-body text-sm">
                    <thead className="bg-navy/60">
                      <tr className="text-left text-[11px] uppercase tracking-wide text-sand/55 sm:text-xs">
                        <th className="px-3 py-3 font-500 sm:px-4">Grupo</th>
                        <th className="px-3 py-3 text-right font-500 text-accent sm:px-4">Cada pessoa</th>
                        <th className="px-3 py-3 text-right font-500 sm:px-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {linhas.map((l) => (
                        <tr key={l.faixa} className="border-t border-sand/10">
                          <td className="px-3 py-3 text-sand/85 sm:px-4">{l.faixa}</td>
                          <td className="px-3 py-3 text-right font-700 text-accent sm:px-4">{brl(l.porPessoa)}</td>
                          <td className="px-3 py-3 text-right text-sand/60 sm:px-4">{l.plus ? `${brl(l.totalGrupo)}+` : brl(l.totalGrupo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* inclusos */}
            {tour.inclusos.length > 0 && (
              <div className="mt-9">
                <h3 className="font-display text-xl uppercase tracking-tight text-sand">O que está incluso</h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {tour.inclusos.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 font-body text-sm text-sand/90">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-jungle/60 text-accent"><IconCheck size={15} /></span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tour.naoInclusos.length > 0 && (
              <p className="mt-4 font-body text-sm text-sand/60">Não incluso: {tour.naoInclusos.join(', ')}.</p>
            )}
            {tour.opcionais.length > 0 && (
              <div className="mt-7">
                <h3 className="font-display text-lg uppercase tracking-tight text-gold">Opcionais</h3>
                <ul className="mt-3 space-y-1.5">
                  {tour.opcionais.map((o) => (
                    <li key={o} className="font-body text-sm text-sand/80">• {o}</li>
                  ))}
                </ul>
              </div>
            )}

            {tour.levar?.length > 0 && (
              <div className="mt-7">
                <h3 className="font-display text-lg uppercase tracking-tight text-sand">O que levar</h3>
                <p className="mt-1 font-body text-xs text-sand/55">Sugestão para o seu conforto e segurança.</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {tour.levar.map((l) => (
                    <li key={l} className="flex items-start gap-2 font-body text-sm text-sand/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* widget de reserva — sticky no desktop */}
          <div id="reservar" className="scroll-mt-24 lg:sticky lg:top-24">
            <BookingWidget tour={tour} />
          </div>
        </div>
      </section>

      {/* outros passeios da mesma categoria */}
      {outros.length > 0 && (
        <section className="border-t border-sand/10 bg-navy/20 py-14">
          <div className="container-x">
            <h2 className="font-display text-2xl uppercase tracking-tight text-sand">Você também pode gostar</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {outros.map((o) => (
                <Link
                  key={o.id}
                  to={`/passeio/${o.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-sand/10 bg-navy/40 shadow-card transition-all hover:-translate-y-1 hover:border-gold/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={o.foto} alt={o.nome} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2 p-4">
                    <span className="font-display text-base uppercase leading-tight tracking-tight text-sand">{o.nome}</span>
                    <IconArrow className="shrink-0 text-accent" size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* voltar */}
      <div className="container-x py-10">
        <Link to="/#passeios" className="btn-ghost"><IconChevron className="rotate-90" size={16} /> Ver todos os passeios</Link>
      </div>

      {lightbox !== null && tour.fotos?.length > 0 && (
        <Lightbox
          fotos={tour.fotos}
          index={lightbox}
          onIndex={setLightbox}
          onClose={() => setLightbox(null)}
          alt={tour.nome}
        />
      )}
    </main>
  )
}
