import React from "react";
import { ChecklistFilter } from "@/types/checklist";

interface FilterTabsProps {
  currentFilter: ChecklistFilter;
  onChange: (filter: ChecklistFilter) => void;
  totalCount: number;
  pendingCount: number;
  checkedCount: number;
}

export function FilterTabs({
  currentFilter,
  onChange,
  totalCount,
  pendingCount,
  checkedCount,
}: FilterTabsProps) {
  const tabs: { id: ChecklistFilter; label: string; count: number }[] = [
    { id: "all", label: "Todos", count: totalCount },
    { id: "pending", label: "Pendentes", count: pendingCount },
    { id: "checked", label: "Conferidos", count: checkedCount },
  ];

  return (
    <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl gap-1 text-xs font-medium">
      {tabs.map((tab) => {
        const isActive = currentFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              isActive
                ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive
                  ? "bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200"
                  : "bg-slate-200/80 dark:bg-zinc-700/80 text-slate-600 dark:text-zinc-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
