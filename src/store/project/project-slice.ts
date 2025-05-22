import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"

import { projects } from "@/mock/projects"
import { RootState } from "@/store/index"
import { arrayMove } from "@/lib/utils"

import { Project, Task, TaskStatus } from "./types"

type ProjectState = {
  projects: Project[]
}

const initialState: ProjectState = {
  projects: projects,
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload)
    },
    updateProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) state.projects[index] = action.payload
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload)
    },
    addTask(state, action: PayloadAction<{ projectId: string; task: Task }>) {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId,
      )
      if (project) project.tasks.push(action.payload.task)
    },
    updateTask(
      state,
      action: PayloadAction<{ projectId: string; task: Task }>,
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId,
      )
      if (project) {
        const taskIndex = project.tasks.findIndex(
          (t) => t.id === action.payload.task.id,
        )
        if (taskIndex !== -1) project.tasks[taskIndex] = action.payload.task
      }
    },
    deleteTask(
      state,
      action: PayloadAction<{ projectId: string; taskId: string }>,
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId,
      )
      if (project) {
        project.tasks = project.tasks.filter(
          (t) => t.id !== action.payload.taskId,
        )
      }
    },
    moveTask(
      state,
      action: PayloadAction<{
        projectId: string
        taskId: string
        newStatus: TaskStatus
        newIndex: number
      }>,
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId,
      )
      if (project) {
        const task = project.tasks.find((t) => t.id === action.payload.taskId)
        if (task) {
          task.status = action.payload.newStatus
          task.updatedAt = new Date().toISOString()

          project.tasks = project.tasks.filter((t) => t.id !== task.id)

          const before = project.tasks.filter(
            (t) => t.status === action.payload.newStatus,
          )
          const after = project.tasks.filter(
            (t) => t.status !== action.payload.newStatus,
          )

          before.splice(action.payload.newIndex, 0, task)
          project.tasks = [...after, ...before]
        }
      }
    },
    reorderTask(
      state,
      action: PayloadAction<{
        projectId: string
        status: TaskStatus
        oldIndex: number
        newIndex: number
      }>,
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId,
      )
      if (project) {
        const statusTasks = project.tasks.filter(
          (t) => t.status === action.payload.status,
        )
        const taskIds = statusTasks.map((t) => t.id)

        if (
          action.payload.oldIndex >= 0 &&
          action.payload.newIndex >= 0 &&
          action.payload.oldIndex < taskIds.length &&
          action.payload.newIndex < taskIds.length
        ) {
          const newTaskIds = arrayMove(
            taskIds,
            action.payload.oldIndex,
            action.payload.newIndex,
          )

          const taskMap = new Map(statusTasks.map((task) => [task.id, task]))

          const newTasks = project.tasks.filter(
            (t) => t.status !== action.payload.status,
          )

          newTaskIds.forEach((taskId) => {
            const task = taskMap.get(taskId)
            if (task) newTasks.push(task)
          })

          project.tasks = newTasks
        }
      }
    },
  },
})

export const {
  addProject,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  reorderTask,
} = projectSlice.actions

export const selectProjects = (state: RootState) => state.project.projects

export const selectProjectById = (id: string) =>
  createSelector([selectProjects], (projects) =>
    projects.find((p) => p.id === id),
  )

export const selectTasksByStatus = (
  projectId: string,
  status: Task["status"],
) =>
  createSelector([selectProjects], (projects) => {
    const project = projects.find((p) => p.id === projectId)
    return project?.tasks.filter((t) => t.status === status) ?? []
  })

export const selectTaskById = (projectId: string, taskId: string) =>
  createSelector([selectProjects], (projects) => {
    const project = projects.find((p) => p.id === projectId)
    return project?.tasks.find((t) => t.id === taskId) ?? null
  })

export const selectTaskCountsByProjectId = (projectId: string) =>
  createSelector([selectProjects], (projects) => {
    const tasks = projects.find((p) => p.id === projectId)?.tasks || []

    return tasks.reduce(
      (counts, task) => {
        counts[task.status]++
        return counts
      },
      {
        todo: 0,
        "in-progress": 0,
        done: 0,
      } as Record<Task["status"], number>,
    )
  })

export default projectSlice.reducer
