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
    name: 'nah & gut Hohenprießnitz',
    adresse: 'Dübener Straße 12',
    plz: '04838',
    stadt: 'Hohenprießnitz',
    entfernung: '2,3 km',
    oeffnungszeiten: 'Mo–Fr 7:00–19:00, Sa 7:00–14:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 2,
    name: 'nah & gut Doberschütz',
    adresse: 'Breite Straße 21',
    plz: '04838',
    stadt: 'Doberschütz',
    entfernung: '5,1 km',
    oeffnungszeiten: 'Mo–Fr 8:00–18:00, Sa 7:00–12:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 3,
    name: 'nah & gut Wermsdorf',
    adresse: 'Clara-Zetkin-Straße 15',
    plz: '04779',
    stadt: 'Wermsdorf',
    entfernung: '8,7 km',
    oeffnungszeiten: 'Mo–Sa 7:00–19:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 4,
    name: 'nah & gut Beilrode',
    adresse: 'Bahnhofstraße 11',
    plz: '04886',
    stadt: 'Beilrode',
    entfernung: '12,4 km',
    oeffnungszeiten: 'Mo–Fr 7:00–18:00, Sa 7:00–13:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 5,
    name: 'nah & gut Falkenhain',
    adresse: 'Karl-Marx-Straße 16',
    plz: '04808',
    stadt: 'Falkenhain',
    entfernung: '6,8 km',
    oeffnungszeiten: 'Mo–Fr 7:00–19:00, Sa 7:00–14:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 6,
    name: 'nah & gut Riesa',
    adresse: 'Humboldtring 1',
    plz: '01589',
    stadt: 'Riesa',
    entfernung: '24,5 km',
    oeffnungszeiten: 'Mo–Fr 8:00–20:00, Sa 8:00–16:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 7,
    name: 'nah & gut Jesewitz',
    adresse: 'Leipziger Straße 15',
    plz: '04838',
    stadt: 'Jesewitz',
    entfernung: '9,2 km',
    oeffnungszeiten: 'Mo–Fr 7:00–19:00, Sa 7:00–14:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 8,
    name: 'nah & gut Hohburg',
    adresse: 'Am Lossatal 34',
    plz: '04808',
    stadt: 'Hohburg',
    entfernung: '11,3 km',
    oeffnungszeiten: 'Mo–Fr 7:00–18:30, Sa 7:00–13:00',
    abholzeiten: generiereSlots(),
  },
  {
    id: 9,
    name: 'nah & gut Torgau',
    adresse: 'Eilenburger Straße 2',
    plz: '04860',
    stadt: 'Torgau',
    entfernung: '18,6 km',
    oeffnungszeiten: 'Mo–Fr 7:00–20:00, Sa 7:00–18:00',
    abholzeiten: generiereSlots(),
  },
]
