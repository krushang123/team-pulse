"use client"

import { useAppSelector } from "@/hooks/use-store"
import { selectProjectById } from "@/store/project/project-slice"
import TaskColumn from "@/components/task/task-column"

type ProjectDetailProps = {
  slug: string
}

const ProjectDetail = (props: ProjectDetailProps) => {
  const { slug } = props

  const project = useAppSelector(selectProjectById(slug))

  if (!project) {
    return (
      <p className='text-muted-foreground text-center mt-20'>
        Project not found
      </p>
    )
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>{project.name}</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <TaskColumn projectId={project.id} status='todo' />
        <TaskColumn projectId={project.id} status='in-progress' />
        <TaskColumn projectId={project.id} status='done' />
      </div>
    </div>
  )
}

export default ProjectDetail
