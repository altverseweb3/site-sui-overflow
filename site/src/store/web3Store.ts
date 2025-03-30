import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  WalletInfo,
  Web3StoreState,
  WalletType,
  Token,
  Chain,
} from "@/types/web3";
import { defaultSourceChain, defaultDestinationChain } from "@/config/chains";
import { loadAllTokens, StructuredTokenData } from "@/utils/tokenMethods";

const useWeb3Store = create<Web3StoreState>()(
  persist(
    (set, get) => ({
      connectedWallets: [],
      activeWallet: null,

      // Chain selection state
      sourceChain: defaultSourceChain,
      destinationChain: defaultDestinationChain,

      // tokens
      tokensByCompositeKey: {},
      tokensByChainId: {},
      tokensByAddress: {},
      allTokensList: [],
      tokensLoading: false,
      tokensError: null,

      // Wallet actions
      addWallet: (wallet: WalletInfo) => {
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
          destinationChain:
            state.destinationChain.id === chain.id
              ? state.sourceChain
              : state.destinationChain,
        }));
      },

      setDestinationChain: (chain: Chain) => {
        set((state) => ({
          destinationChain: chain,
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

      loadTokens: async () => {
        if (get().tokensLoading) return;

        try {
          set({ tokensLoading: true, tokensError: null });
          const structuredTokens: StructuredTokenData = await loadAllTokens();
          set({
            tokensByCompositeKey: structuredTokens.byCompositeKey,
            tokensByChainId: structuredTokens.byChainId,
            tokensByAddress: structuredTokens.byChainIdAndAddress,
            allTokensList: structuredTokens.allTokensList,
            tokensLoading: false,
            tokensError: null,
          });
        } catch (error) {
          console.error("Error loading tokens:", error);
          set({
            tokensByCompositeKey: {}, // Reset on error
            tokensByChainId: {},
            tokensByAddress: {},
            allTokensList: [],
            tokensError: error instanceof Error ? error.message : String(error),
            tokensLoading: false,
          });
        }
      },

      getWalletTokens: (): Token[] => {
        return get().allTokensList.filter((token) => token.isWalletToken);
      },

      getAllTokens: (): Token[] => {
        return get().allTokensList.filter((token) => !token.isWalletToken);
      },

      getTokensForChain: (chainId: number): Token[] => {
        return get().tokensByChainId[chainId] || [];
      },

      getTokenById: (compositeKey: string): Token | undefined => {
        return get().tokensByCompositeKey[compositeKey];
      },

      getTokenByAddress: (
        address: string,
        chainId: number,
      ): Token | undefined => {
        const lowerAddress = address.toLowerCase();
        const chainTokensByAddress = get().tokensByAddress[chainId];
        return chainTokensByAddress
          ? chainTokensByAddress[lowerAddress]
          : undefined;
      },

      findTokenByAddressAnyChain: (address: string): Token | undefined => {
        const lowerAddress = address.toLowerCase();
        return get().allTokensList.find(
          (token) => token.address.toLowerCase() === lowerAddress,
        );
      },
    }),
    {
      name: "altverse-storage-web3",
      storage: createJSONStorage(() => {
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
        // We don't need to persist tokens since they're loaded from the JSON files
      }),
    },
  ),
);

export const useCurrentChainId = (): number | null => {
  return useWeb3Store((state) => state.activeWallet?.chainId ?? null);
};

export const useSourceChain = (): Chain => {
  return useWeb3Store((state) => state.sourceChain);
};

export const useDestinationChain = (): Chain => {
  return useWeb3Store((state) => state.destinationChain);
};

export const useTokensLoading = (): boolean => {
  return useWeb3Store((state) => state.tokensLoading);
};

export const useTokensError = (): string | null => {
  return useWeb3Store((state) => state.tokensError);
};

export const useAllTokensList = (): Token[] => {
  return useWeb3Store((state) => state.allTokensList);
};

export const useTokensForChain = (chainId: number): Token[] => {
  return useWeb3Store((state) => state.tokensByChainId[chainId] || []);
};

export const useSourceChainTokens = (): Token[] => {
  const sourceChainId = useWeb3Store((state) => state.sourceChain.chainId);
  return useWeb3Store((state) => state.tokensByChainId[sourceChainId] || []);
};

export const useDestinationChainTokens = (): Token[] => {
  const destinationChainId = useWeb3Store(
    (state) => state.destinationChain.chainId,
  );
  return useWeb3Store(
    (state) => state.tokensByChainId[destinationChainId] || [],
  );
};

export const useTokenByAddress = (
  address: string | undefined,
  chainId: number | undefined,
): Token | undefined => {
  const lowerAddress = address?.toLowerCase();
  return useWeb3Store((state) => {
    if (!lowerAddress || chainId === undefined) return undefined;
    const chainTokens = state.tokensByAddress[chainId];
    return chainTokens ? chainTokens[lowerAddress] : undefined;
  });
};

export const useLoadTokens = () => {
  return useWeb3Store((state) => state.loadTokens);
};

export default useWeb3Store;
