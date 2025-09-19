'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { formatPrice } from '../../lib/utils';

interface ChartProps {
  data: Array<{
    timestamp: string;
    price: number;
    volume?: number;
    prediction?: number;
  }>;
  variant?: 'line' | 'bar';
}

export function Chart({ data, variant = 'line' }: ChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-textMuted/20 rounded-lg p-3 shadow-card">
          <p className="text-textMuted text-sm">{label}</p>
          <p className="text-textPrimary font-medium">
            Price: {formatPrice(payload[0].value)}
          </p>
          {payload[1] && (
            <p className="text-accent font-medium">
              Prediction: {formatPrice(payload[1].value)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(230 5% 60%)', fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(230 5% 60%)', fontSize: 12 }}
            tickFormatter={(value) => formatPrice(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(160 70% 35%)"
            strokeWidth={2}
            dot={false}
            className="chart-glow"
          />
          {data.some(d => d.prediction) && (
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="hsl(240 80% 45%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
