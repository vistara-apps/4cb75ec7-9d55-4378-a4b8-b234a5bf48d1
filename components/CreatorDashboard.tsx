'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { InsightCard } from './ui/InsightCard';
import { Users, TrendingUp, Zap, Target, Plus } from 'lucide-react';
import { AIForecastService } from '../lib/ai-service';
import { formatNumber } from '../lib/utils';

export function CreatorDashboard() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [creatorProfile, setCreatorProfile] = useState<any>(null);

  // Mock creator profile data
  useEffect(() => {
    setCreatorProfile({
      tokenSymbol: 'CREATOR',
      performanceMetrics: {
        holderCount: 1247,
        tradingVolume: 45000,
        socialEngagement: 8.5,
        growthRate: 12.3,
      },
    });
  }, []);

  const handleAnalyzeToken = async () => {
    if (!tokenAddress.trim()) return;
    
    setIsLoading(true);
    try {
      const mockProfile = {
        tokenSymbol: 'CREATOR',
        performanceMetrics: {
          holderCount: Math.floor(Math.random() * 5000) + 500,
          tradingVolume: Math.floor(Math.random() * 100000) + 10000,
          socialEngagement: Math.random() * 10,
          growthRate: (Math.random() - 0.5) * 50,
        },
      };
      
      const generatedInsights = await AIForecastService.generateCreatorInsights(mockProfile);
      setInsights(generatedInsights);
      setCreatorProfile(mockProfile);
    } catch (error) {
      console.error('Analysis failed:', error);
      setInsights([
        'Increase community engagement through regular updates',
        'Consider implementing token utility features',
        'Expand social media presence across platforms',
        'Create exclusive content for token holders',
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Token Analysis Input */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-textPrimary">Analyze Your Creator Token</h3>
          <div className="flex space-x-3">
            <Input
              placeholder="Enter token contract address..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleAnalyzeToken}
              disabled={isLoading || !tokenAddress.trim()}
              className="bg-primary text-white px-6"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Analyze'
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      {creatorProfile && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <div className="text-lg font-bold text-textPrimary">
                  {formatNumber(creatorProfile.performanceMetrics.holderCount)}
                </div>
                <div className="text-xs text-textMuted">Holders</div>
              </div>
            </div>
          </Card>
          
          <Card className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <TrendingUp className="w-6 h-6 text-accent" />
              <div>
                <div className="text-lg font-bold text-textPrimary">
                  ${formatNumber(creatorProfile.performanceMetrics.tradingVolume)}
                </div>
                <div className="text-xs text-textMuted">Volume</div>
              </div>
            </div>
          </Card>
          
          <Card className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="text-lg font-bold text-textPrimary">
                  {creatorProfile.performanceMetrics.socialEngagement.toFixed(1)}
                </div>
                <div className="text-xs text-textMuted">Engagement</div>
              </div>
            </div>
          </Card>
          
          <Card className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <Target className={`w-6 h-6 ${creatorProfile.performanceMetrics.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <div>
                <div className={`text-lg font-bold ${creatorProfile.performanceMetrics.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {creatorProfile.performanceMetrics.growthRate >= 0 ? '+' : ''}{creatorProfile.performanceMetrics.growthRate.toFixed(1)}%
                </div>
                <div className="text-xs text-textMuted">Growth</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* AI Insights */}
      {insights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-textPrimary">AI Growth Insights</h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <InsightCard
                key={index}
                variant="growth"
                title={`Growth Opportunity ${index + 1}`}
                content={insight}
                confidence={Math.floor(Math.random() * 30) + 70}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-textPrimary">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Engage Community</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Set Goals</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Tips Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-textPrimary">Creator Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-textPrimary">Consistent Engagement</div>
                <div className="text-xs text-textMuted">Regular interaction with your community builds trust and loyalty</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-textPrimary">Utility Development</div>
                <div className="text-xs text-textMuted">Add real-world utility to increase token value and adoption</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-textPrimary">Community Rewards</div>
                <div className="text-xs text-textMuted">Implement reward systems to incentivize long-term holding</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
