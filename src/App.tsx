import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LocationSelector from './components/LocationSelector';
import WeatherInfo from './components/WeatherInfo';
import ClothingAdvice from './components/ClothingAdvice';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherBackground from './components/WeatherBackground';
import { useApp } from './context/AppContext';

const WeatherApp: React.FC = () => {
  const { weather, isLoading, error } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <WeatherBackground />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <LocationSelector />
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {error && <ErrorMessage message={error} />}
              
              {weather && (
                <div className="w-full mt-6 grid gap-4 grid-cols-1">
                  <WeatherInfo />
                  <ClothingAdvice />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <WeatherApp />
    </AppProvider>
  );
}

export default App;