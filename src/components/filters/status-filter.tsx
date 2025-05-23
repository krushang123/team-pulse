import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { TaskStatus } from "@/store/project/types"
import { ChevronDown } from "lucide-react"

type StatusFilterProps = {
  selectedStatuses: TaskStatus[]
  onChange: (statuses: TaskStatus[]) => void
}

const statusOptions: { label: string; value: TaskStatus }[] = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
]

const StatusFilter = (props: StatusFilterProps) => {
  const { selectedStatuses, onChange } = props

  const toggle = (value: TaskStatus) => {
    const newStatuses = selectedStatuses.includes(value)
      ? selectedStatuses.filter((s) => s !== value)
      : [...selectedStatuses, value]
    onChange(newStatuses)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-[160px] justify-between text-sm'>
          Status
          <ChevronDown className='h-4 w-4 ml-2' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-48 space-y-2'>
        {statusOptions.map(({ label, value }) => (
          <label key={value} className='flex items-center gap-2 text-sm'>
            <Checkbox
              checked={selectedStatuses.includes(value)}
              onCheckedChange={() => toggle(value)}
            />
            {label}
          </label>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default StatusFilter
