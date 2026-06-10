/* ════════════════════════════════════════════════
   CHAI MENACHEM — Configuração do Supabase
   ────────────────────────────────────────────────
   ⚠️  COLE AQUI os 2 valores do SEU projeto Supabase.
   Onde achar: Supabase → seu projeto → Project Settings
   → API → "Project URL" e "anon public" key.

   Estes valores são PÚBLICOS (podem ficar no site sem
   risco). NÃO cole aqui a chave "service_role".
   ════════════════════════════════════════════════ */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL      = "COLE_AQUI";   // ex.: https://xxxxxxxx.supabase.co
export const SUPABASE_ANON_KEY = "COLE_AQUI";   // chave "anon public"

/* Não toque no resto ↓ */
export const BUCKET = "photos";
export const isConfigured = !String(SUPABASE_URL).startsWith("COLE_");
export const supabase = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
