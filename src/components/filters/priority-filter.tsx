import { ChevronDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { TaskPriority } from "@/store/project/types"

type PriorityFilterProps = {
  selectedPriorities: TaskPriority[]
  onChange: (priorities: TaskPriority[]) => void
}

const priorityOptions: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

const PriorityFilter = (props: PriorityFilterProps) => {
  const { selectedPriorities, onChange } = props

  const toggle = (value: TaskPriority) => {
    const newPriorities = selectedPriorities.includes(value)
      ? selectedPriorities.filter((p) => p !== value)
      : [...selectedPriorities, value]
    onChange(newPriorities)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-[160px] justify-between text-sm'>
          Priority
          <ChevronDown className='h-4 w-4 ml-2' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-48 space-y-2'>
        {priorityOptions.map(({ value, label }) => (
          <label key={value} className='flex items-center gap-2 text-sm'>
            <Checkbox
              checked={selectedPriorities.includes(value)}
              onCheckedChange={() => toggle(value)}
            />
            {label}
          </label>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default PriorityFilter
