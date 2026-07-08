export const WHATSAPP_NUMERO = '5512991226986'

// Monta a URL wa.me com a mensagem pré-formatada (seção 2 do plano).
export function montaUrlReserva({ nome, telefone, produto, data, pessoas }) {
  const linhas = [
    'Olá! Vim pelo site da Trilhabela 🌴',
    `*Nome:* ${nome || ''}`,
    `*Telefone:* ${telefone || ''}`,
    `*Passeio:* ${produto || ''}`,
    `*Data de interesse:* ${data || ''}`,
    `*Nº de pessoas:* ${pessoas || ''}`,
  ]
  const texto = encodeURIComponent(linhas.join('\n'))
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
}

// Link rápido com apenas o nome do passeio (CTA dos cards / consulta).
export function urlPasseio(nomePasseio) {
  const texto = encodeURIComponent(
    `Olá! Vim pelo site da Trilhabela 🌴\nTenho interesse no passeio: *${nomePasseio}*. Pode me passar mais informações?`,
  )
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
}

export function urlSimples(texto = 'Olá! Vim pelo site da Trilhabela 🌴 Gostaria de mais informações.') {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`
}
