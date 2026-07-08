// Tabelas de preço POR PESSOA (cai conforme o grupo cresce) — seção 4 do plano.
export const TABELAS = {
  padrao: { 1: 500, 2: 400, 3: 300, '4+': 250 },
  cachoeiras: { 1: 400, 2: 300, 3: 250, '4+': 200 },
  travessia: { 1: 1500, 2: 1300, 3: 1200, '4+': 1000 },
}

export const TABELA_LABEL = {
  padrao: 'Tabela padrão',
  cachoeiras: 'Tabela cachoeiras',
  travessia: 'Guiamento Travessia',
}
