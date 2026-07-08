import { useEffect, useRef } from 'react'

// Rota de mapa pontilhada ao fundo da página. Conforme o scroll avança,
// a linha do rastro vai sendo "desenhada" de cima para baixo, como se
// alguém estivesse percorrendo a trilha.
// Desativada com prefers-reduced-motion (mostra a linha inteira acesa).
const ROUTE_D =
  'M50 0 C 30 80, 70 160, 50 240 S 25 400, 50 480 S 75 640, 50 720 S 30 880, 50 1000'

export default function TrailLine() {
  const drawRef = useRef(null)
  const tickingRef = useRef(false)

  useEffect(() => {
    const path = drawRef.current
    if (!path) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`

    const update = () => {
      tickingRef.current = false
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress =
        scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
      path.style.strokeDashoffset = `${len * (1 - progress)}`
    }

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(update)
      }
    }

    if (reduced) {
      path.style.strokeDashoffset = '0'
    } else {
      update()
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] block" aria-hidden="true">
      <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 1000" fill="none">
        {/* rota pontilhada de guia, sempre visível ao fundo */}
        <path
          d={ROUTE_D}
          stroke="rgb(var(--c-sand))"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray="2 5"
          opacity="0.18"
        />
        {/* linha do rastro, desenhada conforme o scroll */}
        <path
          ref={drawRef}
          d={ROUTE_D}
          stroke="rgb(var(--c-sun))"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  )
}
