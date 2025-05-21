"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { nanoid } from "nanoid"

import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/use-store"
import { addProject } from "@/store/project/project-slice"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  name: z.string().min(3, "Project name is too short"),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const NewProjectForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const dispatch = useAppDispatch()

  const onSubmit = (values: FormValues) => {
    dispatch(
      addProject({
        id: nanoid(),
        name: values.name,
        description: values.description ?? "",
        updatedAt: new Date().toISOString(),
        tasks: [],
        doneTasks: 0,
        inProgressTasks: 0,
        todoTasks: 0,
      }),
    )
    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Input placeholder='Project name' {...register("name")} />
        {errors.name && (
          <p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder='Short description'
          {...register("description")}
        />
      </div>

      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create"}
      </Button>
    </form>
  )
}

export default NewProjectForm
