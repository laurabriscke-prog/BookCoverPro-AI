
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
