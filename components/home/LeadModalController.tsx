"use client";

import { useEffect, useState } from "react";
import { LeadModal } from "./LeadModal";

/**
 * Intercepta cliques em qualquer link pra /quiz e abre o modal de captura
 * de lead antes, em vez de navegar direto -- mesmo comportamento do site
 * original (document.querySelectorAll('a[href="quiz.html"]')), só que via
 * um listener global em vez de anexar em cada CTA individualmente.
 */
export function LeadModalController() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor?.getAttribute("href") === "/quiz") {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return <LeadModal open={open} onClose={() => setOpen(false)} />;
}
