# TokenForecast AI - Base Mini App

Predictive insights for creator economies and tokenized assets powered by AI.

## Features

- **Token Value Forecasting**: AI-powered price predictions for tokenized assets
- **Scenario Simulation Engine**: Model potential future outcomes and assess risks
- **Creator Token Growth Dashboard**: Targeted insights and tools for creator token optimization
- **On-chain & Off-chain Data Integration**: Comprehensive data analysis
- **Base Network Integration**: Built specifically for Base ecosystem

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network via MiniKit
- **UI Components**: OnchainKit + Custom Components
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenRouter API with Gemini 2.0 Flash
- **Charts**: Recharts for data visualization

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd tokenforecast-ai
   npm install
   ```

2. **Environment Setup**
   Copy `.env.local` and add your API keys:
   ```bash
   cp .env.local .env.local
   # Edit .env.local with your actual API keys
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

- `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key  
- `OPENROUTER_API_KEY`: Your OpenRouter API key for AI services
- `NEXT_PUBLIC_BASE_RPC_URL`: Base network RPC URL

## Architecture

### Core Components

- **Dashboard**: Main interface with token forecasting and creator tools
- **ForecastModal**: AI-powered prediction interface
- **CreatorDashboard**: Tools and insights for creator token optimization
- **Chart**: Interactive price and prediction visualization
- **InsightCard**: AI-generated insights display

### Data Flow

1. User selects token or enters contract address
2. System fetches on-chain and off-chain data
3. AI service processes data and generates forecasts
4. Results displayed with confidence levels and recommendations
5. Users can save insights and track performance

### AI Integration

- Uses OpenRouter API with Gemini 2.0 Flash model
- Processes market data, social sentiment, and technical indicators
- Provides confidence-scored predictions with risk assessments
- Generates actionable recommendations for creators

## Design System

### Colors
- Primary: `hsl(240 80% 45%)` - Deep blue for main actions
- Accent: `hsl(160 70% 35%)` - Teal for highlights and success states
- Background: `hsl(230 10% 5%)` - Dark background
- Surface: `hsl(230 10% 10%)` - Card backgrounds
- Text Primary: `hsl(0 0% 95%)` - Main text
- Text Muted: `hsl(230 5% 60%)` - Secondary text

### Typography
- Display: `text-4xl font-bold`
- Heading: `text-2xl font-semibold`
- Body: `text-base leading-7`
- Caption: `text-sm`

## API Integration

### Base Network
- Fetches on-chain token data
- Monitors transaction volumes and holder counts
- Tracks smart contract interactions

### AI Services
- Processes market sentiment
- Generates price predictions
- Provides growth recommendations
- Analyzes creator token performance

## Mobile-First Design

- Responsive grid layouts
- Touch-friendly interactions
- Optimized for Base App mobile experience
- Progressive enhancement for larger screens

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
