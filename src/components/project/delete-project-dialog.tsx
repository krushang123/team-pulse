import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/use-store"
import { deleteProject } from "@/store/project/project-slice"
import { Project } from "@/store/project/types"

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
    handleCloseDeleteDialog()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
        </DialogHeader>

        <p className='text-sm text-muted-foreground mb-4'>
          Are you sure you want to delete <strong>{project.name}</strong>? This
          will permanently remove all associated tasks.
        </p>

        <div className='flex justify-end gap-2'>
          <Button variant='ghost' onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>

          <Button variant='destructive' onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteProjectDialog
