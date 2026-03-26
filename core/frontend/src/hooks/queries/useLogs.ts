import { useQuery } from '@tanstack/react-query'
import { TimeRange } from '@/types/settings'

interface UseLogsOptions {
  timeRange: TimeRange
  limit?: number
  offset?: number
  type?: string
  success?: boolean
}

interface LogEntry {
  id: string
  timestamp: string
  agent_id: string
  type: string
  success: boolean
  duration_ms?: number
  message?: string
  metadata?: Record<string, any>
}

export function useLogs(options: UseLogsOptions) {
  const { timeRange, limit = 100, offset = 0, type, success } = options

  return useQuery({
    queryKey: ['logs', timeRange, limit, offset, type, success],
    queryFn: async () => {
      const params = new URLSearchParams({
        timeRange,
        limit: limit.toString(),
        offset: offset.toString(),
      })

      if (type) params.append('type', type)
      if (success !== undefined) params.append('success', success.toString())

      const response = await fetch(`/api/v1/logs?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch logs')
      }
      return response.json() as Promise<LogEntry[]>
    },
    staleTime: 30000, // 30 seconds
  })
}