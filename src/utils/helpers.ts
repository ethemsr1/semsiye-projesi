import { Weather } from '../types';

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number): string => {
  // Convert m/s to km/h
  return `${Math.round(speed * 3.6)} km/h`;
};

export const getClothingAdvice = (weather: Weather, language: 'tr' | 'en'): string[] => {
  const advice: string[] = [];
  const { current } = weather;
  const isRainy = current.weather.main.toLowerCase() === 'rain';
  const isCold = current.feels_like < 10;
  const isWarm = current.temp > 25;
  const isWindy = (current.wind_speed * 3.6) > 25; // Convert m/s to km/h
  const isHighUV = current.uvi && current.uvi > 5;
  const isSunny = current.weather.main.toLowerCase() === 'clear';

  if (isRainy) {
    advice.push(language === 'tr' ? 'Şemsiyeni unutma' : "Don't forget your umbrella");
  }

  if (isCold) {
    advice.push(
      language === 'tr'
        ? 'Kalın bir mont giy, hava çok soğuk'
        : "Wear a thick jacket, it's very cold"
    );
  }

  if (isWarm) {
    advice.push(
      language === 'tr'
        ? 'T-shirt veya kısa kollu giysi önerilir'
        : 'T-shirt or short sleeves recommended'
    );
  }

  if (isWindy) {
    advice.push(
      language === 'tr'
        ? 'Güçlü rüzgara dikkat et'
        : 'Watch out for strong wind'
    );
  }

  if (isHighUV && isSunny) {
    advice.push(
      language === 'tr'
        ? 'Güneş kremi kullan'
        : 'Use sunscreen'
    );
  }

  return advice.length > 0 ? advice : [language === 'tr' ? 'Hava güzel, keyfini çıkar!' : 'Weather is nice, enjoy!'];
};

export const getUserCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};