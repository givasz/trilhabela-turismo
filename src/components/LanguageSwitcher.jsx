import { useEffect, useRef, useState } from 'react'
import { IconChevron } from './icons.jsx'

// Idiomas oferecidos (mesma lista do site do cliente) → códigos do Google Tradutor.
// cc = código do país para a bandeira (flagcdn).
const LANGS = [
  { code: 'pt', name: 'Português', cc: 'br' },
  { code: 'en', name: 'English', cc: 'gb' },
  { code: 'es', name: 'Español', cc: 'es' },
  { code: 'fr', name: 'Français', cc: 'fr' },
  { code: 'de', name: 'Deutsch', cc: 'de' },
  { code: 'it', name: 'Italiano', cc: 'it' },
  { code: 'nl', name: 'Nederlands', cc: 'nl' },
  { code: 'ru', name: 'Русский', cc: 'ru' },
  { code: 'zh-CN', name: '中文 (简体)', cc: 'cn' },
  { code: 'ar', name: 'العربية', cc: 'sa' },
]

const Flag = ({ cc, name }) => (
  <img
    src={`https://flagcdn.com/24x18/${cc}.png`}
    srcSet={`https://flagcdn.com/48x36/${cc}.png 2x`}
    width="24"
    height="18"
    alt=""
    aria-hidden="true"
    loading="lazy"
    className="h-[18px] w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-black/20"
  />
)

// Lê o idioma atual a partir do cookie googtrans (/pt/xx).
function langAtual() {
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/)
  return m ? decodeURIComponent(m[1]) : 'pt'
}

function aplicaIdioma(code) {
  const host = window.location.hostname
  if (code === 'pt') {
    // remove o cookie do tradutor e recarrega para voltar ao original
    const expira = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = `googtrans=; ${expira}`
    document.cookie = `googtrans=; domain=.${host}; ${expira}`
    document.cookie = `googtrans=; domain=${host}; ${expira}`
    window.location.reload()
    return
  }
  // grava o cookie em todas as variações de domínio e recarrega.
  // (o caminho "ao vivo" pelo combo do widget é instável no celular,
  //  então recarregar é o método mais confiável em qualquer aparelho)
  const value = `/pt/${code}`
  document.cookie = `googtrans=${value}; path=/`
  document.cookie = `googtrans=${value}; path=/; domain=${host}`
  document.cookie = `googtrans=${value}; path=/; domain=.${host}`
  window.location.reload()
}

export default function LanguageSwitcher({ variant = 'bar' }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('pt')
  const ref = useRef(null)

  useEffect(() => {
    setCurrent(langAtual())
  }, [])

  useEffect(() => {
    if (!open) return
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const atual = LANGS.find((l) => l.code === current) || LANGS[0]

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Idioma: ${atual.name}. Trocar idioma`}
        className={
          variant === 'menu'
            ? 'flex w-full items-center gap-2 rounded-xl border border-sand/20 px-3 py-3 font-body text-base text-sand/90'
            : variant === 'float'
              ? 'inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-ink/85 px-3 py-2 font-body text-sm text-sand/90 shadow-lift backdrop-blur-md transition-colors hover:border-gold min-h-[44px]'
              : 'inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-2.5 py-2 font-body text-sm text-sand/85 transition-colors hover:border-gold min-h-[44px]'
        }
      >
        <Flag cc={atual.cc} name={atual.name} />
        <span className={variant === 'bar' ? 'hidden sm:inline' : ''}>{atual.code === 'pt' ? 'PT' : atual.name}</span>
        <IconChevron className={`text-gold transition-transform ${open ? 'rotate-180' : ''}`} size={16} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Selecionar idioma"
          className={`absolute z-[80] max-h-[60vh] w-56 overflow-y-auto rounded-2xl border border-gold/30 bg-navy p-1.5 shadow-lift ${
            variant === 'float'
              ? 'bottom-full left-0 mb-2'
              : variant === 'menu'
                ? 'left-0 mt-2'
                : 'right-0 mt-2'
          }`}
        >
          {LANGS.map((l) => {
            const active = l.code === current
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setCurrent(l.code); aplicaIdioma(l.code) }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-body text-sm transition-colors ${
                    active ? 'bg-sun/15 text-accent' : 'text-sand/85 hover:bg-ink/60'
                  }`}
                >
                  <Flag cc={l.cc} name={l.name} />
                  <span className="flex-1">{l.name}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-sun" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
