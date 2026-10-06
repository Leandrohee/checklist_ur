"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, Search, Radio, Copy, Check, Building2 } from "lucide-react";
import rawGbms from "@/data/gbms/dados-gbms.json";
import { GbmItem } from "@/types/gbm";

const gbmsData: GbmItem[] = rawGbms as GbmItem[];

interface GbmInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GbmInfoModal({ isOpen, onClose }: GbmInfoModalProps) {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // Fechar com tecla ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredGbms = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return gbmsData;

    return gbmsData.filter((item) => {
      return (
        item.nome.toLowerCase().includes(term) ||
        item.sigla.toLowerCase().includes(term) ||
        item.indicativo.toLowerCase().includes(term)
      );
    });
  }, [search]);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = filteredGbms
      .map((item) => `${item.nome} | ${item.sigla} | ${item.indicativo}`)
      .join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gbm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 rounded-xl">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="gbm-modal-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
              >
                Quartéis e Indicativos do CBMDF
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Grupamentos Bombeiro Militar, siglas e indicativos de chamada
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Filtro e Busca */}
        <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/60 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por quartel, sigla (ex: 1º GBM) ou indicativo (ex: Alfa)..."
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 rounded-md"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500 dark:text-zinc-400">
            <span>
              Exibindo <strong>{filteredGbms.length}</strong> de{" "}
              {gbmsData.length} unidades
            </span>
            {search && (
              <span className="text-red-600 dark:text-red-400 font-medium">
                Filtrado por: &ldquo;{search}&rdquo;
              </span>
            )}
          </div>
        </div>

        {/* Lista / Tabela de Quartéis */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-2.5 sm:space-y-0">
          {filteredGbms.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-zinc-400">
              <Building2 className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-zinc-600" />
              <p className="text-sm font-semibold">Nenhum quartel encontrado</p>
              <p className="text-xs mt-1">
                Tente buscar com outro termo ou limpe o campo de busca.
              </p>
            </div>
          ) : (
            <>
              {/* Tabela para Telas Médias e Grandes */}
              <div className="hidden sm:block border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 border-b border-slate-200 dark:border-zinc-800">
                      <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider">
                        Grupamento / Unidade
                      </th>
                      <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider w-36">
                        Sigla
                      </th>
                      <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider w-36">
                        Indicativo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                    {filteredGbms.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors"
                      >
                        <td className="py-2.5 px-3.5 font-medium text-slate-800 dark:text-zinc-200">
                          {item.nome}
                        </td>
                        <td className="py-2.5 px-3.5 text-slate-600 dark:text-zinc-400 font-semibold whitespace-nowrap">
                          {item.sigla}
                        </td>
                        <td className="py-2.5 px-3.5 whitespace-nowrap">
                          <span className="inline-block px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
                            {item.indicativo}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards para Telas Pequenas (Mobile) */}
              <div className="block sm:hidden space-y-2">
                {filteredGbms.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 dark:border-zinc-800 rounded-xl p-3 bg-slate-50/50 dark:bg-zinc-900/50 space-y-2"
                  >
                    <div className="text-xs font-semibold text-slate-900 dark:text-zinc-100">
                      {item.nome}
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-zinc-800">
                      <span className="font-medium text-slate-500 dark:text-zinc-400">
                        Sigla:{" "}
                        <strong className="text-slate-700 dark:text-zinc-200">
                          {item.sigla}
                        </strong>
                      </span>
                      <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
                        {item.indicativo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Rodapé */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-zinc-950/40 rounded-b-2xl shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 shadow-2xs transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? "Copiado!" : "Copiar Informações"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
