// src/config/tokens.ts

export type Token = {
  id: string;
  name: string;
  ticker: string;
  icon: string;
  address: string;
  decimals: number;
  chainId: number;
  userBalance?: string;
  userBalanceUsd?: string;
  isWalletToken?: boolean;
};

// Default tokens configuration
export const tokens: Record<string, Token> = {
  usdc: {
    id: "usdc",
    name: "usd coin",
    ticker: "USDC",
    icon: "USDC.svg",
    address: "0x4a63aAA175A827d754CB5d93f59A9d7E27F4b7D2",
    decimals: 6,
    chainId: 1,
    userBalance: "150.3",
    userBalanceUsd: "$150.30",
    isWalletToken: true,
  },
  usdt: {
    id: "usdt",
    name: "tether",
    ticker: "USDT",
    icon: "USDT.svg",
    address: "0x95aD9f42912c95E4cC3E28CEc4e8b6A0c4E",
    decimals: 6,
    chainId: 1,
    userBalance: "0.53",
    userBalanceUsd: "$670.30",
    isWalletToken: true,
  },
  alt: {
    id: "alt",
    name: "altverse",
    ticker: "ALT",
    icon: "ALT.svg",
    address: "0x3845a23dd2F0a5d0",
    decimals: 18,
    chainId: 1,
    userBalance: "1.53",
    userBalanceUsd: "$4583.86",
    isWalletToken: true,
  },
  icp: {
    id: "icp",
    name: "internet computer",
    ticker: "ICP",
    icon: "ICP.svg",
    address: "0x1f9dB342c73a9B342",
    decimals: 18,
    chainId: 1,
    userBalance: "3.98",
    userBalanceUsd: "$50.30",
    isWalletToken: true,
  },
  matic: {
    id: "matic",
    name: "polygon",
    ticker: "MATIC",
    icon: "MATIC.svg",
    address: "0x7f39c24aB0a02Ca0",
    decimals: 18,
    chainId: 1,
    userBalance: "0",
    userBalanceUsd: "$0.00",
    isWalletToken: false,
  },
  sand: {
    id: "sand",
    name: "the sandbox",
    ticker: "SAND",
    icon: "SAND.svg",
    address: "0x18aA45b9A2B998",
    decimals: 18,
    chainId: 1,
    userBalance: "0",
    userBalanceUsd: "$0.00",
    isWalletToken: false,
  },
  uni: {
    id: "uni",
    name: "uniswap",
    ticker: "UNI",
    icon: "UNI.svg",
    address: "0x6f45c2e38b",
    decimals: 18,
    chainId: 1,
    userBalance: "0",
    userBalanceUsd: "$0.00",
    isWalletToken: false,
  },
};

// List of tokens in array format (useful for mapping)
export const tokenList: Token[] = Object.values(tokens);

// Get wallet tokens
export const getWalletTokens = (): Token[] => {
  return tokenList.filter((token) => token.isWalletToken);
};

// Get all tokens (for displaying in "all tokens" section)
export const getAllTokens = (): Token[] => {
  return tokenList.filter((token) => !token.isWalletToken);
};

// Get token by ID
export const getTokenById = (id: string): Token | undefined => {
  return tokens[id];
};

// Get token by address
export const getTokenByAddress = (address: string): Token | undefined => {
  return tokenList.find(
    (token) => token.address.toLowerCase() === address.toLowerCase(),
  );
};

export default tokens;
