/**
 * Supabase Client
 * ───────────────────────────────────────────────────────────────
 * Dieser Client ist der einzige Ort wo die Datenbankverbindung
 * konfiguriert wird. Alle anderen Dateien importieren von hier.
 *
 * AKTIVIEREN: In Vercel Dashboard (oder .env.local lokal):
 *   VITE_SUPABASE_URL=https://xxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=eyJ...
 *
 * WARUM VITE_ Prefix? Vite bündelt nur Env-Vars mit VITE_ ins
 * Frontend-Bundle. Alles ohne Prefix bleibt serverseitig (sicher).
 *
 * WARUM supabaseAktiv Flag? So läuft die App ohne jede Konfiguration
 * im Demo-Modus (Mock-Daten). Programmierer müssen nur die Keys
 * setzen — kein einziger Code muss geändert werden.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// true = echte DB aktiv | false = Mock-Modus (lokale Dateien)
export const supabaseAktiv = !!(supabaseUrl && supabaseKey)

export const supabase = supabaseAktiv
  ? createClient(supabaseUrl, supabaseKey)
  : null
