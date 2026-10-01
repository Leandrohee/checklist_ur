import { ChecklistState } from "@/types/checklist";
import { STORAGE_KEY } from "./loadChecklistState";

export const CHECKLIST_UPDATE_EVENT = "checklist-update";

/**
 * Salva com segurança o estado atual do checklist no localStorage do navegador
 * e notifica a aplicação através de evento customizado.
 */
export function saveChecklistState(state: ChecklistState): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(CHECKLIST_UPDATE_EVENT));
  } catch (error) {
    console.error("Erro ao salvar estado do checklist no localStorage:", error);
  }
}
