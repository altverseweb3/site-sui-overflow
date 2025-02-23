"use client";

import React, { useState, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Settings, Coins } from "lucide-react";
import { SelectTokenButton } from "@/components/ui/SelectTokenButton";
import { SelectChainButton } from "@/components/ui/SelectChainButton";

interface SwapBoxProps {
  children: ReactNode;
}

const SwapBox: React.FC<SwapBoxProps> = ({ children }) => (
  <div className="bg-zinc-900 rounded-lg pt-2 px-4 pb-4 w-full h-[160px] flex flex-col">
    {children}
  </div>
);

const SwapComponent: React.FC = () => {
  const [amount, setAmount] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4 pt-[10vh]">
      <Card className="w-full max-w-[520px] sm:max-w-md bg-zinc-900/50 border-zinc-800">
        <CardContent className="space-y-4 p-6">
          {/* Send Box */}
          <SwapBox>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-md">send</span>
              <div className="flex items-center gap-2">
                <button>
                  <Settings className="h-4 w-4 text-zinc-400 mr-2" />
                </button>
                <SelectChainButton />
              </div>
            </div>
            <div className="flex justify-between items-start gap-4 mt-auto">
              <SelectTokenButton variant="amber" />
              <div className="flex-1 flex flex-col items-end">
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="w-full bg-transparent text-3xl focus:outline-none text-right"
                />
                <span className="text-zinc-400 text-sm">$0.00</span>
              </div>
            </div>
          </SwapBox>

          {/* Receive Box */}
          <SwapBox>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-md">receive</span>
              <div className="flex items-center gap-2">
                <SelectChainButton />
              </div>
            </div>
            <div className="flex justify-between items-start gap-4 mt-auto">
              <SelectTokenButton variant="sky" />
              <div className="flex-1 flex flex-col items-end">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full bg-transparent text-3xl focus:outline-none text-right"
                  readOnly
                />
                <span className="text-zinc-400 text-sm">$0.00</span>
              </div>
            </div>
          </SwapBox>

          <Button className="w-full bg-amber-500/25 hover:bg-amber-600/50 text-amber-500 border-amber-500 border-[0.5px] rounded-lg leading-zero text-lg">
            <Coins className="h-6 w-6 mr-2" />
            swap
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwapComponent;
