import { useEffect, useRef, useState } from 'react'

// Fade-up uma única vez quando o elemento entra na viewport.
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, shown]
}
