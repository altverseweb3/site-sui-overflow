import React, { ReactNode, useState } from "react";
import { SelectChainButton } from "@/components/ui/SelectChainButton";
import { Chain, defaultChain } from "@/config/chains";

interface AssetBoxProps {
  title: string;
  children: ReactNode;
  showSettings?: boolean;
  settingsComponent?: ReactNode;
  showChainSelector?: boolean;
  additionalHeaderControls?: ReactNode;
  className?: string;
  onChainChange?: (chain: Chain) => void;
  initialChain?: Chain;
  displayChainName?: boolean;
  availableChains?: Chain[];
}

export function AssetBox({
  title,
  children,
  showSettings = false,
  settingsComponent = null,
  showChainSelector = true,
  additionalHeaderControls = null,
  className = "",
  onChainChange,
  initialChain = defaultChain,
  displayChainName = false,
  availableChains,
}: AssetBoxProps) {
  const [selectedChain, setSelectedChain] = useState<Chain>(initialChain);

  const handleChainSelect = (chain: Chain) => {
    setSelectedChain(chain);
    if (onChainChange) {
      onChainChange(chain);
    }
  };

  return (
    <div
      className={`bg-zinc-900 rounded-[6px] pt-[10px] px-[1.5rem] pb-[1.5rem] w-full min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col ${className}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-zinc-50/50 text-[1.2rem]">{title}</span>
        <div className="flex items-center gap-2 sm:gap-3">
          {showSettings && settingsComponent}
          {additionalHeaderControls}
          {showChainSelector && (
            <SelectChainButton
              selectedChain={selectedChain}
              onChainSelect={handleChainSelect}
              displayName={displayChainName}
              chainsToShow={availableChains}
            />
          )}
        </div>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default AssetBox;
