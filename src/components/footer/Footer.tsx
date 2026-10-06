import React from "react";
import { Radio } from "lucide-react";

interface FooterProps {
  onOpenGbmInfo: () => void;
}

export function Footer({ onOpenGbmInfo }: FooterProps) {
  return (
    <footer className="mt-12 text-center text-xs text-slate-400 dark:text-zinc-600 border-t border-slate-200 dark:border-zinc-800 pt-8 pb-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <button
          type="button"
          onClick={onOpenGbmInfo}
          title="Consultar quartéis e indicativos de rádio do CBMDF"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:hover:bg-red-900/60 dark:text-red-300 border border-red-200 dark:border-red-800 transition-colors shadow-2xs cursor-pointer select-none"
        >
          <Radio className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
          <span>Quartéis</span>
        </button>
      </div>

      <p className="font-medium text-slate-500 dark:text-zinc-500">
        Checklist da UR — Unidade de Resgate Pré-Hospitalar
      </p>
      <p className="mt-1">
        Persistência local ativada • Compatível com GitHub Pages
      </p>
    </footer>
  );
}
