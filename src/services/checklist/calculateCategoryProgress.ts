import { CategoryProgress, ChecklistCategory, ChecklistState } from "@/types/checklist";
import { getItemList } from "./getItemList";

/**
 * Calcula o progresso de conferência de uma categoria específica.
 */
export function calculateCategoryProgress(
  category: ChecklistCategory,
  state: ChecklistState
): CategoryProgress {
  const items = getItemList(category);
  const total = items.length;
  
  if (total === 0) {
    return { total: 0, checked: 0, percentage: 100, isComplete: true };
  }

  const checked = items.filter((item) => Boolean(state[item.id])).length;
  const percentage = Math.round((checked / total) * 100);
  const isComplete = checked === total;

  return {
    total,
    checked,
    percentage,
    isComplete,
  };
}
