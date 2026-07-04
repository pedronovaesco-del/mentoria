"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth?mode=login");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-sm px-2 py-1 text-xs text-white/30 transition-colors hover:bg-white/6 hover:text-white"
    >
      Sair
    </button>
  );
}
