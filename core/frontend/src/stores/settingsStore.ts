/**
 * Settings Store - Zustand store for UI settings with localStorage persistence
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TimeRange } from '@/types/settings'

interface SettingsState {
  // UI Settings
  sidebarCollapsed: boolean
  performanceDashboardTimeRange: TimeRange

  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void
  setPerformanceDashboardTimeRange: (range: TimeRange) => void
  loadSettings: (settings: Partial<Pick<SettingsState, 'sidebarCollapsed' | 'performanceDashboardTimeRange'>>) => void
  setIsSyncing: (syncing: boolean) => void

  // Sync state
  isSyncing: boolean
}

// Default settings
const DEFAULT_SETTINGS = {
  sidebarCollapsed: false,
  performanceDashboardTimeRange: 'today' as TimeRange,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      isSyncing: false,

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed })
      },

      setPerformanceDashboardTimeRange: (range: TimeRange) => {
        set({ performanceDashboardTimeRange: range })
      },

      loadSettings: (settings) => {
        set({
          sidebarCollapsed: settings.sidebarCollapsed ?? DEFAULT_SETTINGS.sidebarCollapsed,
          performanceDashboardTimeRange: settings.performanceDashboardTimeRange ?? DEFAULT_SETTINGS.performanceDashboardTimeRange,
        })
      },

      setIsSyncing: (syncing: boolean) => {
        set({ isSyncing: syncing })
      },
    }),
    {
      name: 'hive-settings',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        performanceDashboardTimeRange: state.performanceDashboardTimeRange,
      }),
    }
  )
)