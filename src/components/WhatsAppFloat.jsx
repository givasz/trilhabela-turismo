import { IconWhatsApp } from './icons.jsx'
import { urlSimples } from '../utils/whatsapp.js'

export default function WhatsAppFloat() {
  return (
    <a
      href={urlSimples()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar pelo WhatsApp da Trilhabela"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-[60] inline-flex h-14 items-center justify-center gap-2 rounded-full px-5 font-body text-base font-700 text-white shadow-lift animate-pulse-soft"
      style={{ backgroundColor: 'rgb(var(--c-wa))' }}
    >
      <IconWhatsApp size={26} /> Reservar
    </a>
  )
}
