import React from 'react';
import { Umbrella, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const Header: React.FC = () => {
  const { language, setLanguage, theme, setTheme } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-10 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Umbrella className="h-6 w-6 text-primary-500" />
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {getTranslation('appName', language)}
          </h1>
          <span className="hidden sm:inline-block text-sm text-gray-500 dark:text-gray-400">
            | {getTranslation('tagline', language)}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 text-sm font-medium rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${language === 'tr' ? 'English' : 'Turkish'}`}
          >
            {language === 'tr' ? 'EN' : 'TR'}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={
              theme === 'light'
                ? getTranslation('darkMode', language)
                : getTranslation('lightMode', language)
            }
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;