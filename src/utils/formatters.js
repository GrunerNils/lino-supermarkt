export function formatPreis(betrag) {
  return betrag.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
}

export function formatDatum(isoString) {
  return new Date(isoString).toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
}

export function generiereBestellId() {
  return 'EDEKA-' + Date.now()
}

export function berechneMwSt(betrag, satz = 0.19) {
  return betrag * satz
}
