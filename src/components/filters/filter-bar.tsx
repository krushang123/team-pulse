import { SlidersHorizontal, X } from "lucide-react"

import { TaskPriority, TaskStatus } from "@/store/project/types"

import AssigneeFilter from "./assignee-filter"
import StatusFilter from "./status-filter"
import PriorityFilter from "./priority-filter"
import { Button } from "../ui/button"

type FilterBarProps = {
  assignees: { id: string; name: string; avatarUrl?: string }[]
  selectedAssigneeId: string | null
  onAssigneeChange: (id: string | null) => void
  selectedStatuses: TaskStatus[]
  onStatusesChange: (statuses: TaskStatus[]) => void
  selectedPriorities: TaskPriority[]
  onPrioritiesChange: (priorities: TaskPriority[]) => void
  onClearFilters: () => void
}

const FilterBar = (props: FilterBarProps) => {
  const {
    assignees,
    selectedAssigneeId,
    onAssigneeChange,
    selectedStatuses,
    onStatusesChange,
    selectedPriorities,
    onPrioritiesChange,
    onClearFilters,
  } = props

  return (
    <div className='flex flex-wrap items-center gap-4 mb-6'>
      <div className='flex items-center text-muted-foreground gap-2 mr-2'>
        <SlidersHorizontal className='w-4 h-4' />
      </div>

      <AssigneeFilter
        assignees={assignees}
        selectedAssigneeId={selectedAssigneeId}
        onChange={onAssigneeChange}
      />

      <StatusFilter
        selectedStatuses={selectedStatuses}
        onChange={onStatusesChange}
      />

      <PriorityFilter
        selectedPriorities={selectedPriorities}
        onChange={onPrioritiesChange}
      />

      <Button onClick={onClearFilters} variant='secondary'>
        <X className='w-4 h-4' />
        Clear Filters
      </Button>
    </div>
  )
}

export default FilterBar
