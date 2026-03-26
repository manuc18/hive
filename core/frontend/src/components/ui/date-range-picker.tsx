import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { TimeRange } from '@/types/settings'

interface DateRangePickerProps {
  value?: TimeRange
  onChange?: (range: TimeRange) => void
  className?: string
}

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  today: 'Today',
  week: 'Last 7 days',
  twoWeeks: 'Last 14 days',
  month: 'Last 30 days',
  all: 'All time',
}

export function DateRangePicker({
  value = 'today',
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn('grid gap-2', className)}>
      <div className="relative">
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          onClick={() => setOpen(!open)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {TIME_RANGE_LABELS[value]}
        </Button>
        {open && (
          <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
            {Object.entries(TIME_RANGE_LABELS).map(([range, label]) => (
              <Button
                key={range}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onChange?.(range as TimeRange)
                  setOpen(false)
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}