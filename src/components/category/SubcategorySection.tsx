import React from "react";
import { ChecklistState, ChecklistSubcategory } from "@/types/checklist";
import { ChecklistItemRow } from "./ChecklistItemRow";
import { Badge } from "@/components/common/Badge";

interface SubcategorySectionProps {
  subcategory: ChecklistSubcategory;
  state: ChecklistState;
  onToggleItem: (itemId: string) => void;
}

export function SubcategorySection({
  subcategory,
  state,
  onToggleItem,
}: SubcategorySectionProps) {
  const total = subcategory.items.length;
  const checked = subcategory.items.filter((item) => Boolean(state[item.id])).length;
  const isComplete = total > 0 && checked === total;

  return (
    <div className="space-y-2 pt-2 first:pt-0">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500" />
          {subcategory.title}
        </h4>
        <Badge
          variant={isComplete ? "success" : "neutral"}
          className="text-[11px]"
        >
          {checked}/{total}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {subcategory.items.map((item) => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            isChecked={Boolean(state[item.id])}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
