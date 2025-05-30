import React from 'react';
import { Umbrella} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer: React.FC = () => {
  const { language } = useApp();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Umbrella className="h-5 w-5 text-primary-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            © {year} Şemsiye {language === 'tr' ? 'Hava Durumu Asistanı -' : 'Weather Assistant - '}
      
          </span>
      
        <style>
        {`
          .iesmedia {
            font-size: 1.1rem;
            font-weight: bold;
            text-decoration: none;
            animation: renkDegistir 4s infinite linear;
            transition: transform 0.3s ease;
          }
          @keyframes renkDegistir {
            0%   { color: rgb(255, 0, 102); text-shadow: 0 0 10px rgb(255, 0, 102); }
            25%  { color: rgb(0, 153, 255); text-shadow: 0 0 10px rgb(0, 153, 255); }
            50%  { color: rgb(0, 255, 128); text-shadow: 0 0 10px rgb(0, 255, 128); }
            75%  { color: rgb(255, 255, 0); text-shadow: 0 0 10px rgb(255, 255, 0); }
            100% { color: rgb(255, 0, 102); text-shadow: 0 0 10px rgb(255, 0, 102); }
          }
          .iesmedia:hover {
            transform: scale(1.1);
          }
        `}
      </style> 
      
          <a
            href="https://webiees.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="iesmedia"
          >
          Webiees </a>   
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
            {language === 'tr' ? 'Hava durumu verileri' : 'Weather data provided by'}:
          </span>
          <a 
            href="https://openweathermap.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            OpenWeatherMap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;