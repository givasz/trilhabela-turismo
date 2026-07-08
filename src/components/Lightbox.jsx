import { useEffect, useRef } from 'react'
import { IconClose, IconChevron } from './icons.jsx'

// Visualizador de galeria em tela cheia.
// Props: fotos (array de src), index (atual), onIndex(n), onClose(), alt
export default function Lightbox({ fotos, index, onIndex, onClose, alt = '' }) {
  const touchX = useRef(null)
  const total = fotos?.length ?? 0

  const go = (dir) => {
    if (total < 2) return
    onIndex((index + dir + total) % total)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, total])

  if (!total) return null

  const atual = fotos[index]
  const src = typeof atual === 'string' ? atual : atual.src
  const legenda = typeof atual === 'string' ? '' : atual.legenda

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de fotos"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-up"
    >
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <IconClose />
      </button>

      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Foto anterior"
            className="absolute left-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <IconChevron className="rotate-90" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1) }}
            aria-label="Próxima foto"
            className="absolute right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <IconChevron className="-rotate-90" />
          </button>
        </>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="flex max-h-full max-w-5xl flex-col items-center"
      >
        <img
          src={src}
          alt={legenda || `${alt} — foto ${index + 1}`}
          className="max-h-[82vh] w-auto select-none rounded-xl object-contain"
        />
        <figcaption className="mt-3 text-center font-body text-sm text-white/80">
          {legenda && <span className="font-600 text-white">{legenda}</span>}
          {legenda && total > 1 && <span className="text-white/50"> · </span>}
          {total > 1 && <span className="text-white/60">{index + 1} / {total}</span>}
        </figcaption>
      </figure>
    </div>
  )
}
