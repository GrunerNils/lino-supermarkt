/**
 * Entfernungsberechnung zwischen zwei GPS-Koordinaten
 * Haversine-Formel — gibt Entfernung in km zurück
 */
export function entfernungBerechnen(lat1, lon1, lat2, lon2) {
  const R = 6371 // Erdradius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function entfernungFormatieren(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`
  if (km < 10) return `${km.toFixed(1)} km`
  return `${Math.round(km)} km`
}

/**
 * Märkte nach Entfernung von einem Standort sortieren
 */
export function maerkteNachEntfernungSortieren(maerkte, userLat, userLon) {
  return maerkte
    .map(m => ({
      ...m,
      entfernungKm: m.latitude && m.longitude
        ? entfernungBerechnen(userLat, userLon, m.latitude, m.longitude)
        : 999,
      entfernung: m.latitude && m.longitude
        ? entfernungFormatieren(entfernungBerechnen(userLat, userLon, m.latitude, m.longitude))
        : m.entfernung || '–',
    }))
    .sort((a, b) => a.entfernungKm - b.entfernungKm)
}

/**
 * PLZ zu Koordinaten auflösen (nutzt OpenStreetMap Nominatim — kostenlos)
 */
export async function plzZuKoordinaten(plz) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=de&format=json&limit=1`,
      { headers: { 'Accept-Language': 'de' } }
    )
    const data = await res.json()
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        ort: data[0].display_name.split(',')[0],
      }
    }
  } catch (e) {
    console.error('PLZ Auflösung fehlgeschlagen:', e)
  }
  return null
}
