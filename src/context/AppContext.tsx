import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Weather, Language, Theme, City } from '../types';
import { fetchWeatherByCoords, searchCities } from '../utils/api';
import { getUserCoordinates } from '../utils/helpers';

interface AppContextType {
  weather: Weather | null;
  isLoading: boolean;
  error: string | null;
  language: Language;
  theme: Theme;
  searchResults: City[];
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  fetchWeatherByLocation: () => Promise<void>;
  fetchWeatherByCity: (city: City) => Promise<void>;
  searchCity: (query: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('tr');
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchWeatherByLocation = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const position = await getUserCoordinates();
      const { latitude, longitude } = position.coords;
      const weatherData = await fetchWeatherByCoords(latitude, longitude);
      setWeather(weatherData);
    } catch (err) {
      console.error('Error getting location:', err);
      setError(
        language === 'tr'
          ? 'Konum bilgisi alınamadı. Lütfen konum izinlerini kontrol edin veya manuel olarak şehir seçin.'
          : 'Could not get location. Please check location permissions or select a city manually.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: City): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherData = await fetchWeatherByCoords(city.lat, city.lon);
      setWeather(weatherData);
    } catch (err) {
      console.error('Error fetching weather for city:', err);
      setError(
        language === 'tr'
          ? 'Hava durumu bilgisi alınamadı. Lütfen tekrar deneyin.'
          : 'Could not get weather information. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const searchCity = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const cities = await searchCities(query);
      setSearchResults(cities);
    } catch (err) {
      console.error('Error searching cities:', err);
      setSearchResults([]);
    }
  };

  const value = {
    weather,
    isLoading,
    error,
    language,
    theme,
    searchResults,
    setLanguage,
    setTheme,
    fetchWeatherByLocation,
    fetchWeatherByCity,
    searchCity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};