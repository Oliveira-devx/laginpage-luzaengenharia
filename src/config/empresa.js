/* =========================================================
   DADOS INSTITUCIONAIS DA LUZA — PREENCHA COM DADOS REAIS
   ---------------------------------------------------------
   Nada aqui deve ser inventado. Itens com `value: null`
   não aparecem no site até serem preenchidos.
   ========================================================= */

// Indicadores de autoridade (Seção A).
// value: número (o contador anima até ele) | prefix/suffix opcionais.
export const INDICADORES = [
  { key: "projetos", label: "Projetos realizados", value: null, prefix: "+", suffix: "" },
  { key: "potencia", label: "Potência instalada", value: null, prefix: "", suffix: " kWp" },
  { key: "clientes", label: "Clientes atendidos", value: null, prefix: "+", suffix: "" },
  { key: "anos", label: "Anos de experiência", value: 6, prefix: "", suffix: "" },
];

// Fatos já confirmados no site atual (sempre exibidos)
export const FATOS = [
  { value: 3, label: "Estados atendidos", detail: "Piauí • Maranhão • Ceará" },
  { value: 1, label: "Base própria", detail: "Teresina — PI", pad: true },
];

// Projetos realizados (Seção D).
// Troque as imagens pelas fotos reais das obras e preencha os dados quando houver.
export const PROJETOS = [
  { image: "/images/servico-solar.webp", tipo: "Residencial", titulo: "Sistema fotovoltaico em telhado", cidade: "", potencia: "", destaque: true },
  { image: "/images/energia-limpa.webp", tipo: "Comercial", titulo: "Geração para empresa", cidade: "", potencia: "" },
  { image: "/images/sobre-luza.webp", tipo: "Instalação", titulo: "Montagem e estrutura", cidade: "", potencia: "" },
  { image: "/images/servico-manutencao.webp", tipo: "Manutenção", titulo: "Limpeza e inspeção de módulos", cidade: "", potencia: "" },
];

// Depoimentos reais (Seção F). Formato:
// { nome: "Maria S.", cidade: "Teresina — PI", tipo: "Residencial", texto: "...", nota: 5 }
export const DEPOIMENTOS = [];

export const INSTAGRAM_URL = "https://www.instagram.com/luza_engenhariasolar/";
