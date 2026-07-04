"use client";

import { useMemo, useRef, useState } from "react";
import { applyPhoneMask, COUNTRIES, type Country } from "@/lib/data/countries";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  ddi: string;
  onDdiChange: (ddi: string) => void;
}

export function PhoneInput({ value, onChange, ddi, onDdiChange }: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Country>(COUNTRIES[0]);
  const phoneRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.includes(q)
    );
  }, [search]);

  function selectCountry(c: Country) {
    setSelected(c);
    onDdiChange(c.code);
    onChange(applyPhoneMask(value, c.mask));
    setOpen(false);
    setSearch("");
    phoneRef.current?.focus();
  }

  return (
    <div className="flex overflow-visible rounded-sm border border-white/12 bg-white/6 focus-within:border-blue/55 focus-within:bg-blue/5">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-full items-center gap-1.5 whitespace-nowrap rounded-l-sm border-r border-white/10 py-3 pl-3 pr-2.5 text-white"
        >
          <span>{selected.flag}</span>
          <span className="hidden sm:inline">{selected.name}</span>
          <span>{ddi}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-[calc(100%+10px)] left-[-1px] z-[200] w-[min(300px,calc(100vw-48px))] overflow-hidden rounded-md border border-blue/22 bg-[linear-gradient(160deg,rgba(14,22,45,0.99),rgba(5,10,25,0.99))] shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
            <div className="p-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍  Buscar país..."
                autoComplete="off"
                className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
              />
            </div>
            <div className="max-h-[216px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-3.5 py-4 text-center text-sm text-white/40">
                  Nenhum país encontrado
                </div>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => selectCountry(c)}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-white/75 hover:bg-blue/10 hover:text-white"
                  >
                    <span>{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-white/50">{c.code}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <input
        ref={phoneRef}
        type="tel"
        value={value}
        onChange={(e) => onChange(applyPhoneMask(e.target.value, selected.mask))}
        placeholder={selected.mask}
        autoComplete="tel"
        className="min-w-0 flex-1 rounded-r-sm bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/25"
      />
    </div>
  );
}
