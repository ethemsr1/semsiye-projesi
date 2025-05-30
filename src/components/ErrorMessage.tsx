import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-error-50 border border-error-200 text-error-700 dark:bg-error-900/30 dark:border-error-800 dark:text-error-400 p-4 rounded-lg flex items-start mt-4">
      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;