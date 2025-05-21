"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { TaskStatus } from "@/store/project/types"

import NewTaskForm from "./new-task-form"

type TaskDialogProps = {
  projectId: string
  status: TaskStatus
}

const NewTaskDialog = (props: TaskDialogProps) => {
  const { projectId, status } = props

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className='w-4 h-4 mr-2' />
            Add Task
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>

          <NewTaskForm
            projectId={projectId}
            status={status}
            // onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewTaskDialog
