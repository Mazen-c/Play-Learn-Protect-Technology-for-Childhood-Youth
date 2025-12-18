import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PointsDisplay } from "./PointsDisplay";
import { ChevronLeft, Home, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  points?: number;
  showPoints?: boolean;
  rightContent?: React.ReactNode;
}

export function Header({
  title,
  showBack = false,
  backHref = "/",
  points = 0,
  showPoints = true,
  rightContent,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link href={backHref}>
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-home">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
          )}

          {title && (
            <h1 className="text-lg md:text-xl font-bold text-foreground truncate max-w-[200px] md:max-w-none">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          {rightContent}
          {showPoints && <PointsDisplay points={points} showAnimation={false} />}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
