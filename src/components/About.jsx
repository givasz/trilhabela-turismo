import { useReveal } from '../hooks/useReveal.js'
import { IconShield, IconCheck } from './icons.jsx'

const CREDENCIAIS = [
  '+20 anos guiando pelas trilhas de Ilhabela, credenciado no PEIB',
  'Membro honorário na Fundação Florestal e no Parque Estadual de Ilhabela',
  'Guias treinados e kits de primeiros socorros em todos os passeios',
  'Conformidade com as normas de conservação ambiental',
]

export default function About() {
  const [ref, shown] = useReveal()

  return (
    <section id="sobre" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="container-x relative z-10">
        <div ref={ref} className={`grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] ${shown ? 'animate-fade-up' : 'opacity-0'}`}>
          {/* foto */}
          <div className="relative">
            <img
              src="/photos/fotoguia.webp"
              alt="Ernani Sousa, guia oficial e fundador da Trilhabela Turismo, em uma trilha em Ilhabela"
              width="500"
              height="600"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-card"
            />
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-gold/40 bg-ink/90 px-5 py-4 shadow-glow sm:right-5">
              <p className="font-display text-3xl text-accent">+20</p>
              <p className="font-body text-xs text-sand/70">anos guiando<br />em Ilhabela</p>
            </div>
          </div>

          {/* texto */}
          <div>
            <span className="eyebrow">Seu guardião nas trilhas de Ilhabela</span>
            <h2 className="h-display mt-3 text-[clamp(2rem,6vw,3.4rem)]">
              Ernani <span className="text-accent">Sousa</span>
            </h2>
            <p className="mt-2 font-hand text-2xl text-gold">guia principal e fundador</p>
            <div className="mt-5 space-y-4 font-body leading-relaxed text-sand/85">
              <p>
                Descubra Ilhabela além do convencional com a Trilhabela Turismo. Há mais de 20 anos,
                <strong className="font-600 text-sand"> Ernani Sousa</strong>, guia oficial da Trilhabela Turismo,
                vem conduzindo visitantes por trilhas, picos, travessias e passeios em Ilhabela, proporcionando
                experiências únicas em meio à Mata Atlântica preservada.
              </p>
              <p>
                Explore trilhas em Ilhabela, alcance picos com vistas espetaculares e vivencie a
                Travessia das 6 Praias — Bonete a Castelhanos — uma das experiências de trekking mais
                incríveis do litoral brasileiro.
              </p>
              <p>
                Além das trilhas e travessias, oferecemos passeios de jipe 4x4, barco, escuna e mergulho
                em Ilhabela, conectando você a praias paradisíacas, mirantes, águas cristalinas, comunidades
                caiçaras e cenários naturais inesquecíveis.
              </p>
              <p>
                Experiências conduzidas com segurança, conhecimento local, conforto e atendimento
                especializado por quem conhece cada detalhe da ilha.
              </p>
              <p className="font-hand text-2xl text-accent">
                Trilhabela Turismo. Explorando Ilhabela com você. 🫵🏼🥾🏝️
              </p>
            </div>

            <ul className="mt-7 space-y-3">
              {CREDENCIAIS.map((c) => (
                <li key={c} className="flex items-start gap-3 font-body text-sm text-sand/90">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-jungle/60 text-accent">
                    <IconCheck size={15} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-gold/30 bg-navy/50 px-5 py-3">
              <IconShield className="text-gold" size={24} />
              <p className="font-body text-sm text-sand/85">Segurança e conservação ambiental em primeiro lugar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
