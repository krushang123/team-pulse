import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Task } from "@/store/project/types"
import { useAppDispatch } from "@/hooks/use-store"
import { deleteTask } from "@/store/project/project-slice"
import { toast } from "sonner"

type DeleteTaskDialogProps = {
  projectId: string
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  handleCloseDeleteDialog: () => void
}

const DeleteTaskDialog = (props: DeleteTaskDialogProps) => {
  const { projectId, task, open, onOpenChange, handleCloseDeleteDialog } = props

  const dispatch = useAppDispatch()

  const onConfirm = () => {
    dispatch(deleteTask({ projectId, taskId: task.id }))
    toast.success(`Task "${task.title}" deleted`)
    handleCloseDeleteDialog()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete the task{" "}
            <span className='font-semibold text-foreground'>{task.title}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDeleteDialog}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className='bg-red-600 hover:bg-red-700'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTaskDialog
