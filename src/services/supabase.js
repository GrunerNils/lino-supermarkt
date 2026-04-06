/**
 * Supabase Client
 * Programmierer müssen nur .env.local ausfüllen:
 *   VITE_SUPABASE_URL=https://xxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=eyJ...
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Wenn keine Keys gesetzt → Mock-Modus (lokale Daten)
export const supabaseAktiv = !!(supabaseUrl && supabaseKey)

export const supabase = supabaseAktiv
  ? createClient(supabaseUrl, supabaseKey)
  : null
