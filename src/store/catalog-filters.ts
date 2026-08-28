import { create } from "zustand";
import type {
  CourseStatus,
  DifficultyLevel,
  Discipline,
  SoftwareTag,
} from "@/lib/types";

export type SortKey = "CÓDIGO" | "DURACIÓN" | "NIVEL";

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

interface CatalogFiltersState {
  query: string;
  disciplines: Discipline[];
  levels: DifficultyLevel[];
  statuses: CourseStatus[];
  software: SoftwareTag[];
  sort: SortKey;
  page: number;
  setQuery: (query: string) => void;
  toggleDiscipline: (value: Discipline) => void;
  toggleLevel: (value: DifficultyLevel) => void;
  toggleStatus: (value: CourseStatus) => void;
  toggleSoftware: (value: SoftwareTag) => void;
  setSort: (sort: SortKey) => void;
  setPage: (page: number) => void;
  clearAll: () => void;
}

const initialState = {
  query: "",
  disciplines: [] as Discipline[],
  levels: [] as DifficultyLevel[],
  statuses: [] as CourseStatus[],
  software: [] as SoftwareTag[],
  sort: "CÓDIGO" as SortKey,
  page: 1,
};

export const useCatalogFilters = create<CatalogFiltersState>((set) => ({
  ...initialState,
  setQuery: (query) => set({ query, page: 1 }),
  toggleDiscipline: (value) =>
    set((state) => ({
      disciplines: toggleValue(state.disciplines, value),
      page: 1,
    })),
  toggleLevel: (value) =>
    set((state) => ({ levels: toggleValue(state.levels, value), page: 1 })),
  toggleStatus: (value) =>
    set((state) => ({ statuses: toggleValue(state.statuses, value), page: 1 })),
  toggleSoftware: (value) =>
    set((state) => ({ software: toggleValue(state.software, value), page: 1 })),
  setSort: (sort) => set({ sort, page: 1 }),
  setPage: (page) => set({ page }),
  clearAll: () => set({ ...initialState }),
}));

export function countActiveFilters(state: CatalogFiltersState): number {
  return (
    state.disciplines.length +
    state.levels.length +
    state.statuses.length +
    state.software.length +
    (state.query.trim().length > 0 ? 1 : 0)
  );
}
