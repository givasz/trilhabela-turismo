import { useReveal } from '../hooks/useReveal.js'
import { IconStar, IconArrow } from './icons.jsx'

const GOOGLE_URL = 'https://share.google/f3ROMey5zGupNHRdj'
const ALBUM_URL = 'https://photos.google.com/share/AF1QipNsaXTepMQv7VMhWD4-DyoOkagF34nHD3kY0q7Y3pj0j_CAgrvJOi4qXUrVJQ6S7A?key=VnNNcmg5UDRibFVOMEJ0WXhLVWo0RE9MLUNhZXBB'

const DEPOIMENTOS = [
  {
    texto:
      'Fomos acompanhados pelo guia Ernani durante a travessia do Bonete para Castelhanos, um trajeto difícil e incrivelmente lindo. Nosso guia foi super atencioso e responsável, nos auxiliando durante todo o trajeto!',
    autor: 'Travessia Bonete – Castelhanos',
  },
  {
    texto:
      'Optei pelo Tour Sensacional… Adorei!! As fotos ficaram divinas. O guia Ernani foi muito atencioso e nos presenteou com fotos e vídeos. Super recomendo!',
    autor: 'Tour Sensacional',
  },
  {
    texto:
      'Optamos pelo passeio de Barco para a Praia do Bonete e foi maravilhoso. Passamos pelo Buraco do Cação… Na volta vimos golfinhos. Foi mágico.',
    autor: 'Barco para o Bonete',
  },
  {
    texto: 'O melhor guia de Ilhabela! Levou minha família pra conhecer o que tem de mais bonito na ilha.',
    autor: 'Passeio em família',
  },
  {
    texto: 'O guia é TOP! Fui no circuito de cachoeiras e adorei!!! Na próxima quero fazer mergulho.',
    autor: 'Circuito de Cachoeiras',
  },
]

export default function Reviews() {
  const [ref, shown] = useReveal()

  return (
    <section id="avaliacoes" className="relative scroll-mt-20 overflow-hidden bg-navy/30 py-20 sm:py-28">
      <div className="topo" />
      <div className="container-x relative z-10">
        <header ref={ref} className={`mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end ${shown ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="max-w-xl">
            <span className="eyebrow">Quem foi, recomenda</span>
            <h2 className="h-display mt-3 text-[clamp(2rem,6vw,3.5rem)]">
              Avaliações <span className="text-accent">reais</span>
            </h2>
            <div className="mt-3 flex items-center gap-2 text-gold" aria-label="5 de 5 estrelas">
              {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} size={20} />)}
              <span className="ml-1 font-body text-sm text-sand/70">no Google Meu Negócio</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={ALBUM_URL} target="_blank" rel="noopener noreferrer" className="btn-sun">
              Ver álbum de avaliações <IconArrow size={16} />
            </a>
            <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Ver no Google <IconArrow size={16} />
            </a>
          </div>
        </header>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {DEPOIMENTOS.map((d, i) => (
            <figure
              key={i}
              className="break-inside-avoid rounded-2xl border border-sand/12 bg-ink/50 p-6 shadow-card"
              style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
            >
              <span className="block font-display text-5xl leading-none text-gold/60" aria-hidden="true">“</span>
              <blockquote className="-mt-3 font-body text-sand/90">{d.texto}</blockquote>
              <figcaption className="mt-4 flex items-center gap-2">
                <span className="flex text-gold" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((s) => <IconStar key={s} size={14} />)}
                </span>
                <span className="font-body text-xs text-sand/60">— {d.autor}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
