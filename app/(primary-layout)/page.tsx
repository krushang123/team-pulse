import { ProjectCard } from "@/components/project/project-card"
import { Button } from "@/components/ui/button"
import { projects } from "@/mock/projects"

const HomePage = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <Button>New Project</Button>
      </div>

      {projects.length === 0 ? (
        <p className='text-muted-foreground text-center mt-20'>
          No projects yet. Start by creating one.
        </p>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
