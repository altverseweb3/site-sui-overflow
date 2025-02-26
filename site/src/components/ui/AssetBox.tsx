import React, { ReactNode } from "react";
import { SelectChainButton } from "@/components/ui/SelectChainButton";

interface AssetBoxProps {
  title: string;
  children: ReactNode;
  showSettings?: boolean;
  settingsComponent?: ReactNode;
  showChainSelector?: boolean;
  additionalHeaderControls?: ReactNode;
}

export function AssetBox({
  title,
  children,
  showSettings = false,
  settingsComponent = null,
  showChainSelector = true,
  additionalHeaderControls = null,
}: AssetBoxProps) {
  return (
    <div className="bg-zinc-900 rounded-lg pt-2 px-4 pb-4 w-full h-[160px] flex flex-col">
      <div className="flex justify-between items-center">
        <span className="text-zinc-400 text-md">{title}</span>
        <div className="flex items-center gap-2">
          {showSettings && settingsComponent}
          {additionalHeaderControls}
          {showChainSelector && <SelectChainButton />}
        </div>
      </div>
      <div className="mt-auto">{children}</div>
    </div>
  );
}

export default AssetBox;
