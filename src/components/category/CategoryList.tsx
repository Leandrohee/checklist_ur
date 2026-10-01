import React from "react";
import { SearchX } from "lucide-react";
import { ChecklistCategory, ChecklistState } from "@/types/checklist";
import { CategoryCard } from "./CategoryCard";

interface CategoryListProps {
  categories: ChecklistCategory[];
  state: ChecklistState;
  expandedMap: Record<string, boolean>;
  onToggleExpand: (categoryId: string) => void;
  onToggleItem: (itemId: string) => void;
  onToggleCategory: (category: ChecklistCategory) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export function CategoryList({
  categories,
  state,
  expandedMap,
  onToggleExpand,
  onToggleItem,
  onToggleCategory,
  searchQuery,
  onClearSearch,
}: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-slate-300 dark:border-zinc-700 rounded-2xl p-8 bg-white/50 dark:bg-zinc-900/50">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-zinc-200">
          Nenhum material encontrado
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto mt-1">
          {searchQuery
            ? `Nenhum item corresponde ao termo "${searchQuery}". Verifique a digitação ou limpe o filtro.`
            : "Nenhum item corresponde aos filtros selecionados."}
        </p>
        {onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-4 px-4 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          state={state}
          isExpanded={Boolean(expandedMap[category.id])}
          onToggleExpand={() => onToggleExpand(category.id)}
          onToggleItem={onToggleItem}
          onToggleCategory={onToggleCategory}
        />
      ))}
    </div>
  );
}
