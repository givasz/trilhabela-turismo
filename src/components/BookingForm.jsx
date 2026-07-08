import { useEffect, useMemo, useState } from 'react'
import { tours } from '../data/tours.js'
import { porPessoaDoTour, totalDoTour, brl } from '../utils/pricing.js'
import { montaUrlReserva } from '../utils/whatsapp.js'
import { maskTelefone, dataBR } from '../utils/format.js'
import { useReveal } from '../hooks/useReveal.js'
import Calendar from './Calendar.jsx'
import { IconWhatsApp, IconPlus, IconMinus } from './icons.jsx'

export default function BookingForm({ selectedSlug, onConsumeSelection }) {
  const [ref, shown] = useReveal()

  const [form, setForm] = useState({ nome: '', telefone: '', slug: '', data: '', pessoas: 2 })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Pré-seleção vinda de um card / modal / travessia.
  useEffect(() => {
    if (selectedSlug) {
      setForm((f) => ({ ...f, slug: selectedSlug }))
      onConsumeSelection?.()
    }
  }, [selectedSlug, onConsumeSelection])

  const tour = tours.find((t) => t.slug === form.slug)

  const calc = useMemo(() => {
    if (!tour) return null
    if (tour.preco.tipo === 'consulta') return { tipo: 'consulta' }
    const pp = porPessoaDoTour(tour.preco, form.pessoas)
    const tot = totalDoTour(tour.preco, form.pessoas)
    return { tipo: 'valor', pp, tot }
  }, [tour, form.pessoas])

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Informe seu nome.'
    if (form.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Telefone incompleto.'
    if (!form.slug) e.slug = 'Escolha um passeio.'
    if (!form.data) e.data = 'Escolha uma data.'
    if (!form.pessoas || form.pessoas < 1) e.pessoas = 'Mínimo de 1 pessoa.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // URL do WhatsApp sempre pronta a partir do estado atual — permite usar
  // um <a href> real (abre aba nova no desktop, app no celular, nunca é
  // bloqueado por popup blocker do Safari).
  const waUrl = useMemo(
    () =>
      montaUrlReserva({
        nome: form.nome.trim(),
        telefone: form.telefone,
        produto: tour ? (tour.subtitulo ? `${tour.nome} (${tour.subtitulo})` : tour.nome) : '',
        data: dataBR(form.data),
        pessoas: form.pessoas,
      }),
    [form, tour],
  )

  const focusFirstInvalid = () => document.querySelector('[aria-invalid="true"]')?.focus()

  // Clique no botão-link: só bloqueia a navegação se a validação falhar.
  const onCta = (ev) => {
    if (!validate()) {
      ev.preventDefault()
      focusFirstInvalid()
      return
    }
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 1200)
  }

  // Enter dentro do formulário: navega na mesma aba (caminho raro, sempre confiável).
  const onFormSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) {
      focusFirstInvalid()
      return
    }
    setSubmitting(true)
    window.location.href = waUrl
    setTimeout(() => setSubmitting(false), 1200)
  }

  const fieldCls = (k) =>
    `w-full rounded-xl border bg-ink/60 px-4 py-3 font-body text-sand placeholder:text-sand/40 transition-colors focus:border-gold ${
      errors[k] ? 'border-red-400' : 'border-sand/20'
    }`

  return (
    <section id="reservar" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="topo" />
      <div className="container-x relative z-10">
        <div ref={ref} className={`mx-auto max-w-2xl ${shown ? 'animate-fade-up' : 'opacity-0'}`}>
          <header className="mb-9 text-center">
            <span className="eyebrow">Reserve seu passeio</span>
            <h2 className="h-display mt-3 text-[clamp(2rem,6vw,3.5rem)]">
              Sua aventura em Ilhabela <span className="text-accent">começa aqui</span>
            </h2>
            <p className="mt-4 font-body text-sand/80">
              Trilhas, barcos, jipes, mergulho e muito mais.
            </p>
          </header>

          <form onSubmit={onFormSubmit} noValidate className="rounded-3xl border border-sand/12 bg-navy/40 p-6 shadow-card sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* nome */}
              <div className="sm:col-span-2">
                <label htmlFor="f-nome" className="mb-1.5 block font-body text-sm font-500 text-sand/85">Nome</label>
                <input
                  id="f-nome" type="text" autoComplete="name" value={form.nome}
                  onChange={(e) => set('nome', e.target.value)}
                  aria-invalid={!!errors.nome} aria-describedby={errors.nome ? 'e-nome' : undefined}
                  className={fieldCls('nome')} placeholder="Seu nome completo"
                />
                {errors.nome && <p id="e-nome" className="mt-1 font-body text-xs text-red-300">{errors.nome}</p>}
              </div>

              {/* telefone */}
              <div className="sm:col-span-2">
                <label htmlFor="f-tel" className="mb-1.5 block font-body text-sm font-500 text-sand/85">Telefone</label>
                <div className="flex gap-2">
                  <span className="inline-flex shrink-0 items-center rounded-xl border border-sand/20 bg-ink/60 px-3 font-body text-sm text-sand/70">+55</span>
                  <input
                    id="f-tel" type="tel" inputMode="numeric" autoComplete="tel" value={form.telefone}
                    onChange={(e) => set('telefone', maskTelefone(e.target.value))}
                    aria-invalid={!!errors.telefone} aria-describedby={errors.telefone ? 'e-tel' : undefined}
                    className={fieldCls('telefone')} placeholder="(12) 99999-9999"
                  />
                </div>
                {errors.telefone && <p id="e-tel" className="mt-1 font-body text-xs text-red-300">{errors.telefone}</p>}
              </div>

              {/* data — calendário */}
              <div className="sm:col-span-2">
                <label id="f-data-label" className="mb-1.5 block font-body text-sm font-500 text-sand/85">Data de interesse</label>
                <Calendar id="f-data-label" value={form.data} onChange={(v) => set('data', v)} />
                {form.data && <p className="mt-2 font-body text-xs text-sand/70">Data escolhida: <strong className="text-accent">{dataBR(form.data)}</strong></p>}
                {errors.data && <p id="e-data" className="mt-1 font-body text-xs text-red-300">{errors.data}</p>}
              </div>

              {/* passeio */}
              <div className="sm:col-span-2">
                <label htmlFor="f-slug" className="mb-1.5 block font-body text-sm font-500 text-sand/85">Passeio</label>
                <select
                  id="f-slug" value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  aria-invalid={!!errors.slug} aria-describedby={errors.slug ? 'e-slug' : undefined}
                  className={`${fieldCls('slug')} [color-scheme:dark]`}
                >
                  <option value="">Escolha um passeio…</option>
                  {tours.map((t) => (
                    <option key={t.id} value={t.slug}>{t.nome}{t.subtitulo ? ` (${t.subtitulo})` : ''}</option>
                  ))}
                </select>
                {errors.slug && <p id="e-slug" className="mt-1 font-body text-xs text-red-300">{errors.slug}</p>}
              </div>

              {/* pessoas */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block font-body text-sm font-500 text-sand/85">Nº de pessoas</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button" onClick={() => set('pessoas', Math.max(1, form.pessoas - 1))}
                    aria-label="Diminuir número de pessoas" disabled={form.pessoas <= 1}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-sand disabled:opacity-30"
                  ><IconMinus /></button>
                  <output className="min-w-[3ch] text-center font-display text-3xl text-sand">{form.pessoas}</output>
                  <button
                    type="button" onClick={() => set('pessoas', Math.min(30, form.pessoas + 1))}
                    aria-label="Aumentar número de pessoas"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-sand"
                  ><IconPlus /></button>
                </div>
              </div>
            </div>

            {/* cálculo ao vivo */}
            {calc && (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-ink/50 p-4 text-center" aria-live="polite">
                {calc.tipo === 'consulta' ? (
                  <p className="font-body text-sand/85">Lanchas Exclusivas: <strong className="text-accent">valores sob consulta</strong>.</p>
                ) : (
                  <p className="font-body text-sand/85">
                    {form.pessoas} {form.pessoas === 1 ? 'pessoa' : 'pessoas'} × {brl(calc.pp)} ={' '}
                    <strong className="font-display text-2xl text-accent">{brl(calc.tot)}</strong>{' '}
                    <span className="text-sm text-sand/60">no total</span>
                  </p>
                )}
              </div>
            )}

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCta}
              aria-disabled={submitting}
              className="btn-wa mt-6 w-full text-base"
            >
              <IconWhatsApp size={20} /> {submitting ? 'Abrindo WhatsApp…' : 'Quero reservar agora'}
            </a>

            <div className="mt-4 space-y-1.5 font-body text-xs leading-relaxed text-sand/55">
              <p>A solicitação será avaliada quanto à disponibilidade e às condições climáticas. Nossa equipe retorna em até 24h.</p>
              <p>O WhatsApp é nossa principal fonte de comunicação; caso não tenha, retornaremos por ligação (DDD 12 — Ilhabela/SP).</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
