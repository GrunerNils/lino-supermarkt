// Generiert Abholzeitslots für die nächsten 7 Tage
function generiereSlots() {
  const slots = []
  const heute = new Date()
  for (let i = 1; i <= 7; i++) {
    const datum = new Date(heute)
    datum.setDate(heute.getDate() + i)
    const datumStr = datum.toISOString().split('T')[0]
    const wochentag = datum.toLocaleDateString('de-DE', { weekday: 'long' })
    const tag = datum.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
    slots.push({
      datum: datumStr,
      anzeige: `${wochentag}, ${tag}`,
      zeiten: ['08:00–09:00', '09:00–10:00', '10:00–11:00', '11:00–12:00',
               '13:00–14:00', '14:00–15:00', '15:00–16:00', '16:00–17:00',
               '17:00–18:00', '18:00–19:00'],
    })
  }
  return slots
}

export const MAERKTE = [
  {
    id: 1,
    name: 'EDEKA Müller',
    adresse: 'Hauptstraße 15',
    plz: '70173',
    stadt: 'Stuttgart',
    entfernung: '0,8 km',
    oeffnungszeiten: 'Mo–Sa 7:00–21:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 2,
    name: 'EDEKA Schneider',
    adresse: 'Königsallee 42',
    plz: '70176',
    stadt: 'Stuttgart',
    entfernung: '1,4 km',
    oeffnungszeiten: 'Mo–Sa 7:00–22:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 3,
    name: 'EDEKA Wagner',
    adresse: 'Marktplatz 7',
    plz: '70178',
    stadt: 'Stuttgart',
    entfernung: '2,1 km',
    oeffnungszeiten: 'Mo–Sa 8:00–20:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 4,
    name: 'EDEKA Fischer',
    adresse: 'Schillerstraße 88',
    plz: '70182',
    stadt: 'Stuttgart',
    entfernung: '3,5 km',
    oeffnungszeiten: 'Mo–Sa 7:30–21:30',
    abholzeiten: generiereSlots(),
  },
  {
    id: 5,
    name: 'EDEKA Hoffmann',
    adresse: 'Am Bahnhof 3',
    plz: '70184',
    stadt: 'Stuttgart',
    entfernung: '4,2 km',
    oeffnungszeiten: 'Mo–Sa 6:00–22:00',
    abholzeiten: generiereSlots(),
  },
]
