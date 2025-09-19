import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4',
        variant === 'default' && 'bg-surface shadow-card',
        variant === 'outlined' && 'bg-surface border border-textMuted/20',
        className
      )}
    >
      {children}
    </div>
  );
}
