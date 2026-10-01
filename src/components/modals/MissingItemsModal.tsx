"use client";

import React, { useState } from "react";
import { X, Copy, Check, Printer, AlertCircle } from "lucide-react";
import { ChecklistCategory, ChecklistState } from "@/types/checklist";
import { getItemList } from "@/services/checklist/getItemList";
import { formatReportText } from "@/utils/formatReportText";

interface MissingItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ChecklistCategory[];
  state: ChecklistState;
}

export function MissingItemsModal({
  isOpen,
  onClose,
  categories,
  state,
}: MissingItemsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const missingGroups = categories
    .map((cat) => {
      const items = getItemList(cat);
      const missing = items.filter((item) => !state[item.id]);
      return {
        categoryTitle: cat.title,
        items: missing,
      };
    })
    .filter((group) => group.items.length > 0);

  const handleCopy = () => {
    const text = formatReportText(categories, state);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 rounded-lg">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Itens Pendentes na Viatura
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Lista de materiais a serem repostos ou checados
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {missingGroups.length === 0 ? (
            <div className="py-12 text-center text-emerald-600 dark:text-emerald-400">
              <p className="text-base font-semibold">Tudo em ordem!</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Nenhum item pendente. A viatura UR está completa para atendimento.
              </p>
            </div>
          ) : (
            missingGroups.map((group) => (
              <div
                key={group.categoryTitle}
                className="border border-slate-200 dark:border-zinc-800 rounded-xl p-3.5 bg-slate-50/50 dark:bg-zinc-900/50"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                  {group.categoryTitle} ({group.items.length} pendente{group.items.length === 1 ? "" : "s"})
                </h4>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-sm py-1 border-b border-slate-100 dark:border-zinc-800 last:border-none"
                    >
                      <span className="text-slate-800 dark:text-zinc-200 font-medium">
                        {item.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold shrink-0 ml-2">
                        Qtd: {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-zinc-950/40 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 shadow-xs transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar Relatório"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
