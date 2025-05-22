"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import TaskForm from "./task-form"

type TaskDialogProps = {
  projectId: string
}

const NewTaskDialog = (props: TaskDialogProps) => {
  const { projectId } = props

  const [open, setOpen] = useState<boolean>(false)

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
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

          <TaskForm isNew projectId={projectId} onSuccess={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewTaskDialog
