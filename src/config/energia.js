/* =========================================================
   PARÂMETROS DA CALCULADORA — EQUATORIAL PIAUÍ (TERESINA)
   ---------------------------------------------------------
   Ajuste aqui sempre que houver reajuste tarifário.
   Referência: reajuste ANEEL de 13,28% para o grupo B1
   (residencial), vigente a partir de 02/12/2025
   (Resolução Homologatória nº 3.555).
   ========================================================= */

export const ENERGIA = {
  // Tarifa final média B1 com tributos (TE + TUSD + ICMS + PIS/COFINS), R$/kWh
  tarifaFinal: 1.18,

  // Parcela TUSD Fio B estimada (sem tributos), R$/kWh
  tusdFioB: 0.32,

  // Lei 14.300/2022 — percentual do Fio B cobrado sobre a energia compensada
  // 2023: 15% | 2024: 30% | 2025: 45% | 2026: 60% | 2027: 75% | 2028: 90%
  percentualFioB: 0.6,

  // Parcela da geração consumida no mesmo instante (não paga Fio B)
  simultaneidade: 0.3,

  // Contribuição de iluminação pública média (CIP/COSIP) em Teresina, R$/mês
  iluminacaoPublica: 22,

  // Geração média mensal por kWp instalado em Teresina (irradiação ~5,6 kWh/m²/dia)
  geracaoPorKwp: 135,

  // Módulo fotovoltaico de referência
  potenciaModuloW: 610,
  areaModuloM2: 2.7,

  // Reajuste médio anual estimado da tarifa (para projeção de longo prazo)
  reajusteAnual: 0.045,

  // Vida útil considerada (anos)
  vidaUtil: 25,
};

// Custo de disponibilidade (kWh mínimos faturados) conforme o padrão de entrada
export function custoDisponibilidadeKwh(consumoKwh) {
  if (consumoKwh <= 220) return 30; // monofásico
  if (consumoKwh <= 650) return 50; // bifásico
  return 100; // trifásico
}

// Preço médio de mercado do sistema instalado (R$/Wp), por faixa de potência
export function precoPorWp(kwp) {
  if (kwp <= 4) return 3.8;
  if (kwp <= 8) return 3.5;
  if (kwp <= 15) return 3.2;
  if (kwp <= 40) return 2.9;
  return 2.6;
}

export function calcularEconomia(contaMensal) {
  const e = ENERGIA;

  if (!contaMensal || contaMensal <= e.iluminacaoPublica + 30) {
    return null;
  }

  // 1) Consumo estimado a partir do valor da conta
  const consumo = (contaMensal - e.iluminacaoPublica) / e.tarifaFinal;

  // 2) Dimensionamento do sistema
  const kwp = consumo / e.geracaoPorKwp;
  const modulos = Math.max(4, Math.ceil((kwp * 1000) / e.potenciaModuloW));
  const kwpReal = (modulos * e.potenciaModuloW) / 1000;
  const geracao = kwpReal * e.geracaoPorKwp;
  const area = modulos * e.areaModuloM2;

  // 3) Nova conta (Lei 14.300): maior valor entre custo de disponibilidade
  //    e Fio B sobre a energia compensada, + iluminação pública
  const disponibilidade = custoDisponibilidadeKwh(consumo) * e.tarifaFinal;
  const energiaCompensada = consumo * (1 - e.simultaneidade);
  const custoFioB = energiaCompensada * e.tusdFioB * e.percentualFioB * 1.38; // com tributos
  const novaConta = Math.max(disponibilidade, custoFioB) + e.iluminacaoPublica;

  const economiaMensal = Math.max(0, contaMensal - novaConta);
  const economiaAnual = economiaMensal * 12;
  const percentual = economiaMensal / contaMensal;

  // 4) Investimento e retorno
  const investimento = kwpReal * 1000 * precoPorWp(kwpReal);
  const payback = economiaAnual > 0 ? investimento / economiaAnual : 0;

  // 5) Economia acumulada em 25 anos com reajuste tarifário
  let economiaVidaUtil = 0;
  for (let ano = 0; ano < e.vidaUtil; ano += 1) {
    const degradacao = 1 - 0.005 * ano;
    economiaVidaUtil += economiaAnual * (1 + e.reajusteAnual) ** ano * degradacao;
  }

  return {
    conta: contaMensal,
    consumo,
    kwp: kwpReal,
    modulos,
    geracao,
    area,
    novaConta,
    economiaMensal,
    economiaAnual,
    percentual,
    investimento,
    payback,
    economiaVidaUtil,
  };
}

export function formatBRL(value, digits = 0) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatNumber(value, digits = 0) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
