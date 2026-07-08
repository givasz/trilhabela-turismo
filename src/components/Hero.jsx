import { motion, useReducedMotion } from 'framer-motion'
import { IconWhatsApp, IconArrow, IconShield } from './icons.jsx'
import { urlSimples } from '../utils/whatsapp.js'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const reduce = useReducedMotion()
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="topo" className="force-dark relative min-h-[100svh] overflow-hidden text-sand">
      {/* foto fullscreen */}
      <picture>
        <source srcSet="/photos/hero-baepi.webp" type="image/webp" />
        <img
          src="/photos/hero-baepi.jpg"
          alt="Pico do Baepi visto do mar — o pico mais famoso de Ilhabela"
          width="1376"
          height="768"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[38%_center] sm:object-center"
        />
      </picture>
      {/* overlays mais leves — imagem clara mesmo no modo escuro, mas com contraste pro texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/30 to-ink/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent sm:via-transparent" />

      {/* selo do logo girando devagar */}
      <img
        src="/logo.webp"
        alt=""
        aria-hidden="true"
        width="160"
        height="160"
        className="absolute right-5 top-24 h-36 w-36 rounded-full opacity-80 ring-2 ring-[#00A859] animate-spin-slow sm:right-10 sm:h-56 sm:w-56"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-32 sm:justify-center sm:pb-28"
      >
        <motion.p variants={item} className="font-display text-[clamp(2.8rem,14vw,7rem)] uppercase leading-none tracking-tight text-sun drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
          Trilhabela
        </motion.p>

        <motion.span variants={item} className="eyebrow mb-6 mt-6 flex items-center gap-2 text-sm sm:mt-7 sm:text-base">
          <span className="h-px w-10 bg-sun" /> Ilhabela · SP — Expedições de Trilhas
        </motion.span>

        <motion.h1
          variants={item}
          className="h-display max-w-4xl text-[clamp(2.6rem,9vw,6rem)] [transform:rotate(-1deg)]"
        >
          Trilhas e Passeios <br className="hidden sm:block" />em <span className="text-accent">Ilhabela</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl font-body text-lg font-500 leading-relaxed text-sand/90 sm:text-xl">
          +20 anos proporcionando experiências únicas na Mata Atlântica preservada em Ilhabela.
        </motion.p>

        <motion.p variants={item} className="mt-3 max-w-xl font-body text-base leading-relaxed text-sand/75">
          Trilhas Guiadas Exclusivas, Travessia das 6 Praias ( Bonete – Castelhanos ), passeios de
          barcos, jipes, escuna e mergulho.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={urlSimples()} target="_blank" rel="noopener noreferrer" className="btn-wa text-base">
            <IconWhatsApp size={20} /> Reservar pelo WhatsApp
          </a>
          <a href="#passeios" className="btn-ghost text-base">
            Ver passeios <IconArrow />
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-xs text-sand/70">
          <span className="inline-flex items-center gap-2"><IconShield className="text-gold" /> Guia credenciado PEIB</span>
          <span className="inline-flex items-center gap-2"><IconShield className="text-gold" /> Kit de primeiros socorros</span>
          <span className="inline-flex items-center gap-2"><IconShield className="text-gold" /> +20 anos guiando em Ilhabela</span>
          <span className="inline-flex items-center gap-2"><IconShield className="text-gold" /> Seguro Aventura</span>
          <span className="inline-flex items-center gap-2"><IconShield className="text-gold" /> Equipamentos de segurança (perneiras e bastão de caminhada)</span>
        </motion.div>
      </motion.div>

      {/* divisória orgânica para a próxima seção */}
      <svg className="absolute bottom-0 left-0 z-[3] w-full" style={{ color: 'rgb(var(--page-ink))' }} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 80V40c180-30 320 20 540 18s360-46 612-30c180 11 198 30 288 34v18z" />
      </svg>
    </section>
  )
}
