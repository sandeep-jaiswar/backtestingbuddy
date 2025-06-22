import { render, screen } from "@testing-library/react"
import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardPadding, CardTitle, CardVariant } from "./Card"

describe("Card component suite", () => {
  // 📦 Card Component
  it("renders children inside Card", () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText("Card content")).toBeInTheDocument()
  })

  it("applies default variant and padding", () => {
    render(<Card>Test</Card>)
    const card = screen.getByTestId("card")
    expect(card.className).toContain("border-ui-border-primary") // default variant
    expect(card.className).toContain("p-6") // default padding
  })

  it("applies custom class name to Card", () => {
    render(<Card className="custom-style">Custom class</Card>)
    const card = screen.getByTestId("card")
    expect(card.className).toContain("custom-style")
  })

  // 🎨 Variant tests
  it.each([
    [CardVariant.DEFAULT, "border-ui-border-primary"],
    [CardVariant.ELEVATED, "shadow-lg"],
    [CardVariant.OUTLINED, "border-2"],
  ])("applies %s variant class", (variant, expectedClass) => {
    render(<Card variant={variant}>Variant test</Card>)
    const card = screen.getByTestId("card")
    expect(card.className).toContain(expectedClass)
  })

  // 📏 Padding tests
  it.each([
    [CardPadding.NONE, ""],
    [CardPadding.SM, "p-4"],
    [CardPadding.MD, "p-6"],
    [CardPadding.LG, "p-8"],
  ])("applies %s padding class", (padding, expectedClass) => {
    render(<Card padding={padding}>Padding test</Card>)
    const card = screen.getByTestId("card")
    if (expectedClass) {
      expect(card.className).toContain(expectedClass)
    } else {
      expect(card.className).not.toMatch(/p-\d/)
    }
  })

  // 🧩 CardHeader
  it("renders CardHeader content", () => {
    render(<CardHeader>Header Content</CardHeader>)
    expect(screen.getByText("Header Content")).toBeInTheDocument()
  })

  // 🔠 CardTitle
  it("renders CardTitle with default heading tag", () => {
    render(<CardTitle>Title</CardTitle>)
    const heading = screen.getByText("Title")
    expect(heading.tagName.toLowerCase()).toBe("h3")
  })

  it("renders CardTitle with custom heading tag", () => {
    render(<CardTitle as="h2">Heading</CardTitle>)
    const heading = screen.getByText("Heading")
    expect(heading.tagName.toLowerCase()).toBe("h2")
  })

  // 📄 CardContent
  it("renders CardContent", () => {
    render(<CardContent>Body text</CardContent>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  // 📎 CardFooter
  it("renders CardFooter", () => {
    render(<CardFooter>Footer info</CardFooter>)
    expect(screen.getByText("Footer info")).toBeInTheDocument()
  })
})
