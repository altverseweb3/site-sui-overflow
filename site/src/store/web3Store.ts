import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WalletInfo, Web3StoreState, WalletType } from "@/types/web3";
import {
  Chain,
  defaultSourceChain,
  defaultDestinationChain,
} from "@/config/chains";

// Create the store with standard persist middleware
const useWeb3Store = create<Web3StoreState>()(
  persist(
    (set) => ({
      connectedWallets: [],
      activeWallet: null,

      // Chain selection state
      sourceChain: defaultSourceChain,
      destinationChain: defaultDestinationChain,

      // Wallet actions
      addWallet: (wallet: WalletInfo) => {
        // Create a new wallet object without the provider
        const walletForStorage = {
          type: wallet.type,
          name: wallet.name,
          address: wallet.address,
          chainId: wallet.chainId,
        };

        set((state) => {
          const existingWalletIndex = state.connectedWallets.findIndex(
            (w) => w.type === wallet.type,
          );
          let newWallets: Array<Omit<WalletInfo, "provider">>;

          if (existingWalletIndex >= 0) {
            newWallets = [...state.connectedWallets];
            newWallets[existingWalletIndex] = walletForStorage;
          } else {
            newWallets = [...state.connectedWallets, walletForStorage];
          }

          return {
            connectedWallets: newWallets,
            activeWallet: state.activeWallet || walletForStorage,
          };
        });
      },

      removeWallet: (walletType: WalletType) => {
        set((state) => ({
          connectedWallets: state.connectedWallets.filter(
            (w) => w.type !== walletType,
          ),
          activeWallet:
            state.activeWallet?.type === walletType
              ? state.connectedWallets.find((w) => w.type !== walletType) ||
                null
              : state.activeWallet,
        }));
      },

      setActiveWallet: (walletType: WalletType) => {
        set((state) => ({
          activeWallet:
            state.connectedWallets.find((w) => w.type === walletType) ||
            state.activeWallet,
        }));
      },

      updateWalletAddress: (walletType: WalletType, address: string) => {
        set((state) => ({
          connectedWallets: state.connectedWallets.map((wallet) =>
            wallet.type === walletType ? { ...wallet, address } : wallet,
          ),
          activeWallet:
            state.activeWallet?.type === walletType
              ? { ...state.activeWallet, address }
              : state.activeWallet,
        }));
      },

      updateWalletChainId: (walletType: WalletType, chainId: number) => {
        set((state) => ({
          connectedWallets: state.connectedWallets.map((wallet) =>
            wallet.type === walletType ? { ...wallet, chainId } : wallet,
          ),
          activeWallet:
            state.activeWallet?.type === walletType
              ? { ...state.activeWallet, chainId }
              : state.activeWallet,
        }));
      },

      disconnectAll: () => {
        set({
          connectedWallets: [],
          activeWallet: null,
        });
      },

      // Chain selection actions
      setSourceChain: (chain: Chain) => {
        set((state) => ({
          sourceChain: chain,
          // Optionally prevent same source and destination
          destinationChain:
            state.destinationChain.id === chain.id
              ? state.sourceChain
              : state.destinationChain,
        }));
      },

      setDestinationChain: (chain: Chain) => {
        set((state) => ({
          destinationChain: chain,
          // Optionally prevent same source and destination
          sourceChain:
            state.sourceChain.id === chain.id
              ? state.destinationChain
              : state.sourceChain,
        }));
      },

      swapChains: () => {
        set((state) => ({
          sourceChain: state.destinationChain,
          destinationChain: state.sourceChain,
        }));
      },
    }),
    {
      name: "altverse-storage-web3",
      storage: createJSONStorage(() => {
        // Handle SSR case
        if (typeof window === "undefined") {
          return {
            getItem: () => Promise.resolve(null),
            setItem: () => Promise.resolve(),
            removeItem: () => Promise.resolve(),
          };
        }
        return localStorage;
      }),
      partialize: (state) => ({
        // Only persist what we need and ensure we don't store providers
        connectedWallets: state.connectedWallets.map((wallet) => ({
          type: wallet.type,
          name: wallet.name,
          address: wallet.address,
          chainId: wallet.chainId,
        })),
        activeWallet: state.activeWallet
          ? {
              type: state.activeWallet.type,
              name: state.activeWallet.name,
              address: state.activeWallet.address,
              chainId: state.activeWallet.chainId,
            }
          : null,
        sourceChain: state.sourceChain,
        destinationChain: state.destinationChain,
      }),
    },
  ),
);

// Utility hooks for chain selection
export const useCurrentChainId = (): number | null => {
  return useWeb3Store((state) => state.activeWallet?.chainId ?? null);
};

export const useSourceChain = (): Chain => {
  return useWeb3Store((state) => state.sourceChain);
};

export const useDestinationChain = (): Chain => {
  return useWeb3Store((state) => state.destinationChain);
};

export default useWeb3Store;
