import type { Metadata } from "next";
import { CrmLoginForm } from "@/components/crm/CrmLoginForm";

export const metadata: Metadata = {
  title: "Acesso ao CRM | Pedro Novaes",
  robots: { index: false, follow: false },
};

export default function CrmLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-10">
      <CrmLoginForm />
    </main>
  );
}
