/**
 * Settings API Service
 * Handles communication with backend settings endpoints
 */

import type { UpdateUISettingsPayload } from '@/types/settings'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export interface UISettingsResponse {
  success: boolean
  data: {
    sidebarCollapsed: boolean
    performanceDashboardTimeRange: string
  }
}

export interface UpdateUISettingsResponse {
  success: boolean
  data: {
    sidebarCollapsed: boolean
    performanceDashboardTimeRange: string
  }
}

/**
 * Get user UI settings from backend
 */
export async function getUISettings(): Promise<UISettingsResponse> {
  const token = localStorage.getItem('authToken')
  if (!token) {
    throw new Error('No auth token available')
  }

  const response = await fetch(`${API_BASE}/api/v1/user/settings`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch settings: ${response.status}`)
  }

  return response.json()
}

/**
 * Update user UI settings on backend
 */
export async function updateUISettings(settings: UpdateUISettingsPayload): Promise<UpdateUISettingsResponse> {
  const token = localStorage.getItem('authToken')
  if (!token) {
    throw new Error('No auth token available')
  }

  const response = await fetch(`${API_BASE}/api/v1/user/settings`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  })

  if (!response.ok) {
    throw new Error(`Failed to update settings: ${response.status}`)
  }

  return response.json()
}