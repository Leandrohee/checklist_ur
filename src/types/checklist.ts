export interface ChecklistItem {
  id: string;
  name: string;
  quantity: number | string;
  unit?: string;
  notes?: string;
}

export interface ChecklistSubcategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistCategory {
  id: string;
  title: string;
  icon?: string;
  subcategories?: ChecklistSubcategory[];
  items?: ChecklistItem[];
}

export type ChecklistFilter = "all" | "pending" | "checked";

export type ChecklistState = Record<string, boolean>;

export interface CategoryProgress {
  total: number;
  checked: number;
  percentage: number;
  isComplete: boolean;
}

export interface OverallProgress {
  total: number;
  checked: number;
  percentage: number;
  isComplete: boolean;
}
