"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmResetModal({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmResetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Reiniciar Checklist da UR?
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Esta ação desmarcará todos os itens conferidos.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-zinc-300">
          Você tem certeza de que deseja limpar a conferência atual? Os dados salvos localmente serão reiniciados.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm"
          >
            Sim, Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}
