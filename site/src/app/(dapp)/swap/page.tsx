"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import { AssetBox } from "@/components/ui/AssetBox";
import { TokenInputGroup } from "@/components/ui/TokenInputGroup";
import { SwapInterface } from "@/components/ui/SwapInterface";
import { Chain, chains, defaultChain } from "@/config/chains";

const SwapComponent = () => {
  const [amount, setAmount] = useState<string>("");
  const [sendChain, setSendChain] = useState<Chain>(defaultChain);
  const [receiveChain, setReceiveChain] = useState<Chain>(chains.polygon);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const settingsButton = (
    <button>
      <Settings className="h-5 w-5 text-zinc-400 hover:text-zinc-50 transition-colors" />
    </button>
  );

  const handleSendChainChange = (chain: Chain) => {
    console.log("Send chain changed to:", chain.name);
    setSendChain(chain);

    // Example: If the user selects the same chain for both send and receive,
    // automatically switch the receive chain to a different one
    if (chain.id === receiveChain.id) {
      const differentChain = Object.values(chains).find(
        (c) => c.id !== chain.id,
      );
      if (differentChain) {
        setReceiveChain(differentChain);
      }
    }
  };

  const handleReceiveChainChange = (chain: Chain) => {
    console.log("Receive chain changed to:", chain.name);
    setReceiveChain(chain);

    // Example: If the user selects the same chain for both send and receive,
    // automatically switch the send chain to a different one
    if (chain.id === sendChain.id) {
      const differentChain = Object.values(chains).find(
        (c) => c.id !== chain.id,
      );
      if (differentChain) {
        setSendChain(differentChain);
      }
    }
  };

  return (
    <div className="flex h-full w-full items-start justify-center sm:pt-[6vh] pt-[2vh] min-h-[500px]">
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
            onChainChange={handleSendChainChange}
            initialChain={sendChain}
          >
            <TokenInputGroup
              variant="amber"
              amount={amount}
              onChange={handleAmountChange}
              showSelectToken={true}
            />
          </AssetBox>

          {/* Receive Box */}
          <AssetBox
            title="receive"
            showSettings={false}
            showChainSelector={true}
            onChainChange={handleReceiveChainChange}
            initialChain={receiveChain}
          >
            <TokenInputGroup
              variant="sky"
              amount=""
              readOnly={true}
              showSelectToken={true}
            />
          </AssetBox>
        </SwapInterface>
      </div>
    </div>
  );
};

export default SwapComponent;
