import { ChecklistCategory, ChecklistFilter, ChecklistItem, ChecklistState } from "@/types/checklist";

function matchesFilter(item: ChecklistItem, state: ChecklistState, filter: ChecklistFilter): boolean {
  if (filter === "checked") return Boolean(state[item.id]);
  if (filter === "pending") return !state[item.id];
  return true;
}

function matchesSearch(item: ChecklistItem, searchLower: string): boolean {
  if (!searchLower) return true;
  return (
    item.name.toLowerCase().includes(searchLower) ||
    (item.notes ? item.notes.toLowerCase().includes(searchLower) : false)
  );
}

/**
 * Filtra categorias, subcategorias e itens com base no texto de busca e status (todos, pendentes, conferidos).
 */
export function filterChecklist(
  categories: ChecklistCategory[],
  state: ChecklistState,
  search: string,
  filter: ChecklistFilter
): ChecklistCategory[] {
  const searchLower = search.trim().toLowerCase();

  return categories
    .map((category) => {
      // Se a categoria tem subcategorias
      if (category.subcategories && category.subcategories.length > 0) {
        const filteredSubcategories = category.subcategories
          .map((sub) => {
            const filteredItems = sub.items.filter(
              (item) => matchesFilter(item, state, filter) && matchesSearch(item, searchLower)
            );
            return {
              ...sub,
              items: filteredItems,
            };
          })
          .filter((sub) => sub.items.length > 0);

        return {
          ...category,
          subcategories: filteredSubcategories,
        };
      }

      // Se a categoria tem itens diretos
      const items = category.items || [];
      const filteredItems = items.filter(
        (item) => matchesFilter(item, state, filter) && matchesSearch(item, searchLower)
      );

      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((category) => {
      const hasSubItems =
        category.subcategories &&
        category.subcategories.some((sub) => sub.items.length > 0);
      const hasDirectItems = category.items && category.items.length > 0;
      return hasSubItems || hasDirectItems;
    });
}
