import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { getWeatherIcon, formatTemperature, formatWindSpeed } from '../utils/helpers';
import { Droplets, Wind } from 'lucide-react';

const WeatherInfo: React.FC = () => {
  const { weather, language } = useApp();

  if (!weather) return null;

  const { location, current } = weather;

  return (
    <div className="weather-card w-full max-w-md mx-auto p-6 animate-fade-in">
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-2xl font-bold">
          {location.name}, {location.country}
        </h2>
        
        <div className="flex items-center justify-center mt-4">
          <img
            src={getWeatherIcon(current.weather.icon)}
            alt={current.weather.description}
            className="w-20 h-20 animate-float"
          />
          <div className="text-5xl font-bold ml-2">
            {formatTemperature(current.temp)}
          </div>
        </div>
        
        <p className="text-lg capitalize mt-1">
          {current.weather.description}
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {getTranslation('feelsLike', language)}: {formatTemperature(current.feels_like)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex items-center">
          <Droplets className="h-5 w-5 text-primary-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getTranslation('humidity', language)}
            </p>
            <p className="font-semibold">{current.humidity}%</p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex items-center">
          <Wind className="h-5 w-5 text-primary-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getTranslation('wind', language)}
            </p>
            <p className="font-semibold">{formatWindSpeed(current.wind_speed)}</p>
          </div>
        </div>
        
        {current.uvi !== undefined && (
          <div className="col-span-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="h-5 w-5 text-primary-500 mr-2"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getTranslation('uvIndex', language)}
              </p>
              <p className="font-semibold">{Math.round(current.uvi)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;