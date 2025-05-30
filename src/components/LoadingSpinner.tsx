import React from 'react';
import { Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const LoadingSpinner: React.FC = () => {
  const { language } = useApp();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-primary-500 animate-spin" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        {getTranslation('loading', language)}
      </p>
    </div>
  );
};

export default LoadingSpinner;