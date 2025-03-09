"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import { AssetBox } from "@/components/ui/AssetBox";
import { TokenInputGroup } from "@/components/ui/TokenInputGroup";
import { SwapInterface } from "@/components/ui/SwapInterface";

const SwapComponent = () => {
  const [amount, setAmount] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const settingsButton = (
    <button>
      <Settings className="h-5 w-5 text-zinc-400 hover:text-zinc-50 transition-colors" />
    </button>
  );

  return (
    <div className="flex h-full w-full items-start justify-center pt-[8vh] min-h-[500px]">
      <div className="w-full max-w-md">
        <SwapInterface
          actionButton={{
            text: "swap",
            iconName: "Coins",
            disabled: !amount || amount === "0",
          }}
        >
          {/* Send Box */}
          <AssetBox
            title="send"
            showSettings={true}
            settingsComponent={settingsButton}
            showChainSelector={true}
          >
            <TokenInputGroup
              variant="amber"
              amount={amount}
              onChange={handleAmountChange}
            />
          </AssetBox>

          {/* Receive Box */}
          <AssetBox title="receive" showSettings={false}>
            <TokenInputGroup variant="sky" amount="" readOnly={true} />
          </AssetBox>
        </SwapInterface>
      </div>
    </div>
  );
};

export default SwapComponent;
