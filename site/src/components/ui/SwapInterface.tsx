import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { BrandedButton } from "@/components/ui/BrandedButton";

// Use a string literal type for the icon names
type AvailableIconName = "Coins" | "Cable";

interface SwapInterfaceProps {
  children: ReactNode;
  actionButton: {
    text: string;
    iconName: AvailableIconName;
    onClick?: () => void;
    disabled?: boolean;
  };
  className?: string;
}

export function SwapInterface({
  children,
  actionButton,
  className = "",
}: SwapInterfaceProps) {
  return (
    <Card
      className={`w-full bg-zinc-950 border-none rounded-[6px] ${className}`}
    >
      <CardContent className="p-2">
        <div className="space-y-[1px]">{children}</div>
        <div className="mt-[10px]">
          <BrandedButton
            buttonText={actionButton.text}
            iconName={actionButton.iconName}
            onClick={actionButton.onClick}
            disabled={actionButton.disabled}
            className="h-[36px] sm:h-auto w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default SwapInterface;
