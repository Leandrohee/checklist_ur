"use client";

import { useState, useCallback } from "react";
import { ChecklistCategory } from "@/types/checklist";

export function useExpandedCategories(categories: ChecklistCategory[]) {
  // Inicialmente todas as categorias abertas
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      initial[cat.id] = true;
    });
    return initial;
  });

  const toggleCategoryExpand = useCallback((categoryId: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }, []);

  const areAllExpanded = categories.every((cat) => Boolean(expandedMap[cat.id]));

  const toggleAllExpanded = useCallback(() => {
    const nextValue = !areAllExpanded;
    const nextState: Record<string, boolean> = {};
    categories.forEach((cat) => {
      nextState[cat.id] = nextValue;
    });
    setExpandedMap(nextState);
  }, [areAllExpanded, categories]);

  return {
    expandedMap,
    toggleCategoryExpand,
    toggleAllExpanded,
    areAllExpanded,
  };
}
