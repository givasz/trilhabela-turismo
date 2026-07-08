import { useEffect, useState } from 'react'
import { IconSun, IconMoon } from './icons.jsx'

// Alterna entre tema escuro (padrão) e claro. Persiste em localStorage.
export default function ThemeToggle({ variant = 'bar' }) {
  const [light, setLight] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('light'),
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', light)
    try { localStorage.setItem('theme', light ? 'light' : 'dark') } catch (_) {}
  }, [light])

  const label = light ? 'Ativar modo escuro' : 'Ativar modo claro'

  if (variant === 'menu') {
    return (
      <button
        type="button"
        onClick={() => setLight((v) => !v)}
        aria-label={label}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-sand/20 px-3 py-3 font-body text-base text-sand/90"
      >
        <span className="inline-flex items-center gap-2">
          {light ? <IconMoon className="text-gold" size={18} /> : <IconSun className="text-gold" size={18} />}
          {light ? 'Modo escuro' : 'Modo claro'}
        </span>
        <span className="font-body text-xs uppercase tracking-wider text-sand/50">{light ? 'Light' : 'Dark'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLight((v) => !v)}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-sand transition-colors hover:border-gold hover:text-accent"
    >
      {light ? <IconMoon size={19} /> : <IconSun size={19} />}
    </button>
  )
}
