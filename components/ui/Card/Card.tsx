import React from "react"
import { clsx } from "clsx"

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined"
  padding?: "none" | "sm" | "md" | "lg"
}

export const Card: React.FC<CardProps> = ({ children, className, variant = "default", padding = "md" }) => {
  const baseClasses = "bg-ui-background-elevated-primary rounded-lg transition-shadow duration-200"

  const variantClasses = {
    default: "border border-ui-border-primary",
    elevated: "shadow-lg hover:shadow-xl",
    outlined: "border-2 border-ui-border-primary",
  }

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }

  return (
    <div className={clsx(baseClasses, variantClasses[variant], paddingClasses[padding], className)}>{children}</div>
  )
}

export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={clsx("mb-4", className)}>{children}</div>
)

export interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className, as: Component = "h3" }) => (
  <Component className={clsx("text-xl font-semibold text-ui-text-primary", className)}>{children}</Component>
)

export interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={clsx("text-ui-text-secondary", className)}>{children}</div>
)

export interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={clsx("mt-4 border-t border-ui-border-primary pt-4", className)}>{children}</div>
)
