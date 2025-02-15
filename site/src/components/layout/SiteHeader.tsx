"use client";

import { MainNav } from "@/components/layout/MainNav";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import useWeb3Store from "@/store/web3Store";
import {
  connectMetamask,
  disconnectMetamask,
  truncateAddress,
} from "@/utils/walletMethods";
import { toast } from "sonner";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeWallet = useWeb3Store((state) => state.activeWallet);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMetamaskButtonClick = async () => {
    if (activeWallet) {
      try {
        await disconnectMetamask();
      } catch (error) {
        toast("Failed to disconnect wallet.");
        console.error("Failed to disconnect wallet: ", error);
      }
    } else {
      console.log("Starting wallet connection...");
      try {
        const walletInfo = await connectMetamask();
        console.log("Wallet connection result:", walletInfo);

        if (!walletInfo) {
          toast("Failed to connect wallet.");
          console.error("Failed to connect wallet");
        }
      } catch (error) {
        toast("Failed to connect wallet.");
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center px-6">
        {/* Logo and Nav Container */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/tokens/ALT.svg"
              alt="Altverse Logo"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="text-xl font-semibold hidden sm:inline-block">
              altverse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            size="sm"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">
              {isMobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                // X icon when menu is open
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon when menu is closed
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={handleMetamaskButtonClick}
          >
            {activeWallet
              ? truncateAddress(activeWallet.address)
              : "Connect Metamask"}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="border-t px-6 py-3">
            <div className="flex flex-col space-y-2">
              <MainNav />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
