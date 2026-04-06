-- ============================================================
-- Datenbankschema für nah & gut Abholservice
-- Für Supabase (PostgreSQL)
-- ============================================================

-- ── Märkte ────────────────────────────────────────────────────
CREATE TABLE maerkte (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  adresse         TEXT NOT NULL,
  plz             TEXT NOT NULL,
  stadt           TEXT NOT NULL,
  telefon         TEXT,
  oeffnungszeiten TEXT,
  latitude        DECIMAL(10, 8),
  longitude       DECIMAL(11, 8),
  aktiv           BOOLEAN DEFAULT true,
  erstellt_am     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Kategorien ────────────────────────────────────────────────
CREATE TABLE kategorien (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  label       TEXT NOT NULL,
  bild_url    TEXT,
  reihenfolge INTEGER DEFAULT 0,
  aktiv       BOOLEAN DEFAULT true
);

-- ── Produkte ──────────────────────────────────────────────────
CREATE TABLE produkte (
  id               SERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  slug             TEXT UNIQUE,
  kategorie_slug   TEXT REFERENCES kategorien(slug),
  unterkategorie   TEXT,
  beschreibung     TEXT,
  bild_url         TEXT,
  preis            DECIMAL(10, 2) NOT NULL,
  original_preis   DECIMAL(10, 2),         -- bei Angebot
  grundpreis       TEXT,                    -- z.B. "1,99 €/100g"
  einheit          TEXT,                    -- z.B. "Packung", "kg"
  gewicht          TEXT,                    -- z.B. "500g"
  badges           TEXT[],                  -- ['Bio', 'Regional', 'Vegan']
  bewertung        DECIMAL(3, 1),
  bewertungs_anzahl INTEGER DEFAULT 0,
  aktiv            BOOLEAN DEFAULT true,
  erstellt_am      TIMESTAMPTZ DEFAULT NOW(),
  aktualisiert_am  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Markt-Produkte (Sortiment + Lagerbestand) ─────────────────
-- Welche Produkte welcher Markt führt und wie viele auf Lager
CREATE TABLE markt_produkte (
  id           SERIAL PRIMARY KEY,
  markt_id     INTEGER REFERENCES maerkte(id) ON DELETE CASCADE,
  produkt_id   INTEGER REFERENCES produkte(id) ON DELETE CASCADE,
  verfuegbar   BOOLEAN DEFAULT true,
  lagerbestand INTEGER DEFAULT 0,
  preis_lokal  DECIMAL(10, 2),  -- optionaler marktspezifischer Preis
  aktualisiert_am TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(markt_id, produkt_id)
);

-- ── Abholzeitslots ────────────────────────────────────────────
CREATE TABLE abholslots (
  id         SERIAL PRIMARY KEY,
  markt_id   INTEGER REFERENCES maerkte(id) ON DELETE CASCADE,
  datum      DATE NOT NULL,
  uhrzeit    TEXT NOT NULL,             -- z.B. "09:00-10:00"
  kapazitaet INTEGER DEFAULT 10,        -- max. Bestellungen pro Slot
  gebucht    INTEGER DEFAULT 0,
  aktiv      BOOLEAN DEFAULT true,
  UNIQUE(markt_id, datum, uhrzeit)
);

-- ── Bestellungen ──────────────────────────────────────────────
CREATE TABLE bestellungen (
  id                  TEXT PRIMARY KEY,   -- z.B. "ORD-1234567890"
  stripe_session_id   TEXT UNIQUE,        -- Stripe Checkout Session ID
  markt_id            INTEGER REFERENCES maerkte(id),
  abhol_datum         DATE,
  abhol_uhrzeit       TEXT,
  kunde_name          TEXT NOT NULL,
  kunde_email         TEXT NOT NULL,
  kunde_telefon       TEXT,
  gesamt_preis        DECIMAL(10, 2) NOT NULL,
  zahlungsart         TEXT,               -- 'stripe', 'bar', 'sepa'
  status              TEXT DEFAULT 'offen',
  -- Status: offen | bezahlt | bereit | abgeholt | storniert
  notiz               TEXT,
  erstellt_am         TIMESTAMPTZ DEFAULT NOW(),
  aktualisiert_am     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Bestellpositionen ─────────────────────────────────────────
CREATE TABLE bestellpositionen (
  id           SERIAL PRIMARY KEY,
  bestellung_id TEXT REFERENCES bestellungen(id) ON DELETE CASCADE,
  produkt_id   INTEGER REFERENCES produkte(id),
  produkt_name TEXT NOT NULL,             -- Snapshot des Produktnamens
  menge        INTEGER NOT NULL,
  einzelpreis  DECIMAL(10, 2) NOT NULL,   -- Preis zum Bestellzeitpunkt
  gesamt       DECIMAL(10, 2) NOT NULL
);

-- ============================================================
-- Indexes für Performance
-- ============================================================
CREATE INDEX idx_produkte_kategorie ON produkte(kategorie_slug);
CREATE INDEX idx_markt_produkte_markt ON markt_produkte(markt_id);
CREATE INDEX idx_markt_produkte_produkt ON markt_produkte(produkt_id);
CREATE INDEX idx_abholslots_markt_datum ON abholslots(markt_id, datum);
CREATE INDEX idx_bestellungen_markt ON bestellungen(markt_id);
CREATE INDEX idx_bestellungen_status ON bestellungen(status);
CREATE INDEX idx_bestellpositionen_bestellung ON bestellpositionen(bestellung_id);

-- ============================================================
-- Row Level Security (Supabase)
-- ============================================================

-- Produkte & Märkte: öffentlich lesbar
ALTER TABLE produkte ENABLE ROW LEVEL SECURITY;
ALTER TABLE maerkte ENABLE ROW LEVEL SECURITY;
ALTER TABLE kategorien ENABLE ROW LEVEL SECURITY;
ALTER TABLE markt_produkte ENABLE ROW LEVEL SECURITY;
ALTER TABLE abholslots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Produkte öffentlich lesbar" ON produkte FOR SELECT USING (aktiv = true);
CREATE POLICY "Märkte öffentlich lesbar" ON maerkte FOR SELECT USING (aktiv = true);
CREATE POLICY "Kategorien öffentlich lesbar" ON kategorien FOR SELECT USING (aktiv = true);
CREATE POLICY "Markt-Produkte öffentlich lesbar" ON markt_produkte FOR SELECT USING (true);
CREATE POLICY "Abholslots öffentlich lesbar" ON abholslots FOR SELECT USING (aktiv = true);

-- Bestellungen: nur über Service Key schreibbar (Backend)
ALTER TABLE bestellungen ENABLE ROW LEVEL SECURITY;
ALTER TABLE bestellpositionen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bestellungen nur Backend" ON bestellungen
  USING (false)  -- kein direkter Zugriff vom Frontend
  WITH CHECK (false);

-- ============================================================
-- Hilfsfunktion: Lagerbestand aktualisieren nach Bestellung
-- ============================================================
CREATE OR REPLACE FUNCTION lagerbestand_reduzieren(
  p_markt_id INTEGER,
  p_produkt_id INTEGER,
  p_menge INTEGER
) RETURNS VOID AS $$
BEGIN
  UPDATE markt_produkte
  SET lagerbestand = GREATEST(0, lagerbestand - p_menge),
      aktualisiert_am = NOW()
  WHERE markt_id = p_markt_id AND produkt_id = p_produkt_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Beispieldaten (optional — zum Testen)
-- ============================================================

-- INSERT INTO maerkte (name, adresse, plz, stadt, oeffnungszeiten) VALUES
--   ('nah & gut Hohenprießnitz', 'Dübener Straße 12', '04838', 'Hohenprießnitz', 'Mo–Fr 7:00–19:00, Sa 7:00–14:00'),
--   ('nah & gut Doberschütz', 'Breite Straße 21', '04838', 'Doberschütz', 'Mo–Fr 8:00–18:00, Sa 7:00–12:00'),
--   ('nah & gut Wermsdorf', 'Clara-Zetkin-Straße 15', '04779', 'Wermsdorf', 'Mo–Sa 7:00–19:00'),
--   ('nah & gut Beilrode', 'Bahnhofstraße 11', '04886', 'Beilrode', 'Mo–Fr 7:00–18:00, Sa 7:00–13:00'),
--   ('nah & gut Falkenhain', 'Karl-Marx-Straße 16', '04808', 'Falkenhain', 'Mo–Fr 7:00–19:00, Sa 7:00–14:00'),
--   ('nah & gut Riesa', 'Humboldtring 1', '01589', 'Riesa', 'Mo–Fr 8:00–20:00, Sa 8:00–16:00'),
--   ('nah & gut Jesewitz', 'Leipziger Straße 15', '04838', 'Jesewitz', 'Mo–Fr 7:00–19:00, Sa 7:00–14:00'),
--   ('nah & gut Hohburg', 'Am Lossatal 34', '04808', 'Hohburg', 'Mo–Fr 7:00–18:30, Sa 7:00–13:00'),
--   ('nah & gut Torgau', 'Eilenburger Straße 2', '04860', 'Torgau', 'Mo–Fr 7:00–20:00, Sa 7:00–18:00');
