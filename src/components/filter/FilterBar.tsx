import React from "react";
import { ChecklistFilter } from "@/types/checklist";
import { SearchInput } from "./SearchInput";
import { FilterTabs } from "./FilterTabs";
import { ActionButtons } from "./ActionButtons";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentFilter: ChecklistFilter;
  onFilterChange: (filter: ChecklistFilter) => void;
  totalCount: number;
  pendingCount: number;
  checkedCount: number;
  onCheckAll: () => void;
  onReset: () => void;
  onOpenReport: () => void;
  onToggleAllExpanded: () => void;
  areAllExpanded: boolean;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  currentFilter,
  onFilterChange,
  totalCount,
  pendingCount,
  checkedCount,
  onCheckAll,
  onReset,
  onOpenReport,
  onToggleAllExpanded,
  areAllExpanded,
}: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm mb-6 space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <SearchInput value={searchQuery} onChange={onSearchChange} />
        <FilterTabs
          currentFilter={currentFilter}
          onChange={onFilterChange}
          totalCount={totalCount}
          pendingCount={pendingCount}
          checkedCount={checkedCount}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 dark:border-zinc-800 pt-3 gap-2.5">
        <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
          Ações rápidas da viatura:
        </span>
        <ActionButtons
          onCheckAll={onCheckAll}
          onReset={onReset}
          onOpenReport={onOpenReport}
          onToggleAllExpanded={onToggleAllExpanded}
          areAllExpanded={areAllExpanded}
        />
      </div>
    </div>
  );
}
