"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  StyledDialogClose,
  DialogTitle,
} from "@/components/ui/StyledDialog";
import { Token, getWalletTokens, getAllTokens } from "@/config/tokens";
import useWeb3Store from "@/store/web3Store";

// Define interfaces for our component props
interface TokenListItemProps {
  token: Token;
  onSelect: (token: Token) => void;
  copiedAddresses: Record<string, boolean>;
  onCopy: (text: string, tokenId: string) => void;
}

// Token list item component to eliminate duplication
const TokenListItem: React.FC<TokenListItemProps> = ({
  token,
  onSelect,
  copiedAddresses,
  onCopy,
}) => {
  // Format address to show first 6 and last 4 characters
  const formatAddress = (address: string) => {
    if (!address) return "";
    if (address.length <= 8) return address;
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
    )}`;
  };

  return (
    <div
      className="px-2 py-0.5 cursor-pointer group"
      onClick={() => onSelect(token)}
    >
      <div className="flex items-center justify-between p-[5px] px-[9px] rounded-md w-full transition-colors duration-150 ease-in-out hover:bg-[#27272A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src={`/tokens/branded/${token.icon}`}
              alt={token.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-[#FAFAFA]">{token.name}</div>
            <div className="flex items-center text-[0.75rem] text-[#FAFAFA55]">
              <span className="numeric-input flex items-center w-16">
                {token.ticker}
              </span>
              <div className="flex items-center">
                <span
                  className="numeric-input text-[10px] flex items-center"
                  style={{ transform: "translateY(1px)" }}
                >
                  {formatAddress(token.address)}
                </span>
                <button
                  className="ml-1 text-[#FAFAFA40] hover:text-[#FAFAFA80] focus:outline-none transition-colors opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(token.address, token.id);
                  }}
                  title="Copy address"
                  aria-label="Copy address to clipboard"
                >
                  <div className="relative h-3 w-3">
                    {/* Copy icon with fade-out animation when copied */}
                    <Copy
                      className={`h-3 w-3 absolute transition-all duration-300 ${
                        copiedAddresses[token.id]
                          ? "opacity-0 scale-75 transform rotate-[-8deg]"
                          : "opacity-100"
                      }`}
                    />

                    {/* Check icon with fade-in animation when copied */}
                    <Check
                      className={`h-3 w-3 absolute text-amber-500 transition-all duration-300 ${
                        copiedAddresses[token.id]
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50 transform rotate-[15deg]"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-[#FAFAFA] numeric-input">
            {token.userBalanceUsd}
          </div>
          <div className="text-sm text-[#FAFAFA55] numeric-input">
            {token.userBalance}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TokenListSectionProps {
  title: string;
  tokens: Token[];
  onSelectToken: (token: Token) => void;
  copiedAddresses: Record<string, boolean>;
  onCopy: (text: string, tokenId: string) => void;
}

// Token list section component
const TokenListSection: React.FC<TokenListSectionProps> = ({
  title,
  tokens,
  onSelectToken,
  copiedAddresses,
  onCopy,
}) => {
  if (tokens.length === 0) return null;

  return (
    <div>
      <div className="px-4 pb-2 pt-4 text-sm text-[#FAFAFA55]">{title}</div>
      <div>
        {tokens.map((token) => (
          <TokenListItem
            key={token.id}
            token={token}
            onSelect={onSelectToken}
            copiedAddresses={copiedAddresses}
            onCopy={onCopy}
          />
        ))}
      </div>
    </div>
  );
};

interface SelectTokenButtonProps {
  variant: "send" | "receive";
  onTokenSelect?: (token: Token) => void;
  selectedToken?: Token;
}

export const SelectTokenButton: React.FC<SelectTokenButtonProps> = ({
  variant,
  onTokenSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const walletTokens = getWalletTokens();
  const allTokens = getAllTokens();
  const sourceChain = useWeb3Store((state) => state.sourceChain);
  const destinationChain = useWeb3Store((state) => state.destinationChain);
  const chainToShow = variant === "send" ? sourceChain : destinationChain;
  const [copiedAddresses, setCopiedAddresses] = useState<
    Record<string, boolean>
  >({});

  const copyToClipboard = (text: string, tokenId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Set this specific token's address as copied
      setCopiedAddresses((prev) => ({ ...prev, [tokenId]: true }));

      // Reset the copied state after 2 seconds (giving enough time for the animation)
      setTimeout(() => {
        setCopiedAddresses((prev) => ({ ...prev, [tokenId]: false }));
      }, 2000);
    });
  };

  // Filter tokens based on search query
  const filteredWalletTokens = walletTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredAllTokens = allTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle token selection
  const handleSelectToken = (token: Token) => {
    if (onTokenSelect) {
      onTokenSelect(token);
    }
    setIsOpen(false);
  };

  // More consistent base classes with better mobile sizing
  const baseClasses =
    "min-w-[100px] sm:min-w-[110px] md:min-w-[120px] flex items-center justify-between gap-2 px-2 py-2 sm:py-2 rounded-[6px] text-[1rem] font-medium whitespace-nowrap";

  const variantClasses: Record<SelectTokenButtonProps["variant"], string> = {
    send: "bg-amber-500/25 text-amber-500 hover:bg-amber-500/40 hover:text-amber-400 border-amber-500/15 border-[1px] text-sm sm:text-base",
    receive:
      "bg-[#0EA5E9]/10 text-sky-500 hover:bg-[#0b466b] hover:text-sky-400 border-[#0EA5E9]/25 border-[1px] text-sm sm:text-base",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={`${baseClasses} ${variantClasses[variant]} h-[2rem] sm:h-[2.25rem]`}
        >
          <span className="truncate">select token</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 flex-shrink-0"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[480px] p-0 pb-4 bg-[#18181B] border-[#1C1C1E] rounded-[6px] overflow-hidden max-w-[calc(100%-60px)]"
        showCloseButton={false}
      >
        <div className="px-4 pt-4 flex justify-between items-center">
          <DialogTitle className="sm:text-lg text-md font-medium text-[#FAFAFA]">
            token select
          </DialogTitle>
          <StyledDialogClose className="bg-[#442E0B] rounded-[3px] border-[#61410B] border-[0.5px]">
            <X className="h-4 w-4 text-amber-500" />
            <span className="sr-only">Close</span>
          </StyledDialogClose>
        </div>

        {/* Search input */}
        <div className="px-4 pt-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#FAFAFA20]" />
            </div>
            <input
              type="text"
              placeholder="search token or paste address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[38px] bg-[#27272A] text-[#FAFAFA] placeholder-[#FAFAFA20] pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-lg text-base"
              style={{ fontSize: "16px" }}
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <div
                className="sm:w-6 sm:h-6 w-5 h-5 rounded-md flex items-center justify-center"
                style={{ backgroundColor: chainToShow.backgroundColor }}
              >
                <Image
                  src={`/tokens/mono/${chainToShow.icon}`}
                  alt={chainToShow.symbol}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Apply our custom scrollbar class */}
        <div className="max-h-[420px] overflow-y-auto scrollbar-thin px-2">
          {/* Token list sections using our new component */}
          <TokenListSection
            title="your wallet"
            tokens={filteredWalletTokens}
            onSelectToken={handleSelectToken}
            copiedAddresses={copiedAddresses}
            onCopy={copyToClipboard}
          />

          <TokenListSection
            title="all tokens"
            tokens={filteredAllTokens}
            onSelectToken={handleSelectToken}
            copiedAddresses={copiedAddresses}
            onCopy={copyToClipboard}
          />

          {/* No results */}
          {filteredWalletTokens.length === 0 &&
            filteredAllTokens.length === 0 && (
              <div className="p-4 text-center text-[#FAFAFA55]">
                No tokens found matching &quot;{searchQuery}&quot;
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectTokenButton;
