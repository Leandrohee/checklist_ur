import React from "react";
import { ChecklistItem } from "@/types/checklist";
import { Checkbox } from "@/components/common/Checkbox";
import { Badge } from "@/components/common/Badge";

interface ChecklistItemRowProps {
  item: ChecklistItem;
  isChecked: boolean;
  onToggle: () => void;
}

export function ChecklistItemRow({ item, isChecked, onToggle }: ChecklistItemRowProps) {
  return (
    <div
      onClick={onToggle}
      className={`group flex items-center justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
        isChecked
          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-900/50"
          : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/50 dark:hover:bg-zinc-800/40"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          id={item.id}
          checked={isChecked}
          onChange={onToggle}
        />
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm font-medium leading-snug break-words transition-colors ${
              isChecked
                ? "line-through text-slate-400 dark:text-zinc-500"
                : "text-slate-800 dark:text-zinc-100"
            }`}
          >
            {item.name}
          </p>
          {item.notes && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 font-normal">
              {item.notes}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Badge
          variant={isChecked ? "success" : "neutral"}
          className="text-xs font-semibold"
        >
          Qtd: {item.quantity}
        </Badge>
      </div>
    </div>
  );
}
