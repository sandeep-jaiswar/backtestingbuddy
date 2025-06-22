import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { Alert, AlertVariant } from "./Alert"

describe("Alert Component", () => {
  it("renders children correctly", () => {
    render(<Alert>Test Alert</Alert>)
    expect(screen.getByText("Test Alert")).toBeInTheDocument()
  })

  it('renders with default variant "info"', () => {
    render(<Alert>Info Alert</Alert>)
    const alert = screen.getByText("Info Alert").parentElement?.parentElement
    expect(alert?.className).toContain("bg-blue-50")
  })

  it.each([
    [AlertVariant.INFO, "bg-blue-50"],
    [AlertVariant.SUCCESS, "bg-green-50"],
    [AlertVariant.WARNING, "bg-yellow-50"],
    [AlertVariant.ERROR, "bg-red-50"],
  ])('renders variant "%s" with correct styles', (variant, className) => {
    render(<Alert variant={variant}>Variant Test</Alert>)
    const alert = screen.getByText("Variant Test").parentElement?.parentElement
    expect(alert?.className).toContain(className)
  })

  it("renders title if provided", () => {
    render(<Alert title="Alert Title">Body</Alert>)
    expect(screen.getByText("Alert Title")).toBeInTheDocument()
  })

  it("does not render title element if title is not provided", () => {
    render(<Alert>Body only</Alert>)
    expect(screen.queryByRole("heading")).not.toBeInTheDocument()
  })

  it("renders dismiss button when dismissible is true", () => {
    render(
      <Alert dismissible onDismiss={jest.fn()}>
        Dismiss me
      </Alert>
    )
    const button = screen.getByRole("button", { name: /dismiss alert/i })
    expect(button).toBeInTheDocument()
  })

  it("calls onDismiss when dismiss button is clicked", () => {
    const mockDismiss = jest.fn()
    render(
      <Alert dismissible onDismiss={mockDismiss}>
        Dismiss me
      </Alert>
    )
    const button = screen.getByRole("button", { name: /dismiss alert/i })
    fireEvent.click(button)
    expect(mockDismiss).toHaveBeenCalledTimes(1)
  })

  it("applies custom className if provided", () => {
    render(<Alert className="custom-class">Test</Alert>)
    const alert = screen.getByText("Test").parentElement?.parentElement
    expect(alert?.className).toContain("custom-class")
  })
})
