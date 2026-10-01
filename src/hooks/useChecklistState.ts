"use client";

import { useSyncExternalStore, useMemo, useCallback } from "react";
import { ChecklistCategory, ChecklistState } from "@/types/checklist";
import { STORAGE_KEY } from "@/services/storage/loadChecklistState";
import { saveChecklistState, CHECKLIST_UPDATE_EVENT } from "@/services/storage/saveChecklistState";
import { clearChecklistState } from "@/services/storage/clearChecklistState";
import { getItemList } from "@/services/checklist/getItemList";
import { getAllCategoryItems } from "@/services/checklist/getAllCategoryItems";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHECKLIST_UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHECKLIST_UPDATE_EVENT, callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "{}";
  return localStorage.getItem(STORAGE_KEY) || "{}";
}

function getServerSnapshot(): string {
  return "{}";
}

const emptySubscribe = () => () => {};

export function useChecklistState() {
  // Detecta se a renderização já está no cliente para evitar discrepância de hidratação
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );

  const rawState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const state: ChecklistState = useMemo(() => {
    try {
      return JSON.parse(rawState);
    } catch {
      return {};
    }
  }, [rawState]);

  // Alterna o estado de um item individual
  const toggleItem = useCallback((itemId: string) => {
    try {
      const current = JSON.parse(getSnapshot()) as ChecklistState;
      const next = {
        ...current,
        [itemId]: !current[itemId],
      };
      saveChecklistState(next);
    } catch {
      saveChecklistState({ [itemId]: true });
    }
  }, []);

  // Marca ou desmarca todos os itens de uma categoria
  const toggleCategory = useCallback((category: ChecklistCategory, targetValue?: boolean) => {
    try {
      const current = JSON.parse(getSnapshot()) as ChecklistState;
      const items = getItemList(category);
      const allCurrentlyChecked = items.every((item) => Boolean(current[item.id]));
      const shouldCheck = targetValue !== undefined ? targetValue : !allCurrentlyChecked;

      const next = { ...current };
      items.forEach((item) => {
        next[item.id] = shouldCheck;
      });

      saveChecklistState(next);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Marca todos os itens de todas as categorias
  const checkAll = useCallback((categories: ChecklistCategory[]) => {
    const allItems = getAllCategoryItems(categories);
    const next: ChecklistState = {};
    allItems.forEach((item) => {
      next[item.id] = true;
    });
    saveChecklistState(next);
  }, []);

  // Limpa o estado salvo
  const resetAll = useCallback(() => {
    clearChecklistState();
  }, []);

  return {
    state,
    isLoaded: !isServer,
    toggleItem,
    toggleCategory,
    checkAll,
    resetAll,
  };
}
