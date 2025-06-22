import { clsx } from "clsx"
import React from "react"

export interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", size = "md", className }) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-colors"

  const variantClasses = {
    default: "bg-ui-background-tertiary text-ui-text-primary",
    primary: "bg-ui-action-primary-tint-bg text-ui-action-primary-tint-text",
    secondary: "bg-ui-action-neutral-tint-bg text-ui-action-neutral-tint-text",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    error: "bg-ui-action-destructive-tint-bg text-ui-action-destructive-tint-text",
    outline: "border border-ui-border-primary text-ui-text-primary bg-transparent",
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  }

  return <span className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}>{children}</span>
}
