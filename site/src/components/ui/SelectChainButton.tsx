import React, { useState, useEffect } from "react";
import { ChevronDown, CornerDownRight, Check } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Chain, chainList, defaultChain } from "@/config/chains";

interface SelectChainButtonProps {
  selectedChain?: Chain;
  onChainSelect?: (chain: Chain) => void;
  displayName?: boolean;
  chainsToShow?: Chain[];
}

export const SelectChainButton: React.FC<SelectChainButtonProps> = ({
  selectedChain = defaultChain,
  onChainSelect,
  displayName = false,
  chainsToShow = chainList,
}) => {
  // State for the icon currently being displayed.
  const [displayedChain, setDisplayedChain] = useState<Chain>(selectedChain);
  // State for the icon's opacity.
  const [opacity, setOpacity] = useState(1);
  // State for background transition
  const [showRipple, setShowRipple] = useState(false);
  // State to track if chain is changing
  const [isChanging, setIsChanging] = useState(false);
  // State for background color
  const [bgColor, setBgColor] = useState(selectedChain.backgroundColor);
  // State for font color
  const [fontColor, setFontColor] = useState(
    selectedChain.fontColor || "#FFFFFF",
  );

  // When selectedChain changes, animate the icon change:
  useEffect(() => {
    // Only trigger animation if the chain has actually changed.
    if (selectedChain.id !== displayedChain.id) {
      setIsChanging(true);
      setShowRipple(true);

      // Start background color transition
      const bgTransitionTimer = setTimeout(() => {
        setBgColor(selectedChain.backgroundColor);
        setFontColor(selectedChain.fontColor || "#FFFFFF");
      }, 50);

      // Fade out the current icon.
      setOpacity(0);

      // After the fade-out duration, swap the icon and then fade in.
      const fadeOutTimer = setTimeout(() => {
        setDisplayedChain(selectedChain);

        // Small delay to ensure the new icon renders at opacity 0
        // before starting fade-in.
        const fadeInTimer = setTimeout(() => {
          setOpacity(1);

          // Finish the animation
          const cleanupTimer = setTimeout(() => {
            setIsChanging(false);
            setShowRipple(false);
          }, 300);

          return () => clearTimeout(cleanupTimer);
        }, 50);

        return () => clearTimeout(fadeInTimer);
      }, 300);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(bgTransitionTimer);
      };
    } else {
      // If this is the initial render, make sure state is synced
      setBgColor(selectedChain.backgroundColor);
      setFontColor(selectedChain.fontColor || "#FFFFFF");
      setDisplayedChain(selectedChain);
    }
  }, [selectedChain, displayedChain]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-between rounded-lg relative overflow-hidden"
          style={{
            width: "48px",
            height: "28px",
            padding: "0px 6px",
            backgroundColor: bgColor,
            transition: "background-color 600ms ease",
          }}
        >
          {/* Ripple effect when chain changes */}
          {showRipple && (
            <span
              className="absolute inset-0 z-0 animate-ripple rounded-lg origin-center"
              style={{ backgroundColor: selectedChain.backgroundColor }}
            />
          )}

          {/* Chain Icon with opacity transition - Fixed dimensions */}
          <div
            className="relative z-10 flex-shrink-0"
            style={{
              width: "18px",
              height: "18px",
              opacity,
              transition: "opacity 300ms ease",
            }}
          >
            <Image
              src={`/tokens/mono/${displayedChain.icon}`}
              alt={displayedChain.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Chain name - Only if needed */}
          {displayName && (
            <span
              className="text-sm font-medium hidden sm:block z-10 mx-1"
              style={{
                opacity: isChanging ? opacity : 1,
                transition: "opacity 300ms ease",
                color: fontColor,
              }}
            >
              {displayedChain.name}
            </span>
          )}

          {/* Chevron with fixed dimensions and font color from chain */}
          <ChevronDown
            className="z-10 flex-shrink-0"
            style={{
              width: "12px",
              height: "12px",
              color: fontColor,
            }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 rounded-[6px] border-[#52525B50] bg-[#18181B]"
      >
        <style jsx global>{`
          /* Override default dropdown hover styles */
          .chain-dropdown-item {
            padding: 2px 8px !important;
          }

          .chain-dropdown-item:hover,
          .chain-dropdown-item:focus {
            background-color: transparent !important;
            outline: none !important;
          }

          .chain-item-inner:hover {
            background-color: #27272a !important;
          }
        `}</style>

        {chainsToShow.map((chain) => (
          <DropdownMenuItem
            key={chain.id}
            onClick={() => onChainSelect && onChainSelect(chain)}
            className="chain-dropdown-item cursor-pointer"
          >
            <div
              className={`chain-item-inner flex items-center justify-between px-[9px] py-[5px] rounded-[6px] w-full ${
                selectedChain.id === chain.id ? "bg-[#27272A]" : ""
              }`}
            >
              <div className="flex items-center">
                {/* L2 indicator icon with text */}
                {chain.l2 && (
                  <div className="relative mr-1 flex-shrink-0">
                    <CornerDownRight className="text-gray-500" size={16} />
                    <span
                      className="absolute text-[7px] font-bold text-gray-600"
                      style={{
                        left: "6px",
                        top: "2px",
                        lineHeight: "0",
                      }}
                    >
                      L2
                    </span>
                  </div>
                )}
                {/* Colored circle with mono icon */}
                <div className="relative w-5 h-5 mr-2 flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: chain.backgroundColor }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-3.5 h-3.5">
                      <Image
                        src={`/tokens/mono/${chain.icon}`}
                        alt={chain.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <span>{chain.name}</span>
              </div>

              {/* Check icon for selected chain */}
              {selectedChain.id === chain.id && (
                <Check
                  className="text-amber-500 ml-2 flex-shrink-0"
                  size={16}
                />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectChainButton;
