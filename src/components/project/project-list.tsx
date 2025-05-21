"use client"

import { useAppSelector } from "@/hooks/use-store"
import { selectProjects } from "@/store/project/project-slice"
import ProjectCard from "@/components/project/project-card"

const ProjectList = () => {
  const projects = useAppSelector(selectProjects)

  if (projects.length === 0) {
    return (
      <p className='text-muted-foreground text-center mt-20'>
        No projects yet. Start by creating one.
      </p>
    )
  }

  return (
    <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectList
