/* ════════════════════════════════════════════════
   CHAI MENACHEM — Configuração do Firebase
   ────────────────────────────────────────────────
   ⚠️  COLE AQUI os valores do SEU projeto Firebase.
   Onde achar: Console Firebase → ⚙️ Configurações do
   projeto → "Seus apps" (app Web </>) → SDK do Firebase
   → "Configuração". Copie cada valor abaixo.

   Estes valores são PÚBLICOS (podem ficar no site sem
   risco). NÃO cole aqui nenhuma "chave privada/secreta".
   ════════════════════════════════════════════════ */
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export const firebaseConfig = {
  apiKey:            "COLE_AQUI",
  authDomain:        "COLE_AQUI",
  projectId:         "COLE_AQUI",
  storageBucket:     "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId:             "COLE_AQUI"
};

/* Não toque no resto ↓ */
export const isConfigured = !String(firebaseConfig.apiKey).startsWith("COLE_");
export const app  = isConfigured ? initializeApp(firebaseConfig) : null;
export const db   = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app)      : null;
