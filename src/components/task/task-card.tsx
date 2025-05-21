import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Task } from "@/store/project/types"

type TaskCardProps = {
  task: Task
}

const TaskCard = (props: TaskCardProps) => {
  const { task } = props

  return (
    <div className='rounded-xl shadow-md bg-white p-4 space-y-3'>
      <div className='flex flex-col '>
        <h3 className='text-md font-semibold line-clamp-1'>{task.title}</h3>

        {task.description && (
          <p className='text-sm text-muted-foreground line-clamp-3'>
            {task.description}
          </p>
        )}
      </div>

      <Badge variant='outline' className='text-xs'>
        {task.priority}
      </Badge>

      <div className='flex justify-between items-center text-xs text-muted-foreground mt-2'>
        <span>
          {task.updatedAt
            ? `Updated: ${formatDate(task.updatedAt)}`
            : `Created: ${formatDate(task.createdAt)}`}
        </span>

        {task.assignee && (
          <Avatar className='h-6 w-6'>
            <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  )
}

export default TaskCard
