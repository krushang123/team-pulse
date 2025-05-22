import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { projects } from "@/mock/projects"
import { RootState } from "@/store/index"

import { Project, Task } from "./types"

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
        newStatus: "todo" | "in-progress" | "done"
      }>,
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId,
      )
      if (project) {
        const task = project.tasks.find((t) => t.id === action.payload.taskId)
        if (task) {
          task.status = action.payload.newStatus
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
} = projectSlice.actions

export const selectProjects = (state: RootState) => state.project.projects

export const selectProjectById = (id: string) => (state: RootState) =>
  state.project.projects.find((p) => p.id === id)

export const selectTasksByStatus =
  (projectId: string, status: Task["status"]) =>
  (state: RootState): Task[] =>
    state.project.projects
      .find((p) => p.id === projectId)
      ?.tasks.filter((t) => t.status === status) ?? []

export const selectTaskById =
  (projectId: string, taskId: string) => (state: RootState) =>
    state.project.projects
      .find((p) => p.id === projectId)
      ?.tasks.find((t) => t.id === taskId) ?? null

export default projectSlice.reducer
