type Translations = {
  [key: string]: {
    tr: string;
    en: string;
  };
};

export const translations: Translations = {
  appName: {
    tr: 'Şemsiye',
    en: 'Şemsiye',
  },
  tagline: {
    tr: 'Hava Durumu Asistanı',
    en: 'Weather Assistant',
  },
  loading: {
    tr: 'Yükleniyor...',
    en: 'Loading...',
  },
  error: {
    tr: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    en: 'An error occurred. Please try again.',
  },
  locationPermission: {
    tr: 'Konumunuzu kullanabilmek için izin vermeniz gerekiyor.',
    en: 'You need to give permission to use your location.',
  },
  useMyLocation: {
    tr: 'Konumumu Kullan',
    en: 'Use My Location',
  },
  searchCity: {
    tr: 'Şehir Ara...',
    en: 'Search City...',
  },
  temperature: {
    tr: 'Sıcaklık',
    en: 'Temperature',
  },
  feelsLike: {
    tr: 'Hissedilen',
    en: 'Feels Like',
  },
  humidity: {
    tr: 'Nem',
    en: 'Humidity',
  },
  wind: {
    tr: 'Rüzgar',
    en: 'Wind',
  },
  uvIndex: {
    tr: 'UV İndeksi',
    en: 'UV Index',
  },
  clothingAdvice: {
    tr: 'Giyim Önerileri',
    en: 'Clothing Advice',
  },
  noResults: {
    tr: 'Sonuç bulunamadı',
    en: 'No results found',
  },
  darkMode: {
    tr: 'Karanlık Mod',
    en: 'Dark Mode',
  },
  lightMode: {
    tr: 'Aydınlık Mod',
    en: 'Light Mode',
  },
  search: {
    tr: 'Ara',
    en: 'Search',
  },
};

export const getTranslation = (key: string, language: 'tr' | 'en'): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  return translations[key][language];
};