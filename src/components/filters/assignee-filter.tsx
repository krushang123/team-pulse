import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Assignee } from "@/store/project/types"

type AssigneeFilterProps = {
  assignees: Assignee[]
  selectedAssigneeId: string | null
  onChange: (id: string | null) => void
}

const AssigneeFilter = (props: AssigneeFilterProps) => {
  const { assignees, selectedAssigneeId, onChange } = props
  return (
    <Select
      value={selectedAssigneeId ?? "all"}
      onValueChange={(val) =>
        onChange(
          val === "all" ? null : val === "unassigned" ? "unassigned" : val,
        )
      }
    >
      <SelectTrigger className='w-[200px]'>
        <SelectValue placeholder='Assignee' />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value='all'>All Assignees</SelectItem>
        <SelectItem value='unassigned'>Unassigned</SelectItem>

        {assignees.map((assignee) => (
          <SelectItem key={assignee.id} value={assignee.id}>
            <div className='flex items-center gap-2'>
              <Avatar className='h-5 w-5'>
                <AvatarImage src={assignee.avatarUrl} />
                <AvatarFallback>{assignee.name[0]}</AvatarFallback>
              </Avatar>
              {assignee.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default AssigneeFilter
