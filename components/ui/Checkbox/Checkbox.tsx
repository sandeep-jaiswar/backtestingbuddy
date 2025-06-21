import { clsx } from "clsx"
import React, { forwardRef } from "react"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    const baseClasses =
      "w-4 h-4 text-ui-action-primary-bg bg-ui-background-primary border border-ui-border-primary rounded focus:ring-2 focus:ring-ui-border-focus focus:ring-offset-0 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

    const errorClasses = error ? "border-ui-text-destructive focus:ring-ui-text-destructive" : ""

    return (
      <div className="flex items-start gap-3">
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={clsx(baseClasses, errorClasses, className)}
            {...props}
          />
        </div>

        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label htmlFor={checkboxId} className="block cursor-pointer text-sm font-medium text-ui-text-primary">
                {label}
              </label>
            )}
            {description && <p className="mt-1 text-sm text-ui-text-tertiary">{description}</p>}
            {error && <p className="mt-1 text-sm text-ui-text-destructive">{error}</p>}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"
