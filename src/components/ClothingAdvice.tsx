import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { getClothingAdvice } from '../utils/helpers';
import { Shirt } from 'lucide-react';

const ClothingAdvice: React.FC = () => {
  const { weather, language } = useApp();

  if (!weather) return null;

  const advice = getClothingAdvice(weather, language);

  return (
    <div className="weather-card w-full max-w-md mx-auto mt-4 p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <Shirt className="h-5 w-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold">
          {getTranslation('clothingAdvice', language)}
        </h3>
      </div>

      <ul className="space-y-2">
        {advice.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-6 h-6 flex-shrink-0 text-primary-500 mr-2">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClothingAdvice;