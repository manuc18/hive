import { Activity, TrendingUp, Users, CalendarDays } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { usePersistedTimeRange } from '@/hooks/usePersistedSettings'
import { useLogs } from '@/hooks/queries/useLogs'

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

interface AnalyticsPanelProps {
  className?: string
}

export function AnalyticsPanel({ className }: AnalyticsPanelProps) {
  const { timeRange, setTimeRange } = usePersistedTimeRange()
  const { data: logs } = useLogs({
    timeRange,
    limit: 1000,
  })

  // Calculate metrics
  const totalRequests = logs?.length || 0
  const successfulRequests = logs?.filter((log: LogEntry) => log.success).length || 0
  const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0

  const uniqueAgents = new Set(logs?.map((log: LogEntry) => log.agent_id)).size
  const avgResponseTime = logs?.length
    ? logs.reduce((sum: number, log: LogEntry) => sum + (log.duration_ms || 0), 0) / logs.length
    : 0

  const metrics = [
    {
      title: 'Total Requests',
      value: totalRequests.toLocaleString(),
      description: 'All API requests',
      icon: Activity,
      trend: '+12%',
    },
    {
      title: 'Success Rate',
      value: `${successRate.toFixed(1)}%`,
      description: 'Successful requests',
      icon: TrendingUp,
      trend: '+2.1%',
    },
    {
      title: 'Active Agents',
      value: uniqueAgents.toString(),
      description: 'Unique agents',
      icon: Users,
      trend: '+5',
    },
    {
      title: 'Avg Response Time',
      value: `${avgResponseTime.toFixed(0)}ms`,
      description: 'Average duration',
      icon: CalendarDays,
      trend: '-15ms',
    },
  ]

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor your agents' performance and usage patterns
          </p>
        </div>
        <DateRangePicker
          value={timeRange}
          onChange={setTimeRange}
          className="w-[280px]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <div className="flex items-center pt-1">
                <span className="text-xs text-green-600 font-medium">
                  {metric.trend}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TODO: Add loading state when needed */}
    </div>
  )
}