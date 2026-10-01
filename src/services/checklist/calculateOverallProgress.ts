import { ChecklistCategory, ChecklistState, OverallProgress } from "@/types/checklist";
import { getAllCategoryItems } from "./getAllCategoryItems";

/**
 * Calcula o progresso global de todos os itens do checklist da viatura.
 */
export function calculateOverallProgress(
  categories: ChecklistCategory[],
  state: ChecklistState
): OverallProgress {
  const allItems = getAllCategoryItems(categories);
  const total = allItems.length;

  if (total === 0) {
    return { total: 0, checked: 0, percentage: 100, isComplete: true };
  }

  const checked = allItems.filter((item) => Boolean(state[item.id])).length;
  const percentage = Math.round((checked / total) * 100);
  const isComplete = checked === total;

  return {
    total,
    checked,
    percentage,
    isComplete,
  };
}
