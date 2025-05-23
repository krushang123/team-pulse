import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "nanoid"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch } from "@/hooks/use-store"
import { addProject, updateProject } from "@/store/project/project-slice"
import { Project } from "@/store/project/types"
import { toast } from "sonner"

const schema = z.object({
  name: z.string().min(3, "Project name is too short"),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

type ProjectFormProps = {
  isNew: boolean
  project?: Project
  onSuccess: () => void
}

const ProjectForm = (props: ProjectFormProps) => {
  const { isNew, project, onSuccess } = props

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
    },
  })

  const onSubmit = (values: FormValues) => {
    const now = new Date().toISOString()

    try {
      if (isNew) {
        dispatch(
          addProject({
            id: nanoid(),
            name: values.name,
            description: values.description,
            createdAt: now,
            tasks: [],
          }),
        )

        toast.success("Project created!")
      } else if (project?.id) {
        dispatch(
          updateProject({
            ...project,
            name: values.name,
            description: values.description,
            updatedAt: now,
          }),
        )

        toast.success("Project updated!")
      }

      reset()
      onSuccess()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        isNew
          ? "Something went wrong while creating the project"
          : "Something went wrong while updating the project",
      )
    }
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
              ? "Create"
              : "Update"}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm
