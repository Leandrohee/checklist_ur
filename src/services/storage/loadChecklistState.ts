import { ChecklistState } from "@/types/checklist";

export const STORAGE_KEY = "ur_checklist_state_v1";

/**
 * Carrega com segurança o estado do checklist salvo no localStorage do navegador.
 */
export function loadChecklistState(): ChecklistState {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ChecklistState;
  } catch (error) {
    console.error("Erro ao carregar estado do checklist do localStorage:", error);
    return {};
  }
}
