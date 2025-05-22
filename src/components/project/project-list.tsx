"use client"

import { useState } from "react"

import { useAppSelector } from "@/hooks/use-store"
import {
  selectProjectById,
  selectProjects,
} from "@/store/project/project-slice"
import ProjectCard from "@/components/project/project-card"

import EditProjectDialog from "./edit-project-dialog"
import DeleteProjectDialog from "./delete-project-dialog"

const ProjectList = () => {
  const [openEditProjectDialog, setOpenEditProjectDialog] =
    useState<boolean>(false)
  const [openDeleteProjectDialog, setOpenDeleteProjectDialog] =
    useState<boolean>(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  )

  const projects = useAppSelector(selectProjects)
  const selectedProject = useAppSelector(
    selectedProjectId ? selectProjectById(selectedProjectId) : () => null,
  )

  const handleOpenEditDialog = (projectId: string) => {
    setSelectedProjectId(projectId)
    setOpenEditProjectDialog(true)
  }

  const handleCloseEditDialog = () => {
    setOpenEditProjectDialog(false)
    setSelectedProjectId(null)
  }

  const handleOpenDeleteDialog = (projectId: string) => {
    setSelectedProjectId(projectId)
    setOpenDeleteProjectDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteProjectDialog(false)
    setSelectedProjectId(null)
  }

  if (projects.length === 0) {
    return (
      <p className='text-muted-foreground text-center mt-20'>
        No projects yet. Start by creating one.
      </p>
    )
  }

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
      ))}

      {selectedProject && (
        <EditProjectDialog
          open={openEditProjectDialog}
          onOpenChange={(open) => {
            if (!open) handleCloseEditDialog()
          }}
          project={selectedProject}
          onSuccess={handleCloseEditDialog}
        />
      )}

      {selectedProject && (
        <DeleteProjectDialog
          open={openDeleteProjectDialog}
          onOpenChange={(open) => {
            if (!open) handleCloseDeleteDialog()
          }}
          project={selectedProject}
          handleCloseDeleteDialog={handleCloseDeleteDialog}
        />
      )}
    </div>
  )
}

export default ProjectList
