import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const LEN = Math.PI * 80 // comprimento do semicírculo (r = 80)

// Medidor semicircular animado de nível de dificuldade.
export default function DifficultyGauge({ percent = 50, nivel = 'Médio' }) {
  const [ref, shown] = useReveal({ threshold: 0.4 })
  const [display, setDisplay] = useState(0)
  const arcRef = useRef(null)

  useEffect(() => {
    if (!shown) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // arco preenchendo
    if (arcRef.current) {
      arcRef.current.style.strokeDashoffset = String(LEN * (1 - percent / 100))
    }

    if (reduce) {
      setDisplay(percent)
      return
    }

    // número contando
    const dur = 1200
    let start = null
    let raf
    const step = (t) => {
      if (start == null) start = t
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay(Math.round(eased * percent))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [shown, percent])

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[280px] select-none">
      <svg viewBox="0 0 200 128" className="w-full" role="img" aria-label={`Nível de dificuldade: ${nivel}, ${percent}%`}>
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--c-gold))" />
            <stop offset="55%" stopColor="rgb(var(--c-sun))" />
            <stop offset="100%" stopColor="rgb(var(--c-sun))" />
          </linearGradient>
        </defs>
        {/* trilho de fundo */}
        <path
          d="M20 105 A80 80 0 0 1 180 105"
          fill="none"
          stroke="rgb(var(--c-sand))"
          strokeOpacity="0.16"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* arco do valor (anima via stroke-dashoffset) */}
        <path
          ref={arcRef}
          d="M20 105 A80 80 0 0 1 180 105"
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth="16"
          strokeLinecap="round"
          style={{
            strokeDasharray: LEN,
            strokeDashoffset: LEN,
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </svg>

      {/* textos centrais */}
      <div className="pointer-events-none absolute inset-x-0 top-[40%] text-center">
        <p className="font-body text-[10px] uppercase tracking-wide text-sand/55">Nível de dificuldade</p>
        <p className="font-display text-4xl leading-none text-sand">{display}%</p>
        <p className="mt-1 font-body text-sm font-600 text-accent">{nivel}</p>
      </div>

      {/* extremos da escala */}
      <span className="absolute bottom-1 left-1 font-body text-xs font-600 text-[#2e9e63]">Fácil</span>
      <span className="absolute bottom-1 right-1 font-body text-xs font-600 text-accent">Difícil</span>
    </div>
  )
}
