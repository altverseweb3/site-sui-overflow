"use client";

import { MainNav } from "@/components/layout/MainNav";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import useWeb3Store from "@/store/web3Store";
import {
  connectMetamask,
  disconnectMetamask,
  truncateAddress,
} from "@/utils/walletMethods";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Menu } from "lucide-react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const activeWallet = useWeb3Store((state) => state.activeWallet);

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
            <span className="text-xl font-semibold">altverse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src="/tokens/ALT.svg"
                      alt="Altverse Logo"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                      priority
                    />
                    <span className="text-lg font-semibold">altverse</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-6">
                <nav className="flex flex-col gap-2">
                  <MainNav />
                </nav>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleMetamaskButtonClick}
                >
                  {activeWallet
                    ? truncateAddress(activeWallet.address)
                    : "Connect Metamask"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Wallet Button */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex whitespace-nowrap"
            onClick={handleMetamaskButtonClick}
          >
            {activeWallet
              ? truncateAddress(activeWallet.address)
              : "Connect Metamask"}
          </Button>
        </div>
      </div>
    </header>
  );
}
