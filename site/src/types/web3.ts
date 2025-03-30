export interface WalletInfo {
  type: WalletType; // Static Enum to type/identify the wallet
  name: string; // human-readable name of the wallet e.g. "MetaMask"
  icon?: string; // will be an svg imported from /public
  address: string; // users wallet address, can seamlessly change during the session
  chainId: number; // the currently connected chain on the wallet
}

export enum WalletType {
  METAMASK = "METAMASK",
  COINBASE = "COINBASE",
  WALLET_CONNECT = "WALLET_CONNECT",
}

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

export type Chain = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  backgroundColor: string;
  fontColor: string;
  rpcUrl?: string;
  explorerUrl?: string;
  chainId: number;
  decimals: number;
  testnet?: boolean;
  l2: boolean;
};

export interface Web3StoreState {
  // Connected wallets
  connectedWallets: WalletInfo[];
  activeWallet: WalletInfo | null;
  sourceChain: Chain;
  destinationChain: Chain;
  tokensByCompositeKey: Record<string, Token>;
  tokensByChainId: Record<number, Token[]>;
  tokensByAddress: Record<number, Record<string, Token>>; // Renamed for clarity in store
  allTokensList: Token[];
  tokensLoading: boolean;
  tokensError: string | null;

  // Actions
  addWallet: (wallet: WalletInfo) => void;
  removeWallet: (walletType: WalletType) => void;
  setActiveWallet: (walletType: WalletType) => void; // allows user to switch between wallets
  disconnectAll: () => void; // in case a user wants to completely log out
  updateWalletChainId: (walletType: WalletType, chainId: number) => void; // allows chain switching on individual wallet connections
  updateWalletAddress: (walletType: WalletType, address: string) => void; // allows user to seamlessly switch addresses
  setSourceChain: (chain: Chain) => void;
  setDestinationChain: (chain: Chain) => void;
  swapChains: () => void;

  // Token actions
  loadTokens: () => Promise<void>;
  getWalletTokens: () => Token[];
  getAllTokens: () => Token[];
  getTokensForChain: (chainId: number) => Token[];
  getTokenById: (id: string) => Token | undefined;
  getTokenByAddress: (address: string, chainId: number) => Token | undefined;
}
