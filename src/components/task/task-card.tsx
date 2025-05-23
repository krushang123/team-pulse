import { Pencil, Trash2 } from "lucide-react"
import { CSS } from "@dnd-kit/utilities"
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Task } from "@/store/project/types"

type TaskCardProps = {
  task: Task
  isOverlay?: boolean
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

const TaskCard = (props: TaskCardProps) => {
  const { task, isOverlay, onEdit, onDelete } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      status: task.status,
      task,
    },
    disabled: isOverlay,
    animateLayoutChanges: (args) =>
      isOverlay ? false : defaultAnimateLayoutChanges(args),
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
    cursor: "grab",
    touchAction: "none",
  }

  return (
    <Card
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      className='rounded-xl shadow-md relative group'
      role='listitem'
      tabIndex={0}
    >
      <CardHeader className='flex justify-between items-start gap-2'>
        <div
          className='flex flex-1 flex-col gap-2'
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
        >
          <CardTitle className='line-clamp-1'>{task.title}</CardTitle>

          {task.description && (
            <CardDescription className='line-clamp-2'>
              {task.description}
            </CardDescription>
          )}
        </div>

        <div className='hidden group-hover:flex group-focus-within:flex sm:group-hover:flex sm:group-focus-within:flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground'
            style={{ pointerEvents: "auto" }}
            onClick={(e) => {
              e.stopPropagation()
              onEdit(task.id)
            }}
          >
            <Pencil className='w-4 h-4' />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground'
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Badge variant='outline' className='text-xs'>
          {task.priority}
        </Badge>
      </CardContent>

      <CardFooter className='flex justify-between items-center text-xs text-muted-foreground'>
        <span>
          {task.updatedAt
            ? `Updated ${formatDate(task.updatedAt)}`
            : `Created ${formatDate(task.createdAt)}`}
        </span>

        {task.assignee && (
          <Avatar className='h-6 w-6'>
            <AvatarImage
              src={task.assignee.avatarUrl}
              alt={task.assignee.name}
            />
            <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
          </Avatar>
        )}
      </CardFooter>
    </Card>
  )
}

export default TaskCard
