
import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Book, BookOpen, Users } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

const Footer = () => {
  const { t } = useI18n();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-harvest-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">{t("common.title", "HarvestAI")}</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t("common.description", "Empowering farmers with AI-driven insights for better crop management, disease detection, and market access.")}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">{t("nav.home", "Features")}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/scan" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">{t("nav.scan", "Crop Disease Scanner")}</Link></li>
              <li><Link to="/weather" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">{t("nav.weather", "Weather Dashboard")}</Link></li>
              <li><Link to="/market" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">{t("nav.market", "Market Prices")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">{t("resources.title", "Resources")}</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Book size={16} className="text-harvest-primary mr-2" />
                <Link to="/resources/knowledge-base" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">
                  {t("resources.knowledgeBase", "Knowledge Base")}
                </Link>
              </li>
              <li className="flex items-center">
                <BookOpen size={16} className="text-harvest-primary mr-2" />
                <Link to="/resources/guides" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">
                  {t("resources.guides", "Farming Guides")}
                </Link>
              </li>
              <li className="flex items-center">
                <Users size={16} className="text-harvest-primary mr-2" />
                <Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">
                  {t("resources.community", "Community")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">{t("nav.market", "Contact")}</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="text-harvest-primary mr-2" />
                <a href="mailto:contact@harvestai.com" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">contact@harvestai.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="text-harvest-primary mr-2" />
                <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-harvest-primary">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="text-harvest-primary mr-2" />
                <span className="text-gray-600 dark:text-gray-400">{t("location.coimbatore", "Coimbatore")}, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} HarvestAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
