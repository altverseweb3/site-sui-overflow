import React, { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/Button";
import { Coins, Link, ArrowRightLeft, Repeat, Network } from "lucide-react";

// Use a string literal type for the icon names
type AvailableIconName =
  | "Coins"
  | "Link"
  | "ArrowRightLeft"
  | "Repeat"
  | "Network";

// Props interface extending HTML button attributes
interface BrandedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: AvailableIconName;
  buttonText: string;
  className?: string;
}

export function BrandedButton({
  iconName,
  buttonText,
  className = "",
  ...props
}: BrandedButtonProps) {
  // Get the correct icon component directly in the component
  const IconComponent = {
    Coins,
    Link,
    ArrowRightLeft,
    Repeat,
    Network,
  }[iconName];

  return (
    <Button
      className={`w-full bg-amber-500/25 hover:bg-amber-500/50 hover:text-amber-400 text-amber-500 border-[#61410B] border-[1px] rounded-lg leading-zero text-lg ${className}`}
      {...props}
    >
      <IconComponent className="h-6 w-6 mr-2" />
      {buttonText}
    </Button>
  );
}

export default BrandedButton;
