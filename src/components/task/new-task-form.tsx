"use client"

import { z } from "zod"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { nanoid } from "nanoid"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { TaskPriority, TaskStatus } from "@/store/project/types"
import { addTask } from "@/store/project/project-slice"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
})

type FormValues = z.infer<typeof formSchema>

type TaskFormProps = {
  projectId: string
  status: TaskStatus
  onSuccess?: () => void
}

const NewTaskForm = ({ projectId, status, onSuccess }: TaskFormProps) => {
  const dispatch = useDispatch()

  const priority = useWatch({ name: "priority" })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValues) => {
    const now = new Date().toISOString()

    dispatch(
      addTask({
        projectId,
        task: {
          id: nanoid(),
          title: data.title,
          description: data.description,
          status,
          priority: data.priority,
          createdAt: now,
          updatedAt: now,
        },
      }),
    )

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
          value={priority}
          onValueChange={(value: TaskPriority) =>
            setValue("priority", value as TaskPriority)
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select priority' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='low'>Low</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='high'>High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex justify-end'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Task"}
        </Button>
      </div>
    </form>
  )
}

export default NewTaskForm
