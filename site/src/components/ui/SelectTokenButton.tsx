import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface TokenButtonProps {
  variant: "amber" | "sky";
}

export const SelectTokenButton: React.FC<TokenButtonProps> = ({ variant }) => {
  // More consistent base classes with better mobile sizing
  const baseClasses =
    "min-w-[100px] sm:min-w-[110px] md:min-w-[120px] flex items-center justify-between gap-2 px-2 py-2 sm:py-2 rounded-[6px] text-[1rem] font-medium whitespace-nowrap";

  const variantClasses: Record<TokenButtonProps["variant"], string> = {
    amber:
      "bg-amber-500/25 text-amber-500 hover:bg-amber-500/40 hover:text-amber-400 border-amber-500/15 border-[1px] text-sm sm:text-base",
    sky: "bg-[#0EA5E9]/10 text-sky-500 hover:bg-[#0b466b] hover:text-sky-400 border-[#0EA5E9]/25 border-[1px] text-sm sm:text-base",
  };

  return (
    <Button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} h-[2rem] sm:h-[2.25rem]`}
    >
      <span className="truncate">select token</span>
      <ChevronDown className="h-4 w-4 flex-shrink-0" />
    </Button>
  );
};
