# Cipher Quest Loot

A decentralized gaming platform built with FHE (Fully Homomorphic Encryption) technology, allowing players to engage in encrypted quests and secure loot management.

## Features

- **FHE-Encrypted Gameplay**: All game data is encrypted using fully homomorphic encryption
- **Wallet Integration**: Seamless connection with popular Web3 wallets
- **Decentralized Loot System**: Secure and transparent loot distribution
- **Quest Management**: Create and participate in encrypted quests
- **Reputation System**: Build reputation through successful quest completion

## Technologies

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE (Fully Homomorphic Encryption)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/OceanicLab/cipher-quest-loot.git

# Navigate to the project directory
cd cipher-quest-loot

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Smart Contracts

The project includes FHE-enabled smart contracts for:
- Quest creation and management
- Encrypted loot distribution
- Reputation tracking
- Secure transaction processing

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
