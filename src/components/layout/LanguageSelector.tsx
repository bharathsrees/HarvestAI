
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/hooks/use-i18n";

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-muted" : ""}>
          {t("language.english", "English")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ta")} className={language === "ta" ? "bg-muted" : ""}>
          {t("language.tamil", "Tamil")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hi")} className={language === "hi" ? "bg-muted" : ""}>
          {t("language.hindi", "Hindi")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
