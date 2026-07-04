import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Renova o cookie de sessão do Supabase a cada requisição. Chamado pelo
 * proxy.ts na raiz do projeto (convenção do Next.js 16, antigo middleware.ts).
 * Não faz nenhum redirect de negócio —
 * o guard de rota fica em cada Server Component protegido (/painel, /crm).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Necessário para o refresh do token funcionar corretamente.
  await supabase.auth.getUser();

  return supabaseResponse;
}
