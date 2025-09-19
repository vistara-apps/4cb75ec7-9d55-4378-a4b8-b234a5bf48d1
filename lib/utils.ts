export function formatPrice(price: number): string {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  if (price < 1000) {
    return `$${price.toFixed(2)}`;
  }
  if (price < 1000000) {
    return `$${(price / 1000).toFixed(1)}K`;
  }
  return `$${(price / 1000000).toFixed(1)}M`;
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
}

export function generateMockChartData(days: number = 30): Array<{
  timestamp: string;
  price: number;
  volume: number;
}> {
  const data = [];
  const basePrice = 100;
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some realistic price movement
    const change = (Math.random() - 0.5) * 0.1; // ±5% max change
    currentPrice *= (1 + change);
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      price: Math.max(0.01, currentPrice),
      volume: Math.random() * 1000000 + 100000,
    });
  }
  
  return data;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
