import React from "react";
import { Siren, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 text-white rounded-xl shadow-md shadow-red-500/20 flex items-center justify-center">
            <Siren className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Checklist da UR
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900">
                <ShieldCheck className="w-3.5 h-3.5" /> Operacional
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Conferência de Materiais, Medicamentos e Equipamentos
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
