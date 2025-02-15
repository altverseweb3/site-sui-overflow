"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TAB_CONFIG } from "@/config/tabs";
import { Tab } from "@/types/tab";

export function MainNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Get current tab from URL path
  const currentTab = pathname.split("/").pop() as Tab;

  return (
    <nav className="flex items-center space-x-4">
      {(Object.entries(TAB_CONFIG) as [Tab, (typeof TAB_CONFIG)[Tab]][]).map(
        ([value, config]) => (
          <Button
            key={value}
            variant={currentTab === value ? "default" : "ghost"}
            disabled={config.disabled}
            title={config.disabledMessage}
            className="text-sm font-medium transition-colors"
            onClick={() => {
              if (!config.disabled) {
                router.push(`/dapp/${value}`);
              }
            }}
          >
            {config.label}
          </Button>
        ),
      )}
    </nav>
  );
}
