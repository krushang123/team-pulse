"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import ProjectForm from "./project-form"

const NewProjectDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>New Project</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>

          <ProjectForm isNew onSuccess={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewProjectDialog
