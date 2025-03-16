import React, { ReactNode } from "react";
import { SelectChainButton } from "@/components/ui/SelectChainButton";

interface AssetBoxProps {
  title: string;
  children: ReactNode;
  showSettings?: boolean;
  settingsComponent?: ReactNode;
  showChainSelector?: boolean;
  additionalHeaderControls?: ReactNode;
  className?: string;
}

export function AssetBox({
  title,
  children,
  showSettings = false,
  settingsComponent = null,
  showChainSelector = true,
  additionalHeaderControls = null,
  className = "",
}: AssetBoxProps) {
  return (
    <div
      className={`bg-zinc-900 rounded-[6px] pt-[10px] px-[1.5rem] pb-[1.5rem] w-full min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col ${className}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-zinc-50/50 text-[1.2rem]">{title}</span>
        <div className="flex items-center gap-2 sm:gap-3">
          {showSettings && settingsComponent}
          {additionalHeaderControls}
          {showChainSelector && <SelectChainButton />}
        </div>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default AssetBox;
