import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Toggle theme"
        className="h-9 w-9 grid place-items-center rounded-full border border-border bg-surface-1/80 text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "text-primary" : ""}>
          <Sun className="h-4 w-4 mr-2" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "text-primary" : ""}>
          <Moon className="h-4 w-4 mr-2" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className={theme === "system" ? "text-primary" : ""}>
          <Monitor className="h-4 w-4 mr-2" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
