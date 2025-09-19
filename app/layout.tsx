import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'TokenForecast AI',
  description: 'Predictive insights for creator economies and tokenized assets',
  openGraph: {
    title: 'TokenForecast AI',
    description: 'Predictive insights for creator economies and tokenized assets',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-textPrimary">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
