import { Link } from 'react-router-dom'
import {
  IconWhatsApp,
  IconInstagram,
  IconFacebook,
  IconYouTube,
  IconTikTok,
  IconStar,
  IconMail,
  IconShop,
  IconTicket,
  IconDownload,
} from './icons.jsx'
import { urlSimples } from '../utils/whatsapp.js'
import { CONTATO, REDES, LINKS_UTEIS } from '../data/links.js'

const NAV = [
  { to: '/#travessia', label: 'Travessia 6 Praias' },
  { to: '/#experiencias', label: 'Experiências' },
  { to: '/#trilhas', label: 'Trilhas' },
  { to: '/#tours', label: 'Tours' },
  { to: '/#cachoeiras', label: 'Cachoeiras' },
  { to: '/#passeios', label: 'Passeios' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/#avaliacoes', label: 'Avaliações' },
  { to: '/#reservar', label: 'Contato' },
]

const REDES_LISTA = [
  { href: REDES.instagram, label: '@trilhabela', Icon: IconInstagram, cor: '#E4405F' },
  { href: REDES.facebook, label: 'facebook.com/trilhabela', Icon: IconFacebook, cor: '#1877F2' },
  { href: REDES.youtube, label: 'YouTube', Icon: IconYouTube, cor: '#FF0000' },
  { href: REDES.tiktok, label: '@trilhabelaoficial', Icon: IconTikTok, cor: '#25F4EE' },
  { href: REDES.google, label: 'Avaliações no Google', Icon: IconStar, cor: '#FBBC05' },
]

const UTEIS_LISTA = [
  { href: LINKS_UTEIS.loja, label: 'Loja online (pague em até 10x)', Icon: IconShop },
  { href: LINKS_UTEIS.reservaParque, label: 'Reservar entrada no Parque Estadual', Icon: IconTicket },
  { href: LINKS_UTEIS.termo, label: 'Termo de responsabilidade (PDF)', Icon: IconDownload },
]

export default function Footer() {
  return (
    <footer className="force-dark relative overflow-hidden border-t border-gold/15 bg-ink py-14 text-sand">
      <div className="container-x relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="Logo Trilhabela" width="48" height="48" className="h-12 w-12 rounded-full ring-2 ring-[#00A859]" />
              <div>
                <p className="font-display text-lg uppercase tracking-tight text-sand">Trilhabela</p>
                <p className="font-body text-xs text-sand/60">Expedições de Trilhas · Ilhabela/SP</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm font-body text-sm text-sand/70">
              Ecoturismo guiado em Ilhabela com guia credenciado pelo PEIB. Trilhas, travessias, cachoeiras,
              barco, jipe 4x4, mergulho e observação de baleias.
            </p>
            <a href={urlSimples()} target="_blank" rel="noopener noreferrer" className="btn-wa mt-5 text-sm">
              <IconWhatsApp size={18} /> {CONTATO.telefone}
            </a>
            <a
              href={`mailto:${CONTATO.email}`}
              className="mt-3 inline-flex items-center gap-2 font-body text-sm text-sand/75 transition-colors hover:text-accent"
            >
              <IconMail size={18} className="text-gold" /> {CONTATO.email}
            </a>
          </div>

          <nav aria-label="Rodapé">
            <p className="mb-3 font-body text-sm font-600 uppercase tracking-wider text-gold">Navegar</p>
            <ul className="space-y-2">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-body text-sm text-sand/75 transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 font-body text-sm font-600 uppercase tracking-wider text-gold">Redes</p>
            <ul className="space-y-3">
              {REDES_LISTA.map(({ href, label, Icon, cor }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-body text-sm text-sand/75 transition-colors hover:text-accent">
                    <Icon size={18} style={{ color: cor }} /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-600 uppercase tracking-wider text-gold">Links úteis</p>
            <ul className="space-y-3">
              {UTEIS_LISTA.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-sm text-sand/75 transition-colors hover:text-accent">
                    <Icon size={18} className="text-gold" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-sand/10 pt-6 font-body text-xs text-sand/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Trilhabela Turismo. Todos os direitos reservados.</p>
          <p>Seus dados são usados apenas para retornar seu contato sobre o passeio solicitado.</p>
        </div>
      </div>
    </footer>
  )
}
