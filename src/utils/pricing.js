import { TABELAS } from '../data/pricingTables.js'

// Retorna o preço POR PESSOA de acordo com o tamanho do grupo (seção 4).
// tabela ex.: { 1: 500, 2: 400, 3: 300, "4+": 250 }
export function precoPorPessoa(tabela, pessoas) {
  if (pessoas >= 4) return tabela['4+']
  return tabela[pessoas]
}

export const total = (tabela, pessoas) => precoPorPessoa(tabela, pessoas) * pessoas

// Helpers que trabalham direto com o objeto `preco` de um tour.

// Menor valor "a partir de" para exibir no card.
export function precoAPartirDe(preco) {
  if (preco.tipo === 'fixo') return preco.valor
  if (preco.tipo === 'tabela') return TABELAS[preco.tabelaKey]['4+']
  return null // consulta
}

// Valor de 1 pessoa (exclusivo).
export function precoSolo(preco) {
  if (preco.tipo === 'fixo') return preco.valor
  if (preco.tipo === 'tabela') return TABELAS[preco.tabelaKey][1]
  return null
}

// Preço por pessoa para um tour dado o nº de pessoas.
export function porPessoaDoTour(preco, pessoas) {
  if (preco.tipo === 'fixo') return preco.valor
  if (preco.tipo === 'tabela') return precoPorPessoa(TABELAS[preco.tabelaKey], pessoas)
  return null
}

// Total para um tour dado o nº de pessoas.
export function totalDoTour(preco, pessoas) {
  const pp = porPessoaDoTour(preco, pessoas)
  return pp == null ? null : pp * pessoas
}

// Linhas da tabela completa (4 faixas) para um tour de tabela.
export function linhasTabela(preco) {
  if (preco.tipo !== 'tabela') return []
  const t = TABELAS[preco.tabelaKey]
  return [
    { faixa: '1 pessoa', porPessoa: t[1], totalGrupo: t[1] },
    { faixa: '2 pessoas', porPessoa: t[2], totalGrupo: t[2] * 2 },
    { faixa: '3 pessoas', porPessoa: t[3], totalGrupo: t[3] * 3 },
    { faixa: '4+ pessoas', porPessoa: t['4+'], totalGrupo: t['4+'] * 4, plus: true },
  ]
}

export const brl = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v)
