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
      <Settings className="h-4 w-4 text-zinc-400 mr-2" />
    </button>
  );

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4 pt-[10vh]">
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
  );
};

export default SwapComponent;
