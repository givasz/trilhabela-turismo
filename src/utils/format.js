// Máscara de telefone BR: (00) 00000-0000
export function maskTelefone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.replace(/(\d{0,2})/, '($1')
  if (d.length <= 6) return d.replace(/(\d{2})(\d{0,4})/, '($1) $2')
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
}

// Converte "YYYY-MM-DD" -> "DD/MM/YYYY"
export const dataBR = (iso) => (iso ? iso.split('-').reverse().join('/') : '')
