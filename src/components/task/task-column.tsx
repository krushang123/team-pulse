import { useAppSelector } from "@/hooks/use-store"
import { selectTasksByStatus } from "@/store/project/project-slice"
import { TaskStatus } from "@/store/project/types"

import TaskCard from "./task-card"

type TaskColumnProps = {
  status: TaskStatus
  projectId: string
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

const statusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
}

const bgColors: Record<TaskStatus, string> = {
  todo: "bg-blue-50",
  "in-progress": "bg-yellow-50",
  done: "bg-green-50",
}

const TaskColumn = (props: TaskColumnProps) => {
  const { status, projectId, onEdit, onDelete } = props

  const tasks = useAppSelector(selectTasksByStatus(projectId, status))

  return (
    <div className={`rounded-lg p-4 min-h-[400px] ${bgColors[status]}`}>
      <h2 className='text-lg font-semibold mb-4'>{statusLabel[status]}</h2>

      <div className='space-y-4'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn
