"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TAB_CONFIG } from "@/config/tabs";
import { Tab } from "@/types/tab";

interface MainNavProps {
  onNavigate: () => void;
}

export function MainNav({ onNavigate }: MainNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() as Tab;

  const handleNavigation = (value: Tab, disabled?: boolean) => {
    if (!disabled) {
      router.push(`/dapp/${value}`);
      onNavigate(); // Call the close function after navigation
    }
  };

  return (
    <>
      {(Object.entries(TAB_CONFIG) as [Tab, (typeof TAB_CONFIG)[Tab]][]).map(
        ([value, config]) => (
          <Button
            key={value}
            variant={currentTab === value ? "default" : "ghost"}
            disabled={config.disabled}
            title={config.disabledMessage}
            className="w-full md:w-auto text-sm font-medium transition-colors justify-start md:justify-center"
            onClick={() => handleNavigation(value, config.disabled)}
          >
            {config.label}
          </Button>
        ),
      )}
    </>
  );
}
