import React from "react"
import { clsx } from "clsx"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantClasses = {
    primary:
      "bg-ui-action-primary-bg text-ui-action-primary-text hover:bg-ui-action-primary-hover focus:ring-ui-action-primary-bg border border-ui-action-primary-border",
    secondary:
      "bg-ui-action-neutral-bg text-ui-action-neutral-text hover:bg-ui-action-neutral-hover focus:ring-ui-action-neutral-bg border border-ui-action-neutral-border",
    outline:
      "bg-transparent text-ui-text-primary hover:bg-ui-background-secondary border border-ui-border-primary focus:ring-ui-border-focus",
    ghost: "bg-transparent text-ui-text-primary hover:bg-ui-background-secondary focus:ring-ui-border-focus",
    destructive:
      "bg-ui-action-destructive-bg text-ui-action-destructive-text hover:bg-ui-action-destructive-hover focus:ring-ui-action-destructive-bg border border-ui-action-destructive-border",
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  const widthClasses = fullWidth ? "w-full" : ""

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], widthClasses, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="-ml-1 mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
