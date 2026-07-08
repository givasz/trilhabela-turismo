import { useMemo, useState } from 'react'
import { IconChevron } from './icons.jsx'

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]
const SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
// índice de semana começando na segunda (0=Seg … 6=Dom)
const segIndex = (date) => (date.getDay() + 6) % 7

// Calendário customizado, navegável, dias passados desabilitados.
// value/onChange usam string "YYYY-MM-DD".
export default function Calendar({ value, onChange, id }) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const selected = value ? startOfDay(new Date(value + 'T00:00:00')) : null

  const [view, setView] = useState(() => ({
    y: (selected || today).getFullYear(),
    m: (selected || today).getMonth(),
  }))

  const grid = useMemo(() => {
    const first = new Date(view.y, view.m, 1)
    const lead = segIndex(first)
    const start = new Date(view.y, view.m, 1 - lead)
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
      return {
        date: d,
        inMonth: d.getMonth() === view.m,
        past: d < today,
        isToday: d.getTime() === today.getTime(),
        selected: selected && d.getTime() === selected.getTime(),
      }
    })
  }, [view, today, selected])

  // não deixa navegar para meses inteiramente no passado
  const atCurrentMonth = view.y === today.getFullYear() && view.m === today.getMonth()
  const go = (delta) => {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  return (
    <div className="rounded-2xl border border-sand/15 bg-ink/40 p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button" onClick={() => go(-1)} disabled={atCurrentMonth}
          aria-label="Mês anterior"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold/10 disabled:opacity-25"
        >
          <IconChevron className="rotate-90" size={18} />
        </button>
        <p className="font-display text-sm uppercase tracking-wide text-sand">
          {MESES[view.m]} / {String(view.y).slice(2)}
        </p>
        <button
          type="button" onClick={() => go(1)} aria-label="Próximo mês"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold/10"
        >
          <IconChevron className="-rotate-90" size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center" role="grid" aria-labelledby={id}>
        {SEMANA.map((d) => (
          <div key={d} className="py-1 font-body text-[11px] font-600 uppercase tracking-wide text-gold/70">{d}</div>
        ))}
        {grid.map((cell, i) => {
          const disabled = cell.past || !cell.inMonth
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onChange(ymd(cell.date))}
              aria-pressed={cell.selected || false}
              aria-label={cell.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
              className={[
                'mx-auto flex aspect-square w-full max-w-[40px] items-center justify-center rounded-full font-body text-sm transition-colors',
                cell.selected ? 'bg-sun font-700 text-[#0a0e14]' : '',
                !cell.selected && cell.inMonth && !cell.past ? 'text-sand hover:bg-gold/15' : '',
                !cell.inMonth ? 'text-sand/15' : '',
                cell.inMonth && cell.past ? 'text-sand/25' : '',
                cell.isToday && !cell.selected ? 'ring-1 ring-gold/60' : '',
                disabled ? 'cursor-default' : '',
              ].join(' ')}
            >
              {cell.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
