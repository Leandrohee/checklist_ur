import React from "react";
import { ChecklistCategory, ChecklistState } from "@/types/checklist";
import { calculateCategoryProgress } from "@/services/checklist/calculateCategoryProgress";
import { CategoryHeader } from "./CategoryHeader";
import { SubcategorySection } from "./SubcategorySection";
import { ChecklistItemRow } from "./ChecklistItemRow";

interface CategoryCardProps {
  category: ChecklistCategory;
  state: ChecklistState;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleItem: (itemId: string) => void;
  onToggleCategory: (category: ChecklistCategory) => void;
}

export function CategoryCard({
  category,
  state,
  isExpanded,
  onToggleExpand,
  onToggleItem,
  onToggleCategory,
}: CategoryCardProps) {
  const progress = calculateCategoryProgress(category, state);

  const handleToggleAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCategory(category);
  };

  const hasSubcategories = Boolean(
    category.subcategories && category.subcategories.length > 0
  );

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      <CategoryHeader
        category={category}
        progress={progress}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
        onToggleAllCategory={handleToggleAll}
      />

      {/* Mini indicador de progresso no rodapé do cabeçalho */}
      <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1">
        <div
          className={`h-full transition-all duration-300 ${
            progress.isComplete ? "bg-emerald-500" : "bg-blue-500"
          }`}
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {isExpanded && (
        <div className="p-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/30 dark:bg-zinc-950/20 space-y-4">
          {hasSubcategories ? (
            category.subcategories?.map((sub) => (
              <SubcategorySection
                key={sub.id}
                subcategory={sub}
                state={state}
                onToggleItem={onToggleItem}
              />
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {category.items?.map((item) => (
                <ChecklistItemRow
                  key={item.id}
                  item={item}
                  isChecked={Boolean(state[item.id])}
                  onToggle={() => onToggleItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
