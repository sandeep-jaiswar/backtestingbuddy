import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(<Checkbox label="Newsletter" description="Receive weekly updates" />)
    expect(screen.getByText('Receive weekly updates')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(<Checkbox label="Required field" error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toHaveClass('border-ui-text-destructive')
  })

  it('handles checked state', () => {
    render(<Checkbox defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('handles change events', () => {
    const handleChange = jest.fn()
    render(<Checkbox onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled label="Disabled checkbox" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('clicking label toggles checkbox', () => {
    render(<Checkbox label="Click me" />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Click me')
    
    expect(checkbox).not.toBeChecked()
    fireEvent.click(label)
    expect(checkbox).toBeChecked()
  })

  it('applies custom className', () => {
    render(<Checkbox className="custom-checkbox" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-checkbox')
  })
})