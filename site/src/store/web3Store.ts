// Stores web3 related context

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WalletInfo, Web3StoreState, WalletType } from "@/types/wallet";

const useWeb3Store = create<Web3StoreState>()(
  persist(
    (set) => ({
      connectedWallets: [],
      activeWallet: null,

      addWallet: (wallet: WalletInfo) => {
        set((state) => {
          const existingWalletIndex = state.connectedWallets.findIndex(
            (w) => w.type === wallet.type
          );
          let newWallets: WalletInfo[];

          if (existingWalletIndex >= 0) {
            newWallets = [...state.connectedWallets];
            newWallets[existingWalletIndex] = wallet;
          } else {
            newWallets = [...state.connectedWallets, wallet];
          }

          return {
            connectedWallets: newWallets,
            activeWallet: state.activeWallet || wallet,
          };
        });
      },

      removeWallet: (walletType: WalletType) => {
        set((state) => ({
          connectedWallets: state.connectedWallets.filter(
            (w) => w.type !== walletType
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
            wallet.type === walletType ? { ...wallet, address } : wallet
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
            wallet.type === walletType ? { ...wallet, chainId } : wallet
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
    }),
    {
      name: "altverse-storage-web3",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        connectedWallets: state.connectedWallets,
        activeWallet: state.activeWallet,
      }),
    }
  )
);

// Useful selector for getting the current chain ID
export const useCurrentChainId = () => {
  return useWeb3Store((state) => state.activeWallet?.chainId ?? null);
};

export default useWeb3Store;
