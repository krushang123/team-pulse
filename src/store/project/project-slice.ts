import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { Project } from "./types"
import { RootState } from ".."

type ProjectState = {
  projects: Project[]
  selectedProjectId?: string
}

const initialState: ProjectState = {
  projects: [],
  selectedProjectId: undefined,
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload
    },
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
    selectProject(state, action: PayloadAction<string>) {
      state.selectedProjectId = action.payload
    },
  },
})

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  selectProject,
} = projectSlice.actions

export const selectProjects = (state: RootState) => state.project.projects

export const selectSelectedProjectId = (state: RootState) =>
  state.project.selectedProjectId

export const selectProjectById = (id: string) => (state: RootState) =>
  state.project.projects.find((p) => p.id === id)

export default projectSlice.reducer
