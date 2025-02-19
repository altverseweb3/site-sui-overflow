import { Tab } from "@/types/ui";

interface TabConfig {
  label: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export const TAB_CONFIG: Record<Tab, TabConfig> = {
  swap: {
    label: "Swap",
  },
  bridge: {
    label: "Bridge",
  },
  stake: {
    label: "Stake",
    disabled: true,
    disabledMessage: "Coming soon",
  },
  borrow: {
    label: "Borrow",
    disabled: true,
    disabledMessage: "Coming soon",
  },
  dashboard: {
    label: "Dashboard",
    disabled: true,
    disabledMessage: "Coming soon",
  },
};
