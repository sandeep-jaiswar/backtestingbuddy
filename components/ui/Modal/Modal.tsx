import React, { useEffect } from 'react'
import { clsx } from 'clsx'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className
}) => {
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, closeOnEscape])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className={clsx(
        'relative w-full bg-ui-background-primary rounded-lg shadow-xl transform transition-all',
        sizeClasses[size],
        className
      )}>
        {children}
      </div>
    </div>
  )
}

export interface ModalHeaderProps {
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  children, 
  onClose, 
  className 
}) => (
  <div className={clsx(
    'flex items-center justify-between p-6 border-b border-ui-border-primary',
    className
  )}>
    <div className="text-lg font-semibold text-ui-text-primary">
      {children}
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="text-ui-text-tertiary hover:text-ui-text-primary transition-colors"
        aria-label="Close modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
)

export interface ModalBodyProps {
  children: React.ReactNode
  className?: string
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
  <div className={clsx('p-6', className)}>
    {children}
  </div>
)

export interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
  <div className={clsx(
    'flex items-center justify-end gap-3 p-6 border-t border-ui-border-primary',
    className
  )}>
    {children}
  </div>
)