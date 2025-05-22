import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Project } from "@/store/project/types"
import ProjectForm from "./project-form"

type EditProjectDialogProps = {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const EditProjectDialog = (props: EditProjectDialogProps) => {
  const { project, open, onOpenChange, onSuccess } = props

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <ProjectForm isNew={false} project={project} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}

export default EditProjectDialog
