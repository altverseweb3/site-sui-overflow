import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { BrandedButton } from "@/components/ui/BrandedButton";

// Use a string literal type for the icon names
type AvailableIconName =
  | "Coins"
  | "Link"
  | "ArrowRightLeft"
  | "Repeat"
  | "Network";

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
      className={`w-full max-w-[520px] sm:max-w-md bg-zinc-900/50 border-zinc-800 ${className}`}
    >
      <CardContent className="space-y-4 p-6">
        {children}
        <BrandedButton
          buttonText={actionButton.text}
          iconName={actionButton.iconName}
          onClick={actionButton.onClick}
          disabled={actionButton.disabled}
        />
      </CardContent>
    </Card>
  );
}

export default SwapInterface;
