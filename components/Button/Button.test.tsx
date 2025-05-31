import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

// Simplified helper function to only trim whitespace
const normalizeClassName = (className?: string | null) => className?.trim() || '';


describe('Button Component', () => {
  test('renders with default props (filled, primary, medium)', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
    const normalizedClass = normalizeClassName(buttonElement.className);
    // Default: filled, primary
    expect(normalizedClass).toContain('bg-[--ui-action-primary-bg]');
    expect(normalizedClass).toContain('text-[--ui-action-primary-text]');
    // Default: medium size
    expect(normalizedClass).toContain('px-4 py-2 text-[--font-size-base]');
    // Check for base structural classes
    expect(normalizedClass).toContain('font-family-sf-pro-text font-semibold rounded-lg');
  });

  // Test Variants with Primary Intent
  describe('Variants with Primary Intent', () => {
    test.each([
      ['filled', 'bg-[--ui-action-primary-bg] text-[--ui-action-primary-text]'],
      ['tinted', 'bg-[--ui-action-primary-tint-bg] text-[--ui-action-primary-tint-text]'],
      // Updated expectation for gray variant with primary intent (defaults to none intent text color)
      ['gray', 'bg-[--ui-action-neutral-bg] text-[--ui-text-primary]'],
      // Updated expectation for plain variant with primary intent (defaults to none intent text color)
      ['plain', 'text-[--ui-text-primary]'],
    ])('variant %s renders correctly', (variant, expectedClasses) => {
      render(<Button variant={variant as any} intent="primary">Test</Button>);
      const buttonElement = screen.getByRole('button', { name: /Test/i });
      const normalizedClass = normalizeClassName(buttonElement.className);
      expectedClasses.split(' ').forEach(cls => expect(normalizedClass).toContain(cls));
    });
  });

  // Test Variants with Destructive Intent
  describe('Variants with Destructive Intent', () => {
    test.each([
      ['filled', 'bg-[--ui-action-destructive-bg] text-[--ui-action-destructive-text]'],
      ['tinted', 'bg-[--ui-action-destructive-tint-bg] text-[--ui-action-destructive-tint-text]'],
      ['gray', 'bg-[--ui-action-neutral-bg] text-[--ui-text-destructive]'],
      ['plain', 'text-[--ui-text-destructive]'],
    ])('variant %s renders correctly', (variant, expectedClasses) => {
      render(<Button variant={variant as any} intent="destructive">Test</Button>);
      const buttonElement = screen.getByRole('button', { name: /Test/i });
      const normalizedClass = normalizeClassName(buttonElement.className);
      expectedClasses.split(' ').forEach(cls => expect(normalizedClass).toContain(cls));
    });
  });

  // Test Variants with None Intent
  describe('Variants with None Intent', () => {
    test.each([
      ['filled', 'bg-[--ui-action-neutral-bg] text-[--ui-action-neutral-text]'],
      ['tinted', 'bg-[--ui-action-neutral-tint-bg] text-[--ui-action-neutral-tint-text]'],
      ['gray', 'bg-[--ui-action-neutral-bg] text-[--ui-text-primary]'],
      ['plain', 'text-[--ui-text-primary]'],
    ])('variant %s renders correctly', (variant, expectedClasses) => {
      render(<Button variant={variant as any} intent="none">Test</Button>);
      const buttonElement = screen.getByRole('button', { name: /Test/i });
      const normalizedClass = normalizeClassName(buttonElement.className);
      expectedClasses.split(' ').forEach(cls => expect(normalizedClass).toContain(cls));
    });
  });

  // Test Sizes
  describe('Sizes', () => {
    test.each([
      ['small', 'px-3 py-1.5 text-[--font-size-sm]'],
      ['medium', 'px-4 py-2 text-[--font-size-base]'],
      ['large', 'px-6 py-3 text-[--font-size-lg]'],
    ])('size %s renders correctly', (size, expectedClasses) => {
      render(<Button size={size as any}>Test</Button>);
      const buttonElement = screen.getByRole('button', { name: /Test/i });
      const normalizedClass = normalizeClassName(buttonElement.className);
      expectedClasses.split(' ').forEach(cls => expect(normalizedClass).toContain(cls));
    });
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button', { name: /Custom/i })).toHaveClass('custom-class');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button', { name: /Disabled/i });
    expect(buttonElement).toBeDisabled();
    expect(normalizeClassName(buttonElement.className)).toContain('opacity-50 cursor-not-allowed');
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

  // Test focus ring offset variable (important for theme switching)
  test('applies themeable focus ring offset', () => {
    render(<Button>Focus Test</Button>);
    const buttonElement = screen.getByRole('button', { name: /Focus Test/i });
    expect(normalizeClassName(buttonElement.className)).toContain('focus:ring-offset-[--ui-background-primary]');
  });

  // Dark mode styling is now inherent in the semantic CSS variables.
  // So, explicit dark mode class checks are no longer needed for colors.
  // We trust that the CSS variables change correctly based on the .dark class or prefers-color-scheme.
  // If specific structural changes were made with dark: prefixes (not colors), those could be tested here.
  test('renders filled primary button (classes should be theme-agnostic now)', () => {
    render(
      <div className="dark"> {/* Simulating dark mode context */}
        <Button variant="filled" intent="primary">Dark Mode Test</Button>
      </div>
    );
    const buttonElement = screen.getByRole('button', { name: /Dark Mode Test/i });
    const normalizedClass = normalizeClassName(buttonElement.className);
    expect(normalizedClass).toContain('bg-[--ui-action-primary-bg]');
    expect(normalizedClass).toContain('text-[--ui-action-primary-text]');
    // No need to check for dark:bg-* or dark:text-* as those are handled by CSS variables
  });

});
