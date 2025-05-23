import { Assignee } from "@/store/project/types"
import { render, screen } from "@testing-library/react"

import AssigneeFilter from "./assignee-filter"

const mockAssignees: Assignee[] = [
  { id: "1", name: "Alice", avatarUrl: "" },
  { id: "2", name: "Bob", avatarUrl: "" },
]

describe("AssigneeFilter", () => {
  test("renders selected assignee name", () => {
    render(
      <AssigneeFilter
        assignees={mockAssignees}
        selectedAssigneeId='2'
        onChange={jest.fn()}
      />,
    )

    expect(screen.getByRole("combobox")).toHaveTextContent("Bob")
  })
})
