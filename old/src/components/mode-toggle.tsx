import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const LABELS = {
  light: { en: "Light", he: "בהיר" },
  dark: { en: "Dark", he: "כהה" },
  system: { en: "System", he: "לפי המערכת" },
  toggle: { en: "Toggle theme", he: "החלפת ערכת נושא" },
} as const;

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { lang, dir } = useI18n();

  // Radix resolves align="end" against the writing direction and reads it from
  // this prop, not from <html dir> — without it the menu opens off the wrong
  // edge of the trigger in Hebrew.

  return (
    <DropdownMenu dir={dir}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="h-[1.1rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{LABELS.toggle[lang]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(["light", "dark", "system"] as const).map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {LABELS[theme][lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
