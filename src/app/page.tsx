"use client";

import React, { useState } from "react";
import { checklistCategories } from "@/data/categories";
import { useChecklistState } from "@/hooks/useChecklistState";
import { useChecklistFilter } from "@/hooks/useChecklistFilter";
import { useExpandedCategories } from "@/hooks/useExpandedCategories";
import { calculateOverallProgress } from "@/services/checklist/calculateOverallProgress";
import { getAllCategoryItems } from "@/services/checklist/getAllCategoryItems";

import { Header } from "@/components/header/Header";
import { OverallProgressCard } from "@/components/header/OverallProgressCard";
import { FilterBar } from "@/components/filter/FilterBar";
import { CategoryList } from "@/components/category/CategoryList";
import { MissingItemsModal } from "@/components/modals/MissingItemsModal";
import { ConfirmResetModal } from "@/components/modals/ConfirmResetModal";
import { GbmInfoModal } from "@/components/modals/GbmInfoModal";
import { Footer } from "@/components/footer/Footer";

export default function ChecklistUrPage() {
  const {
    state,
    isLoaded,
    toggleItem,
    toggleCategory,
    checkAll,
    resetAll,
  } = useChecklistState();

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredCategories,
  } = useChecklistFilter(checklistCategories, state);

  const {
    expandedMap,
    toggleCategoryExpand,
    toggleAllExpanded,
    areAllExpanded,
  } = useExpandedCategories(checklistCategories);

  const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isGbmModalOpen, setIsGbmModalOpen] = useState(false);

  // Progresso geral
  const progress = calculateOverallProgress(checklistCategories, state);

  // Contagens para as abas de filtro
  const allItems = getAllCategoryItems(checklistCategories);
  const totalCount = allItems.length;
  const checkedCount = allItems.filter((i) => Boolean(state[i.id])).length;
  const pendingCount = totalCount - checkedCount;

  const handleConfirmReset = () => {
    resetAll();
    setIsResetModalOpen(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Carregando checklist da UR...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Header />

        <OverallProgressCard
          progress={progress}
          onOpenMissingModal={() => setIsMissingModalOpen(true)}
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
          totalCount={totalCount}
          pendingCount={pendingCount}
          checkedCount={checkedCount}
          onCheckAll={() => checkAll(checklistCategories)}
          onReset={() => setIsResetModalOpen(true)}
          onOpenReport={() => setIsMissingModalOpen(true)}
          onToggleAllExpanded={toggleAllExpanded}
          areAllExpanded={areAllExpanded}
        />

        <CategoryList
          categories={filteredCategories}
          state={state}
          expandedMap={expandedMap}
          onToggleExpand={toggleCategoryExpand}
          onToggleItem={toggleItem}
          onToggleCategory={toggleCategory}
          searchQuery={searchQuery}
          onClearSearch={() => {
            setSearchQuery("");
            setStatusFilter("all");
          }}
        />

        <Footer onOpenGbmInfo={() => setIsGbmModalOpen(true)} />
      </div>

      <MissingItemsModal
        isOpen={isMissingModalOpen}
        onClose={() => setIsMissingModalOpen(false)}
        categories={checklistCategories}
        state={state}
      />

      <ConfirmResetModal
        isOpen={isResetModalOpen}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />

      <GbmInfoModal
        isOpen={isGbmModalOpen}
        onClose={() => setIsGbmModalOpen(false)}
      />
    </main>
  );
}
