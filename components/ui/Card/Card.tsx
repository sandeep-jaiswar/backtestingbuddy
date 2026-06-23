"use client"

import { clsx } from "clsx"
import React from "react"

// Variants for the Card
export enum CardVariant {
  DEFAULT = "default",
  ELEVATED = "elevated",
  OUTLINED = "outlined",
}

// Padding options
export enum CardPadding {
  NONE = "none",
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: CardVariant
  padding?: CardPadding
  "data-testid"?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = CardVariant.DEFAULT,
  padding = CardPadding.MD,
  ...rest
}) => {
  const baseClasses = "bg-ui-background-elevated-primary rounded-lg transition-shadow duration-200"

  const variantClasses: Record<CardVariant, string> = {
    [CardVariant.DEFAULT]: "border border-ui-border-primary",
    [CardVariant.ELEVATED]: "shadow-lg hover:shadow-xl",
    [CardVariant.OUTLINED]: "border-2 border-ui-border-primary",
  }

  const paddingClasses: Record<CardPadding, string> = {
    [CardPadding.NONE]: "",
    [CardPadding.SM]: "p-4",
    [CardPadding.MD]: "p-6",
    [CardPadding.LG]: "p-8",
  }

  return (
    <div
      data-testid={rest["data-testid"] || "card"}
      className={clsx(baseClasses, variantClasses[variant], paddingClasses[padding], className)}
    >
      {children}
    </div>
  )
}

// Card Header
export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  "data-testid"?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...rest }) => (
  <div data-testid={rest["data-testid"]} className={clsx("mb-4", className)}>
    {children}
  </div>
)

// Card Title
export interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  "data-testid"?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className, as: Component = "h3", ...rest }) => (
  <Component
    data-testid={rest["data-testid"]}
    className={clsx("text-xl font-semibold text-ui-text-primary", className)}
  >
    {children}
  </Component>
)

// Card Content
export interface CardContentProps {
  children: React.ReactNode
  className?: string
  "data-testid"?: string
}

export const CardContent: React.FC<CardContentProps> = ({ children, className, ...rest }) => (
  <div data-testid={rest["data-testid"]} className={clsx("text-ui-text-secondary", className)}>
    {children}
  </div>
)

// Card Footer
export interface CardFooterProps {
  children: React.ReactNode
  className?: string
  "data-testid"?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, ...rest }) => (
  <div data-testid={rest["data-testid"]} className={clsx("mt-4 border-t border-ui-border-primary pt-4", className)}>
    {children}
  </div>
)
