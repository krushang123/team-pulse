import { formatDistanceToNow } from "date-fns"
import { CheckCircle, Loader2, Circle, Trash2, Pencil } from "lucide-react"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Project } from "@/store/project/types"
import { Button } from "@/components/ui/button"

type ProjectCardProps = {
  project: Project
  onEdit: (projectId: string) => void
  onDelete: (projectId: string) => void
}

const ProjectCard = (props: ProjectCardProps) => {
  const { project, onEdit, onDelete } = props

  const totalTasks =
    project.doneTasks + project.inProgressTasks + project.todoTasks

  const completionPercent =
    totalTasks === 0 ? 0 : Math.round((project.doneTasks / totalTasks) * 100)

  const updatedText = project.updatedAt
    ? `Updated ${formatDistanceToNow(new Date(project.updatedAt), {
        addSuffix: true,
        includeSeconds: true,
      })}`
    : `Created ${formatDistanceToNow(new Date(project.createdAt), {
        addSuffix: true,
        includeSeconds: true,
      })}`

  const handleEditButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    event.stopPropagation()
    onEdit(project.id)
  }

  const handleDeleteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    event.stopPropagation()
    onDelete(project.id)
  }

  return (
    <Link href={`/project/${project.id}`}>
      <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
        <CardHeader>
          <div className='flex justify-between items-start gap-2'>
            <div className='flex flex-1 flex-col gap-2'>
              <CardTitle className='line-clamp-1'>{project.name}</CardTitle>

              {project.description && (
                <CardDescription className='line-clamp-2'>
                  {project.description}
                </CardDescription>
              )}
            </div>

            <div className='flex gap-1'>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground'
                onClick={handleEditButtonClick}
              >
                <Pencil className='w-4 h-4' />
              </Button>

              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground'
                onClick={handleDeleteButtonClick}
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
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

        <CardFooter className='text-xs text-muted-foreground'>
          {updatedText}
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProjectCard
