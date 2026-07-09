import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconWhatsApp } from './icons.jsx'
import { urlSimples } from '../utils/whatsapp.js'
import ThemeToggle from './ThemeToggle.jsx'

const LINKS = [
  { to: '/#travessia', label: 'Travessia 6 Praias' },
  { to: '/#experiencias', label: 'Experiências' },
  { to: '/#trilhas', label: 'Trilhas' },
  { to: '/#tours', label: 'Tours' },
  { to: '/#cachoeiras', label: 'Cachoeiras' },
  { to: '/#passeios', label: 'Passeios' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`force-dark fixed inset-x-0 top-0 z-50 text-sand transition-all duration-300 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Trilhabela Turismo — início">
          <img src="/logo.webp" alt="Logo Trilhabela — Expedições de Trilhas" width="44" height="44" className="h-11 w-11 rounded-full ring-2 ring-[#00A859]" />
          <span className="hidden font-display text-lg uppercase tracking-tight text-sand sm:block">
            Trilhabela
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3.5 py-2 font-body text-sm font-500 text-sand/80 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-sand lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <div
        className={`overflow-hidden border-t border-gold/10 bg-ink/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[480px]' : 'max-h-0'
        }`}
      >
        <nav aria-label="Navegação principal (mobile)" className="container-x flex flex-col gap-1 py-3">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 font-body text-base text-sand/90 transition-colors hover:bg-navy hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={urlSimples()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-sun mt-2"
          >
            <IconWhatsApp size={18} /> Reservar pelo WhatsApp
          </a>
          <p className="mt-3 border-t border-gold/10 pt-3 text-center font-body text-xs text-sand/45">
            Idioma no canto inferior esquerdo ↙
          </p>
        </nav>
      </div>
    </header>
  )
}
