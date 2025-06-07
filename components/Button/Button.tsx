import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tinted" | "gray" | "plain"
  size?: "small" | "medium" | "large"
  children: React.ReactNode
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "filled", size = "medium", children, className, ...props }, // intent removed from props
    ref
  ) => {
    const baseStyles =
      "font-family-sf-pro-text font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[--ui-background-primary] transition-colors duration-150"

    const sizeStyles = {
      small: "px-3 py-1.5 text-[--font-size-sm]",
      medium: "px-4 py-2 text-[--font-size-base]",
      large: "px-6 py-3 text-[--font-size-lg]",
    }

    let variantClasses = ""

    switch (variant) {
      case "filled":
        // Default filled is primary action
        variantClasses =
          "bg-[--ui-action-primary-bg] text-[--ui-action-primary-text] hover:bg-[--ui-action-primary-bg-hover] focus:ring-[--ui-border-focus]"
        break
      case "tinted":
        // Default tinted is primary action tint
        variantClasses =
          "bg-[--ui-action-primary-tint-bg] text-[--ui-action-primary-tint-text] hover:bg-[--ui-action-primary-bg]/30 focus:ring-[--ui-border-focus]"
        break
      case "gray":
        // Gray variant is neutral
        variantClasses =
          "bg-[--ui-action-neutral-bg] text-[--ui-text-primary] hover:bg-[--ui-action-neutral-bg-hover] focus:ring-[--ui-border-primary]"
        break
      case "plain":
        // Default plain is primary/accent text for emphasis
        variantClasses =
          "text-[--ui-text-accent] hover:text-[--ui-text-accent] focus:ring-[--ui-border-focus] focus:bg-[--ui-action-primary-tint-bg]"
        break
      default:
        // Fallback to a sensible default if variant is somehow not matched (e.g. primary filled)
        variantClasses =
          "bg-[--ui-action-primary-bg] text-[--ui-action-primary-text] hover:bg-[--ui-action-primary-bg-hover] focus:ring-[--ui-border-focus]"
        break
    }

    const disabledStyles = props.disabled ? "opacity-50 cursor-not-allowed" : ""

    return (
      <button
        ref={ref}
        className={` ${baseStyles} ${sizeStyles[size]} ${variantClasses} ${disabledStyles} ${className || ""} `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
