"use client";

import { useState, useMemo } from "react";
import { ChecklistCategory, ChecklistFilter, ChecklistState } from "@/types/checklist";
import { filterChecklist } from "@/services/checklist/filterChecklist";

export function useChecklistFilter(
  initialCategories: ChecklistCategory[],
  state: ChecklistState
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ChecklistFilter>("all");

  const filteredCategories = useMemo(() => {
    return filterChecklist(initialCategories, state, searchQuery, statusFilter);
  }, [initialCategories, state, searchQuery, statusFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredCategories,
  };
}
