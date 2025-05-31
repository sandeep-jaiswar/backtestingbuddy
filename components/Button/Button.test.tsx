import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

// Simplified helper function to only trim whitespace
const normalizeClassName = (className?: string | null) => className?.trim() || '';


describe('Button Component', () => {
  test('renders with default props (filled, medium)', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
    const normalizedClass = normalizeClassName(buttonElement.className);
    // Default variant is 'filled', which is primary action styled
    expect(normalizedClass).toContain('bg-[--ui-action-primary-bg]');
    expect(normalizedClass).toContain('text-[--ui-action-primary-text]');
    // Default: medium size
    expect(normalizedClass).toContain('px-4 py-2 text-[--font-size-base]');
    // Check for base structural classes
    expect(normalizedClass).toContain('font-family-sf-pro-text font-semibold rounded-lg');
  });

  // Test each Variant
  describe('Variants', () => {
    test.each([
      ['filled', 'bg-[--ui-action-primary-bg] text-[--ui-action-primary-text] focus:ring-[--ui-border-focus]'],
      ['tinted', 'bg-[--ui-action-primary-tint-bg] text-[--ui-action-primary-tint-text] focus:ring-[--ui-border-focus]'],
      ['gray', 'bg-[--ui-action-neutral-bg] text-[--ui-text-primary] focus:ring-[--ui-border-primary]'],
      ['plain', 'text-[--ui-text-accent] focus:ring-[--ui-border-focus] focus:bg-[--ui-action-primary-tint-bg]'],
    ])('variant %s renders correctly', (variant, expectedClasses) => {
      render(<Button variant={variant as any}>Test</Button>); // intent prop removed
      const buttonElement = screen.getByRole('button', { name: /Test/i });
      const normalizedClass = normalizeClassName(buttonElement.className);
      expectedClasses.split(' ').forEach(cls => expect(normalizedClass).toContain(cls));
    });
  });

  // Test Sizes (using default 'filled' variant)
  describe('Sizes', () => {
    test.each([
      ['small', 'px-3 py-1.5 text-[--font-size-sm]'],
      ['medium', 'px-4 py-2 text-[--font-size-base]'],
      ['large', 'px-6 py-3 text-[--font-size-lg]'],
    ])('size %s renders correctly', (size, expectedClasses) => {
      render(<Button size={size as any}>Test</Button>); // Using default filled variant
      const buttonElement = screen.getByRole('button', { name: /Test/i });
      const normalizedClass = normalizeClassName(buttonElement.className);
      // Check size class
      expect(normalizedClass).toContain(expectedClasses);
      // Check that default filled classes are also present
      expect(normalizedClass).toContain('bg-[--ui-action-primary-bg]');
    });
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button', { name: /Custom/i })).toHaveClass('custom-class');
  });

  test('is disabled when disabled prop is true', () => {
    // Test with default filled variant
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button', { name: /Disabled/i });
    expect(buttonElement).toBeDisabled();
    expect(normalizeClassName(buttonElement.className)).toContain('opacity-50 cursor-not-allowed');
    // Ensure it still has base filled styles
    expect(normalizeClassName(buttonElement.className)).toContain('bg-[--ui-action-primary-bg]');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const buttonElement = screen.getByRole('button', { name: /Clickable/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('applies themeable focus ring offset', () => {
    render(<Button>Focus Test</Button>);
    const buttonElement = screen.getByRole('button', { name: /Focus Test/i });
    expect(normalizeClassName(buttonElement.className)).toContain('focus:ring-offset-[--ui-background-primary]');
  });

  // Dark mode styling is now inherent in the semantic CSS variables.
  test('renders default (filled) button correctly in dark mode', () => {
    render(
      <div className="dark"> {/* Simulating dark mode context */}
        <Button>Dark Mode Test</Button>
      </div>
    );
    const buttonElement = screen.getByRole('button', { name: /Dark Mode Test/i });
    const normalizedClass = normalizeClassName(buttonElement.className);
    // Check for the default filled variant classes, which are theme-agnostic at component level
    expect(normalizedClass).toContain('bg-[--ui-action-primary-bg]');
    expect(normalizedClass).toContain('text-[--ui-action-primary-text]');
  });

});
