import clsx from "clsx"
import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tinted" | "gray" | "plain"
  size?: "small" | "medium" | "large"
  children: React.ReactNode
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "filled", size = "medium", children, className, ...props }, ref) => {
    const base =
      "font-display bg-primary font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150"

    const sizes = {
      small: "px-3 py-1.5 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    }

    const variants = {
      filled: "bg-action-light-primary text-white hover:bg-blue-600 focus:ring-border-light-focus",
      tinted: "bg-action-light-primary/10 text-blue-600 hover:bg-blue-100 focus:ring-border-light-focus",
      gray: "bg-action-light-neutral text-gray-800 hover:bg-gray-200 focus:ring-border-light-default",
      plain: "text-text-light-accent hover:text-blue-600 focus:ring-border-light-focus focus:bg-blue-50",
    }

    const disabled = props.disabled ? "opacity-50 cursor-not-allowed" : ""

    return (
      <button ref={ref} className={clsx(base, sizes[size], variants[variant], disabled, className)} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
