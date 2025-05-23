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
import { useAppDispatch } from "@/hooks/use-store"
import { deleteProject } from "@/store/project/project-slice"
import { Project } from "@/store/project/types"
import { toast } from "sonner"

type DeleteProjectDialogProps = {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
  handleCloseDeleteDialog: () => void
}

const DeleteProjectDialog = (props: DeleteProjectDialogProps) => {
  const { project, open, onOpenChange, handleCloseDeleteDialog } = props

  const dispatch = useAppDispatch()

  const onConfirm = () => {
    dispatch(deleteProject(project.id))
    toast.success(`Project "${project.name}" deleted`)
    handleCloseDeleteDialog()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className='font-semibold text-foreground'>
              {project.name}
            </span>
            ? This will also remove all associated tasks. This action cannot be
            undone.
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

export default DeleteProjectDialog
