import axios from 'axios';
import { Weather, City } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// API key kontrolü
if (!API_KEY) {
  console.error('OpenWeather API key bulunamadı! .env dosyasında VITE_OPENWEATHER_API_KEY tanımlı olduğundan emin olun.');
}

// Axios instance oluştur - timeout ekle
const weatherApi = axios.create({
  timeout: 10000, // 10 saniye timeout
});

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<Weather> => {
  if (!API_KEY) {
    throw new Error('API key bulunamadı');
  }

  try {
    console.log('Hava durumu verisi alınıyor...', { lat, lon });
    
    const response = await weatherApi.get(`${BASE_URL}/weather`, {
      params: {
        lat: lat.toFixed(6), // Koordinatları sınırla
        lon: lon.toFixed(6),
        appid: API_KEY,
        units: 'metric',
        lang: 'tr', // Türkçe açıklamalar için
      },
    });

    const { data } = response;
    
    console.log('API Response:', data);

    // API'den gelen veriyi kontrol et
    if (!data || !data.main || !data.weather) {
      throw new Error('API yanıtında gerekli veriler eksik');
    }
    
    return {
      location: {
        name: data.name || 'Bilinmeyen Konum',
        country: data.sys?.country || '',
        lat: data.coord?.lat || lat,
        lon: data.coord?.lon || lon,
      },
      current: {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind_speed: data.wind?.speed || 0,
        weather: {
          id: data.weather[0]?.id || 0,
          main: data.weather[0]?.main || '',
          description: data.weather[0]?.description || '',
          icon: data.weather[0]?.icon || '',
        },
        uvi: 0, // Free tier'da UV index yok, 0 olarak ayarla
      },
    };
  } catch (error) {
    console.error('Hava durumu verisi alınırken hata:', error);
    
    // Axios hata tiplerini kontrol et
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('İstek zaman aşımına uğradı. İnternet bağlantınızı kontrol edin.');
      }
      if (error.response?.status === 401) {
        throw new Error('API key geçersiz. Lütfen API key\'inizi kontrol edin.');
      }
      if (error.response?.status === 404) {
        throw new Error('Belirtilen konum için hava durumu verisi bulunamadı.');
      }
      if (error.response?.status === 429) {
        throw new Error('API limit aşıldı. Lütfen daha sonra tekrar deneyin.');
      }
    }
    
    throw new Error('Hava durumu verisi alınamadı. Lütfen tekrar deneyin.');
  }
};

export const searchCities = async (query: string): Promise<City[]> => {
  if (!query.trim()) return [];
  
  if (!API_KEY) {
    console.error('API key bulunamadı');
    return [];
  }
  
  try {
    console.log('Şehir aranıyor:', query);
    
    const response = await weatherApi.get(`${GEO_URL}/direct`, {
      params: {
        q: query.trim(),
        limit: 5,
        appid: API_KEY,
      },
    });

    console.log('Şehir arama sonucu:', response.data);

    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((city: any) => ({
      name: city.name || '',
      country: city.country || '',
      lat: city.lat,
      lon: city.lon,
      // Ek bilgi ekle
      state: city.state || '',
      displayName: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`,
    })).filter(city => city.name && typeof city.lat === 'number' && typeof city.lon === 'number');
    
  } catch (error) {
    console.error('Şehir arama hatası:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.error('Arama zaman aşımına uğradı');
      }
      if (error.response?.status === 401) {
        console.error('API key geçersiz');
      }
    }
    
    return [];
  }
};

// Geolocation API ile konum al
export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation bu tarayıcıda desteklenmiyor'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = 'Konum alınamadı';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Konum erişimi reddedildi';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Konum bilgisi mevcut değil';
            break;
          case error.TIMEOUT:
            errorMessage = 'Konum alma zaman aşımına uğradı';
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
        maximumAge: 300000, // 5 dakika cache
      }
    );
  });
};