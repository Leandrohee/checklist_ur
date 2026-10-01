import { ChecklistCategory, ChecklistItem } from "@/types/checklist";
import { getItemList } from "./getItemList";

/**
 * Retorna uma lista plana contendo todos os itens de todas as categorias.
 */
export function getAllCategoryItems(categories: ChecklistCategory[]): ChecklistItem[] {
  return categories.flatMap((cat) => getItemList(cat));
}
