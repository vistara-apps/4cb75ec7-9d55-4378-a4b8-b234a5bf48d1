'use client';

import { ReactNode } from 'react';
import { TrendingUp, Brain, Users, Settings } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-surface bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[90%] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-textPrimary">TokenForecast AI</h1>
                <p className="text-xs text-textMuted">Predictive insights for tokenized assets</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-1 bg-surface rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-xs text-textMuted">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[90%] mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-sm border-t border-surface">
        <div className="max-w-[90%] mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button className="flex flex-col items-center space-y-1 text-primary">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Forecast</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-textMuted hover:text-textPrimary transition-colors">
              <Users className="w-5 h-5" />
              <span className="text-xs">Creator</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-textMuted hover:text-textPrimary transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
}
