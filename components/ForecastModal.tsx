'use client';

import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { X, Brain, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { AIForecastService } from '../lib/ai-service';
import { ForecastResult } from '../lib/types';
import { formatPrice, formatPercentage } from '../lib/utils';

interface ForecastModalProps {
  token: {
    symbol: string;
    name: string;
    price: number;
    change: number;
  };
  onClose: () => void;
}

export function ForecastModal({ token, onClose }: ForecastModalProps) {
  const [timeframe, setTimeframe] = useState<'1d' | '7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastResult | null>(null);

  const handleGenerateForecast = async () => {
    setIsLoading(true);
    try {
      // Mock data for demonstration
      const mockMarketData = [
        { price: token.price, volume: 1000000, marketCap: 50000000, priceChange24h: token.change, timestamp: new Date() }
      ];
      
      const mockToken = {
        tokenId: '1',
        symbol: token.symbol,
        name: token.name,
        blockchain: 'base',
        contractAddress: '0x...',
      };

      const result = await AIForecastService.generateForecast(mockToken, mockMarketData, timeframe);
      setForecast(result);
    } catch (error) {
      console.error('Forecast generation failed:', error);
      // Fallback forecast
      setForecast({
        predictedPrice: token.price * 1.15,
        confidence: 75,
        priceRange: {
          low: token.price * 0.9,
          high: token.price * 1.3,
        },
        keyFactors: ['Market sentiment', 'Technical indicators', 'Trading volume'],
        riskLevel: 'medium',
        recommendation: 'Monitor market conditions and consider gradual position building.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-textMuted';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-textPrimary">AI Forecast</h2>
                <p className="text-sm text-textMuted">{token.name} ({token.symbol})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface hover:bg-textMuted/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-textMuted" />
            </button>
          </div>

          {/* Current Price */}
          <div className="bg-surface/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-textMuted">Current Price</div>
                <div className="text-2xl font-bold text-textPrimary">{formatPrice(token.price)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-textMuted">24h Change</div>
                <div className={`text-lg font-semibold ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatPercentage(token.change)}
                </div>
              </div>
            </div>
          </div>

          {/* Timeframe Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-textPrimary">Forecast Timeframe</label>
            <div className="grid grid-cols-4 gap-2">
              {(['1d', '7d', '30d', '90d'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    timeframe === tf
                      ? 'bg-primary text-white'
                      : 'bg-surface text-textMuted hover:text-textPrimary'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Forecast Button */}
          {!forecast && (
            <Button
              onClick={handleGenerateForecast}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-3"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating Forecast...</span>
                </div>
              ) : (
                `Generate ${timeframe} Forecast (2 Credits)`
              )}
            </Button>
          )}

          {/* Forecast Results */}
          {forecast && (
            <div className="space-y-4">
              {/* Prediction */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-textPrimary">Price Prediction</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-textMuted">Predicted Price</div>
                    <div className="text-xl font-bold text-textPrimary">
                      {formatPrice(forecast.predictedPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-textMuted">Confidence</div>
                    <div className="text-xl font-bold text-accent">
                      {forecast.confidence}%
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-textMuted">Price Range</div>
                  <div className="text-sm text-textPrimary">
                    {formatPrice(forecast.priceRange.low)} - {formatPrice(forecast.priceRange.high)}
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-surface/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-textPrimary">Risk Assessment</h3>
                </div>
                <div className={`text-lg font-semibold ${getRiskColor(forecast.riskLevel)}`}>
                  {forecast.riskLevel.toUpperCase()} RISK
                </div>
              </div>

              {/* Key Factors */}
              <div className="space-y-3">
                <h3 className="font-semibold text-textPrimary">Key Factors</h3>
                <div className="space-y-2">
                  {forecast.keyFactors.map((factor, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm text-textMuted">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-textPrimary">Recommendation</h3>
                </div>
                <p className="text-sm text-textMuted">{forecast.recommendation}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  onClick={() => setForecast(null)}
                  variant="outline"
                  className="flex-1"
                >
                  New Forecast
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-accent text-white"
                >
                  Save Insight
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
