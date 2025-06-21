import { fireEvent, render, screen } from "@testing-library/react"
import { Alert } from "./Alert"

describe("Alert", () => {
  it("renders with default props", () => {
    render(<Alert>This is an alert message</Alert>)
    expect(screen.getByText("This is an alert message")).toBeInTheDocument()
  })

  it("renders different variants", () => {
    const { rerender } = render(<Alert variant="success">Success message</Alert>)
    expect(screen.getByText("Success message").closest("div")).toHaveClass("bg-green-50")

    rerender(<Alert variant="warning">Warning message</Alert>)
    expect(screen.getByText("Warning message").closest("div")).toHaveClass("bg-yellow-50")

    rerender(<Alert variant="error">Error message</Alert>)
    expect(screen.getByText("Error message").closest("div")).toHaveClass("bg-red-50")
  })

  it("renders with title", () => {
    render(<Alert title="Alert Title">Alert content</Alert>)
    expect(screen.getByText("Alert Title")).toBeInTheDocument()
    expect(screen.getByText("Alert content")).toBeInTheDocument()
  })

  it("renders dismiss button when dismissible", () => {
    const handleDismiss = jest.fn()
    render(
      <Alert dismissible onDismiss={handleDismiss}>
        Dismissible alert
      </Alert>
    )

    const dismissButton = screen.getByLabelText("Dismiss alert")
    expect(dismissButton).toBeInTheDocument()

    fireEvent.click(dismissButton)
    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it("does not render dismiss button when not dismissible", () => {
    render(<Alert>Non-dismissible alert</Alert>)
    expect(screen.queryByLabelText("Dismiss alert")).not.toBeInTheDocument()
  })

  it("renders appropriate icons for each variant", () => {
    const { rerender } = render(<Alert variant="info">Info</Alert>)
    expect(screen.getByText("Info").previousElementSibling).toBeInTheDocument()

    rerender(<Alert variant="success">Success</Alert>)
    expect(screen.getByText("Success").previousElementSibling).toBeInTheDocument()

    rerender(<Alert variant="warning">Warning</Alert>)
    expect(screen.getByText("Warning").previousElementSibling).toBeInTheDocument()

    rerender(<Alert variant="error">Error</Alert>)
    expect(screen.getByText("Error").previousElementSibling).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Alert className="custom-alert">Custom alert</Alert>)
    expect(screen.getByText("Custom alert").closest("div")).toHaveClass("custom-alert")
  })
})
