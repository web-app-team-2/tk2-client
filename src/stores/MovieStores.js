import create from 'zustand'

export const useSearchStore = create(set => ({
  search: null,
  setSearch: (searchText) => set(state => ({ search: searchText })),
}))