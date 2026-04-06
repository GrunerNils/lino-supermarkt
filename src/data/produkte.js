export const PRODUKTE = [
  // ── Obst & Gemüse ──────────────────────────────────────────────
  {
    id: 1, name: 'Gala Äpfel', gewicht: '1 kg', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Obst',
    preis: 1.99, grundpreis: '1,99 €/kg', einheit: 'kg',
    bild: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
    beschreibung: 'Knackige Gala Äpfel aus regionalem Anbau. Süßlich mit milder Säure.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 312, inStock: true,
  },
  {
    id: 2, name: 'Bio Bananen', gewicht: '1 kg', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Obst',
    preis: 2.49, grundpreis: '2,49 €/kg', einheit: 'kg',
    bild: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
    beschreibung: 'Bio-Bananen aus kontrolliert biologischem Anbau. Reif und cremig.',
    badges: ['Bio'], originalPreis: null, bewertung: 4.7, bewertungsAnzahl: 528, inStock: true,
  },
  {
    id: 3, name: 'Paprika Sweet Palermo', gewicht: '200g', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Gemüse',
    preis: 1.89, grundpreis: '0,94 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80',
    beschreibung: 'Süße Snackpaprika, ideal für unterwegs oder als Beilage.',
    badges: [], originalPreis: 2.29, bewertung: 4.6, bewertungsAnzahl: 187, inStock: true,
  },
  {
    id: 4, name: 'Cherry Rispentomaten', gewicht: '250g', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Gemüse',
    preis: 1.49, grundpreis: '0,60 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?w=400&q=80',
    beschreibung: 'Süße Cherrytomaten am Stil, vollreif und aromatisch.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 5, name: 'Bio Brokkoli', gewicht: '1 Stück ca. 400g', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Gemüse',
    preis: 1.29, grundpreis: '0,32 €/100g', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80',
    beschreibung: 'Frischer Bio-Brokkoli aus heimischem Anbau. Reich an Vitaminen.',
    badges: ['Bio', 'Regional'], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 203, inStock: true,
  },
  {
    id: 6, name: 'Karotten', gewicht: '1 kg', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Gemüse',
    preis: 0.99, grundpreis: '0,99 €/kg', einheit: 'kg',
    bild: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    beschreibung: 'Frische Karotten, knackig und süß. Ideal für Suppen und Rohkost.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 156, inStock: true,
  },
  {
    id: 7, name: 'Avocado', gewicht: '1 Stück', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Obst',
    preis: 1.29, grundpreis: '1,29 €/Stück', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80',
    beschreibung: 'Reife Avocado, cremig und nussig. Perfekt für Guacamole.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 389, inStock: true,
  },
  {
    id: 8, name: 'Erdbeeren', gewicht: '500g', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Obst',
    preis: 3.49, grundpreis: '0,70 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80',
    beschreibung: 'Aromatische Erdbeeren aus der Region. Frisch gepflückt.',
    badges: ['Regional', 'Saisonal'], originalPreis: null, bewertung: 4.9, bewertungsAnzahl: 612, inStock: true,
  },
  {
    id: 9, name: 'Bio Gurke', gewicht: '1 Stück', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Gemüse',
    preis: 0.89, grundpreis: '0,89 €/Stück', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&q=80',
    beschreibung: 'Bio-Salatgurke, frisch und knackig. Ohne Pestizide angebaut.',
    badges: ['Bio'], originalPreis: 1.09, bewertung: 4.2, bewertungsAnzahl: 134, inStock: true,
  },
  {
    id: 10, name: 'Salat Mix', gewicht: '150g', kategorie: 'obst-gemuese', unterkategorie: 'Frische Kräuter',
    preis: 1.79, grundpreis: '1,19 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    beschreibung: 'Bunter Salat-Mix, gewaschen und abgetropft. Sofort einsatzbereit.',
    badges: ['Bio'], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 278, inStock: true,
  },

  // ── Milch & Molkerei ────────────────────────────────────────────
  {
    id: 11, name: 'EDEKA Vollmilch', gewicht: '1 L', kategorie: 'kaese-eier-molkerei', unterkategorie: 'Milch & Sahne',
    preis: 1.29, grundpreis: '1,29 €/L', einheit: 'L',
    bild: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    beschreibung: 'Frische Vollmilch 3,5% Fett von regionalen EDEKA-Landwirten.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.7, bewertungsAnzahl: 891, inStock: true,
  },
  {
    id: 12, name: 'Gouda Scheiben', gewicht: '400g', kategorie: 'kaese-eier-molkerei', unterkategorie: 'Käse',
    preis: 2.99, grundpreis: '0,75 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80',
    beschreibung: 'Junger Gouda in praktischen Scheiben. Mild und cremig.',
    badges: [], originalPreis: 3.49, bewertung: 4.4, bewertungsAnzahl: 234, inStock: true,
  },
  {
    id: 13, name: 'Naturjoghurt', gewicht: '500g', kategorie: 'kaese-eier-molkerei', unterkategorie: 'Joghurt & Quark',
    preis: 0.99, grundpreis: '0,20 €/100g', einheit: 'Becher',
    bild: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    beschreibung: 'Cremiger Naturjoghurt 3,5% Fett. Reich an Milchsäurebakterien.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 14, name: 'Bio Freiland Eier', gewicht: '10 Stück', kategorie: 'kaese-eier-molkerei', unterkategorie: 'Eier',
    preis: 3.49, grundpreis: '0,35 €/Stück', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80',
    beschreibung: 'Bio-Freilandeier von glücklichen Hühnern aus der Region.',
    badges: ['Bio', 'Regional'], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 567, inStock: true,
  },

  // ── Backwaren ────────────────────────────────────────────────────
  {
    id: 15, name: 'Vollkornbrot', gewicht: '500g', kategorie: 'brot-cerealien', unterkategorie: 'Brot & Brötchen',
    preis: 2.29, grundpreis: '0,46 €/100g', einheit: 'Laib',
    bild: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    beschreibung: 'Saftiges Vollkornbrot mit Körnern. Lang anhaltende Sättigung.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 334, inStock: true,
  },
  {
    id: 16, name: 'Croissants', gewicht: '6 Stück', kategorie: 'brot-cerealien', unterkategorie: 'Croissants & Plunder',
    preis: 1.99, grundpreis: '0,33 €/Stück', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    beschreibung: 'Butterige Croissants, frisch gebacken. Knusprig außen, zart innen.',
    badges: [], originalPreis: 2.49, bewertung: 4.7, bewertungsAnzahl: 478, inStock: true,
  },

  // ── Getränke ─────────────────────────────────────────────────────
  {
    id: 17, name: 'Mineralwasser still', gewicht: '1,5 L', kategorie: 'getraenke', unterkategorie: 'Wasser & Säfte',
    preis: 0.29, grundpreis: '0,19 €/L', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
    beschreibung: 'Stilles Mineralwasser aus natürlicher Quelle. Pfandflasche.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 1234, inStock: true,
  },
  {
    id: 18, name: 'Apfelsaft naturtrüb', gewicht: '1 L', kategorie: 'getraenke', unterkategorie: 'Wasser & Säfte',
    preis: 1.79, grundpreis: '1,79 €/L', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80',
    beschreibung: 'Naturtrüber Apfelsaft, direkt gepresst. 100% Direktsaft.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 389, inStock: true,
  },
  {
    id: 19, name: 'Cola 6-Pack', gewicht: '6 × 0,33 L', kategorie: 'getraenke', unterkategorie: 'Softdrinks',
    preis: 3.49, grundpreis: '1,76 €/L', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80',
    beschreibung: 'Erfrischende Cola in praktischen 0,33L Dosen.',
    badges: [], originalPreis: 3.99, bewertung: 4.5, bewertungsAnzahl: 678, inStock: true,
  },

  // ── Fleisch ──────────────────────────────────────────────────────
  {
    id: 20, name: 'Hähnchenbrustfilet', gewicht: '500g', kategorie: 'fleisch-fisch', unterkategorie: 'Geflügel',
    preis: 4.99, grundpreis: '0,99 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80',
    beschreibung: 'Frisches Hähnchenbrustfilet aus Freilandhaltung.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 312, inStock: true,
  },
  {
    id: 21, name: 'Rinderhackfleisch', gewicht: '400g', kategorie: 'fleisch-fisch', unterkategorie: 'Rind & Schwein',
    preis: 3.49, grundpreis: '0,87 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80',
    beschreibung: 'Frisches Rinderhackfleisch, 20% Fettanteil. Ideal für Bolognese.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 245, inStock: true,
  },

  // ── Tiefkühlkost ─────────────────────────────────────────────────
  {
    id: 22, name: 'TK Erbsen', gewicht: '750g', kategorie: 'tiefkuehlkost', unterkategorie: 'TK-Gemüse',
    preis: 1.49, grundpreis: '0,20 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&q=80',
    beschreibung: 'Tiefgekühlte Erbsen, sofort nach der Ernte schockgefroren.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 189, inStock: true,
  },
  {
    id: 23, name: 'TK Margherita Pizza', gewicht: '370g', kategorie: 'tiefkuehlkost', unterkategorie: 'TK-Pizza',
    preis: 2.49, grundpreis: '0,67 €/100g', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    beschreibung: 'Knusprige Steinofen-Pizza Margherita mit Mozzarella.',
    badges: [], originalPreis: 2.99, bewertung: 4.2, bewertungsAnzahl: 456, inStock: true,
  },

  // ── Süßes ────────────────────────────────────────────────────────
  {
    id: 24, name: 'Vollmilch Schokolade', gewicht: '100g', kategorie: 'suesses-salziges', unterkategorie: 'Schokolade',
    preis: 0.99, grundpreis: '0,99 €/100g', einheit: 'Tafel',
    bild: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80',
    beschreibung: 'Cremige Vollmilchschokolade. Der Klassiker.',
    badges: [], originalPreis: null, bewertung: 4.7, bewertungsAnzahl: 934, inStock: true,
  },
  {
    id: 25, name: 'Kartoffelchips', gewicht: '175g', kategorie: 'suesses-salziges', unterkategorie: 'Chips & Snacks',
    preis: 1.49, grundpreis: '0,85 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    beschreibung: 'Knusprige Kartoffelchips, leicht gesalzen.',
    badges: [], originalPreis: 1.79, bewertung: 4.5, bewertungsAnzahl: 567, inStock: true,
  },

  // ── Kaffee & Tee ─────────────────────────────────────────────────
  {
    id: 26, name: 'Arabica Kaffeebohnen', gewicht: '500g', kategorie: 'kaffee-tee', unterkategorie: 'Kaffee',
    preis: 5.99, grundpreis: '1,20 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
    beschreibung: '100% Arabica Kaffeebohnen, mittlere Röstung. Aromatisch und mild.',
    badges: [], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 723, inStock: true,
  },

  // ── Drogerie ─────────────────────────────────────────────────────
  {
    id: 27, name: 'Handseife', gewicht: '300ml', kategorie: 'drogerie', unterkategorie: 'Körperpflege',
    preis: 1.99, grundpreis: '0,66 €/100ml', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80',
    beschreibung: 'Pflegende Flüssigseife mit Aloe-Vera-Extrakt.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 234, inStock: true,
  },

  // ── Haus & Freizeit ──────────────────────────────────────────────
  {
    id: 28, name: 'Küchenpapier 3-lagig', gewicht: '4 Rollen', kategorie: 'haus-freizeit', unterkategorie: 'Haushaltswaren',
    preis: 2.49, grundpreis: '0,62 €/Rolle', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    beschreibung: '3-lagiges Küchenpapier, extra saugstark.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 445, inStock: true,
  },

  // ── Öle & Saucen ─────────────────────────────────────────────────
  {
    id: 29, name: 'Olivenöl extra vergine', gewicht: '500ml', kategorie: 'oele-saucen', unterkategorie: 'Speiseöle',
    preis: 5.49, grundpreis: '1,10 €/100ml', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    beschreibung: 'Natives Olivenöl extra vergine, kalt gepresst. Herkunft: Griechenland.',
    badges: [], originalPreis: 6.99, bewertung: 4.7, bewertungsAnzahl: 389, inStock: true,
  },

  // ── Fertiggerichte ────────────────────────────────────────────────
  {
    id: 30, name: 'Tomatensuppe', gewicht: '800ml', kategorie: 'fertiggerichte', unterkategorie: 'Suppen',
    preis: 1.99, grundpreis: '0,25 €/100ml', einheit: 'Dose',
    bild: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
    beschreibung: 'Cremige Tomatensuppe, einfach erhitzen und genießen.',
    badges: [], originalPreis: null, bewertung: 4.1, bewertungsAnzahl: 167, inStock: true,
  },
  {
    id: 31, name: 'Linsensuppe', gewicht: '800ml', kategorie: 'fertiggerichte', unterkategorie: 'Suppen',
    preis: 2.29, grundpreis: '0,29 €/100ml', einheit: 'Dose',
    bild: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80',
    beschreibung: 'Herzhafte Linsensuppe nach Hausmannsart.',
    badges: [], originalPreis: null, bewertung: 4.2, bewertungsAnzahl: 134, inStock: true,
  },
  {
    id: 32, name: 'Spaghetti Bolognese', gewicht: '400g', kategorie: 'fertiggerichte', unterkategorie: 'Fertiggerichte',
    preis: 2.99, grundpreis: '0,75 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&q=80',
    beschreibung: 'Klassische Spaghetti Bolognese – in 5 Minuten fertig.',
    badges: [], originalPreis: 3.49, bewertung: 4.0, bewertungsAnzahl: 289, inStock: true,
  },
  {
    id: 33, name: 'Thunfisch in Öl', gewicht: '185g', kategorie: 'fertiggerichte', unterkategorie: 'Konserven',
    preis: 1.49, grundpreis: '0,81 €/100g', einheit: 'Dose',
    bild: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80',
    beschreibung: 'Thunfischfilet in Sonnenblumenöl eingelegt.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 312, inStock: true,
  },

  // ── Obst & Gemüse (weitere) ────────────────────────────────────────
  {
    id: 34, name: 'Zitronen', gewicht: '500g (ca. 3 Stück)', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Obst',
    preis: 0.99, grundpreis: '0,20 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&q=80',
    beschreibung: 'Frische Zitronen, saftig und aromatisch.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 201, inStock: true,
  },
  {
    id: 35, name: 'Heidelbeeren', gewicht: '125g', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Obst',
    preis: 2.49, grundpreis: '1,99 €/100g', einheit: 'Schale',
    bild: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80',
    beschreibung: 'Süße Heidelbeeren, vollgepackt mit Antioxidantien.',
    badges: ['Bio'], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 36, name: 'Spinat frisch', gewicht: '200g', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Gemüse',
    preis: 1.59, grundpreis: '0,80 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
    beschreibung: 'Frischer Babyspinat, gewaschen und verzehrfertig.',
    badges: ['Bio'], originalPreis: 1.99, bewertung: 4.5, bewertungsAnzahl: 178, inStock: true,
  },
  {
    id: 37, name: 'Zwiebeln', gewicht: '1 kg', kategorie: 'obst-gemuese', unterkategorie: 'Frisches Gemüse',
    preis: 0.89, grundpreis: '0,89 €/kg', einheit: 'Netz',
    bild: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80',
    beschreibung: 'Gelbe Zwiebeln aus regionalem Anbau.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.2, bewertungsAnzahl: 134, inStock: true,
  },

  // ── Fleisch & Fisch (weitere) ──────────────────────────────────────
  {
    id: 38, name: 'Schweineschnitzel', gewicht: '400g (2 Stück)', kategorie: 'fleisch-fisch', unterkategorie: 'Rind & Schwein',
    preis: 3.99, grundpreis: '1,00 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&q=80',
    beschreibung: 'Zarte Schweinefilet-Schnitzel, küchenfertig.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 267, inStock: true,
  },
  {
    id: 39, name: 'Lachsfilet', gewicht: '300g', kategorie: 'fleisch-fisch', unterkategorie: 'Fisch & Meeresfrüchte',
    preis: 6.99, grundpreis: '2,33 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
    beschreibung: 'Frisches Atlantik-Lachsfilet ohne Haut und Gräten.',
    badges: [], originalPreis: 8.49, bewertung: 4.7, bewertungsAnzahl: 389, inStock: true,
  },
  {
    id: 40, name: 'Geflügelwurst', gewicht: '200g', kategorie: 'fleisch-fisch', unterkategorie: 'Wurst & Aufschnitt',
    preis: 1.79, grundpreis: '0,90 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1609167830220-7164aa360951?w=400&q=80',
    beschreibung: 'Feine Geflügelwurst in Scheiben, leicht und bekömmlich.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 198, inStock: true,
  },
  {
    id: 41, name: 'Salami', gewicht: '150g', kategorie: 'fleisch-fisch', unterkategorie: 'Wurst & Aufschnitt',
    preis: 2.29, grundpreis: '1,53 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?w=400&q=80',
    beschreibung: 'Würzige Salami in dünnen Scheiben, italienische Art.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 312, inStock: true,
  },

  // ── Käse, Eier & Molkerei (weitere) ───────────────────────────────
  {
    id: 42, name: 'Butter', gewicht: '250g', kategorie: 'kaese-eier-molkerei', unterkategorie: 'Milch & Sahne',
    preis: 1.89, grundpreis: '0,76 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80',
    beschreibung: 'Mildgesäuerte Markenbutter, 82% Fett.',
    badges: ['Regional'], originalPreis: 2.19, bewertung: 4.7, bewertungsAnzahl: 678, inStock: true,
  },
  {
    id: 43, name: 'Sahne', gewicht: '200ml', kategorie: 'kaese-eier-molkerei', unterkategorie: 'Milch & Sahne',
    preis: 0.89, grundpreis: '0,45 €/100ml', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80',
    beschreibung: 'Schlagsahne 30% Fett, zum Kochen und Backen.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 44, name: 'Mozzarella', gewicht: '125g', kategorie: 'kaese-eier-molkerei', unterkategorie: 'Käse',
    preis: 1.29, grundpreis: '1,03 €/100g', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    beschreibung: 'Frischer Mozzarella, cremig und mild. Ideal für Caprese.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 534, inStock: true,
  },

  // ── Tiefkühlkost (weitere) ─────────────────────────────────────────
  {
    id: 45, name: 'TK Spinat', gewicht: '750g', kategorie: 'tiefkuehlkost', unterkategorie: 'TK-Gemüse',
    preis: 1.99, grundpreis: '0,27 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
    beschreibung: 'Tiefgekühlter Rahmspinat, portionierbar.',
    badges: [], originalPreis: null, bewertung: 4.2, bewertungsAnzahl: 167, inStock: true,
  },
  {
    id: 46, name: 'TK Lachs Filets', gewicht: '400g (2 Stück)', kategorie: 'tiefkuehlkost', unterkategorie: 'TK-Fisch',
    preis: 5.49, grundpreis: '1,37 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
    beschreibung: 'Tiefgekühlte Lachsfilets, MSC-zertifiziert.',
    badges: [], originalPreis: 6.99, bewertung: 4.5, bewertungsAnzahl: 223, inStock: true,
  },
  {
    id: 47, name: 'Vanilleeis', gewicht: '500ml', kategorie: 'tiefkuehlkost', unterkategorie: 'TK-Desserts',
    preis: 2.49, grundpreis: '0,50 €/100ml', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80',
    beschreibung: 'Cremiges Vanilleeis mit echten Vanilleschoten.',
    badges: [], originalPreis: null, bewertung: 4.7, bewertungsAnzahl: 789, inStock: true,
  },

  // ── Brot & Cerealien (weitere) ────────────────────────────────────
  {
    id: 48, name: 'Müsli Knusper', gewicht: '600g', kategorie: 'brot-cerealien', unterkategorie: 'Müsli & Cerealien',
    preis: 3.49, grundpreis: '0,58 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=400&q=80',
    beschreibung: 'Knuspriges Hafermüsli mit Nüssen und Trockenfrüchten.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 345, inStock: true,
  },
  {
    id: 49, name: 'Toastbrot', gewicht: '500g', kategorie: 'brot-cerealien', unterkategorie: 'Brot & Brötchen',
    preis: 1.49, grundpreis: '0,30 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    beschreibung: 'Weiches Toastbrot, ideal für Sandwich und Toast.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 567, inStock: true,
  },
  {
    id: 50, name: 'Erdnussbutter', gewicht: '350g', kategorie: 'brot-cerealien', unterkategorie: 'Brotaufstriche',
    preis: 2.99, grundpreis: '0,85 €/100g', einheit: 'Glas',
    bild: 'https://images.unsplash.com/photo-1575377222312-dd1a63a51638?w=400&q=80',
    beschreibung: 'Cremige Erdnussbutter aus 100% Erdnüssen, ohne Zusätze.',
    badges: [], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 612, inStock: true,
  },

  // ── Kochen & Backen ────────────────────────────────────────────────
  {
    id: 51, name: 'Weizenmehl Type 405', gewicht: '1 kg', kategorie: 'kuchen-gebaeck', unterkategorie: 'Kuchen',
    preis: 0.99, grundpreis: '0,99 €/kg', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    beschreibung: 'Feines Weizenmehl Type 405, ideal zum Backen.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 52, name: 'Backpulver', gewicht: '3 × 16g', kategorie: 'kuchen-gebaeck', unterkategorie: 'Kuchen',
    preis: 0.49, grundpreis: '1,02 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    beschreibung: 'Backpulver für lockeres Gebäck und fluffige Kuchen.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 289, inStock: true,
  },
  {
    id: 53, name: 'Schokoladenkuchen', gewicht: '400g', kategorie: 'kuchen-gebaeck', unterkategorie: 'Kuchen',
    preis: 3.99, grundpreis: '1,00 €/100g', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    beschreibung: 'Saftiger Schokoladenkuchen, frisch gebacken.',
    badges: [], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 534, inStock: true,
  },
  {
    id: 54, name: 'Kekse Butter', gewicht: '200g', kategorie: 'kuchen-gebaeck', unterkategorie: 'Kekse & Gebäck',
    preis: 1.79, grundpreis: '0,90 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
    beschreibung: 'Zarte Butterkekse, klassisch und unwiderstehlich.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 678, inStock: true,
  },

  // ── Öle & Saucen (weitere) ─────────────────────────────────────────
  {
    id: 55, name: 'Tomatensoße', gewicht: '400g', kategorie: 'oele-saucen', unterkategorie: 'Saucen & Dips',
    preis: 1.29, grundpreis: '0,32 €/100g', einheit: 'Dose',
    bild: 'https://images.unsplash.com/photo-1592417817098-8fd3d4e72d8c?w=400&q=80',
    beschreibung: 'Klassische Tomatensoße mit Basilikum.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 345, inStock: true,
  },
  {
    id: 56, name: 'Ketchup', gewicht: '500ml', kategorie: 'oele-saucen', unterkategorie: 'Saucen & Dips',
    preis: 1.99, grundpreis: '0,40 €/100ml', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1607198179219-fa2b6b907877?w=400&q=80',
    beschreibung: 'Tomaten-Ketchup, leicht süßlich. Der Klassiker.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 789, inStock: true,
  },
  {
    id: 57, name: 'Pfeffer gemahlen', gewicht: '45g', kategorie: 'oele-saucen', unterkategorie: 'Gewürze',
    preis: 1.49, grundpreis: '3,31 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80',
    beschreibung: 'Schwarzer Pfeffer fein gemahlen, aromatisch und scharf.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 234, inStock: true,
  },

  // ── Süßes & Salziges (weitere) ─────────────────────────────────────
  {
    id: 58, name: 'Gummibärchen', gewicht: '200g', kategorie: 'suesses-salziges', unterkategorie: 'Bonbons & Gummis',
    preis: 0.99, grundpreis: '0,50 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80',
    beschreibung: 'Fruchtige Gummibärchen in 5 Sorten.',
    badges: [], originalPreis: null, bewertung: 4.7, bewertungsAnzahl: 1234, inStock: true,
  },
  {
    id: 59, name: 'Dunkle Schokolade 70%', gewicht: '100g', kategorie: 'suesses-salziges', unterkategorie: 'Schokolade',
    preis: 1.49, grundpreis: '1,49 €/100g', einheit: 'Tafel',
    bild: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80',
    beschreibung: 'Dunkle Schokolade 70% Kakaoanteil, intensiv und edel.',
    badges: [], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 678, inStock: true,
  },
  {
    id: 60, name: 'Studentenfutter', gewicht: '200g', kategorie: 'suesses-salziges', unterkategorie: 'Nüsse & Trockenfrüchte',
    preis: 2.49, grundpreis: '1,25 €/100g', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    beschreibung: 'Klassisches Studentenfutter mit Nüssen und Rosinen.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 345, inStock: true,
  },

  // ── Kaffee, Tee & Kakao (weitere) ────────────────────────────────
  {
    id: 61, name: 'Grüner Tee', gewicht: '20 Beutel', kategorie: 'kaffee-tee', unterkategorie: 'Tee',
    preis: 2.49, grundpreis: '0,12 €/Beutel', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    beschreibung: 'Japanischer Grüntee Sencha, mild und frisch.',
    badges: ['Bio'], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 389, inStock: true,
  },
  {
    id: 62, name: 'Instantkaffee', gewicht: '200g', kategorie: 'kaffee-tee', unterkategorie: 'Kaffee',
    preis: 4.49, grundpreis: '2,25 €/100g', einheit: 'Glas',
    bild: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    beschreibung: 'Löslicher Kaffee, vollmundig und aromatisch.',
    badges: [], originalPreis: null, bewertung: 4.2, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 63, name: 'Kakao Pulver', gewicht: '250g', kategorie: 'kaffee-tee', unterkategorie: 'Kakao & Trinkschokolade',
    preis: 2.99, grundpreis: '1,20 €/100g', einheit: 'Dose',
    bild: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80',
    beschreibung: 'Reines Kakaopulver, stark entölt, 22% Fett.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 267, inStock: true,
  },

  // ── Getränke (weitere) ────────────────────────────────────────────
  {
    id: 64, name: 'Orangensaft', gewicht: '1 L', kategorie: 'getraenke', unterkategorie: 'Wasser & Säfte',
    preis: 2.29, grundpreis: '2,29 €/L', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    beschreibung: 'Frisch gepresster Orangensaft, 100% Direktsaft.',
    badges: [], originalPreis: null, bewertung: 4.7, bewertungsAnzahl: 534, inStock: true,
  },
  {
    id: 65, name: 'Weißbier', gewicht: '0,5 L', kategorie: 'getraenke', unterkategorie: 'Bier & Wein',
    preis: 1.09, grundpreis: '2,18 €/L', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80',
    beschreibung: 'Naturtrübes Hefeweizen, frisch und fruchtig.',
    badges: ['Regional'], originalPreis: null, bewertung: 4.8, bewertungsAnzahl: 678, inStock: true,
  },
  {
    id: 66, name: 'Energy Drink', gewicht: '250ml', kategorie: 'getraenke', unterkategorie: 'Energie & Sport',
    preis: 0.99, grundpreis: '0,40 €/100ml', einheit: 'Dose',
    bild: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&q=80',
    beschreibung: 'Belebender Energy Drink mit Taurin und Koffein.',
    badges: [], originalPreis: null, bewertung: 4.1, bewertungsAnzahl: 789, inStock: true,
  },

  // ── Drogerie & Gesundheit (weitere) ──────────────────────────────
  {
    id: 67, name: 'Shampoo', gewicht: '300ml', kategorie: 'drogerie', unterkategorie: 'Haarpflege',
    preis: 2.99, grundpreis: '1,00 €/100ml', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80',
    beschreibung: 'Pflegendes Shampoo für normales Haar, mit Arganöl.',
    badges: [], originalPreis: 3.49, bewertung: 4.4, bewertungsAnzahl: 312, inStock: true,
  },
  {
    id: 68, name: 'Zahnbürste', gewicht: '1 Stück', kategorie: 'drogerie', unterkategorie: 'Körperpflege',
    preis: 1.99, grundpreis: '1,99 €/Stück', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80',
    beschreibung: 'Weiche Zahnbürste für schonende Reinigung.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 69, name: 'Ibuprofen 400mg', gewicht: '20 Tabletten', kategorie: 'drogerie', unterkategorie: 'Gesundheit',
    preis: 3.49, grundpreis: '0,17 €/Tablette', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80',
    beschreibung: 'Ibuprofen 400mg gegen Schmerzen und Fieber.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 567, inStock: true,
  },

  // ── Baby & Kind ────────────────────────────────────────────────────
  {
    id: 70, name: 'Babynahrung Karotte', gewicht: '190g', kategorie: 'baby-kind', unterkategorie: 'Babynahrung',
    preis: 1.29, grundpreis: '0,68 €/100g', einheit: 'Glas',
    bild: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
    beschreibung: 'Karotten-Kartoffel-Rindfleisch Menü ab dem 6. Monat.',
    badges: ['Bio'], originalPreis: null, bewertung: 4.7, bewertungsAnzahl: 234, inStock: true,
  },
  {
    id: 71, name: 'Windeln Gr. 3', gewicht: '52 Stück', kategorie: 'baby-kind', unterkategorie: 'Windeln',
    preis: 10.99, grundpreis: '0,21 €/Stück', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
    beschreibung: 'Superweiche Windeln Größe 3 (4–9 kg), extra trocken.',
    badges: [], originalPreis: 12.99, bewertung: 4.8, bewertungsAnzahl: 567, inStock: true,
  },
  {
    id: 72, name: 'Babymilch Stufe 1', gewicht: '800g', kategorie: 'baby-kind', unterkategorie: 'Babynahrung',
    preis: 14.99, grundpreis: '1,87 €/100g', einheit: 'Dose',
    bild: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
    beschreibung: 'Anfangsmilch für Säuglinge von Geburt an.',
    badges: [], originalPreis: null, bewertung: 4.6, bewertungsAnzahl: 389, inStock: true,
  },

  // ── Tierbedarf ────────────────────────────────────────────────────
  {
    id: 73, name: 'Hundefutter Adult', gewicht: '4 kg', kategorie: 'tierbedarf', unterkategorie: 'Hundefutter',
    preis: 12.99, grundpreis: '3,25 €/kg', einheit: 'Sack',
    bild: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    beschreibung: 'Trockenfutter für ausgewachsene Hunde, mit Huhn.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 312, inStock: true,
  },
  {
    id: 74, name: 'Katzenfutter Pouches', gewicht: '12 × 85g', kategorie: 'tierbedarf', unterkategorie: 'Katzenfutter',
    preis: 6.99, grundpreis: '0,68 €/Stück', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    beschreibung: 'Nassfutter für Katzen in verschiedenen Sorten.',
    badges: [], originalPreis: 7.99, bewertung: 4.6, bewertungsAnzahl: 445, inStock: true,
  },
  {
    id: 75, name: 'Katzenminze Spielzeug', gewicht: '1 Stück', kategorie: 'tierbedarf', unterkategorie: 'Zubehör',
    preis: 3.49, grundpreis: '3,49 €/Stück', einheit: 'Stück',
    bild: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    beschreibung: 'Mäuschen mit echtem Katzenminze-Füllung.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 189, inStock: true,
  },

  // ── Küche & Haushalt ──────────────────────────────────────────────
  {
    id: 76, name: 'Frischhaltefolie', gewicht: '30m', kategorie: 'buecher-hobby', unterkategorie: 'Schreibwaren',
    preis: 1.99, grundpreis: '0,07 €/m', einheit: 'Rolle',
    bild: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    beschreibung: 'Praktische Frischhaltefolie, reißfest und klebend.',
    badges: [], originalPreis: null, bewertung: 4.2, bewertungsAnzahl: 234, inStock: true,
  },
  {
    id: 77, name: 'Gefrierbeutel', gewicht: '25 Stück', kategorie: 'buecher-hobby', unterkategorie: 'Schreibwaren',
    preis: 1.49, grundpreis: '0,06 €/Stück', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    beschreibung: 'Wiederverwendbare Gefrierbeutel mit Zip-Verschluss, 1L.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 345, inStock: true,
  },

  // ── Haus & Freizeit (weitere) ─────────────────────────────────────
  {
    id: 78, name: 'Spülmittel', gewicht: '500ml', kategorie: 'haus-freizeit', unterkategorie: 'Reinigungsmittel',
    preis: 1.49, grundpreis: '0,30 €/100ml', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
    beschreibung: 'Konzentriertes Spülmittel, Zitronenduft.',
    badges: [], originalPreis: null, bewertung: 4.4, bewertungsAnzahl: 567, inStock: true,
  },
  {
    id: 79, name: 'Müllbeutel 35L', gewicht: '20 Stück', kategorie: 'haus-freizeit', unterkategorie: 'Haushaltswaren',
    preis: 2.29, grundpreis: '0,11 €/Stück', einheit: 'Packung',
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    beschreibung: 'Reißfeste Müllbeutel 35L, mit Zugband.',
    badges: [], originalPreis: null, bewertung: 4.3, bewertungsAnzahl: 389, inStock: true,
  },
  {
    id: 80, name: 'Allzweckreiniger', gewicht: '750ml', kategorie: 'haus-freizeit', unterkategorie: 'Reinigungsmittel',
    preis: 2.49, grundpreis: '0,33 €/100ml', einheit: 'Flasche',
    bild: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
    beschreibung: 'Universeller Reiniger für alle Oberflächen.',
    badges: [], originalPreis: null, bewertung: 4.5, bewertungsAnzahl: 445, inStock: true,
  },
]
