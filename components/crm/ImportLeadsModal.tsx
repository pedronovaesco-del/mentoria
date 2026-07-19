"use client";

import { useState } from "react";
import Papa from "papaparse";
import { bulkImportLeads, type ImportRowPayload } from "@/lib/actions/crm";
import { computeDedupKey, mapCsvRows, type ImportRow } from "@/lib/crm/importParsing";
import type { CrmLead } from "@/types/database";

interface PreviewRow {
  row: ImportRow;
  dedupKey: string;
  existing: CrmLead | null;
  include: boolean;
}

interface Props {
  companyId: string;
  leads: CrmLead[];
  onClose: () => void;
  onImported: (result: { inserted: number; updated: number }) => void;
}

export function ImportLeadsModal({ companyId, leads, onClose, onImported }: Props) {
  const [step, setStep] = useState<"upload" | "preview">("upload");
  const [rows, setRows] = useState<PreviewRow[]>([]);
  const [skipped, setSkipped] = useState(0);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [importing, setImporting] = useState(false);

  const leadsByKey = new Map(leads.map((l) => [l.dedup_key, l]));

  function handleFile(file: File) {
    setError("");
    setFileName(file.name);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const mapped = mapCsvRows(results.data, headers);

        let skippedCount = 0;
        const preview: PreviewRow[] = [];
        for (const row of mapped) {
          if (!row.name.trim()) {
            skippedCount++;
            continue;
          }
          const dedupKey = computeDedupKey(row.whatsappDisplay, row.name);
          preview.push({ row, dedupKey, existing: leadsByKey.get(dedupKey) || null, include: true });
        }

        if (preview.length === 0) {
          setError("Nenhuma linha com nome válido foi encontrada nesse arquivo.");
          return;
        }

        setSkipped(skippedCount);
        setRows(preview);
        setStep("preview");
      },
      error: (err) => setError(`Não consegui ler o arquivo: ${err.message}`),
    });
  }

  function toggleRow(i: number) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, include: !r.include } : r)));
  }

  async function handleImport() {
    const selected = rows.filter((r) => r.include);
    if (selected.length === 0) return;
    setImporting(true);
    setError("");

    const payload: ImportRowPayload[] = selected.map(({ row }) => ({
      name: row.name,
      whatsappDisplay: row.whatsappDisplay,
      email: row.email,
      objetivo: row.objetivo,
      faturamento: row.faturamento,
      orcamento: row.orcamento,
      meta3Meses: row.meta3Meses,
      desafio: row.desafio,
      nivelDigital: row.nivelDigital,
      tempoDia: row.tempoDia,
    }));

    const result = await bulkImportLeads(companyId, payload);
    setImporting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onImported({ inserted: result.inserted, updated: result.updated });
  }

  const included = rows.filter((r) => r.include);
  const novos = included.filter((r) => !r.existing).length;
  const atualiza = included.filter((r) => r.existing).length;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-black/78 p-5 backdrop-blur-md" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="my-8 w-full max-w-[820px] rounded-lg border border-white/10 bg-[#0b0b10]">
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <span className="font-grotesk text-base font-bold">📥 Importar planilha</span>
          <button onClick={onClose} className="text-xl text-white/40 hover:text-white">
            ×
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {error && <div className="mb-4 rounded-sm border border-danger/25 bg-danger/10 p-3 text-[13px] text-[#FCA5A5]">{error}</div>}

          {step === "upload" ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p className="max-w-[480px] text-[13px] leading-[1.7] text-white/50">
                Envie um arquivo <strong className="text-white">.csv</strong> com colunas como Nome,
                WhatsApp, E-mail, Objetivo, Faturamento, Orçamento, Meta, Desafio, Nível, Tempo — os
                nomes em inglês do export da tabela <code className="text-white/70">quiz_leads</code>{" "}
                (name, phone, email, goal, revenue, budget, target, challenge, digital_level, time)
                também são reconhecidos automaticamente.
              </p>
              <label className="cursor-pointer rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-5 py-2.5 text-sm font-bold text-white">
                Selecionar arquivo CSV
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-[13px] text-white/55">
                <span>
                  📄 <strong className="text-white">{fileName}</strong>
                </span>
                <span>·</span>
                <span>🆕 {novos} novos</span>
                <span>🔄 {atualiza} atualizações</span>
                {skipped > 0 && <span className="text-white/35">· {skipped} ignoradas (sem nome)</span>}
                <button onClick={() => setStep("upload")} className="ml-auto text-blue-light hover:underline">
                  Trocar arquivo
                </button>
              </div>

              <div className="overflow-hidden rounded-md border border-white/8">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-white/5 text-[11px] uppercase tracking-[0.5px] text-white/40">
                    <tr>
                      <th className="w-8 px-3 py-2"></th>
                      <th className="px-3 py-2">Nome</th>
                      <th className="px-3 py-2">WhatsApp</th>
                      <th className="px-3 py-2">E-mail</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.dedupKey + i} className="border-t border-white/6">
                        <td className="px-3 py-2">
                          <input type="checkbox" checked={r.include} onChange={() => toggleRow(i)} />
                        </td>
                        <td className="px-3 py-2 text-white/85">{r.row.name}</td>
                        <td className="px-3 py-2 text-white/60">{r.row.whatsappDisplay || "—"}</td>
                        <td className="px-3 py-2 text-white/60">{r.row.email || "—"}</td>
                        <td className="px-3 py-2">
                          {r.existing ? (
                            <span className="rounded-sm border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-2 py-0.5 text-[11px] font-semibold text-[#FCD34D]">
                              🔄 Atualiza ({r.existing.etapa})
                            </span>
                          ) : (
                            <span className="rounded-sm border border-blue/25 bg-blue/10 px-2 py-0.5 text-[11px] font-semibold text-blue-light">🆕 Novo</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {step === "preview" && (
          <div className="flex items-center justify-end gap-2.5 border-t border-white/8 px-6 py-4">
            <button onClick={onClose} className="rounded-pill border border-white/12 px-4 py-2 text-sm font-semibold text-white/60">
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={importing || included.length === 0}
              className="rounded-pill bg-gradient-to-b from-blue via-blue-mid to-blue-deep px-5 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              {importing ? "Importando…" : `Importar ${included.length} lead${included.length === 1 ? "" : "s"}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
