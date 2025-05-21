import { formatDistanceToNow } from "date-fns"
import { CheckCircle, Loader2, Circle } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Project } from "@/store/project/types"

type ProjectCardProps = {
  project: Project
}

const ProjectCard = (props: ProjectCardProps) => {
  const { project } = props

  const totalTasks =
    project.doneTasks + project.inProgressTasks + project.todoTasks

  const completionPercent =
    totalTasks === 0 ? 0 : Math.round((project.doneTasks / totalTasks) * 100)

  return (
    <Link href={`/project/${project.id}`}>
      <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
        <CardHeader>
          <div className='flex justify-between items-start gap-2'>
            <div className='w-[70%]'>
              <h3 className='text-lg font-semibold line-clamp-1'>
                {project.name}
              </h3>

              {project.description && (
                <p className='text-sm text-muted-foreground line-clamp-2'>
                  {project.description}
                </p>
              )}
            </div>

            <span className='text-xs text-muted-foreground'>
              {formatDistanceToNow(new Date(project.updatedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex justify-between text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              <span>{project.doneTasks} Done</span>
            </div>

            <div className='flex items-center gap-1'>
              <Loader2 className='w-4 h-4 text-blue-500' />
              <span>{project.inProgressTasks} In Progress</span>
            </div>

            <div className='flex items-center gap-1'>
              <Circle className='w-4 h-4 text-gray-400' />
              <span>{project.todoTasks} To Do</span>
            </div>
          </div>

          <Progress value={completionPercent} className='h-2' />
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard
