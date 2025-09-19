export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  subscriptionStatus: 'free' | 'premium';
  credits: number;
  createdAt: Date;
}

export interface Token {
  tokenId: string;
  symbol: string;
  name: string;
  blockchain: string;
  contractAddress: string;
  description?: string;
  currentPrice?: number;
  priceChange24h?: number;
}

export interface ForecastRequest {
  requestId: string;
  userId: string;
  tokenId: string;
  requestTimestamp: Date;
  parameters: {
    timeframe: '1d' | '7d' | '30d' | '90d';
    confidenceLevel: number;
  };
  result?: ForecastResult;
  cost: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface ForecastResult {
  predictedPrice: number;
  confidence: number;
  priceRange: {
    low: number;
    high: number;
  };
  keyFactors: string[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface CreatorTokenProfile {
  profileId: string;
  userId: string;
  tokenSymbol: string;
  performanceMetrics: {
    holderCount: number;
    tradingVolume: number;
    socialEngagement: number;
    growthRate: number;
  };
  growthInsights: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketData {
  price: number;
  volume: number;
  marketCap: number;
  priceChange24h: number;
  timestamp: Date;
}

export interface ChartDataPoint {
  timestamp: string;
  price: number;
  volume?: number;
  prediction?: number;
}
