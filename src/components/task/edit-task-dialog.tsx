import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Task } from "@/store/project/types"
import TaskForm from "./task-form"

type EditTaskDialogProps = {
  projectId: string
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

const EditTaskDialog = (props: EditTaskDialogProps) => {
  const { task, projectId, open, onOpenChange, onSuccess } = props

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          isNew={false}
          initialTask={task}
          projectId={projectId}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditTaskDialog
