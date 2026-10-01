import React from "react";
import { CheckCheck, RotateCcw, FileText, ChevronsUpDown } from "lucide-react";

interface ActionButtonsProps {
  onCheckAll: () => void;
  onReset: () => void;
  onOpenReport: () => void;
  onToggleAllExpanded: () => void;
  areAllExpanded: boolean;
}

export function ActionButtons({
  onCheckAll,
  onReset,
  onOpenReport,
  onToggleAllExpanded,
  areAllExpanded,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto">
      {/* Botão de Expandir/Recolher com largura total no mobile */}
      <button
        type="button"
        onClick={onToggleAllExpanded}
        title={areAllExpanded ? "Recolher todas as categorias" : "Expandir todas as categorias"}
        className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 py-2.5 sm:py-1.5 text-xs font-semibold sm:font-medium rounded-xl sm:rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 transition-colors shadow-2xs cursor-pointer select-none"
      >
        <ChevronsUpDown className="w-4 h-4 text-slate-500 dark:text-zinc-400 shrink-0" />
        <span>{areAllExpanded ? "Recolher todas as categorias" : "Expandir todas as categorias"}</span>
      </button>

      {/* Botões de Ações Complementares */}
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={onCheckAll}
          title="Marcar todos os itens do checklist"
          className="justify-center inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 text-xs font-medium rounded-xl sm:rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer select-none"
        >
          <CheckCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Marcar Todos</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          title="Limpar e reiniciar conferência"
          className="justify-center inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 text-xs font-medium rounded-xl sm:rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 transition-colors cursor-pointer select-none"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          <span>Reiniciar</span>
        </button>

        <button
          type="button"
          onClick={onOpenReport}
          title="Gerar relatório de conferência"
          className="justify-center inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 text-xs font-medium rounded-xl sm:rounded-lg bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:hover:bg-red-900/60 dark:text-red-300 border border-red-200 dark:border-red-800 transition-colors cursor-pointer select-none"
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>Relatório</span>
        </button>
      </div>
    </div>
  );
}
