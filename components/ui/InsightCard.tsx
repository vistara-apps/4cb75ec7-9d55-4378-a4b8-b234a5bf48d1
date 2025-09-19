import { ReactNode } from 'react';
import { TrendingUp, Users, Brain, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InsightCardProps {
  variant: 'growth' | 'prediction';
  title: string;
  content: string;
  confidence?: number;
  className?: string;
}

export function InsightCard({
  variant,
  title,
  content,
  confidence,
  className,
}: InsightCardProps) {
  const getIcon = () => {
    switch (variant) {
      case 'growth':
        return <Users className="w-5 h-5 text-accent" />;
      case 'prediction':
        return <Brain className="w-5 h-5 text-primary" />;
      default:
        return <Target className="w-5 h-5 text-textMuted" />;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'growth':
        return 'border-accent/20';
      case 'prediction':
        return 'border-primary/20';
      default:
        return 'border-textMuted/20';
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'growth':
        return 'bg-accent/5';
      case 'prediction':
        return 'bg-primary/5';
      default:
        return 'bg-surface';
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4 space-y-3',
        getBorderColor(),
        getBackgroundColor(),
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <h4 className="font-medium text-textPrimary">{title}</h4>
        </div>
        {confidence && (
          <div className="text-xs text-textMuted bg-surface px-2 py-1 rounded-full">
            {confidence}% confidence
          </div>
        )}
      </div>
      
      <p className="text-sm text-textMuted leading-relaxed">{content}</p>
      
      {confidence && (
        <div className="w-full bg-surface rounded-full h-2">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              variant === 'growth' ? 'bg-accent' : 'bg-primary'
            )}
            style={{ width: `${confidence}%` }}
          />
        </div>
      )}
    </div>
  );
}
