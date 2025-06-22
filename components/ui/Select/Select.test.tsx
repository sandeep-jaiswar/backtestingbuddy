import { fireEvent, render, screen } from "@testing-library/react"
import { Select } from "./Select"

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true },
]

describe("Select", () => {
  it("renders with options", () => {
    render(<Select options={mockOptions} />)
    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()

    expect(screen.getByText("Option 1")).toBeInTheDocument()
    expect(screen.getByText("Option 2")).toBeInTheDocument()
    expect(screen.getByText("Option 3")).toBeInTheDocument()
  })

  it("renders with label", () => {
    render(<Select label="Choose option" options={mockOptions} />)
    expect(screen.getByLabelText("Choose option")).toBeInTheDocument()
    expect(screen.getByText("Choose option")).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    render(<Select placeholder="Select an option" options={mockOptions} />)
    expect(screen.getByText("Select an option")).toBeInTheDocument()
  })

  it("renders with error message", () => {
    render(<Select options={mockOptions} error="This field is required" />)
    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("border-ui-text-destructive")
  })

  it("renders with helper text", () => {
    render(<Select options={mockOptions} helperText="Choose your preferred option" />)
    expect(screen.getByText("Choose your preferred option")).toBeInTheDocument()
  })

  it("handles selection changes", () => {
    const handleChange = jest.fn()
    render(<Select options={mockOptions} onChange={handleChange} />)

    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "option2" } })

    expect(handleChange).toHaveBeenCalled()
    expect(select).toHaveValue("option2")
  })

  it("disables specific options", () => {
    render(<Select options={mockOptions} />)
    const disabledOption = screen.getByText("Option 3")
    expect(disabledOption).toBeDisabled()
  })

  it("is disabled when disabled prop is true", () => {
    render(<Select options={mockOptions} disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("applies custom className", () => {
    render(<Select options={mockOptions} className="custom-select" />)
    expect(screen.getByRole("combobox")).toHaveClass("custom-select")
  })

  it("renders with default value", () => {
    render(<Select options={mockOptions} defaultValue="option2" />)
    expect(screen.getByRole("combobox")).toHaveValue("option2")
  })
})
