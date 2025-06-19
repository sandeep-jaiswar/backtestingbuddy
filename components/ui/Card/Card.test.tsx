import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('renders different variants', () => {
      const { rerender } = render(<Card variant="elevated">Elevated</Card>)
      expect(screen.getByText('Elevated').parentElement).toHaveClass('shadow-lg')

      rerender(<Card variant="outlined">Outlined</Card>)
      expect(screen.getByText('Outlined').parentElement).toHaveClass('border-2')
    })

    it('renders different padding sizes', () => {
      const { rerender } = render(<Card padding="sm">Small padding</Card>)
      expect(screen.getByText('Small padding').parentElement).toHaveClass('p-4')

      rerender(<Card padding="lg">Large padding</Card>)
      expect(screen.getByText('Large padding').parentElement).toHaveClass('p-8')

      rerender(<Card padding="none">No padding</Card>)
      expect(screen.getByText('No padding').parentElement).not.toHaveClass('p-4', 'p-6', 'p-8')
    })
  })

  describe('CardHeader', () => {
    it('renders header content', () => {
      render(<CardHeader>Header content</CardHeader>)
      expect(screen.getByText('Header content')).toBeInTheDocument()
    })
  })

  describe('CardTitle', () => {
    it('renders with default heading level', () => {
      render(<CardTitle>Card Title</CardTitle>)
      const title = screen.getByText('Card Title')
      expect(title.tagName).toBe('H3')
    })

    it('renders with custom heading level', () => {
      render(<CardTitle as="h1">Card Title</CardTitle>)
      const title = screen.getByText('Card Title')
      expect(title.tagName).toBe('H1')
    })
  })

  describe('CardContent', () => {
    it('renders content', () => {
      render(<CardContent>Card content</CardContent>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })
  })

  describe('CardFooter', () => {
    it('renders footer content', () => {
      render(<CardFooter>Footer content</CardFooter>)
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })
  })

  describe('Complete Card', () => {
    it('renders all components together', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            This is the card content
          </CardContent>
          <CardFooter>
            Footer actions
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Test Card')).toBeInTheDocument()
      expect(screen.getByText('This is the card content')).toBeInTheDocument()
      expect(screen.getByText('Footer actions')).toBeInTheDocument()
    })
  })
})