// src/config/chains.ts

export type Chain = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  backgroundColor: string;
  fontColor: string;
  rpcUrl?: string;
  explorerUrl?: string;
  chainId?: number;
  decimals?: number;
  testnet?: boolean;
  l2: boolean;
};

// Default chains configuration
export const chains: Record<string, Chain> = {
  ethereum: {
    id: "ethereum",
    name: "ethereum",
    symbol: "ETH",
    icon: "ETH.svg",
    backgroundColor: "#627eea",
    fontColor: "#FFFFFF",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    explorerUrl: "https://etherscan.io",
    chainId: 1,
    decimals: 18,
    l2: false,
  },
  arbitrum: {
    id: "arbitrum",
    name: "arbitrum",
    symbol: "ARB",
    icon: "ARB.svg",
    backgroundColor: "#28a0f0",
    fontColor: "#FFFFFF",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    explorerUrl: "https://arbiscan.io",
    chainId: 42161,
    decimals: 18,
    l2: true,
  },
  optimism: {
    id: "optimism",
    name: "optimism",
    symbol: "OP",
    icon: "OP.svg",
    backgroundColor: "#ff0420",
    fontColor: "#FFFFFF",
    rpcUrl: "https://mainnet.optimism.io",
    explorerUrl: "https://optimistic.etherscan.io",
    chainId: 10,
    decimals: 18,
    l2: true,
  },
  base: {
    id: "base",
    name: "base",
    symbol: "BASE",
    icon: "BASE.svg",
    backgroundColor: "#0D5BFF",
    fontColor: "#FFFFFF",
    rpcUrl: "https://mainnet.optimism.io",
    explorerUrl: "https://optimistic.etherscan.io",
    chainId: 10,
    decimals: 18,
    l2: true,
  },
  linea: {
    id: "linea",
    name: "linea",
    symbol: "LINEA",
    icon: "LINEA.svg",
    backgroundColor: "#FFF068",
    fontColor: "#000000",
    rpcUrl: "https://mainnet.optimism.io",
    explorerUrl: "https://optimistic.etherscan.io",
    chainId: 10,
    decimals: 18,
    l2: true,
  },
  polygon: {
    id: "polygon",
    name: "polygon",
    symbol: "MATIC",
    icon: "MATIC.svg",
    backgroundColor: "#8247e5",
    fontColor: "#FFFFFF",
    rpcUrl: "https://polygon-rpc.com",
    explorerUrl: "https://polygonscan.com",
    chainId: 137,
    decimals: 18,
    l2: false,
  },
  binance: {
    id: "binance",
    name: "bnb chain",
    symbol: "BNB",
    icon: "BNB.svg",
    backgroundColor: "#f3ba2f",
    fontColor: "#FFFFFF",
    rpcUrl: "https://bsc-dataseed.binance.org",
    explorerUrl: "https://bscscan.com",
    chainId: 56,
    decimals: 18,
    l2: false,
  },
  avalanche: {
    id: "avalanche",
    name: "avalanche",
    symbol: "AVAX",
    icon: "AVAX.svg",
    backgroundColor: "#e84142",
    fontColor: "#FFFFFF",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    explorerUrl: "https://snowtrace.io",
    chainId: 43114,
    decimals: 18,
    l2: false,
  },
  sonic: {
    id: "sonic",
    name: "sonic",
    symbol: "S",
    icon: "S.svg",
    backgroundColor: "#131315",
    fontColor: "#FFFFFF",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    explorerUrl: "https://snowtrace.io",
    chainId: 43114,
    decimals: 18,
    l2: false,
  },
};

// List of chains in array format (useful for mapping)
export const chainList: Chain[] = Object.values(chains);

// Default chain
export const defaultSourceChain: Chain = chains.ethereum;
export const defaultDestinationChain: Chain = chains.polygon;

// Get chain by ID
export const getChainById = (id: string): Chain => {
  return chains[id] || defaultSourceChain;
};

// Get chain by chain ID (numeric)
export const getChainByChainId = (chainId: number): Chain => {
  return (
    chainList.find((chain) => chain.chainId === chainId) || defaultSourceChain
  );
};

// Get testnet chains
export const getTestnetChains = (): Chain[] => {
  return chainList.filter((chain) => chain.testnet);
};

// Get mainnet chains
export const getMainnetChains = (): Chain[] => {
  return chainList.filter((chain) => !chain.testnet);
};

export default chains;
