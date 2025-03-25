import { Chain } from "@/config/chains";

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

export interface Web3StoreState {
  // Connected wallets
  connectedWallets: WalletInfo[];
  activeWallet: WalletInfo | null;
  sourceChain: Chain;
  destinationChain: Chain;

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
}
