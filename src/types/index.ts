export interface Weather {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
    uvi?: number;
  };
}

export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export type Language = 'tr' | 'en';

export type Theme = 'light' | 'dark';