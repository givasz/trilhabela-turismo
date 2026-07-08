import { useState } from 'react'
import { TABELAS } from '../data/pricingTables.js'
import { precoPorPessoa, total, brl } from '../utils/pricing.js'
import { useReveal } from '../hooks/useReveal.js'
import { IconPlus, IconMinus, IconUsers } from './icons.jsx'

const OPCOES = [
  { key: 'padrao', label: 'Trilhas & Tours', sub: 'tabela padrão' },
  { key: 'cachoeiras', label: 'Cachoeiras', sub: 'circuito / Bananal / Friagem' },
  { key: 'rapel', label: 'Rapel Buraco do Cação', sub: 'aventura' },
]

export default function GroupPricing() {
  const [tabelaKey, setTabelaKey] = useState('padrao')
  const [pessoas, setPessoas] = useState(2)
  const [ref, shown] = useReveal()

  const tabela = TABELAS[tabelaKey]
  const pp = precoPorPessoa(tabela, pessoas)
  const tot = total(tabela, pessoas)
  const maxValor = tabela[1]

  return (
    <section id="precos" className="relative scroll-mt-20 overflow-hidden bg-navy/30 py-20 sm:py-28">
      <div className="topo" />
      <div className="container-x relative z-10">
        <header ref={ref} className={`mx-auto mb-12 max-w-2xl text-center ${shown ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="eyebrow">Como funciona o preço</span>
          <h2 className="h-display mt-3 text-[clamp(2rem,6vw,3.5rem)]">
            Quanto mais gente,<br /><span className="text-accent">menor o preço</span>
          </h2>
          <p className="mt-4 font-body text-sand/80">
            O valor é <strong className="text-sand">por pessoa</strong> e cai conforme o grupo cresce.
            Mexa no número de pessoas e veja o valor ao vivo.
          </p>
        </header>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2 lg:items-center">
          {/* controles */}
          <div className="rounded-3xl border border-sand/12 bg-ink/50 p-6 sm:p-8">
            <fieldset>
              <legend className="font-body text-sm font-600 uppercase tracking-wider text-accent">Tipo de passeio</legend>
              <div className="mt-3 grid gap-2">
                {OPCOES.map((o) => {
                  const active = tabelaKey === o.key
                  return (
                    <button
                      key={o.key}
                      onClick={() => setTabelaKey(o.key)}
                      aria-pressed={active}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left font-body transition-colors ${
                        active ? 'border-sun bg-sun/10' : 'border-sand/15 hover:border-gold/50'
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-600 text-sand">{o.label}</span>
                        <span className="block text-xs text-sand/55">{o.sub}</span>
                      </span>
                      <span className={`h-3 w-3 rounded-full ${active ? 'bg-sun' : 'bg-sand/20'}`} />
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <label className="font-body text-sm font-600 uppercase tracking-wider text-accent">Nº de pessoas</label>
              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => setPessoas((p) => Math.max(1, p - 1))}
                  aria-label="Diminuir número de pessoas"
                  disabled={pessoas <= 1}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-sand disabled:opacity-30"
                >
                  <IconMinus />
                </button>
                <span className="inline-flex min-w-[3ch] items-center justify-center gap-2 font-display text-4xl text-sand">
                  <IconUsers className="text-gold" size={26} /> {pessoas}
                </span>
                <button
                  onClick={() => setPessoas((p) => Math.min(20, p + 1))}
                  aria-label="Aumentar número de pessoas"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-sand"
                >
                  <IconPlus />
                </button>
              </div>
            </div>
          </div>

          {/* resultado + barras */}
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-navy to-ink p-6 shadow-glow sm:p-8">
            <p className="font-body text-sm text-sand/70" aria-live="polite">
              {pessoas} {pessoas === 1 ? 'pessoa' : 'pessoas'} × {brl(pp)} =
            </p>
            <p className="mt-1 font-display text-5xl text-accent">{brl(tot)}</p>
            <p className="font-body text-sm text-sand/60">no total · {brl(pp)} por pessoa</p>

            {/* barras decrescentes */}
            <div className="mt-7 space-y-2.5" aria-hidden="true">
              {[1, 2, 3, 4].map((n) => {
                const v = precoPorPessoa(tabela, n)
                const active = (n < 4 && pessoas === n) || (n === 4 && pessoas >= 4)
                return (
                  <div key={n} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 font-body text-xs text-sand/55">{n === 4 ? '4+' : n} pess.</span>
                    <div className="h-7 flex-1 overflow-hidden rounded-full bg-ink/60">
                      <div
                        className={`flex h-full items-center justify-end rounded-full px-3 font-body text-xs font-600 transition-all duration-500 ${
                          active ? 'bg-sun text-[#0a0e14]' : 'bg-gold/30 text-sand/80'
                        }`}
                        style={{ width: `${(v / maxValor) * 100}%` }}
                      >
                        {brl(v)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-4 font-hand text-xl text-accent">chama os amigos — sai mais barato! ✦</p>
          </div>
        </div>
      </div>
    </section>
  )
}
