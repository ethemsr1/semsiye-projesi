import React from 'react';
import { useApp } from '../context/AppContext';

const WeatherBackground: React.FC = () => {
  const { weather } = useApp();

  if (!weather) return null;

  const weatherMain = weather.current.weather.main.toLowerCase();
  
  const renderWeatherElements = () => {
    switch (weatherMain) {
      case 'rain':
      case 'drizzle':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="rain absolute w-0.5 h-10 bg-blue-400/30 dark:bg-blue-500/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        );
      
      case 'clouds':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className="cloud absolute bg-white/10 dark:bg-white/5 rounded-full"
                style={{
                  width: `${100 + Math.random() * 100}px`,
                  height: `${50 + Math.random() * 50}px`,
                  left: `${Math.random() * 80}%`,
                  top: `${20 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 8}s`,
                }}
              ></div>
            ))}
          </div>
        );
      
      case 'clear':
        return (
          <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300/20 dark:bg-yellow-400/10 rounded-full blur-2xl pointer-events-none animate-pulse-slow"></div>
        );
      
      case 'snow':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                }}
              ></div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[-1]">
      {renderWeatherElements()}
    </div>
  );
};

export default WeatherBackground;