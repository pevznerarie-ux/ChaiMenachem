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

export const SUPABASE_URL      = "https://xyryfhtsrvhhazrhymjs.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cnlmaHRzcnZoaGF6cmh5bWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNDczMzAsImV4cCI6MjA5NjcyMzMzMH0.wT4b7Pu1pIGlMsj9cXCkUfpKSyyQWJGksJrHgUUt8FA";

/* Não toque no resto ↓ */
export const BUCKET = "photos";
export const isConfigured = !String(SUPABASE_URL).startsWith("COLE_");
export const supabase = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
