import { Sun, Moon } from "lucide-react";
import useUIStore from "@/store/uiStore";
import { Button } from "@/components/ui/Button";

// Custom hook to ensure theme updates are properly persisted
const useThemeToggle = () => {
  const { theme, toggleTheme } = useUIStore();

  const handleThemeToggle = () => {
    toggleTheme();
    // Force store subscription update to ensure persistence
    queueMicrotask(() => {
      useUIStore.getState();
    });
  };

  return { theme, handleThemeToggle };
};

export const ThemeToggle = () => {
  const { theme, handleThemeToggle } = useThemeToggle();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeToggle}
      className="px-2"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
