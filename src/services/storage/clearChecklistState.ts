import { STORAGE_KEY } from "./loadChecklistState";
import { CHECKLIST_UPDATE_EVENT } from "./saveChecklistState";

/**
 * Remove o estado salvo do checklist do localStorage e notifica os ouvintes.
 */
export function clearChecklistState(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CHECKLIST_UPDATE_EVENT));
  } catch (error) {
    console.error("Erro ao limpar estado do checklist no localStorage:", error);
  }
}
