/**
 * Settings-related type definitions
 */

export type TimeRange = 'today' | 'week' | 'twoWeeks' | 'month' | 'all'

export interface UpdateUISettingsPayload {
  sidebarCollapsed?: boolean
  performanceDashboardTimeRange?: TimeRange
}

export interface AgentStatus {
  type: string
  active: boolean
  count: number
  instances: Array<{
    instance_id: string
    policy_id: string | null
    agent_name: string | null
    connected_at: string
    last_heartbeat: string
    connection_type: 'websocket' | 'http'
    status?: string
  }>
  timestamp: string
}

export interface LogsFilters {
  type?: string
  success?: string
}