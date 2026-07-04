import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente Supabase para uso em Server Components / Server Actions.
 * Resolve auth.uid() a partir do cookie de sessão, necessário para o RLS
 * (ex: policies "own row" de professionals/lead_purchases, e a função
 * buy_lead que lê auth.uid() internamente).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll chamado de um Server Component (sem permissão de escrita
            // de cookie) — seguro ignorar se o middleware já refaz a sessão.
          }
        },
      },
    }
  );
}
