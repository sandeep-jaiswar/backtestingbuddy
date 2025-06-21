import { render, screen, fireEvent } from "@testing-library/react"
import { Input } from "./Input"

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeInTheDocument()
  })

  it("renders with label", () => {
    render(<Input label="Username" placeholder="Enter username" />)
    expect(screen.getByLabelText("Username")).toBeInTheDocument()
    expect(screen.getByText("Username")).toBeInTheDocument()
  })

  it("renders with error message", () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("border-ui-text-destructive")
  })

  it("renders with helper text", () => {
    render(<Input helperText="Enter at least 8 characters" />)
    expect(screen.getByText("Enter at least 8 characters")).toBeInTheDocument()
  })

  it("renders with icons", () => {
    const leftIcon = <span data-testid="left-icon">👤</span>
    const rightIcon = <span data-testid="right-icon">🔍</span>

    render(<Input leftIcon={leftIcon} rightIcon={rightIcon} />)
    expect(screen.getByTestId("left-icon")).toBeInTheDocument()
    expect(screen.getByTestId("right-icon")).toBeInTheDocument()
  })

  it("handles input changes", () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "test" } })

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue("test")
  })

  it("renders filled variant", () => {
    render(<Input variant="filled" />)
    expect(screen.getByRole("textbox")).toHaveClass("bg-ui-background-secondary")
  })

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
})
