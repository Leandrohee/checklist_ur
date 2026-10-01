import { ChecklistCategory, ChecklistItem } from "@/types/checklist";

/**
 * Retorna todos os itens contidos em uma categoria,
 * independentemente de estarem organizados em subcategorias ou na raiz da categoria.
 */
export function getItemList(category: ChecklistCategory): ChecklistItem[] {
  if (category.subcategories && category.subcategories.length > 0) {
    return category.subcategories.flatMap((sub) => sub.items);
  }

  return category.items || [];
}
