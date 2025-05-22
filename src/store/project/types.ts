export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export type Assignee = {
  id: string
  name: string
  avatarUrl?: string
}

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: Assignee
  createdAt: string
  updatedAt?: string
}

export type Project = {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt?: string
  tasks: Task[]
}
