# Übergabe-Dokumentation für Entwickler

## Was ist fertig (Frontend)

Die komplette Website ist fertig gebaut mit React + Vite + Tailwind CSS.
Alle Seiten, das Design, der Warenkorb, der Checkout-Flow, die Marktauswahl — alles läuft.

**Aktuell laufen alle Daten aus lokalen Mock-Dateien:**
- `src/data/produkte.js` → wird ersetzt durch echte DB-Abfragen
- `src/data/maerkte.js` → wird ersetzt durch echte DB-Abfragen
- `src/data/kategorien.js` → kann statisch bleiben oder auch in DB

**Der zentrale Integrationspunkt ist eine einzige Datei:**
```
src/services/api.js
```
Dort sind ALLE Datenbankaufrufe als async-Funktionen vorbereitet.
Einfach die auskommentierten echten API-Calls aktivieren — fertig.

---

## Technischer Stack

| Was | Technologie |
|-----|-------------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Hosting | Vercel (GitHub Auto-Deploy) |
| State Management | React Context + useReducer |
| Routing | React Router v6 |
| Benachrichtigungen | react-hot-toast |

---

## Was ihr implementieren müsst

### 1. Datenbank (Supabase empfohlen)

Schema liegt fertig in `database/schema.sql`.

Tabellen:
- `maerkte` — Marktdaten
- `kategorien` — Produktkategorien
- `produkte` — Produktkatalog mit Preisen, Bildern, Badges
- `markt_produkte` — Welche Produkte welcher Markt führt (+ Lagerbestand)
- `bestellungen` — Abgeschlossene Bestellungen
- `bestellpositionen` — Einzelne Artikel pro Bestellung

Supabase ist kostenlos bis 500MB / 2 Projekte.
URL: https://supabase.com

### 2. Stripe (Zahlungsabwicklung)

Die Vercel Serverless Function ist fertig in `api/checkout.js`.
Auskommentierter Code muss nur aktiviert werden.

Schritte:
1. `npm install stripe` ausführen
2. Stripe Account anlegen: https://stripe.com
3. In Vercel Dashboard: `STRIPE_SECRET_KEY` und `VITE_STRIPE_PUBLISHABLE_KEY` setzen
4. Webhook in Stripe Dashboard eintragen: `https://eure-domain.de/api/webhook`
5. `STRIPE_WEBHOOK_SECRET` in Vercel setzen
6. In `api/checkout.js` die auskommentierten Zeilen aktivieren
7. In `api/webhook.js` die auskommentierten Zeilen aktivieren

### 3. Warenwirtschaft-Anbindung

Die Funktion `fetchLagerbestand(marktId)` in `src/services/api.js` muss auf
die echte Warenwirtschafts-API zeigen.

Benötigt wird vom Warenwirtschaftssystem:
- `GET /produkte` → Produktliste mit Preisen
- `GET /lagerbestand?markt={id}` → Verfügbarkeit pro Markt
- `POST /bestellung` → Neue Bestellung übermitteln (optional)

### 4. E-Mail-Versand (Bestellbestätigung)

Vorbereitet in `api/webhook.js` mit Resend.
Resend ist kostenlos bis 3.000 E-Mails/Monat.
URL: https://resend.com

---

## Environment Variables

Alle benötigten Keys sind in `.env.example` dokumentiert.
Für lokale Entwicklung: `.env.example` → `.env.local` kopieren und ausfüllen.
Für Produktion: In Vercel Dashboard unter Settings → Environment Variables eintragen.

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...        (nur Backend!)
API_WARENWIRTSCHAFT_URL=...
API_WARENWIRTSCHAFT_KEY=...
RESEND_API_KEY=re_...
VITE_APP_URL=https://eure-domain.de
```

---

## API Endpoints (Vercel Serverless Functions)

| Endpoint | Methode | Beschreibung | Status |
|----------|---------|--------------|--------|
| `/api/checkout` | POST | Stripe Checkout Session erstellen | ✅ vorbereitet |
| `/api/webhook` | POST | Stripe Webhook (nach Zahlung) | ✅ vorbereitet |

Weitere Endpoints können in `api/` als neue `.js` Dateien hinzugefügt werden.

---

## Datenbankaufrufe — alle Integrationspunkte

Alle in `src/services/api.js`:

```js
fetchProdukte()                          // Alle Produkte
fetchProduktById(id)                     // Ein Produkt
fetchProdukteByKategorie(slug, marktId)  // Produkte nach Kategorie + Markt
fetchProdukteByMarkt(marktId)            // Sortiment eines Markts
sucheProdukte(query, marktId)            // Produktsuche
fetchMaerkte()                           // Alle Märkte
fetchMarktById(id)                       // Ein Markt
fetchMaerkteByPlz(plz)                   // Märkte nach PLZ (Umkreissuche)
bestellungSpeichern(bestellung)          // Bestellung speichern
fetchBestellungById(id)                  // Bestellung abrufen
fetchLagerbestand(marktId)               // Lagerbestand eines Markts
```

Jede Funktion hat einen Kommentar mit dem echten API-Call der aktiviert werden muss.

---

## Markt-spezifisches Sortiment

Jedes Produkt hat ein `verfuegbarIn: [1, 2, 5, ...]` Array mit Markt-IDs.
Das wird später aus der `markt_produkte` Tabelle geladen.

Aktuell: Mock-Daten in `src/data/produkte.js`
Später: `fetchProdukteByMarkt(marktId)` aus Supabase

---

## Deployment

Das Projekt deployt automatisch über GitHub → Vercel.

1. Vercel-Account mit GitHub verbinden: https://vercel.com
2. Repository `GrunerNils/lino-supermarkt` importieren
3. Environment Variables eintragen
4. Jeder Push auf `master` deployt automatisch

---

## Lokale Entwicklung

```bash
git clone https://github.com/GrunerNils/lino-supermarkt.git
cd lino-supermarkt
npm install
cp .env.example .env.local   # Keys eintragen
npm run dev                  # → http://localhost:5173
```

---

## Projektstruktur (wichtige Dateien)

```
src/
├── services/
│   └── api.js              ← HAUPTINTEGRATIONSPUNKT — hier alles anschließen
├── data/
│   ├── produkte.js         ← Mock-Daten (wird durch DB ersetzt)
│   ├── maerkte.js          ← Mock-Daten (wird durch DB ersetzt)
│   └── kategorien.js       ← kann statisch bleiben
├── context/
│   └── CartContext.jsx     ← Warenkorb-State (fertig)
├── pages/
│   ├── WarenkorbPage.jsx   ← Schritt 1 Checkout (fertig)
│   ├── AbholterminPage.jsx ← Schritt 2 Checkout (fertig)
│   ├── ZahlungPage.jsx     ← Schritt 3 + Stripe-Button (fertig)
│   └── BestellenPage.jsx   ← Schritt 4 + Bestellung absenden (fertig)
api/
├── checkout.js             ← Stripe Session erstellen (auskommentiert)
└── webhook.js              ← Nach Zahlung: DB + E-Mail (auskommentiert)
database/
└── schema.sql              ← Supabase Datenbankschema
```

---

## Fragen?

Bei Fragen zum Frontend-Code gerne melden.
