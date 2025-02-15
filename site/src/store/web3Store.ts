import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WalletInfo, Web3StoreState, WalletType } from "@/types/wallet";

const useWeb3Store = create<Web3StoreState>()(
  persist(
    (set) => ({
      connectedWallets: [],
      activeWallet: null,

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
          let newWallets: Omit<WalletInfo, "provider">[];

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
    }),
    {
      name: "altverse-storage-web3",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        // Only persist these fields, and ensure we're not storing the provider
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
      }),
    },
  ),
);

export const useCurrentChainId = () => {
  return useWeb3Store((state) => state.activeWallet?.chainId ?? null);
};

export default useWeb3Store;
