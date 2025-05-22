"use client"

import { useState } from "react"
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  DragOverlay,
  PointerSensor,
} from "@dnd-kit/core"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"
import {
  moveTask,
  selectProjectById,
  selectTaskById,
  reorderTask,
} from "@/store/project/project-slice"
import TaskColumn from "@/components/task/task-column"
import { Task, TaskStatus } from "@/store/project/types"

import NewTaskDialog from "../task/new-task-dialog"
import DeleteTaskDialog from "../task/delete-task-dialog"
import EditTaskDialog from "../task/edit-task-dialog"
import TaskCard from "../task/task-card"

type ProjectDetailProps = {
  slug: string
}

const statuses: TaskStatus[] = ["todo", "in-progress", "done"]

const ProjectDetail = (props: ProjectDetailProps) => {
  const { slug } = props

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const dispatch = useAppDispatch()

  const project = useAppSelector(selectProjectById(slug))
  const selectedTask = useAppSelector(
    project && selectedTaskId
      ? selectTaskById(project.id, selectedTaskId)
      : () => null,
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  )

  const handleOpenEditTaskDialog = (taskId: string) => {
    setSelectedTaskId(taskId)
    setOpenEditTaskDialog(true)
  }

  const handleCloseEditTaskDialog = () => {
    setSelectedTaskId(null)
    setOpenEditTaskDialog(false)
  }

  const handleOpenDeleteTaskDialog = (taskId: string) => {
    setSelectedTaskId(taskId)
    setOpenDeleteTaskDialog(true)
  }

  const handleCloseDeleteTaskDialog = () => {
    setSelectedTaskId(null)
    setOpenDeleteTaskDialog(false)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || !project) return

    const activeTaskId = active.id.toString()
    const activeStatus = active.data.current?.status as TaskStatus
    const overStatus = over.data.current?.status as TaskStatus

    const activeIndex = active.data.current?.sortable?.index
    const overIndex = over.data.current?.sortable?.index

    const overIsColumn = over.data.current?.type === "column"
    const newStatus = overIsColumn ? (over.id as TaskStatus) : overStatus

    // Reordering within the same column
    if (activeStatus === newStatus) {
      if (
        activeIndex !== undefined &&
        overIndex !== undefined &&
        activeIndex !== overIndex
      ) {
        dispatch(
          reorderTask({
            projectId: project.id,
            status: activeStatus,
            oldIndex: activeIndex,
            newIndex: overIndex,
          }),
        )
      }
    } else {
      // Moving to a different column with sortable support
      const tasksInNewStatus = project.tasks.filter(
        (task) => task.status === newStatus,
      )

      // Fallback to inserting at end if overIndex is not available
      const newIndex = overIndex ?? tasksInNewStatus.length

      dispatch(
        moveTask({
          projectId: project.id,
          taskId: activeTaskId,
          newStatus,
          newIndex,
        }),
      )
    }

    setActiveTask(null)
  }

  if (!project) {
    return (
      <p className='text-muted-foreground text-center mt-20'>
        Project not found
      </p>
    )
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold mb-6'>{project.name}</h1>
        <NewTaskDialog projectId={project.id} />
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={(event) => {
          const task = event.active.data.current?.task
          if (task) setActiveTask(task)
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              projectId={project.id}
              onEdit={handleOpenEditTaskDialog}
              onDelete={handleOpenDeleteTaskDialog}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              onDelete={() => {}}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {selectedTask && (
        <EditTaskDialog
          projectId={project.id}
          task={selectedTask}
          open={openEditTaskDialog}
          onOpenChange={(open) => {
            if (!open) handleCloseEditTaskDialog()
          }}
          onSuccess={handleCloseEditTaskDialog}
        />
      )}

      {selectedTask && (
        <DeleteTaskDialog
          projectId={project.id}
          task={selectedTask}
          open={openDeleteTaskDialog}
          onOpenChange={(open) => {
            if (!open) handleCloseDeleteTaskDialog()
          }}
          handleCloseDeleteDialog={handleCloseDeleteTaskDialog}
        />
      )}
    </div>
  )
}

export default ProjectDetail
