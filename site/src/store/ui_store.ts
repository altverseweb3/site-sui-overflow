// Stores UI related context

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Tab } from "@/types/ui";

interface UIStoreState {
  // Tab state
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const useUIStore = create<UIStoreState>()(
  persist(
    (set) => ({
      // Tab state
      activeTab: "swap",
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "altverse-storage-ui", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
      version: 1, // version number for migrations
    }
  )
);

export default useUIStore;
