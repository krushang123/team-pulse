import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import PriorityFilter from "./priority-filter" // update path as needed

describe("PriorityFilter", () => {
  test("calls onChange with selected priority", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()

    render(<PriorityFilter selectedPriorities={[]} onChange={handleChange} />)

    const button = screen.getByRole("button", { name: /priority/i })
    await user.click(button)

    const popover = await screen.findByRole("dialog")
    const lowCheckbox = within(popover).getByLabelText("Low")

    await user.click(lowCheckbox)

    expect(handleChange).toHaveBeenCalledWith(["low"])
  })

  test("calls onChange with deselected priority", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()

    render(
      <PriorityFilter selectedPriorities={["low"]} onChange={handleChange} />,
    )

    const button = screen.getByRole("button", { name: /priority/i })
    await user.click(button)

    const popover = await screen.findByRole("dialog")
    const lowCheckbox = within(popover).getByLabelText("Low")

    await user.click(lowCheckbox)

    expect(handleChange).toHaveBeenCalledWith([])
  })
})
