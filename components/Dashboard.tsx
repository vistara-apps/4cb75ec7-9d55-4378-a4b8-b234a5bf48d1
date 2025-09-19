'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Chart } from './ui/Chart';
import { InsightCard } from './ui/InsightCard';
import { ForecastModal } from './ForecastModal';
import { CreatorDashboard } from './CreatorDashboard';
import { TrendingUp, Brain, Zap, Target } from 'lucide-react';
import { generateMockChartData, formatPrice, formatPercentage } from '../lib/utils';
import { useMiniKit } from '@coinbase/minikit';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'forecast' | 'creator'>('forecast');
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState('ETH');
  const { user } = useMiniKit();

  useEffect(() => {
    // Generate mock chart data
    setChartData(generateMockChartData(30));
  }, [selectedToken]);

  const mockTokens = [
    { symbol: 'ETH', name: 'Ethereum', price: 2340.50, change: 5.2 },
    { symbol: 'BASE', name: 'Base Token', price: 1.85, change: -2.1 },
    { symbol: 'DEGEN', name: 'Degen', price: 0.0234, change: 12.5 },
  ];

  const currentToken = mockTokens.find(t => t.symbol === selectedToken) || mockTokens[0];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-textPrimary">
          Welcome to TokenForecast AI
        </h2>
        <p className="text-textMuted">
          Get AI-powered predictions for tokenized assets and creator economies
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            <div>
              <div className="text-lg font-bold text-textPrimary">94.2%</div>
              <div className="text-xs text-textMuted">Accuracy</div>
            </div>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-2">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <div className="text-lg font-bold text-textPrimary">1,247</div>
              <div className="text-xs text-textMuted">Forecasts</div>
            </div>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            <div>
              <div className="text-lg font-bold text-textPrimary">15</div>
              <div className="text-xs text-textMuted">Credits</div>
            </div>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-2">
            <Target className="w-6 h-6 text-green-500" />
            <div>
              <div className="text-lg font-bold text-textPrimary">87%</div>
              <div className="text-xs text-textMuted">Success</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-surface rounded-lg p-1">
        <button
          onClick={() => setActiveTab('forecast')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'forecast'
              ? 'bg-primary text-white'
              : 'text-textMuted hover:text-textPrimary'
          }`}
        >
          Token Forecast
        </button>
        <button
          onClick={() => setActiveTab('creator')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'creator'
              ? 'bg-primary text-white'
              : 'text-textMuted hover:text-textPrimary'
          }`}
        >
          Creator Tools
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'forecast' ? (
        <div className="space-y-6">
          {/* Token Selection */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-textPrimary">Select Token</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mockTokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token.symbol)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedToken === token.symbol
                        ? 'border-primary bg-primary/10'
                        : 'border-surface hover:border-textMuted'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-textPrimary">{token.symbol}</div>
                      <div className="text-sm text-textMuted">{token.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-medium">{formatPrice(token.price)}</span>
                        <span className={`text-xs ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {formatPercentage(token.change)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Price Chart */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-textPrimary">
                  {currentToken.name} Price Chart
                </h3>
                <div className="text-right">
                  <div className="text-xl font-bold text-textPrimary">
                    {formatPrice(currentToken.price)}
                  </div>
                  <div className={`text-sm ${currentToken.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(currentToken.change)} (24h)
                  </div>
                </div>
              </div>
              <Chart data={chartData} />
            </div>
          </Card>

          {/* Get Forecast Button */}
          <Button
            onClick={() => setShowForecastModal(true)}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 text-lg font-semibold glow-effect"
          >
            Get AI Forecast (2 Credits)
          </Button>

          {/* Recent Insights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Recent Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard
                variant="prediction"
                title="ETH Price Prediction"
                content="AI predicts 15% growth in next 30 days based on network activity and market sentiment."
                confidence={87}
              />
              <InsightCard
                variant="growth"
                title="DEGEN Token Analysis"
                content="Strong community engagement suggests potential for 25% price increase."
                confidence={72}
              />
            </div>
          </div>
        </div>
      ) : (
        <CreatorDashboard />
      )}

      {/* Forecast Modal */}
      {showForecastModal && (
        <ForecastModal
          token={currentToken}
          onClose={() => setShowForecastModal(false)}
        />
      )}
    </div>
  );
}
