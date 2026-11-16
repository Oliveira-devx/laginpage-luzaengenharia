/* Eventos globais simples para conectar componentes sem prop drilling */

export const EVENTS = {
  OPEN_VISIT: "luza:open-visit",
  SET_BILL: "luza:set-bill",
  READY: "luza:ready",
};

export function openTechVisit(origin = "site") {
  window.dispatchEvent(
    new CustomEvent(EVENTS.OPEN_VISIT, { detail: { origin } })
  );
}

export function sendBillToSimulator(value) {
  window.dispatchEvent(
    new CustomEvent(EVENTS.SET_BILL, { detail: { value } })
  );

  document
    .getElementById("simulador")
    ?.scrollIntoView({ behavior: "smooth" });
}
