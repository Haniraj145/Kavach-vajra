import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Switch } from "./ui/switch";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        <span
          className={`${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out`}
        >
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-primary" />
          ) : (
            <Moon className="h-4 w-4 text-primary" />
          )}
        </span>
      </Switch>
      <span className="text-sm font-medium text-foreground">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
    </div>
  );
};
