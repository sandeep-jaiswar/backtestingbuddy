import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Spinner size="sm" />)
    expect(screen.getByRole('status')).toHaveClass('w-4 h-4')

    rerender(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toHaveClass('w-8 h-8')

    rerender(<Spinner size="xl" />)
    expect(screen.getByRole('status')).toHaveClass('w-12 h-12')
  })

  it('renders different colors', () => {
    const { rerender } = render(<Spinner color="primary" />)
    expect(screen.getByRole('status')).toHaveClass('text-ui-action-primary-bg')

    rerender(<Spinner color="secondary" />)
    expect(screen.getByRole('status')).toHaveClass('text-ui-text-tertiary')

    rerender(<Spinner color="white" />)
    expect(screen.getByRole('status')).toHaveClass('text-white')
  })

  it('applies custom className', () => {
    render(<Spinner className="custom-spinner" />)
    expect(screen.getByRole('status')).toHaveClass('custom-spinner')
  })

  it('has spinning animation', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveClass('animate-spin')
  })
})