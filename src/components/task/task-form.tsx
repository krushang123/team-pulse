import { z } from "zod"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "nanoid"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { addTask, updateTask } from "@/store/project/project-slice"
import { Task, TaskPriority } from "@/store/project/types"
import { useAppDispatch } from "@/hooks/use-store"
import { assignees } from "@/mock/assignees"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  assigneeId: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

type TaskFormProps = {
  projectId: string
  isNew: boolean
  initialTask?: Task
  onSuccess?: () => void
}

const TaskForm = (props: TaskFormProps) => {
  const { projectId, isNew, initialTask, onSuccess } = props

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialTask?.title ?? "",
      description: initialTask?.description,
      priority: initialTask?.priority ?? "medium",
      assigneeId: initialTask?.assignee?.id,
    },
  })

  const watchedPriority = useWatch({ control, name: "priority" })
  const watchedAssigneeId = useWatch({ control, name: "assigneeId" })

  const onSubmit = (data: FormValues) => {
    const now = new Date().toISOString()
    const assignee = assignees.find((a) => a.id === data.assigneeId)

    if (isNew) {
      dispatch(
        addTask({
          projectId,
          task: {
            id: nanoid(),
            title: data.title,
            description: data.description,
            status: "todo",
            priority: data.priority,
            assignee,
            createdAt: now,
          },
        }),
      )
    } else if (initialTask?.id) {
      dispatch(
        updateTask({
          projectId,
          task: {
            ...initialTask,
            title: data.title,
            description: data.description,
            priority: data.priority,
            assignee,
            updatedAt: now,
          },
        }),
      )
    }

    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          {...register("title")}
          placeholder='Enter task title'
        />
        {errors.title && (
          <p className='text-sm text-red-500 mt-1'>{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          {...register("description")}
          placeholder='Optional description'
        />
      </div>

      <div>
        <Label>Priority</Label>
        <Select
          value={watchedPriority}
          onValueChange={(value: TaskPriority) => setValue("priority", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select priority' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='low'>Low</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='high'>High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Assignee</Label>
        <Select
          value={watchedAssigneeId}
          onValueChange={(value) => setValue("assigneeId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select assignee' />
          </SelectTrigger>
          <SelectContent>
            {assignees.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-5 w-5'>
                    {user.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} />
                    ) : (
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex justify-end gap-2'>
        <Button
          type='button'
          variant='ghost'
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting
            ? isNew
              ? "Creating..."
              : "Updating..."
            : isNew
              ? "Create Task"
              : "Update Task"}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
