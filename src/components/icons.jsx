// Ícones de UI em SVG (sem emojis como ícones — seção 5.7). Decorativos: aria-hidden.

const stroke = ({ size = 20, ...p }) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  ...p,
})

export const IconWhatsApp = ({ size = 22, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...p}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
)

export const IconClock = (p) => (
  <svg {...stroke(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const IconLevel = (p) => (
  <svg {...stroke(p)}><path d="M3 20h18" /><path d="m6 20 5-12 4 7 2-4 1 9" /></svg>
)
export const IconUsers = (p) => (
  <svg {...stroke(p)}><path d="M16 19a4 4 0 0 0-8 0" /><circle cx="12" cy="9" r="3" /><path d="M5 19a3 3 0 0 1 3-3" /><path d="M19 19a3 3 0 0 0-3-3" /></svg>
)
export const IconPin = (p) => (
  <svg {...stroke(p)}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
)
export const IconCheck = (p) => (
  <svg {...stroke(p)}><path d="m4 12 5 5L20 6" /></svg>
)
export const IconStar = ({ size = 18, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...p}>
    <path d="m12 2 2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
  </svg>
)
export const IconFoot = (p) => (
  <svg {...stroke(p)}><path d="M7 14c-1 2-1 4 1 5s3-1 3-3" /><ellipse cx="9" cy="7" rx="2.5" ry="4" /><circle cx="15" cy="5" r="1.2" /><circle cx="17.5" cy="7" r="1" /><circle cx="18" cy="10" r="1" /></svg>
)
export const IconClose = (p) => (
  <svg {...stroke(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const IconArrow = (p) => (
  <svg {...stroke(p)}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
)
export const IconShield = (p) => (
  <svg {...stroke(p)}><path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
)
export const IconPlus = (p) => (
  <svg {...stroke(p)}><path d="M12 5v14M5 12h14" /></svg>
)
export const IconMinus = (p) => (
  <svg {...stroke(p)}><path d="M5 12h14" /></svg>
)
export const IconChevron = (p) => (
  <svg {...stroke(p)}><path d="m6 9 6 6 6-6" /></svg>
)
export const IconCalendar = (p) => (
  <svg {...stroke(p)}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v3M16 3v3" /></svg>
)
export const IconPen = (p) => (
  <svg {...stroke(p)}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
)
export const IconSun = (p) => (
  <svg {...stroke(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>
)
export const IconMoon = (p) => (
  <svg {...stroke(p)}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
)
export const IconInstagram = (p) => (
  <svg {...stroke(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
)
export const IconFacebook = ({ size = 20, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...p}>
    <path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8h3z" />
  </svg>
)
export const IconYouTube = ({ size = 20, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...p}>
    <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15V9l5.2 3-5.2 3z" />
  </svg>
)
export const IconTikTok = ({ size = 20, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...p}>
    <path d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.5c-1.3.1-2.5-.3-3.6-1v5.6c0 4-3.3 6.3-6.6 5.4-3-.8-4.2-4.3-2.4-6.9 1-1.4 2.7-2.1 4.5-1.9v2.6c-.4-.1-.9-.1-1.3 0-1.2.3-1.8 1.4-1.4 2.5.4 1.2 2 1.6 3 .7.5-.4.7-1 .7-1.8V3h3.6z" />
  </svg>
)
export const IconMail = (p) => (
  <svg {...stroke(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const IconGlobe = (p) => (
  <svg {...stroke(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></svg>
)
export const IconShop = (p) => (
  <svg {...stroke(p)}><path d="M4 4h16l-1 5a3 3 0 0 1-6 0 3 3 0 0 1-6 0L4 4Z" /><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" /></svg>
)
export const IconTicket = (p) => (
  <svg {...stroke(p)}><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" /><path d="M13 7v2M13 13v2" /></svg>
)
export const IconDownload = (p) => (
  <svg {...stroke(p)}><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
)
