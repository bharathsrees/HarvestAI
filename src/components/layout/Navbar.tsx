
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  Leaf, 
  Scan, 
  Cloud, 
  ShoppingCart,
  UserCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { useI18n } from "@/hooks/use-i18n";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: t("nav.home", "Home"), path: "/" },
    { name: t("nav.scan", "Scan"), path: "/scan", icon: <Scan size={18} /> },
    { name: t("nav.weather", "Weather"), path: "/weather", icon: <Cloud size={18} /> },
    { name: t("nav.market", "Market"), path: "/market", icon: <ShoppingCart size={18} /> },
    { name: t("nav.expert", "Expert Advice"), path: "/expert", icon: <UserCheck size={18} /> },
    { name: t("nav.community", "Community"), path: "/community", icon: <Users size={18} /> },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-harvest-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                {t("common.title", "HarvestAI")}
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-harvest-light hover:text-harvest-primary",
                  "flex items-center space-x-1",
                  item.path === "/"
                    ? ""
                    : "text-foreground hover:text-harvest-primary"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="flex items-center ml-4 space-x-1">
              <ThemeToggle />
              <LanguageSelector />
              <Button className="bg-harvest-primary hover:bg-harvest-secondary ml-2">
                {t("nav.getStarted", "Get Started")}
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-harvest-primary hover:bg-harvest-light"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                "hover:bg-harvest-light hover:text-harvest-primary",
                "flex items-center space-x-2",
                item.path === "/"
                  ? ""
                  : "text-foreground hover:text-harvest-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          <Button className="bg-harvest-primary hover:bg-harvest-secondary w-full mt-4">
            {t("nav.getStarted", "Get Started")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
