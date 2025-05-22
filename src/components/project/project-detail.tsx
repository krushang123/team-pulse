"use client"

import { useAppSelector } from "@/hooks/use-store"
import {
  selectProjectById,
  selectTaskById,
} from "@/store/project/project-slice"
import TaskColumn from "@/components/task/task-column"

import NewTaskDialog from "../task/new-task-dialog"
import { useState } from "react"
import DeleteTaskDialog from "../task/delete-task-dialog"
import EditTaskDialog from "../task/edit-task-dialog"

type ProjectDetailProps = {
  slug: string
}

const ProjectDetail = (props: ProjectDetailProps) => {
  const { slug } = props

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false)

  const project = useAppSelector(selectProjectById(slug))
  const selectedTask = useAppSelector(
    project && selectedTaskId
      ? selectTaskById(project.id, selectedTaskId)
      : () => null,
  )

  const handleOpenEditTaskDialog = (taskId: string) => {
    setSelectedTaskId(taskId)
    setOpenEditTaskDialog(true)
  }

  const handleCloseEditTaskDialog = () => {
    setSelectedTaskId(null)
    setOpenEditTaskDialog(false)
  }

  const handleOpenDeleteTaskDialog = (taskId: string) => {
    setSelectedTaskId(taskId)
    setOpenDeleteTaskDialog(true)
  }

  const handleCloseDeleteTaskDialog = () => {
    setSelectedTaskId(null)
    setOpenDeleteTaskDialog(false)
  }

  if (!project) {
    return (
      <p className='text-muted-foreground text-center mt-20'>
        Project not found
      </p>
    )
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold mb-6'>{project.name}</h1>
        <NewTaskDialog projectId={project.id} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <TaskColumn
          projectId={project.id}
          status='todo'
          onEdit={handleOpenEditTaskDialog}
          onDelete={handleOpenDeleteTaskDialog}
        />
        <TaskColumn
          projectId={project.id}
          status='in-progress'
          onEdit={handleOpenEditTaskDialog}
          onDelete={handleOpenDeleteTaskDialog}
        />
        <TaskColumn
          projectId={project.id}
          status='done'
          onEdit={handleOpenEditTaskDialog}
          onDelete={handleOpenDeleteTaskDialog}
        />
      </div>

      {selectedTask && (
        <EditTaskDialog
          projectId={project.id}
          task={selectedTask}
          open={openEditTaskDialog}
          onOpenChange={(open) => {
            if (!open) handleCloseEditTaskDialog()
          }}
          onSuccess={handleCloseEditTaskDialog}
        />
      )}

      {selectedTask && (
        <DeleteTaskDialog
          projectId={project.id}
          task={selectedTask}
          open={openDeleteTaskDialog}
          onOpenChange={(open) => {
            if (!open) handleCloseDeleteTaskDialog()
          }}
          handleCloseDeleteDialog={handleCloseDeleteTaskDialog}
        />
      )}
    </div>
  )
}

export default ProjectDetail
