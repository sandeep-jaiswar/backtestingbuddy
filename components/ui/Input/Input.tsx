import React, { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const baseClasses = 'w-full px-3 py-2 text-ui-text-primary bg-ui-background-primary border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ui-border-focus focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    default: 'border-ui-border-primary',
    filled: 'border-transparent bg-ui-background-secondary'
  }
  
  const errorClasses = error ? 'border-ui-text-destructive focus:ring-ui-text-destructive' : ''
  
  const paddingClasses = clsx({
    'pl-10': leftIcon,
    'pr-10': rightIcon
  })

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-ui-text-secondary mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-ui-text-tertiary">{leftIcon}</div>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            baseClasses,
            variantClasses[variant],
            errorClasses,
            paddingClasses,
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-ui-text-tertiary">{rightIcon}</div>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={clsx(
          'mt-1 text-sm',
          error ? 'text-ui-text-destructive' : 'text-ui-text-tertiary'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'