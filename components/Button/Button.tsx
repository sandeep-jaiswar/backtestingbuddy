import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'tinted' | 'gray' | 'plain';
  intent?: 'primary' | 'destructive' | 'none';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { variant = 'filled', intent = 'primary', size = 'medium', children, className, ...props },
  ref
) => {
  // Base styles now use semantic variable for focus ring offset which adapts to theme
  const baseStyles = 'font-family-sf-pro-text font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[--ui-background-primary] transition-colors duration-150';

  const sizeStyles = {
    small: 'px-3 py-1.5 text-[--font-size-sm]',
    medium: 'px-4 py-2 text-[--font-size-base]',
    large: 'px-6 py-3 text-[--font-size-lg]',
  };

  let variantClasses = '';

  // Default to 'none' intent for gray and plain variants if not specified to avoid primary coloring by default
  const currentIntent = (variant === 'gray' || variant === 'plain') && intent === 'primary' ? 'none' : intent;

  switch (variant) {
    case 'filled':
      if (currentIntent === 'primary') {
        variantClasses = 'bg-[--ui-action-primary-bg] text-[--ui-action-primary-text] hover:bg-[--ui-action-primary-bg-hover] focus:ring-[--ui-border-focus]';
      } else if (currentIntent === 'destructive') {
        variantClasses = 'bg-[--ui-action-destructive-bg] text-[--ui-action-destructive-text] hover:bg-[--ui-action-destructive-bg-hover] focus:ring-[--ui-border-focus]'; // Consider a red focus ring: focus:ring-[--ui-text-destructive]
      } else { // none intent for filled
        variantClasses = 'bg-[--ui-action-neutral-bg] text-[--ui-action-neutral-text] hover:bg-[--ui-action-neutral-bg-hover] focus:ring-[--ui-border-primary]';
      }
      break;
    case 'tinted':
      if (currentIntent === 'primary') {
        variantClasses = 'bg-[--ui-action-primary-tint-bg] text-[--ui-action-primary-tint-text] hover:bg-[--ui-action-primary-bg]/30 focus:ring-[--ui-border-focus]'; // Using primary bg with alpha for hover
      } else if (currentIntent === 'destructive') {
        variantClasses = 'bg-[--ui-action-destructive-tint-bg] text-[--ui-action-destructive-tint-text] hover:bg-[--ui-action-destructive-bg]/30 focus:ring-[--ui-text-destructive]';
      } else { // none intent for tinted
        variantClasses = 'bg-[--ui-action-neutral-tint-bg] text-[--ui-action-neutral-tint-text] hover:bg-[--ui-action-neutral-bg]/30 focus:ring-[--ui-border-primary]';
      }
      break;
    case 'gray': // 'gray' variant primarily uses neutral colors but can have colored text for intents
      if (currentIntent === 'primary') {
        variantClasses = 'bg-[--ui-action-neutral-bg] text-[--ui-text-accent] hover:bg-[--ui-action-neutral-bg-hover] focus:ring-[--ui-border-focus]';
      } else if (currentIntent === 'destructive') {
        variantClasses = 'bg-[--ui-action-neutral-bg] text-[--ui-text-destructive] hover:bg-[--ui-action-neutral-bg-hover] focus:ring-[--ui-text-destructive]';
      } else { // none intent for gray
        variantClasses = 'bg-[--ui-action-neutral-bg] text-[--ui-text-primary] hover:bg-[--ui-action-neutral-bg-hover] focus:ring-[--ui-border-primary]';
      }
      break;
    case 'plain': // 'plain' variant has no background, only text color that changes with intent
      if (currentIntent === 'primary') {
        variantClasses = 'text-[--ui-text-accent] hover:text-[--ui-text-accent] focus:ring-[--ui-border-focus] focus:bg-[--ui-action-primary-tint-bg]'; // Subtle bg on focus
      } else if (currentIntent === 'destructive') {
        variantClasses = 'text-[--ui-text-destructive] hover:text-[--ui-text-destructive] focus:ring-[--ui-text-destructive] focus:bg-[--ui-action-destructive-tint-bg]';
      } else { // none intent for plain
        variantClasses = 'text-[--ui-text-primary] hover:text-[--ui-text-secondary] focus:ring-[--ui-border-primary] focus:bg-[--ui-action-neutral-tint-bg]';
      }
      break;
  }

  const disabledStyles = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      ref={ref}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantClasses}
        ${disabledStyles}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
