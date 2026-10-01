import React from "react";
import { ChevronDown, ChevronUp, CheckCheck } from "lucide-react";
import { CategoryProgress, ChecklistCategory } from "@/types/checklist";
import { getCategoryIcon } from "@/utils/getCategoryIcon";
import { Badge } from "@/components/common/Badge";

interface CategoryHeaderProps {
  category: ChecklistCategory;
  progress: CategoryProgress;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleAllCategory: (e: React.MouseEvent) => void;
}

export function CategoryHeader({
  category,
  progress,
  isExpanded,
  onToggleExpand,
  onToggleAllCategory,
}: CategoryHeaderProps) {
  return (
    <div
      onClick={onToggleExpand}
      className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
            progress.isComplete
              ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800"
              : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
          }`}
        >
          {getCategoryIcon(category.icon)}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight uppercase truncate">
              {category.title}
            </h3>
            <Badge
              variant={progress.isComplete ? "success" : progress.checked > 0 ? "warning" : "neutral"}
            >
              {progress.checked}/{progress.total} ({progress.percentage}%)
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onToggleAllCategory}
          title={
            progress.isComplete
              ? "Desmarcar todos os itens desta categoria"
              : "Marcar todos os itens desta categoria"
          }
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          <CheckCheck className={`w-4 h-4 ${progress.isComplete ? "text-emerald-600" : ""}`} />
        </button>

        <div className="text-slate-400 dark:text-zinc-500">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
}
