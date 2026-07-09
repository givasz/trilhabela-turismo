import { useMemo, useState } from 'react'
import Calendar from './Calendar.jsx'
import { porPessoaDoTour, totalDoTour, precoAPartirDe, precoSolo, brl } from '../utils/pricing.js'
import { montaUrlReserva } from '../utils/whatsapp.js'
import { maskTelefone, dataBR } from '../utils/format.js'
import { IconWhatsApp, IconPlus, IconMinus, IconUsers, IconCalendar, IconPen } from './icons.jsx'

// Bloco de reserva por passeio (estilo da página do cliente, repaginado):
// resumo de preço → calendário → quantidade → responsável → Solicitar Reserva.
export default function BookingWidget({ tour }) {
  const [data, setData] = useState('')
  const [pessoas, setPessoas] = useState(2)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const calc = useMemo(() => {
    if (tour.preco.tipo === 'consulta') return { tipo: 'consulta' }
    return {
      tipo: 'valor',
      pp: porPessoaDoTour(tour.preco, pessoas),
      tot: totalDoTour(tour.preco, pessoas),
    }
  }, [tour, pessoas])

  const set = (setter, key) => (val) => {
    setter(val)
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!data) e.data = 'Escolha uma data.'
    if (!pessoas || pessoas < 1) e.pessoas = 'Informe ao menos 1 pessoa.'
    if (!nome.trim()) e.nome = 'Informe seu nome.'
    if (telefone.replace(/\D/g, '').length < 10) e.telefone = 'Telefone incompleto.'
    setErrors(e)
    return e
  }

  // Ordem e rótulos amigáveis dos campos, para o resumo e o scroll.
  const FIELD_ORDER = ['data', 'pessoas', 'nome', 'telefone']
  const FIELD_LABELS = { data: 'data', pessoas: 'nº de pessoas', nome: 'nome', telefone: 'telefone' }
  const FIELD_TARGET = { data: 'bw-field-data', pessoas: 'bw-field-pessoas', nome: 'bw-nome', telefone: 'bw-telefone' }

  // Leva o usuário até o primeiro campo que falta preencher.
  const scrollToFirstError = (errs) => {
    const first = FIELD_ORDER.find((k) => errs[k])
    if (!first) return
    const el = document.getElementById(FIELD_TARGET[first])
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (first === 'nome' || first === 'telefone') el.focus?.({ preventScroll: true })
  }

  // URL do WhatsApp sempre pronta a partir do estado atual — permite usar um
  // <a href> real (aba nova no desktop, app no celular, sem bloqueio de popup).
  const waUrl = useMemo(
    () =>
      montaUrlReserva({
        nome: nome.trim(),
        telefone,
        produto: tour.subtitulo ? `${tour.nome} (${tour.subtitulo})` : tour.nome,
        data: dataBR(data),
        pessoas,
      }),
    [nome, telefone, tour, data, pessoas],
  )

  const onCta = (ev) => {
    const errs = validate()
    if (Object.keys(errs).length) {
      ev.preventDefault()
      scrollToFirstError(errs)
      return
    }
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 1200)
  }

  return (
    <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-navy to-ink p-5 shadow-glow sm:p-6">
      {/* resumo de preço */}
      <div className="border-b border-sand/12 pb-4">
        {tour.preco.tipo === 'tabela' && (
          <>
            <p className="flex flex-wrap items-baseline justify-between gap-x-3 font-body text-sm text-sand/80">
              <span>Apenas uma pessoa (exclusivo)</span>
              <span className="font-display text-lg text-sand">{brl(precoSolo(tour.preco))}</span>
            </p>
            <p className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-3 font-body text-sm text-sand/80">
              <span>Grupos a partir de</span>
              <span className="font-display text-2xl text-accent">{brl(precoAPartirDe(tour.preco))}<span className="ml-1 font-body text-xs font-400 text-sand/60">por pessoa</span></span>
            </p>
          </>
        )}
        {tour.preco.tipo === 'fixo' && (
          <p className="flex flex-wrap items-baseline justify-between gap-x-3 font-body text-sm text-sand/80">
            <span>Valor por pessoa</span>
            <span className="font-display text-2xl text-accent">{brl(tour.preco.valor)}</span>
          </p>
        )}
        {tour.preco.tipo === 'consulta' && (
          <p className="font-display text-xl text-sand">Valores sob consulta</p>
        )}
        <p className="mt-2 font-body text-xs text-sand/55">Os valores podem ser parcelados em até 10x no cartão de crédito.</p>
      </div>

      {/* data */}
      <div id="bw-field-data" className="mt-5 scroll-mt-24">
        <p id="bw-data" className="mb-2 flex items-center gap-2 font-body text-sm font-600 text-sand">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold"><IconCalendar size={15} /></span>
          Escolha uma data de interesse
        </p>
        <Calendar id="bw-data" value={data} onChange={set(setData, 'data')} />
        {errors.data && <p className="mt-1.5 font-body text-xs text-red-300">{errors.data}</p>}
        {data && <p className="mt-2 font-body text-xs text-sand/70">Data escolhida: <strong className="text-accent">{dataBR(data)}</strong></p>}
      </div>

      {/* quantidade */}
      <div id="bw-field-pessoas" className="mt-6 scroll-mt-24">
        <p className="mb-2 flex items-center gap-2 font-body text-sm font-600 text-sand">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold"><IconUsers size={15} /></span>
          Quantidade de pessoas
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button type="button" onClick={() => set(setPessoas, 'pessoas')(Math.max(1, pessoas - 1))} disabled={pessoas <= 1}
            aria-label="Diminuir número de pessoas"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-sand disabled:opacity-30"><IconMinus /></button>
          <output className="min-w-[3ch] text-center font-display text-3xl text-sand">{pessoas}</output>
          <button type="button" onClick={() => set(setPessoas, 'pessoas')(Math.min(30, pessoas + 1))}
            aria-label="Aumentar número de pessoas"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-sand"><IconPlus /></button>

          {calc.tipo === 'valor' && (
            <span className="ml-auto text-right font-body text-sm text-sand/70" aria-live="polite">
              {pessoas} × {brl(calc.pp)} =<br />
              <strong className="font-display text-xl text-accent">{brl(calc.tot)}</strong>
            </span>
          )}
        </div>
        {errors.pessoas && <p className="mt-1.5 font-body text-xs text-red-300">{errors.pessoas}</p>}
      </div>

      {/* responsável */}
      <div className="mt-6">
        <p className="mb-2 flex items-center gap-2 font-body text-sm font-600 text-sand">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold"><IconPen size={15} /></span>
          Informações do responsável
        </p>
        <input
          id="bw-nome" type="text" value={nome} autoComplete="name" placeholder="Seu nome completo"
          onChange={(e) => set(setNome, 'nome')(e.target.value)}
          aria-label="Nome completo" aria-invalid={!!errors.nome}
          className={`w-full scroll-mt-24 rounded-xl border bg-ink/60 px-4 py-3 font-body text-sand placeholder:text-sand/40 transition-colors focus:border-gold ${errors.nome ? 'border-red-400' : 'border-sand/20'}`}
        />
        {errors.nome && <p className="mt-1 font-body text-xs text-red-300">{errors.nome}</p>}

        <div className="mt-3 flex gap-2">
          <span className="inline-flex shrink-0 items-center rounded-xl border border-sand/20 bg-ink/60 px-3 font-body text-sm text-sand/70">+55</span>
          <input
            id="bw-telefone" type="tel" inputMode="numeric" value={telefone} autoComplete="tel" placeholder="(12) 99999-9999"
            onChange={(e) => set(setTelefone, 'telefone')(maskTelefone(e.target.value))}
            aria-label="Telefone com DDD" aria-invalid={!!errors.telefone}
            className={`w-full scroll-mt-24 rounded-xl border bg-ink/60 px-4 py-3 font-body text-sand placeholder:text-sand/40 transition-colors focus:border-gold ${errors.telefone ? 'border-red-400' : 'border-sand/20'}`}
          />
        </div>
        {errors.telefone && <p className="mt-1 font-body text-xs text-red-300">{errors.telefone}</p>}
      </div>

      {/* resumo do que falta — aparece junto do botão, bem visível */}
      {(() => {
        const faltando = FIELD_ORDER.filter((k) => errors[k])
        if (!faltando.length) return null
        return (
          <div role="alert" aria-live="assertive" className="mt-6 flex items-start gap-2 rounded-xl border border-red-400/50 bg-red-500/10 px-4 py-3 font-body text-sm text-red-200">
            <span aria-hidden="true" className="mt-px">⚠️</span>
            <span>
              <strong>Falta preencher:</strong> {faltando.map((k) => FIELD_LABELS[k]).join(', ')}.
              <span className="block text-red-200/70">Complete os campos destacados para solicitar a reserva.</span>
            </span>
          </div>
        )
      })()}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCta}
        aria-disabled={submitting}
        className={`btn-wa w-full text-base ${Object.keys(errors).some((k) => errors[k]) ? 'mt-3' : 'mt-6'}`}
      >
        <IconWhatsApp size={20} /> {submitting ? 'Abrindo WhatsApp…' : 'Solicitar reserva'}
      </a>
      <p className="mt-3 text-center font-body text-xs text-sand/55">
        Avaliamos a disponibilidade e as condições climáticas e retornamos em até 24h.
      </p>
    </div>
  )
}
