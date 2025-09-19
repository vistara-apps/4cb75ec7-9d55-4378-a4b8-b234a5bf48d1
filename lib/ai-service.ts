import OpenAI from 'openai';
import { ForecastResult, Token, MarketData } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export class AIForecastService {
  static async generateForecast(
    token: Token,
    marketData: MarketData[],
    timeframe: string
  ): Promise<ForecastResult> {
    try {
      const prompt = this.buildForecastPrompt(token, marketData, timeframe);
      
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are an expert cryptocurrency and tokenized asset analyst. Provide detailed, data-driven forecasts based on market data and trends.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
      });

      const response = completion.choices[0]?.message?.content;
      return this.parseForecastResponse(response || '', marketData);
    } catch (error) {
      console.error('AI Forecast Error:', error);
      return this.generateFallbackForecast(marketData);
    }
  }

  private static buildForecastPrompt(
    token: Token,
    marketData: MarketData[],
    timeframe: string
  ): string {
    const currentPrice = marketData[marketData.length - 1]?.price || 0;
    const priceHistory = marketData.slice(-10).map(d => d.price);
    
    return `
Analyze the following token and provide a ${timeframe} price forecast:

Token: ${token.name} (${token.symbol})
Current Price: $${currentPrice}
Recent Price History: ${priceHistory.join(', ')}
Contract: ${token.contractAddress}
Blockchain: ${token.blockchain}

Please provide:
1. Predicted price for ${timeframe}
2. Confidence level (0-100%)
3. Price range (low-high)
4. Key factors influencing the prediction
5. Risk assessment (low/medium/high)
6. Investment recommendation

Format your response as JSON with these exact keys:
{
  "predictedPrice": number,
  "confidence": number,
  "priceRange": {"low": number, "high": number},
  "keyFactors": ["factor1", "factor2", "factor3"],
  "riskLevel": "low|medium|high",
  "recommendation": "string"
}
    `;
  }

  private static parseForecastResponse(response: string, marketData: MarketData[]): ForecastResult {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          predictedPrice: parsed.predictedPrice || marketData[marketData.length - 1]?.price || 0,
          confidence: Math.min(100, Math.max(0, parsed.confidence || 75)),
          priceRange: {
            low: parsed.priceRange?.low || 0,
            high: parsed.priceRange?.high || 0,
          },
          keyFactors: Array.isArray(parsed.keyFactors) ? parsed.keyFactors : ['Market trends', 'Technical analysis'],
          riskLevel: ['low', 'medium', 'high'].includes(parsed.riskLevel) ? parsed.riskLevel : 'medium',
          recommendation: parsed.recommendation || 'Hold and monitor market conditions',
        };
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error);
    }
    
    return this.generateFallbackForecast(marketData);
  }

  private static generateFallbackForecast(marketData: MarketData[]): ForecastResult {
    const currentPrice = marketData[marketData.length - 1]?.price || 100;
    const volatility = 0.15; // 15% volatility assumption
    
    return {
      predictedPrice: currentPrice * (1 + (Math.random() - 0.5) * 0.2),
      confidence: 65,
      priceRange: {
        low: currentPrice * (1 - volatility),
        high: currentPrice * (1 + volatility),
      },
      keyFactors: ['Market sentiment', 'Technical indicators', 'Trading volume'],
      riskLevel: 'medium',
      recommendation: 'Monitor closely and consider market conditions before making decisions.',
    };
  }

  static async generateCreatorInsights(profile: any): Promise<string[]> {
    try {
      const prompt = `
Analyze this creator token profile and provide 3-5 actionable growth insights:

Token: ${profile.tokenSymbol}
Holder Count: ${profile.performanceMetrics.holderCount}
Trading Volume: ${profile.performanceMetrics.tradingVolume}
Social Engagement: ${profile.performanceMetrics.socialEngagement}
Growth Rate: ${profile.performanceMetrics.growthRate}%

Provide specific, actionable recommendations for improving token performance.
      `;

      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are a creator economy expert specializing in tokenomics and community growth.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.4,
      });

      const response = completion.choices[0]?.message?.content || '';
      return response.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
    } catch (error) {
      console.error('Creator insights error:', error);
      return [
        'Increase community engagement through regular updates',
        'Consider token utility improvements',
        'Expand social media presence',
        'Implement holder rewards program',
      ];
    }
  }
}
