import { fireEvent, render, screen } from "@testing-library/react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal"

describe("Modal Components", () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  describe("Modal", () => {
    it("renders when isOpen is true", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal content</div>
        </Modal>
      )
      expect(screen.getByText("Modal content")).toBeInTheDocument()
    })

    it("does not render when isOpen is false", () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          <div>Modal content</div>
        </Modal>
      )
      expect(screen.queryByText("Modal content")).not.toBeInTheDocument()
    })

    it("calls onClose when overlay is clicked", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal content</div>
        </Modal>
      )

      const overlay = screen.getByText("Modal content").closest(".fixed")
      fireEvent.click(overlay!)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it("does not close when overlay click is disabled", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} closeOnOverlayClick={false}>
          <div>Modal content</div>
        </Modal>
      )

      const overlay = screen.getByText("Modal content").closest(".fixed")
      fireEvent.click(overlay!)
      expect(mockOnClose).not.toHaveBeenCalled()
    })

    it("closes on escape key when enabled", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal content</div>
        </Modal>
      )

      fireEvent.keyDown(document, { key: "Escape" })
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it("renders different sizes", () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose} size="sm">
          <div>Small modal</div>
        </Modal>
      )
      expect(screen.getByText("Small modal").parentElement).toHaveClass("max-w-md")

      rerender(
        <Modal isOpen={true} onClose={mockOnClose} size="xl">
          <div>Extra large modal</div>
        </Modal>
      )
      expect(screen.getByText("Extra large modal").parentElement).toHaveClass("max-w-4xl")
    })
  })

  describe("ModalHeader", () => {
    it("renders header content", () => {
      render(<ModalHeader>Modal Title</ModalHeader>)
      expect(screen.getByText("Modal Title")).toBeInTheDocument()
    })

    it("renders close button when onClose is provided", () => {
      render(<ModalHeader onClose={mockOnClose}>Modal Title</ModalHeader>)
      const closeButton = screen.getByLabelText("Close modal")
      expect(closeButton).toBeInTheDocument()

      fireEvent.click(closeButton)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe("ModalBody", () => {
    it("renders body content", () => {
      render(<ModalBody>Modal body content</ModalBody>)
      expect(screen.getByText("Modal body content")).toBeInTheDocument()
    })
  })

  describe("ModalFooter", () => {
    it("renders footer content", () => {
      render(<ModalFooter>Modal footer</ModalFooter>)
      expect(screen.getByText("Modal footer")).toBeInTheDocument()
    })
  })

  describe("Complete Modal", () => {
    it("renders all components together", () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <ModalHeader onClose={mockOnClose}>Test Modal</ModalHeader>
          <ModalBody>This is the modal body</ModalBody>
          <ModalFooter>Footer actions</ModalFooter>
        </Modal>
      )

      expect(screen.getByText("Test Modal")).toBeInTheDocument()
      expect(screen.getByText("This is the modal body")).toBeInTheDocument()
      expect(screen.getByText("Footer actions")).toBeInTheDocument()
    })
  })
})
