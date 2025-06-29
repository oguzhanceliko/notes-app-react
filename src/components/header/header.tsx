import { useAuth } from '@/context/AuthContext';
import { LogOut, Notebook, NotebookPen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/mode-toggle';
import LanguageDropdown from './language-dropdown';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="shadow-lg dark:border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Notebook className="w-6 h-6" />
            <h1 className="text-xl font-bold">{t("appTitle")}</h1>
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/not-ekle`)}
                  >
                    <NotebookPen className="w-5 h-5" />
                    {t("addNote")}
                  </Button>
                </div>
                <Button variant="outline" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                  {t("logout")}
                </Button>
              </div>
            )}
            <LanguageDropdown />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
