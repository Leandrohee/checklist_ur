import React from "react";
import { CheckCircle2, AlertTriangle, ClipboardList } from "lucide-react";
import { OverallProgress } from "@/types/checklist";
import { ProgressBar } from "./ProgressBar";

interface OverallProgressCardProps {
  progress: OverallProgress;
  onOpenMissingModal: () => void;
}

export function OverallProgressCard({
  progress,
  onOpenMissingModal,
}: OverallProgressCardProps) {
  const missingCount = progress.total - progress.checked;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              progress.isComplete
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
            }`}
          >
            {progress.percentage}%
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              Status da Conferência
              {progress.isComplete ? (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Pronta
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Em andamento
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {progress.checked} de {progress.total} itens conferidos ({missingCount} pendente{missingCount === 1 ? "" : "s"})
            </p>
          </div>
        </div>

        {missingCount > 0 && (
          <button
            type="button"
            onClick={onOpenMissingModal}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 transition-colors border border-slate-200 dark:border-zinc-700"
          >
            <ClipboardList className="w-4 h-4 text-amber-600" />
            Ver {missingCount} pendência{missingCount === 1 ? "" : "s"}
          </button>
        )}
      </div>

      <ProgressBar percentage={progress.percentage} />
    </div>
  );
}
