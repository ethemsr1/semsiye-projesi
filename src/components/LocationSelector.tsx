import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { City } from '../types';

const LocationSelector: React.FC = () => {
  const {
    fetchWeatherByLocation,
    searchCity,
    fetchWeatherByCity,
    isLoading,
    searchResults,
    language,
  } = useApp();
  
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sadece ilk yüklemede konum çek
    if (!hasInitialLoad) {
      fetchWeatherByLocation();
      setHasInitialLoad(true);
    }
  }, []); // Boş dependency array - sadece mount'ta çalışır

  useEffect(() => {
    // Click outside handler'ı ayrı useEffect'te
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Boş dependency array

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchCity(query);
      setIsSearchOpen(true);
    }
  };

  const handleCitySelect = (city: City) => {
    fetchWeatherByCity(city);
    setQuery('');
    setIsSearchOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      searchCity(value);
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <button
          onClick={fetchWeatherByLocation}
          disabled={isLoading}
          className="btn-primary flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          <span>{getTranslation('useMyLocation', language)}</span>
        </button>

        <div className="relative flex-1" ref={searchContainerRef}>
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={getTranslation('searchCity', language)}
              className="input flex-1 pr-10"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <ul>
                {searchResults.map((city, index) => (
                  <li
                    key={`${city.name}-${city.country}-${index}`}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleCitySelect(city)}
                  >
                    <div className="flex items-center">
                      <span>
                        {city.name}, {city.country}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isSearchOpen && query && searchResults.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-center text-gray-500 dark:text-gray-400">
              {getTranslation('noResults', language)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;